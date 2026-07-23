interface Env {
  SAFE_BROWSING_API_KEY: string
  ALLOWED_ORIGIN: string
}

interface CheckResult {
  url: string
  domain: string
  registrableDomain: string
  dns: DnsResult
  http: HttpResult | null
  ssl: SslResult | null
  age: AgeResult | null
  safeBrowsing: SafeBrowsingResult
  typosquatting: TyposquattingResult
  registrant: string | null
  redirects: RedirectResult
  verdict: 'safe' | 'caution' | 'danger'
  verdictReason: string
}

interface DnsResult {
  resolves: boolean
  ip: string | null
}

interface HttpResult {
  statusCode: number
  headers: Record<string, string>
  serverHeader: string | null
  hasHSTS: boolean
  hasCSP: boolean
}

interface SslResult {
  valid: boolean
  issuer: string | null
  validFrom: string | null
  validTo: string | null
  matchesDomain: boolean
}

interface AgeResult {
  createdDate: string | null
  expiresDate: string | null
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
  distance: number | null
}

interface RedirectResult {
  redirected: boolean
  chain: string[]
  finalDomain: string | null
}

// --- Known domains ---

const KNOWN_DOMAINS = [
  // Bancos Chile
  'bancosantander.cl', 'bancoestado.cl', 'bancodechile.cl', 'bancochile.cl',
  'bci.cl', 'bancofalabella.cl', 'scotiabank.cl', 'bancoripley.cl', 'bancoitau.cl',
  // Tiendas Chile
  'mercadolibre.cl', 'falabella.com', 'ripley.cl', 'paris.cl',
  'lider.cl', 'pcfactory.cl', 'entel.cl', 'wom.cl', 'movistar.cl',
  'claro.cl', 'tottus.cl', 'jumbo.cl', 'easy.cl',
  // Gobierno Chile
  'sii.cl', 'fonasa.cl', 'registrocivil.cl', 'comisariavirtual.cl', 'correos.cl',
  // Servicios globales
  'gmail.com', 'google.com', 'facebook.com', 'instagram.com',
  'whatsapp.com', 'netflix.com', 'spotify.com', 'apple.com',
  'microsoft.com', 'amazon.com', 'paypal.com', 'twitter.com',
  'linkedin.com', 'tiktok.com', 'youtube.com', 'zoom.us',
  'mercadopago.cl', 'mercadopago.com',
]

// --- Utilities ---

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  }
}

function extractRegistrableDomain(hostname: string): string {
  const parts = hostname.split('.')
  const secondLevelTlds = ['gob.cl', 'co.uk', 'com.ar', 'com.br', 'com.mx', 'org.ar']

  if (parts.length >= 3) {
    const lastThree = parts.slice(-3).join('.')
    for (const sld of secondLevelTlds) {
      if (lastThree.endsWith(sld)) {
        return parts.slice(-3).join('.')
      }
    }
    return parts.slice(-2).join('.')
  }
  return hostname
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

// --- DNS Resolution ---

async function checkDns(domain: string): Promise<DnsResult> {
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { 'Accept': 'application/dns-json' },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) return { resolves: false, ip: null }

    const data = await res.json() as { Answer?: Array<{ data: string; type: number }> }

    if (!data.Answer || data.Answer.length === 0) {
      return { resolves: false, ip: null }
    }

    const aRecord = data.Answer.find(r => r.type === 1)
    return { resolves: true, ip: aRecord?.data || null }
  } catch {
    return { resolves: false, ip: null }
  }
}

// --- HTTP Check (headers, status, security headers) ---

