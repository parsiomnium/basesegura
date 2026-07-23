'use client'

import { useState } from 'react'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_CHECKER_API_URL || 'http://localhost:8787'

interface AgeResult {
  createdDate: string | null
  expiresDate: string | null
  ageMonths: number | null
  ageLabel: string
}

interface CheckResult {
  url: string
  domain: string
  registrableDomain: string
  dns: { resolves: boolean; ip: string | null }
  http: { statusCode: number; serverHeader: string | null; hasHSTS: boolean; hasCSP: boolean } | null
  ssl: { valid: boolean; matchesDomain: boolean } | null
  age: AgeResult | null
  safeBrowsing: { safe: boolean; threats: string[] }
  typosquatting: { similar: boolean; matchedDomain: string | null }
  brandInSubdomain: { detected: boolean; brand: string | null; realDomain: string | null }
  suspiciousKeywords: { detected: boolean; keywords: string[] }
  registrant: string | null
  redirects: { redirected: boolean; chain: string[]; finalDomain: string | null }
  verdict: 'safe' | 'caution' | 'danger'
  verdictReason: string
  confidence: string
}

const verdictConfig = {
  safe: {
    emoji: '🟢',
    label: 'Este sitio parece confiable',
    color: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200',
  },
  caution: {
    emoji: '🟡',
    label: 'Hay algunas señales que deberías revisar',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-200',
  },
  danger: {
    emoji: '🔴',
    label: 'Este sitio tiene señales de alerta importantes',
    color: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200',
  },
}

function Card({ status, title, detail }: { status: 'green' | 'yellow' | 'red' | 'gray'; title: string; detail: string }) {
  const colors = {
    green: 'border-l-green-500',
    yellow: 'border-l-yellow-500',
    red: 'border-l-red-500',
    gray: 'border-l-gray-400',
  }

  return (
    <div className={`border-l-4 ${colors[status]} p-4 rounded-r-md bg-[var(--bg-secondary)]`}>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{detail}</p>
    </div>
  )
}

function httpStatusLabel(code: number): string {
  if (code >= 200 && code < 300) return 'El sitio responde correctamente'
  if (code === 301 || code === 302) return 'El sitio redirige a otra dirección'
  if (code === 403) return 'El sitio bloquea el acceso (puede ser protección contra bots)'
  if (code === 404) return 'La página específica no existe en este sitio'
  if (code === 429) return 'El sitio existe pero limitó la consulta (protección contra tráfico excesivo)'
  if (code === 500) return 'El sitio tiene un error interno'
  if (code === 503) return 'El sitio está temporalmente fuera de servicio'
  if (code >= 400 && code < 500) return `El sitio respondió con un error (código ${code})`
  if (code >= 500) return `El sitio tiene problemas internos (código ${code})`
  return `Responde con código ${code}`
}

