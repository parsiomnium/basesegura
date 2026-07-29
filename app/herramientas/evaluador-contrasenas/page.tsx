'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

interface Analysis {
  entropy: number
  strength: { label: string; color: string; barColor: string }
  length: number
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumbers: boolean
  hasSymbols: boolean
  patterns: string[]
  hibpCount: number | null
  hibpChecked: boolean
}

const COMMON_PATTERNS = [
  { regex: /^(.)\1+$/, label: 'Solo un carácter repetido' },
  { regex: /^(012|123|234|345|456|567|678|789|890)/, label: 'Secuencia numérica' },
  {
    regex:
      /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i,
    label: 'Secuencia alfabética',
  },
  { regex: /^(qwerty|asdf|zxcv)/i, label: 'Patrón de teclado' },
  {
    regex: /^(password|contrasena|contraseña|clave|admin|123456|qwerty)/i,
    label: 'Contraseña extremadamente común',
  },
  { regex: /^[0-9]{1,8}$/, label: 'Solo números cortos (fácil de adivinar)' },
  { regex: /(19|20)\d{2}/, label: 'Contiene un año (dato predecible)' },
]

function analyzePassword(password: string): Omit<Analysis, 'hibpCount' | 'hibpChecked'> {
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^A-Za-z0-9]/.test(password)

  let poolSize = 0
  if (hasUppercase) poolSize += 26
  if (hasLowercase) poolSize += 26
  if (hasNumbers) poolSize += 10
  if (hasSymbols) poolSize += 32

  if (poolSize === 0) poolSize = 26
  const entropy = Math.floor(password.length * Math.log2(poolSize))

  const patterns: string[] = []
  for (const p of COMMON_PATTERNS) {
    if (p.regex.test(password)) {
      patterns.push(p.label)
    }
  }

  if (password.length < 8) {
    patterns.push('Menos de 8 caracteres (demasiado corta)')
  }

  let strength: { label: string; color: string; barColor: string }
  if (patterns.length > 0 && entropy < 40) {
    strength = {
      label: 'Muy débil',
      color: 'text-red-600 dark:text-red-400',
      barColor: 'bg-red-500',
    }
  } else if (entropy < 28) {
    strength = {
      label: 'Muy débil',
      color: 'text-red-600 dark:text-red-400',
      barColor: 'bg-red-500',
    }
  } else if (entropy < 36) {
    strength = { label: 'Débil', color: 'text-red-500 dark:text-red-400', barColor: 'bg-red-400' }
  } else if (entropy < 60) {
    strength = {
      label: 'Aceptable',
      color: 'text-yellow-600 dark:text-yellow-400',
      barColor: 'bg-yellow-500',
    }
  } else if (entropy < 80) {
    strength = {
      label: 'Fuerte',
      color: 'text-green-600 dark:text-green-400',
      barColor: 'bg-green-500',
    }
  } else {
    strength = {
      label: 'Muy fuerte',
      color: 'text-green-700 dark:text-green-300',
      barColor: 'bg-green-600',
    }
  }

  return {
    entropy,
    strength,
    length: password.length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    patterns,
  }
}

async function checkHIBP(password: string): Promise<number> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()

  const prefix = hashHex.slice(0, 5)
  const suffix = hashHex.slice(5)

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
  const text = await response.text()

  const lines = text.split('\n')
  for (const line of lines) {
    const [hash, count] = line.split(':')
    if (hash.trim() === suffix) {
      return parseInt(count.trim(), 10)
    }
  }

  return 0
}

function CheckIcon() {
  return <span className="text-green-600 dark:text-green-400">✓</span>
}

function CrossIcon() {
  return <span className="text-[var(--text-secondary)]">✗</span>
}