async function checkHttp(url: string): Promise<{ http: HttpResult | null; ssl: SslResult | null; redirects: RedirectResult }> {
  const chain: string[] = []
  let finalUrl = url

  try {
    // Follow redirects manually to capture chain
    let currentUrl = url
    let hops = 0
    const maxHops = 10

    while (hops < maxHops) {
      const res = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'BaseSeguaBot/1.0' },
      })

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location')
        if (!location) break

        const nextUrl = location.startsWith('http') ? location : new URL(location, currentUrl).href
        chain.push(nextUrl)
        currentUrl = nextUrl
        hops++
      } else {
        finalUrl = currentUrl

        // Extract headers
        const serverHeader = res.headers.get('server') || null
        const hasHSTS = !!res.headers.get('strict-transport-security')
        const hasCSP = !!res.headers.get('content-security-policy')

        const headers: Record<string, string> = {}
        const interestingHeaders = [
          'server', 'x-powered-by', 'strict-transport-security',
          'content-security-policy', 'x-frame-options', 'x-content-type-options'
        ]
        for (const h of interestingHeaders) {
          const val = res.headers.get(h)
          if (val) headers[h] = val
        }

        // SSL info from the URL
        const isHttps = currentUrl.startsWith('https')
        let ssl: SslResult | null = null
        if (isHttps) {
          // CF Workers can't inspect certificates directly,
          // but if the fetch succeeded over HTTPS, the cert is valid
          ssl = {
            valid: true,
            issuer: null, // Would need external API for this
            validFrom: null,
            validTo: null,
            matchesDomain: true, // If fetch succeeded, TLS matched
          }
        } else {
          ssl = {
            valid: false,
            issuer: null,
            validFrom: null,
            validTo: null,
            matchesDomain: false,
          }
        }

        const originalDomain = extractRegistrableDomain(extractDomain(url))
        const finalDomain = extractRegistrableDomain(extractDomain(finalUrl))

        return {
          http: {
            statusCode: res.status,
            headers,
            serverHeader,
            hasHSTS,
            hasCSP,
          },
          ssl,
          redirects: {
            redirected: chain.length > 0,
            chain,
            finalDomain: finalDomain !== originalDomain ? finalDomain : null,
          },
        }
      }
    }

    // Too many redirects
    const originalDomain2 = extractRegistrableDomain(extractDomain(url))
    const lastDomain = extractRegistrableDomain(extractDomain(currentUrl))
    return {
      http: null,
      ssl: null,
      redirects: {
        redirected: true,
        chain,
        finalDomain: lastDomain !== originalDomain2 ? lastDomain : null,
      },
    }
  } catch {
    return {
      http: null,
      ssl: null,
      redirects: { redirected: chain.length > 0, chain, finalDomain: null },
    }
  }
}

// --- RDAP (age + registrant) ---