export default function VerificarSitioPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al verificar el sitio')
        return
      }

      const data: CheckResult = await res.json()
      setResult(data)
    } catch {
      setError('No se pudo conectar con el verificador. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-2 inline-block"
        >
          ← Inicio
        </Link>
        <h1 className="text-2xl font-bold mb-2">Verificador de sitios</h1>
        <p className="text-[var(--text-secondary)]">
          Pega la dirección de un sitio web y te digo qué tan confiable parece — en español, sin tecnicismos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="flex-1 px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 rounded-md bg-[var(--accent)] text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mt-2">
          No guardo las direcciones que verificas.
        </p>
      </form>

      {error && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200 mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Verdict */}
          <div className={`p-5 rounded-md border ${verdictConfig[result.verdict].color}`}>
            <p className="text-lg font-medium">
              {verdictConfig[result.verdict].emoji} {verdictConfig[result.verdict].label}
            </p>
            <p className="text-sm mt-2">{result.verdictReason}</p>
            <p className="text-xs mt-2 opacity-70">{result.confidence}</p>
            <p className="text-xs mt-1 opacity-60">Dominio analizado: {result.registrableDomain}{result.domain !== result.registrableDomain ? ` (subdominio: ${result.domain})` : ''}</p>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {/* DNS */}
            <Card
              status={result.dns.resolves ? 'green' : 'red'}
              title="Resolución DNS"
              detail={
                result.dns.resolves
                  ? `El dominio existe y apunta a ${result.dns.ip || 'una dirección válida'}`
                  : 'Este dominio no resuelve — no existe ningún sitio en esta dirección'
              }
            />

            {/* HTTP */}
            {result.http && (
              <Card
                status={result.http.statusCode >= 200 && result.http.statusCode < 400 ? 'green' : result.http.statusCode === 429 || result.http.statusCode === 403 ? 'green' : 'yellow'}
                title="Respuesta del servidor"
                detail={httpStatusLabel(result.http.statusCode)}
              />
            )}

            {/* Security headers — only show if present */}
            {result.http && (result.http.hasHSTS || result.http.hasCSP) && (
              <Card
                status="green"
                title="Protecciones adicionales del sitio"
                detail={[
                  result.http.hasHSTS ? 'Fuerza conexión segura siempre (impide que te conectes sin cifrar, incluso por error)' : '',
                  result.http.hasCSP ? 'Tiene políticas que limitan qué contenido puede cargarse en la página (dificulta ataques)' : '',
                ].filter(Boolean).join(' · ')}
              />
            )}

            {/* SSL */}
            {result.ssl && (
              <Card
                status={result.ssl.valid ? 'green' : 'yellow'}
                title="Conexión cifrada (HTTPS)"
                detail={
                  result.ssl.valid
                    ? 'Tiene certificado SSL válido — la conexión está cifrada (recuerda: esto no garantiza que sea confiable, solo que es cifrada)'
                    : 'No usa HTTPS o el certificado no es válido. Cualquier dato que envíes puede ser interceptado.'
                }
              />
            )}

            {/* Typosquatting */}
            {result.typosquatting.similar && (
              <Card
                status="yellow"
                title="Nombre similar a un sitio conocido"
                detail={`Este dominio se parece mucho a ${result.typosquatting.matchedDomain} — verifica que sea el correcto.`}
              />
            )}
            {!result.typosquatting.similar && !result.brandInSubdomain.detected && (
              <Card
                status="green"
                title="Nombre del dominio"
                detail="No se parece a ningún sitio conocido que pudiera estar siendo imitado."
              />
            )}

            {/* Brand in subdomain */}
            {result.brandInSubdomain.detected && (
              <Card
                status="red"
                title="Marca en el dominio que no le pertenece"
                detail={`Este sitio usa la marca "${result.brandInSubdomain.brand}" pero el dominio real es ${result.registrableDomain}, que NO pertenece a ${result.brandInSubdomain.realDomain}. Es probable que sea una imitación.`}
              />
            )}

            {/* Suspicious keywords */}
            {result.suspiciousKeywords.detected && (
              <Card
                status="yellow"
                title="Palabras sospechosas en el dominio"
                detail={`El dominio contiene palabras frecuentemente usadas en sitios falsos: ${result.suspiciousKeywords.keywords.join(', ')}. Esto no es prueba de estafa, pero amerita precaución.`}
              />
            )}

            {/* Age */}
            {result.age && result.age.ageMonths !== null && (
              <Card
                status={
                  result.age.ageMonths < 1 ? 'red' :
                  result.age.ageMonths < 3 ? 'yellow' : 'green'
                }
                title="Antigüedad del dominio"
                detail={result.age.ageLabel + (result.age.expiresDate ? ` · Pagado hasta: ${result.age.expiresDate}` : '')}
              />
            )}
            {result.age && result.age.ageMonths === null && result.dns.resolves && (
              <Card
                status="gray"
                title="Antigüedad del dominio"
                detail="No se pudo obtener la fecha de registro. Algunos dominios grandes no publican esta información."
              />
            )}

            {/* Safe Browsing */}
            <Card
              status={result.safeBrowsing.safe ? 'green' : 'red'}
              title="Reputación (Google Safe Browsing)"
              detail={
                result.safeBrowsing.safe
                  ? 'Google no detecta amenazas en este sitio'
                  : `Google lo marca como peligroso: ${result.safeBrowsing.threats.join(', ')}`
              }
            />

            {/* Registrant */}
            <Card
              status={result.registrant ? 'green' : 'gray'}
              title="Dueño del dominio"
              detail={
                result.registrant
                  ? `Registrado por: ${result.registrant}`
                  : 'El dueño del dominio no es público (usa servicio de privacidad o no está disponible)'
              }
            />

            {/* Redirects */}
            {result.redirects.redirected && result.redirects.finalDomain && (
              <Card
                status="yellow"
                title="Redirección detectada"
                detail={`Este sitio te redirige a otro dominio: ${result.redirects.finalDomain}${result.redirects.chain.length > 1 ? ` (${result.redirects.chain.length} saltos)` : ''}`}
              />
            )}
            {!result.redirects.redirected && result.dns.resolves && result.http && (
              <Card
                status="green"
                title="Sin redirecciones"
                detail="El sitio te lleva directo a donde dice, sin desvíos."
              />
            )}
          </div>

          {/* Context note */}
          <div className="p-4 rounded-md bg-[var(--bg-secondary)] text-sm">
            <p className="font-medium mb-1">¿Este sitio te pide contraseñas, datos personales o pagos?</p>
            <p className="text-[var(--text-secondary)]">
              Si es así, verifica con especial cuidado — cualquier señal amarilla o roja es motivo para no ingresar datos.
              Si solo estás leyendo información, el riesgo es menor.
            </p>
          </div>

          {/* Further actions */}
          <div className="text-sm text-[var(--text-secondary)]">
            <p className="mb-2">¿Necesitas verificar más a fondo?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><Link href="/guias/virustotal/como-usarla" className="text-[var(--accent)] hover:underline">Cómo usar VirusTotal</Link></li>
              <li><Link href="/guias/scamadviser/como-usarla" className="text-[var(--accent)] hover:underline">Cómo usar ScamAdviser</Link></li>
              <li><Link href="/guias/whois/como-usarla" className="text-[var(--accent)] hover:underline">Cómo usar WHOIS</Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
