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
  brandInSubdomain: BrandSubdomainResult
  suspiciousKeywords: KeywordResult
  registrant: string | null
  redirects: RedirectResult
  verdict: 'safe' | 'caution' | 'danger'
  verdictReason: string
  confidence: string
}

interface DnsResult { resolves: boolean; ip: string | null }
interface HttpResult { statusCode: number; headers: Record<string, string>; serverHeader: string | null; hasHSTS: boolean; hasCSP: boolean }
interface SslResult { valid: boolean; issuer: string | null; validFrom: string | null; validTo: string | null; matchesDomain: boolean }
interface AgeResult { createdDate: string | null; expiresDate: string | null; ageMonths: number | null; ageLabel: string }
interface SafeBrowsingResult { safe: boolean; threats: string[] }
interface TyposquattingResult { similar: boolean; matchedDomain: string | null; distance: number | null }
interface BrandSubdomainResult { detected: boolean; brand: string | null; realDomain: string | null }
interface KeywordResult { detected: boolean; keywords: string[] }
interface RedirectResult { redirected: boolean; chain: string[]; finalDomain: string | null }

// --- Known brands and their legitimate domains ---

const BRAND_DOMAINS: Record<string, string[]> = {
  'paypal': ['paypal.com'],
  'netflix': ['netflix.com'],
  'google': ['google.com', 'google.cl', 'gmail.com', 'youtube.com'],
  'microsoft': ['microsoft.com', 'outlook.com', 'office.com', 'live.com', 'office365.com'],
  'facebook': ['facebook.com', 'fb.com', 'meta.com'],
  'instagram': ['instagram.com'],
  'whatsapp': ['whatsapp.com'],
  'amazon': ['amazon.com', 'amazon.es', 'amazon.com.mx'],
  'apple': ['apple.com', 'icloud.com'],
  'spotify': ['spotify.com'],
  'linkedin': ['linkedin.com'],
  'twitter': ['twitter.com', 'x.com'],
  'tiktok': ['tiktok.com'],
  'zoom': ['zoom.us'],
  'dropbox': ['dropbox.com'],
  'binance': ['binance.com'],
  'coinbase': ['coinbase.com'],
  'metamask': ['metamask.io'],
  'santander': ['bancosantander.cl', 'santander.com', 'santander.cl'],
  'bancoestado': ['bancoestado.cl'],
  'bancochile': ['bancochile.cl', 'bancodechile.cl'],
  'bci': ['bci.cl'],
  'mercadolibre': ['mercadolibre.cl', 'mercadolibre.com', 'mercadopago.cl', 'mercadopago.com'],
  'falabella': ['falabella.com'],
  'hsbc': ['hsbc.com', 'hsbc.co.uk'],
  'outlook': ['outlook.com', 'outlook.live.com'],
  'onedrive': ['onedrive.live.com'],
  'office365': ['office365.com', 'office.com'],
}

const KNOWN_DOMAINS: string[] = Object.values(BRAND_DOMAINS).flat()

// Suspicious keywords in domains
const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'sign-in', 'verify', 'verification', 'secure', 'security',
  'alert', 'update', 'confirm', 'account', 'suspend', 'restrict', 'reactivar',
  'authenticate', 'authorize', 'validate', 'recover', 'unlock', 'billing',
  'password', 'credential', 'support', 'helpdesk', 'internal-alert',
]

// Suspicious TLDs commonly used in phishing
const SUSPICIOUS_TLDS = [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.my.id', '.workers.dev',
  '.blogspot.com', '.iceiy.com', '.dynv6.net', '.zya.me', '.eu.org',
]

// Public suffix list (common two-level TLDs)
const TWO_LEVEL_TLDS = [
  'co.uk', 'co.jp', 'co.kr', 'co.nz', 'co.za', 'co.il',
  'com.au', 'com.br', 'com.ar', 'com.mx', 'com.co', 'com.pe', 'com.cl',
  'com.cn', 'com.tw', 'com.hk', 'com.sg', 'com.my', 'com.vn',
  'com.tr', 'com.ua', 'com.eg', 'com.ng', 'com.pk',
  'org.uk', 'org.au', 'org.ar',
  'net.au', 'net.br',
  'gob.cl', 'gob.mx', 'gob.ar', 'gob.pe', 'gob.es', 'gov.uk', 'gov.au',
  'ac.uk', 'edu.au', 'edu.ar',
]

// --- Utility functions ---