async function lookupRDAP(domain: string): Promise<{ createdDate: string | null; expiresDate: string | null; registrant: string | null }> {
  try {
    const res = await fetch(`https://who-dat.as93.net/${domain}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) return { createdDate: null, expiresDate: null, registrant: null }

    const data = await res.json() as Record<string, unknown>

    let createdDate: string | null = null
    let expiresDate: string | null = null
    let registrant: string | null = null

    const events = (data as any)?.events || []
    for (const event of events) {
      if (event.eventAction === 'registration') {
        createdDate = event.eventDate?.split('T')[0] || null
      }
      if (event.eventAction === 'expiration') {
        expiresDate = event.eventDate?.split('T')[0] || null
      }
    }

    const entities = (data as any)?.entities || []
    for (const entity of entities) {
      if (entity.roles?.includes('registrant')) {
        registrant = entity.vcardArray?.[1]?.[1]?.[3] ||
                     entity.handle ||
                     null
        break
      }
    }

    return { createdDate, expiresDate, registrant }
  } catch {
    return { createdDate: null, expiresDate: null, registrant: null }
  }
}

function computeAge(createdDate: string | null, expiresDate: string | null): AgeResult {
  if (!createdDate) {
    return { createdDate: null, expiresDate, ageMonths: null, ageLabel: 'No se pudo determinar la antigüedad' }
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

  return { createdDate, expiresDate, ageMonths: months, ageLabel }
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

// --- Typosquatting ---

function checkTyposquatting(registrableDomain: string): TyposquattingResult {
  const domainBase = registrableDomain.replace(/\.[^.]+(\.[^.]+)?$/, '')

  for (const known of KNOWN_DOMAINS) {
    if (registrableDomain === known) return { similar: false, matchedDomain: null, distance: null }

    const knownBase = known.replace(/\.[^.]+(\.[^.]+)?$/, '')
    const distance = levenshtein(domainBase, knownBase)

    if (distance > 0 && distance <= 2) {
      return { similar: true, matchedDomain: known, distance }
    }

    // Common character substitutions
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

    if (normalized === knownNormalized && registrableDomain !== known) {
      return { similar: true, matchedDomain: known, distance }
    }
  }

  return { similar: false, matchedDomain: null, distance: null }
}

// --- Verdict ---

function computeVerdict(result: Omit<CheckResult, 'verdict' | 'verdictReason'>): { verdict: 'safe' | 'caution' | 'danger'; reason: string } {
  // Critical: domain doesn't even resolve
  if (!result.dns.resolves) {
    return { verdict: 'danger', reason: 'Este dominio no existe — no resuelve a ninguna dirección IP. No hay ningún sitio real aquí.' }
  }

  // Critical: Google flags it
  if (!result.safeBrowsing.safe) {
    return { verdict: 'danger', reason: `Google marca este sitio como peligroso: ${result.safeBrowsing.threats.join(', ')}.` }
  }

  // Critical: very new + looks like a known domain
  if (result.age && result.age.ageMonths !== null && result.age.ageMonths < 1 && result.typosquatting.similar) {
    return { verdict: 'danger', reason: `Este dominio fue creado hace días y se parece a ${result.typosquatting.matchedDomain}. Altamente sospechoso.` }
  }

  // Critical: site doesn't respond at all
  if (result.dns.resolves && !result.http) {
    return { verdict: 'danger', reason: 'El dominio existe pero el sitio no responde. Podría estar caído o ser un dominio abandonado.' }
  }

  // Caution: typosquatting
  if (result.typosquatting.similar) {
    return { verdict: 'caution', reason: `Este dominio se parece mucho a ${result.typosquatting.matchedDomain} — verifica que estés en el sitio correcto.` }
  }

  // Caution: very new domain
  if (result.age && result.age.ageMonths !== null && result.age.ageMonths < 3) {
    return { verdict: 'caution', reason: `Este dominio fue creado hace poco (${result.age.ageLabel.toLowerCase()}). Los sitios legítimos suelen tener más antigüedad.` }
  }

  // Caution: redirects to different domain
  if (result.redirects.finalDomain) {
    return { verdict: 'caution', reason: `Este sitio te redirige a un dominio diferente: ${result.redirects.finalDomain}.` }
  }

  // Caution: no HTTPS
  if (result.ssl && !result.ssl.valid) {
    return { verdict: 'caution', reason: 'Este sitio no usa conexión cifrada (HTTPS). Cualquier dato que envíes puede ser interceptado.' }
  }

  // Caution: new + hidden owner
  if (result.registrant === null && result.age && result.age.ageMonths !== null && result.age.ageMonths < 6) {
    return { verdict: 'caution', reason: 'El dominio es relativamente nuevo y el dueño está oculto. No es prueba de estafa, pero amerita precaución.' }
  }

  return { verdict: 'safe', reason: 'No se encontraron señales de alerta. El sitio resuelve correctamente, no está en listas de amenazas, y tiene una antigüedad razonable.' }
}

// --- Main handler ---

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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

    // Normalize
    if (!url.startsWith('http')) url = `https://${url}`

    const domain = extractDomain(url)
    const registrableDomain = extractRegistrableDomain(domain)

    // Step 1: DNS — if it doesn't resolve, stop early
    const dns = await checkDns(registrableDomain)

    let http: HttpResult | null = null
    let ssl: SslResult | null = null
    let redirects: RedirectResult = { redirected: false, chain: [], finalDomain: null }
    let age: AgeResult | null = null
    let registrant: string | null = null
    let safeBrowsing: SafeBrowsingResult = { safe: true, threats: [] }

    if (dns.resolves) {
      // Run remaining checks in parallel
      const [httpResult, rdap, sbResult] = await Promise.all([
        checkHttp(url),
        lookupRDAP(registrableDomain),
        checkSafeBrowsing(url, env.SAFE_BROWSING_API_KEY),
      ])

      http = httpResult.http
      ssl = httpResult.ssl
      redirects = httpResult.redirects
      age = computeAge(rdap.createdDate, rdap.expiresDate)
      registrant = rdap.registrant
      safeBrowsing = sbResult
    } else {
      // Still check Safe Browsing and RDAP even if DNS fails
      const [rdap, sbResult] = await Promise.all([
        lookupRDAP(registrableDomain),
        checkSafeBrowsing(url, env.SAFE_BROWSING_API_KEY),
      ])
      age = computeAge(rdap.createdDate, rdap.expiresDate)
      registrant = rdap.registrant
      safeBrowsing = sbResult
    }

    const typosquatting = checkTyposquatting(registrableDomain)

    const partialResult = {
      url,
      domain,
      registrableDomain,
      dns,
      http,
      ssl,
      age,
      safeBrowsing,
      typosquatting,
      registrant,
      redirects,
    }

    const { verdict, reason } = computeVerdict(partialResult)

    const result: CheckResult = { ...partialResult, verdict, verdictReason: reason }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  },
}
