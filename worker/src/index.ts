interface Env {
  SAFE_BROWSING_API_KEY: string
  ALLOWED_ORIGIN: string
}

interface CheckResult {
  url: string
  domain: string
  age: AgeResult | null
  safeBrowsing: SafeBrowsingResult
  typosquatting: TyposquattingResult
  registrant: string | null
  redirects: RedirectResult
  verdict: 'safe' | 'caution' | 'danger'
}

interface AgeResult {
  createdDate: string | null
  ageMonths: number | null
  ageLabel: string
}

interface SafeBrowsingResult {
  safe: boolean
  threats: string[]
}

interface TyposquattingResult {
  similar: boolean
  matchedDomain: string | null
}

interface RedirectResult {
  redirected: boolean
  finalDomain: string | null
}

// --- Known domains for typosquatting detection ---

const KNOWN_DOMAINS = [
  // Bancos Chile
  'bancosantander.cl', 'bancoestado.cl', 'bancodechile.cl', 'bci.cl',
  'bancofalabella.cl', 'scotiabank.cl', 'bancoripley.cl', 'bancoitau.cl',
  // Tiendas Chile
  'mercadolibre.cl', 'falabella.com', 'ripley.cl', 'paris.cl',
  'lider.cl', 'pcfactory.cl', 'entel.cl', 'wom.cl', 'movistar.cl',
  // Gobierno Chile
  'gob.cl', 'sii.cl', 'fonasa.cl', 'chileatiende.gob.cl',
  // Servicios globales
  'gmail.com', 'google.com', 'facebook.com', 'instagram.com',
  'whatsapp.com', 'netflix.com', 'spotify.com', 'apple.com',
  'microsoft.com', 'amazon.com', 'paypal.com', 'twitter.com',
  'linkedin.com', 'tiktok.com', 'youtube.com', 'zoom.us',
]

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  }
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = []
  for (let i = 0; i <= b.length; i++) matrix[i] = [i]
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

function checkTyposquatting(domain: string): TyposquattingResult {
  const domainBase = domain.replace(/\.[^.]+$/, '') // Remove TLD
  
  for (const known of KNOWN_DOMAINS) {
    if (domain === known) return { similar: false, matchedDomain: null }
    
    const knownBase = known.replace(/\.[^.]+$/, '')
    const distance = levenshtein(domainBase, knownBase)
    
    // Flag if very similar (1-2 edits) but not identical
    if (distance > 0 && distance <= 2) {
      return { similar: true, matchedDomain: known }
    }
    
    // Also check common substitutions
    const normalized = domainBase
      .replace(/0/g, 'o')
      .replace(/1/g, 'l')
      .replace(/rr/g, 'r')
      .replace(/-/g, '')
    
    const knownNormalized = knownBase
      .replace(/0/g, 'o')
      .replace(/1/g, 'l')
      .replace(/rr/g, 'r')
      .replace(/-/g, '')
    
    if (normalized === knownNormalized && domain !== known) {
      return { similar: true, matchedDomain: known }
    }
  }
  
  return { similar: false, matchedDomain: null }
}

// --- RDAP lookup via who-dat ---