function isValidUrl(input: string): boolean {
  const trimmed = input.trim()
  // Must contain at least one dot and no spaces
  if (!trimmed.includes('.') || trimmed.includes(' ')) return false
  // Try to parse as URL
  try {
    new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    return true
  } catch {
    return false
  }
}

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

  if (parts.length <= 2) return hostname

  // Check against two-level TLDs
  for (const tld of TWO_LEVEL_TLDS) {
    const tldParts = tld.split('.')
    const hostSuffix = parts.slice(-tldParts.length).join('.')
    if (hostSuffix === tld && parts.length > tldParts.length) {
      return parts.slice(-(tldParts.length + 1)).join('.')
    }
  }

  // Default: last two parts
  return parts.slice(-2).join('.')
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
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }
  return matrix[b.length][a.length]
}

// --- Detection functions ---

async function checkDns(domain: string): Promise<DnsResult> {
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { 'Accept': 'application/dns-json' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return { resolves: false, ip: null }
    const data = await res.json() as { Answer?: Array<{ data: string; type: number }> }
    if (!data.Answer || data.Answer.length === 0) return { resolves: false, ip: null }
    const aRecord = data.Answer.find(r => r.type === 1)
    return { resolves: true, ip: aRecord?.data || null }
  } catch {
    return { resolves: false, ip: null }
  }
}

async function checkHttp(url: string): Promise<{ http: HttpResult | null; ssl: SslResult | null; redirects: RedirectResult }> {
  const chain: string[] = []
  let finalUrl = url

  try {
    let currentUrl = url
    let hops = 0
    const maxHops = 10

    while (hops < maxHops) {
      const res = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BaseSeguaBot/1.0)' },
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
        const serverHeader = res.headers.get('server') || null
        const hasHSTS = !!res.headers.get('strict-transport-security')
        const hasCSP = !!res.headers.get('content-security-policy')

        const headers: Record<string, string> = {}
        for (const h of ['server', 'x-powered-by', 'strict-transport-security', 'content-security-policy', 'x-frame-options']) {
          const val = res.headers.get(h)
          if (val) headers[h] = val
        }

        const isHttps = currentUrl.startsWith('https')
        const ssl: SslResult = {
          valid: isHttps,
          issuer: null,
          validFrom: null,
          validTo: null,
          matchesDomain: isHttps,
        }

        const originalReg = extractRegistrableDomain(extractDomain(url))
        const finalReg = extractRegistrableDomain(extractDomain(finalUrl))

        return {
          http: { statusCode: res.status, headers, serverHeader, hasHSTS, hasCSP },
          ssl,
          redirects: { redirected: chain.length > 0, chain, finalDomain: finalReg !== originalReg ? finalReg : null },
        }
      }
    }

    const originalReg = extractRegistrableDomain(extractDomain(url))
    const lastReg = extractRegistrableDomain(extractDomain(currentUrl))
    return { http: null, ssl: null, redirects: { redirected: true, chain, finalDomain: lastReg !== originalReg ? lastReg : null } }
  } catch {
    return { http: null, ssl: null, redirects: { redirected: chain.length > 0, chain, finalDomain: null } }
  }
}