export default function EvaluadorContrasenasPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [checkingHIBP, setCheckingHIBP] = useState(false)

  const handleAnalyze = useCallback(async (value: string) => {
    setPassword(value)

    if (!value) {
      setAnalysis(null)
      return
    }

    const result = analyzePassword(value)
    setAnalysis({ ...result, hibpCount: null, hibpChecked: false })

    // Check HIBP in background
    setCheckingHIBP(true)
    try {
      const count = await checkHIBP(value)
      setAnalysis(prev => (prev ? { ...prev, hibpCount: count, hibpChecked: true } : null))
    } catch {
      setAnalysis(prev => (prev ? { ...prev, hibpCount: null, hibpChecked: true } : null))
    } finally {
      setCheckingHIBP(false)
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-2 inline-block"
        >
          ← Inicio
        </Link>
        <h1 className="text-2xl font-bold mb-2">Evaluador de contraseñas</h1>
        <p className="text-[var(--text-secondary)]">
          Escribe una contraseña y te digo qué tan fuerte es, si tiene patrones predecibles, y si
          apareció en filtraciones de datos conocidas.
        </p>
      </div>

      {/* Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => handleAnalyze(e.target.value)}
            placeholder="Escribe una contraseña para evaluar"
            className="w-full px-4 py-3 pr-24 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] font-mono"
            autoComplete="off"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mt-2">
          Tu contraseña no se envía a ningún servidor. La verificación contra filtraciones usa
          k-anonymity (solo se envían los primeros 5 caracteres del hash SHA-1).
        </p>
      </div>

      {/* Analysis */}
      {analysis && (
        <div className="space-y-4">
          {/* Strength */}
          <div className="border border-[var(--border)] rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-lg font-medium ${analysis.strength.color}`}>
                {analysis.strength.label}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {analysis.entropy} bits de entropía
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
              <div
                className={`h-full ${analysis.strength.barColor} transition-all duration-300`}
                style={{ width: `${Math.min((analysis.entropy / 128) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Composition */}
          <div className="border border-[var(--border)] rounded-md p-4">
            <h3 className="text-sm font-medium mb-3">Composición</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                {analysis.hasUppercase ? <CheckIcon /> : <CrossIcon />}
                <span>Mayúsculas</span>
              </div>
              <div className="flex items-center gap-2">
                {analysis.hasLowercase ? <CheckIcon /> : <CrossIcon />}
                <span>Minúsculas</span>
              </div>
              <div className="flex items-center gap-2">
                {analysis.hasNumbers ? <CheckIcon /> : <CrossIcon />}
                <span>Números</span>
              </div>
              <div className="flex items-center gap-2">
                {analysis.hasSymbols ? <CheckIcon /> : <CrossIcon />}
                <span>Símbolos</span>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-3">
              Largo: {analysis.length} caracteres
              {analysis.length < 12 && ' (recomendado: mínimo 12)'}
            </p>
          </div>

          {/* Patterns */}
          {analysis.patterns.length > 0 && (
            <div className="border-l-4 border-l-yellow-500 p-4 rounded-r-md bg-[var(--bg-secondary)]">
              <h3 className="text-sm font-medium mb-2">Patrones detectados</h3>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.patterns.map((p, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HIBP */}
          <div
            className={`border-l-4 p-4 rounded-r-md bg-[var(--bg-secondary)] ${
              checkingHIBP
                ? 'border-l-gray-400'
                : analysis.hibpChecked && analysis.hibpCount !== null && analysis.hibpCount > 0
                  ? 'border-l-red-500'
                  : analysis.hibpChecked && analysis.hibpCount === 0
                    ? 'border-l-green-500'
                    : 'border-l-gray-400'
            }`}
          >
            <h3 className="text-sm font-medium mb-1">Filtraciones conocidas</h3>
            {checkingHIBP ? (
              <p className="text-sm text-[var(--text-secondary)]">
                Verificando contra Have I Been Pwned...
              </p>
            ) : analysis.hibpChecked ? (
              analysis.hibpCount !== null ? (
                analysis.hibpCount > 0 ? (
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Esta contraseña apareció en{' '}
                    <strong>{analysis.hibpCount.toLocaleString()}</strong> filtraciones de datos. No
                    la uses.
                  </p>
                ) : (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    No aparece en ninguna filtración conocida. Eso no garantiza que sea segura, pero
                    es buena señal.
                  </p>
                )
              ) : (
                <p className="text-sm text-[var(--text-secondary)]">
                  No se pudo verificar (error de conexión).
                </p>
              )
            ) : null}
          </div>
        </div>
      )}

      {/* Context */}
      <div className="mt-8 text-sm text-[var(--text-secondary)] p-4 rounded-md border border-[var(--border)]">
        <p className="mb-2 font-medium text-[var(--text)]">¿Cómo funciona la verificación?</p>
        <p className="mb-2">
          Usamos la API de{' '}
          <a
            href="https://haveibeenpwned.com/Passwords"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Have I Been Pwned
          </a>{' '}
          con k-anonymity: tu contraseña se convierte en un hash SHA-1 y solo se envían los primeros
          5 caracteres del hash. El servidor devuelve todas las coincidencias con ese prefijo y la
          verificación final se hace en tu navegador.
        </p>
        <p>
          Aprende más en{' '}
          <Link
            href="/prevenir/contrasenas-seguras"
            className="text-[var(--accent)] hover:underline"
          >
            Cómo crear contraseñas seguras
          </Link>{' '}
          y genera una nueva con nuestro{' '}
          <Link
            href="/herramientas/generador-contrasenas"
            className="text-[var(--accent)] hover:underline"
          >
            generador de contraseñas
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