async function lookupRDAP(domain: string): Promise<{ createdDate: string | null; registrant: string | null }> {
  try {
    const res = await fetch(`https://who-dat.as93.net/${domain}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
    
    if (!res.ok) return { createdDate: null, registrant: null }
    
    const data = await res.json() as Record<string, unknown>
    
    let createdDate: string | null = null
    let registrant: string | null = null
    
    // Extract creation date
    const events = (data as any)?.events || []
    for (const event of events) {
      if (event.eventAction === 'registration') {
        createdDate = event.eventDate?.split('T')[0] || null
        break
      }
    }
    
    // Try entities for registrant
    const entities = (data as any)?.entities || []
    for (const entity of entities) {
      if (entity.roles?.includes('registrant')) {
        registrant = entity.vcardArray?.[1]?.[1]?.[3] || 
                     entity.handle || 
                     null
        break
      }
    }
    
    return { createdDate, registrant }
  } catch {
    return { createdDate: null, registrant: null }
  }
}

function computeAge(createdDate: string | null): AgeResult {
  if (!createdDate) {
    return { createdDate: null, ageMonths: null, ageLabel: 'No se pudo determinar la antigüedad' }
  }
  
  const created = new Date(createdDate)
  const now = new Date()
  const months = (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth())
  
  let ageLabel: string
  if (months < 1) {
    const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    ageLabel = `Creado hace ${days} días`
  } else if (months < 12) {
    ageLabel = `Creado hace ${months} meses`
  } else {
    const years = Math.floor(months / 12)
    ageLabel = `Existe desde hace ${years} ${years === 1 ? 'año' : 'años'}`
  }
  
  return { createdDate, ageMonths: months, ageLabel }
}

// --- Google Safe Browsing ---

async function checkSafeBrowsing(url: string, apiKey: string): Promise<SafeBrowsingResult> {
  try {
    const res = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'basesegura', clientVersion: '1.0.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }],
          },
        }),
        signal: AbortSignal.timeout(5000),
      }
    )
    
    if (!res.ok) return { safe: true, threats: [] }
    
    const data = await res.json() as { matches?: Array<{ threatType: string }> }
    
    if (!data.matches || data.matches.length === 0) {
      return { safe: true, threats: [] }
    }
    
    const threatLabels: Record<string, string> = {
      MALWARE: 'Malware',
      SOCIAL_ENGINEERING: 'Phishing / Ingeniería social',
      UNWANTED_SOFTWARE: 'Software no deseado',
      POTENTIALLY_HARMFUL_APPLICATION: 'Aplicación potencialmente dañina',
    }
    
    const threats = data.matches.map(m => threatLabels[m.threatType] || m.threatType)
    return { safe: false, threats }
  } catch {
    return { safe: true, threats: [] }
  }
}

// --- Redirect check ---

async function checkRedirects(url: string): Promise<RedirectResult> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
    })
    
    const finalUrl = res.url
    const originalDomain = extractDomain(url)
    const finalDomain = extractDomain(finalUrl)
    
    if (finalDomain !== originalDomain) {
      return { redirected: true, finalDomain }
    }
    
    return { redirected: false, finalDomain: null }
  } catch {
    return { redirected: false, finalDomain: null }
  }
}

// --- Verdict ---

function computeVerdict(result: Omit<CheckResult, 'verdict'>): 'safe' | 'caution' | 'danger' {
  // Danger conditions
  if (!result.safeBrowsing.safe) return 'danger'
  if (result.age && result.age.ageMonths !== null && result.age.ageMonths < 1 && result.typosquatting.similar) return 'danger'
  
  // Caution conditions
  if (result.typosquatting.similar) return 'caution'
  if (result.age && result.age.ageMonths !== null && result.age.ageMonths < 3) return 'caution'
  if (result.redirects.redirected) return 'caution'
  if (result.registrant === null && result.age && result.age.ageMonths !== null && result.age.ageMonths < 6) return 'caution'
  
  return 'safe'
}

// --- Main handler ---

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS
    const origin = request.headers.get('Origin') || ''
    const allowedOrigins = [env.ALLOWED_ORIGIN, 'http://localhost:3000']
    const corsOrigin = allowedOrigins.includes(origin) ? origin : env.ALLOWED_ORIGIN
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }
    
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    // Parse body
    let url: string
    try {
      const body = await request.json() as { url?: string }
      url = body.url || ''
      if (!url) throw new Error('No URL')
    } catch {
      return new Response(JSON.stringify({ error: 'Envía una URL válida' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    // Normalize URL
    if (!url.startsWith('http')) url = `https://${url}`
    
    const domain = extractDomain(url)
    
    // Run all checks in parallel
    const [rdap, safeBrowsing, redirects] = await Promise.all([
      lookupRDAP(domain),
      checkSafeBrowsing(url, env.SAFE_BROWSING_API_KEY),
      checkRedirects(url),
    ])
    
    const age = computeAge(rdap.createdDate)
    const typosquatting = checkTyposquatting(domain)
    
    const partialResult = {
      url,
      domain,
      age,
      safeBrowsing,
      typosquatting,
      registrant: rdap.registrant,
      redirects,
    }
    
    const verdict = computeVerdict(partialResult)
    
    const result: CheckResult = { ...partialResult, verdict }
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  },
}