async function lookupRDAP(domain: string): Promise<{ createdDate: string | null; expiresDate: string | null; registrant: string | null }> {
  try {
    const res = await fetch(`https://who-dat.as93.net/${domain}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return { createdDate: null, expiresDate: null, registrant: null }
    const data = await res.json() as any
    let createdDate: string | null = null
    let expiresDate: string | null = null
    let registrant: string | null = null

    for (const event of (data?.events || [])) {
      if (event.eventAction === 'registration') createdDate = event.eventDate?.split('T')[0] || null
      if (event.eventAction === 'expiration') expiresDate = event.eventDate?.split('T')[0] || null
    }
    for (const entity of (data?.entities || [])) {
      if (entity.roles?.includes('registrant')) {
        registrant = entity.vcardArray?.[1]?.[1]?.[3] || entity.handle || null
        break
      }
    }
    return { createdDate, expiresDate, registrant }
  } catch {
    return { createdDate: null, expiresDate: null, registrant: null }
  }
}

function computeAge(createdDate: string | null, expiresDate: string | null): AgeResult {
  if (!createdDate) return { createdDate: null, expiresDate, ageMonths: null, ageLabel: 'No se pudo obtener la fecha de registro' }
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

async function checkSafeBrowsing(url: string, apiKey: string): Promise<SafeBrowsingResult> {
  try {
    const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
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
    })
    if (!res.ok) return { safe: true, threats: [] }
    const data = await res.json() as { matches?: Array<{ threatType: string }> }
    if (!data.matches || data.matches.length === 0) return { safe: true, threats: [] }
    const labels: Record<string, string> = {
      MALWARE: 'Malware',
      SOCIAL_ENGINEERING: 'Phishing / Ingeniería social',
      UNWANTED_SOFTWARE: 'Software no deseado',
      POTENTIALLY_HARMFUL_APPLICATION: 'Aplicación potencialmente dañina',
    }
    return { safe: false, threats: data.matches.map(m => labels[m.threatType] || m.threatType) }
  } catch {
    return { safe: true, threats: [] }
  }
}

function checkTyposquatting(registrableDomain: string): TyposquattingResult {
  if (KNOWN_DOMAINS.includes(registrableDomain)) return { similar: false, matchedDomain: null, distance: null }

  const domainBase = registrableDomain.replace(/\.[^.]+(\.[^.]+)?$/, '')

  for (const known of KNOWN_DOMAINS) {
    const knownBase = known.replace(/\.[^.]+(\.[^.]+)?$/, '')
    const distance = levenshtein(domainBase, knownBase)
    if (distance > 0 && distance <= 2) return { similar: true, matchedDomain: known, distance }

    const normalized = domainBase.replace(/0/g, 'o').replace(/1/g, 'l').replace(/rr/g, 'r').replace(/-/g, '')
    const knownNorm = knownBase.replace(/0/g, 'o').replace(/1/g, 'l').replace(/rr/g, 'r').replace(/-/g, '')
    if (normalized === knownNorm && registrableDomain !== known) return { similar: true, matchedDomain: known, distance }
  }
  return { similar: false, matchedDomain: null, distance: null }
}

function checkBrandInSubdomain(fullDomain: string, registrableDomain: string): BrandSubdomainResult {
  // If the domain itself is a known brand domain, no issue
  if (KNOWN_DOMAINS.includes(registrableDomain)) return { detected: false, brand: null, realDomain: null }

  const fullLower = fullDomain.toLowerCase()
  const regLower = registrableDomain.toLowerCase()
  // Remove TLD from registrable domain for matching
  const regBase = regLower.replace(/\.[^.]+(\.[^.]+)?$/, '')

  // Check if any brand name appears in the full domain or registrable base
  for (const [brand, domains] of Object.entries(BRAND_DOMAINS)) {
    // Brand appears in subdomain part
    const subdomainPart = fullLower.replace(`.${regLower}`, '')
    if (subdomainPart !== fullLower && subdomainPart.includes(brand)) {
      if (!domains.includes(registrableDomain)) {
        return { detected: true, brand, realDomain: domains[0] }
      }
    }

    // Brand appears in the registrable domain base (e.g. "netflixrimborso.com" contains "netflix")
    if (regBase.includes(brand) && regBase !== brand) {
      if (!domains.includes(registrableDomain)) {
        return { detected: true, brand, realDomain: domains[0] }
      }
    }
  }
  return { detected: false, brand: null, realDomain: null }
}

function checkSuspiciousKeywords(fullDomain: string, registrableDomain: string): KeywordResult {
  if (KNOWN_DOMAINS.includes(registrableDomain)) return { detected: false, keywords: [] }

  const found: string[] = []
  const domainLower = fullDomain.toLowerCase()
  for (const kw of SUSPICIOUS_KEYWORDS) {
    if (domainLower.includes(kw)) found.push(kw)
  }
  return { detected: found.length > 0, keywords: found }
}

function hasSuspiciousTld(registrableDomain: string): boolean {
  for (const tld of SUSPICIOUS_TLDS) {
    if (registrableDomain.endsWith(tld)) return true
  }
  return false
}

// --- Verdict (accumulated signals) ---

function computeVerdict(result: Omit<CheckResult, 'verdict' | 'verdictReason' | 'confidence'>): { verdict: 'safe' | 'caution' | 'danger'; reason: string; confidence: string } {
  let dangerSignals: string[] = []
  let cautionSignals: string[] = []

  // === DANGER signals ===
  if (!result.dns.resolves) {
    dangerSignals.push('El dominio no resuelve — no existe ningún sitio en esta dirección')
  }
  if (!result.safeBrowsing.safe) {
    dangerSignals.push(`Google marca este sitio como peligroso: ${result.safeBrowsing.threats.join(', ')}`)
  }
  if (result.brandInSubdomain.detected) {
    dangerSignals.push(`El dominio usa la marca "${result.brandInSubdomain.brand}" pero NO pertenece a ${result.brandInSubdomain.realDomain}. Es probable que sea una imitación.`)
  }
  if (result.typosquatting.similar && result.age && result.age.ageMonths !== null && result.age.ageMonths < 6) {
    dangerSignals.push(`Se parece a ${result.typosquatting.matchedDomain} y fue creado hace poco. Altamente sospechoso.`)
  }

  // === CAUTION signals ===
  if (result.typosquatting.similar && dangerSignals.length === 0) {
    cautionSignals.push(`Se parece a ${result.typosquatting.matchedDomain} — verifica que estés en el sitio correcto`)
  }
  if (result.suspiciousKeywords.detected) {
    cautionSignals.push(`El dominio contiene palabras asociadas a phishing: ${result.suspiciousKeywords.keywords.join(', ')}`)
  }
  if (result.age && result.age.ageMonths !== null && result.age.ageMonths < 3) {
    cautionSignals.push(`Dominio muy reciente (${result.age.ageLabel.toLowerCase()})`)
  }
  if (result.redirects.finalDomain) {
    cautionSignals.push(`Redirige a un dominio diferente: ${result.redirects.finalDomain}`)
  }
  if (result.ssl && !result.ssl.valid) {
    cautionSignals.push('No usa conexión cifrada (HTTPS)')
  }
  if (hasSuspiciousTld(result.registrableDomain)) {
    cautionSignals.push('Usa un tipo de dominio (TLD) frecuentemente asociado a sitios temporales o fraudulentos')
  }
  if (result.dns.resolves && !result.http) {
    cautionSignals.push('El dominio existe pero el sitio no responde')
  }
  if (result.registrant === null && result.age && result.age.ageMonths !== null && result.age.ageMonths < 6) {
    cautionSignals.push('Dominio reciente con dueño oculto')
  }

  // === Accumulation logic ===
  // If any danger signal: danger
  if (dangerSignals.length > 0) {
    return {
      verdict: 'danger',
      reason: dangerSignals[0],
      confidence: 'Alta — se detectaron señales claras de riesgo.',
    }
  }

  // If 3+ caution signals: upgrade to danger
  if (cautionSignals.length >= 3) {
    return {
      verdict: 'danger',
      reason: `Se acumularon varias señales de alerta: ${cautionSignals.slice(0, 3).join('. ')}.`,
      confidence: 'Media-alta — ninguna señal es definitiva por sí sola, pero la combinación es preocupante.',
    }
  }

  // If any caution signals
  if (cautionSignals.length > 0) {
    return {
      verdict: 'caution',
      reason: cautionSignals[0],
      confidence: cautionSignals.length >= 2
        ? 'Media — hay más de una señal que amerita precaución.'
        : 'Baja-media — hay una señal que amerita atención, pero no es concluyente.',
    }
  }

  // No signals: safe, but honest
  return {
    verdict: 'safe',
    reason: 'No se encontraron señales de alerta en las verificaciones realizadas.',
    confidence: 'Esta herramienta no puede garantizar que un sitio sea seguro — solo que no encontró señales conocidas de riesgo. Si el sitio te pide datos personales o pagos, verifica siempre por otros medios.',
  }
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

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405, headers: corsHeaders })
    }

    let rawInput: string
    try {
      const body = await request.json() as { url?: string }
      rawInput = (body.url || '').trim()
      if (!rawInput) throw new Error('empty')
    } catch {
      return Response.json({ error: 'Envía una URL válida' }, { status: 400, headers: corsHeaders })
    }

    // Validate input
    if (!isValidUrl(rawInput)) {
      return Response.json({ error: 'Eso no parece una dirección web válida. Debe tener formato como: ejemplo.com o https://ejemplo.com' }, { status: 400, headers: corsHeaders })
    }

    const url = rawInput.startsWith('http') ? rawInput : `https://${rawInput}`
    const domain = extractDomain(url)
    const registrableDomain = extractRegistrableDomain(domain)

    // Step 1: DNS
    const dns = await checkDns(domain)

    let http: HttpResult | null = null
    let ssl: SslResult | null = null
    let redirects: RedirectResult = { redirected: false, chain: [], finalDomain: null }
    let age: AgeResult | null = null
    let registrant: string | null = null
    let safeBrowsing: SafeBrowsingResult = { safe: true, threats: [] }

    if (dns.resolves) {
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
      const [rdap, sbResult] = await Promise.all([
        lookupRDAP(registrableDomain),
        checkSafeBrowsing(url, env.SAFE_BROWSING_API_KEY),
      ])
      age = computeAge(rdap.createdDate, rdap.expiresDate)
      registrant = rdap.registrant
      safeBrowsing = sbResult
    }

    const typosquatting = checkTyposquatting(registrableDomain)
    const brandInSubdomain = checkBrandInSubdomain(domain, registrableDomain)
    const suspiciousKeywords = checkSuspiciousKeywords(domain, registrableDomain)

    const partialResult = { url, domain, registrableDomain, dns, http, ssl, age, safeBrowsing, typosquatting, brandInSubdomain, suspiciousKeywords, registrant, redirects }
    const { verdict, reason, confidence } = computeVerdict(partialResult)

    const result: CheckResult = { ...partialResult, verdict, verdictReason: reason, confidence }

    return Response.json(result, { headers: corsHeaders })
  },
}
