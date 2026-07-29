'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

// --- Word list (Spanish, common nouns, 4-8 chars, no ambiguity) ---
const WORDS = [
  'gato',
  'mesa',
  'luna',
  'pato',
  'roca',
  'taza',
  'vela',
  'nube',
  'pino',
  'lago',
  'silla',
  'pluma',
  'tigre',
  'barco',
  'fuego',
  'cobre',
  'hielo',
  'mango',
  'perla',
  'arena',
  'globo',
  'mosca',
  'piano',
  'reloj',
  'nieve',
  'cuerda',
  'piedra',
  'puente',
  'granja',
  'bosque',
  'cactus',
  'espejo',
  'grifo',
  'huevo',
  'jarra',
  'llave',
  'marco',
  'noche',
  'omega',
  'pulpo',
  'queso',
  'radio',
  'sable',
  'torre',
  'uva',
  'viola',
  'yerba',
  'zurdo',
  'abeja',
  'bruma',
  'cerro',
  'disco',
  'elfo',
  'fresa',
  'grano',
  'hierro',
  'indio',
  'jugo',
  'kiwi',
  'lince',
  'menta',
  'nariz',
  'olivo',
  'panda',
  'rango',
  'salto',
  'techo',
  'viento',
  'ancla',
  'bolsa',
  'cisne',
  'dardo',
  'erizo',
  'fondo',
  'gorra',
  'hojas',
  'isla',
  'jaula',
  'koala',
  'limon',
  'muro',
  'norma',
  'onda',
  'pasta',
  'rama',
  'seda',
  'tumba',
  'vuelo',
  'altar',
  'buho',
  'coral',
  'dado',
  'escudo',
  'faro',
  'globo',
  'hongo',
  'impar',
  'joroba',
  'labio',
  'monje',
  'nudo',
  'oveja',
  'polvo',
  'reno',
  'sauce',
  'trigo',
  'valla',
  'aleta',
  'brote',
  'chivo',
  'duende',
  'espina',
  'flecha',
  'gusano',
  'harina',
  'jacinto',
  'lagarto',
  'madera',
  'navaja',
  'plata',
  'rastro',
  'sombra',
  'trueno',
  'vaina',
  'zapato',
  'bloque',
  'cresta',
  'dragon',
  'escama',
  'fibra',
  'garza',
  'huerto',
  'jungla',
  'linea',
  'mantel',
  'niebla',
  'ostra',
  'pizarra',
  'roble',
  'sirena',
  'tanque',
  'vinagre',
  'almendra',
  'campana',
  'estante',
]

type Mode = 'characters' | 'passphrase'

interface CharOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

interface PhraseOptions {
  wordCount: number
  separator: string
  capitalize: boolean
  includeNumber: boolean
}

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function generateCharPassword(options: CharOptions): string {
  let charset = ''
  if (options.uppercase) charset += CHARSETS.uppercase
  if (options.lowercase) charset += CHARSETS.lowercase
  if (options.numbers) charset += CHARSETS.numbers
  if (options.symbols) charset += CHARSETS.symbols
  if (!charset) charset = CHARSETS.lowercase + CHARSETS.numbers

  const array = new Uint32Array(options.length)
  crypto.getRandomValues(array)

  let password = ''
  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length]
  }
  return password
}

function generatePassphrase(options: PhraseOptions): string {
  const array = new Uint32Array(options.wordCount)
  crypto.getRandomValues(array)

  let words = Array.from(array).map(n => {
    const word = WORDS[n % WORDS.length]
    return options.capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word
  })

  if (options.includeNumber) {
    const numArray = new Uint32Array(1)
    crypto.getRandomValues(numArray)
    const num = numArray[0] % 100
    const posArray = new Uint32Array(1)
    crypto.getRandomValues(posArray)
    const pos = posArray[0] % words.length
    words[pos] = words[pos] + num
  }

  return words.join(options.separator)
}

function calculateCharEntropy(options: CharOptions): number {
  let poolSize = 0
  if (options.uppercase) poolSize += 26
  if (options.lowercase) poolSize += 26
  if (options.numbers) poolSize += 10
  if (options.symbols) poolSize += CHARSETS.symbols.length
  if (poolSize === 0) poolSize = 36
  return Math.floor(options.length * Math.log2(poolSize))
}

function calculatePhraseEntropy(options: PhraseOptions): number {
  // ~7.2 bits per word (150 words in list)
  let bits = options.wordCount * Math.log2(WORDS.length)
  if (options.includeNumber) bits += Math.log2(100) // 2-digit number
  if (options.capitalize) bits += options.wordCount // 1 bit per word for case
  return Math.floor(bits)
}

function getStrengthLabel(entropy: number): { label: string; color: string; description: string } {
  if (entropy < 28)
    return {
      label: 'Muy débil',
      color: 'bg-red-500',
      description: 'Se puede adivinar en segundos.',
    }
  if (entropy < 36)
    return { label: 'Débil', color: 'bg-red-400', description: 'Vulnerable a ataques comunes.' }
  if (entropy < 60)
    return {
      label: 'Aceptable',
      color: 'bg-yellow-500',
      description: 'Resistente a ataques básicos, pero mejorable.',
    }
  if (entropy < 80)
    return {
      label: 'Fuerte',
      color: 'bg-green-500',
      description: 'Resistente a la mayoría de ataques.',
    }
  return {
    label: 'Muy fuerte',
    color: 'bg-green-600',
    description: 'Prácticamente imposible de adivinar por fuerza bruta.',
  }
}

export default function GeneradorContrasenasPage() {
  const [mode, setMode] = useState<Mode>('characters')

  const [charOptions, setCharOptions] = useState<CharOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const [phraseOptions, setPhraseOptions] = useState<PhraseOptions>({
    wordCount: 4,
    separator: '-',
    capitalize: true,
    includeNumber: false,
  })

  const [password, setPassword] = useState(() =>
    generateCharPassword({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    }),
  )
  const [copied, setCopied] = useState(false)

  const entropy =
    mode === 'characters'
      ? calculateCharEntropy(charOptions)
      : calculatePhraseEntropy(phraseOptions)
  const strength = getStrengthLabel(entropy)

  const handleGenerate = useCallback(() => {
    const newPassword =
      mode === 'characters' ? generateCharPassword(charOptions) : generatePassphrase(phraseOptions)
    setPassword(newPassword)
    setCopied(false)
  }, [mode, charOptions, phraseOptions])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = password
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [password])

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    if (newMode === 'characters') {
      setPassword(generateCharPassword(charOptions))
    } else {
      setPassword(generatePassphrase(phraseOptions))
    }
    setCopied(false)
  }

  const handleCharOptionChange = (key: keyof CharOptions, value: boolean | number) => {
    const newOptions = { ...charOptions, [key]: value }
    setCharOptions(newOptions)
    setPassword(generateCharPassword(newOptions))
    setCopied(false)
  }

  const handlePhraseOptionChange = (key: keyof PhraseOptions, value: string | number | boolean) => {
    const newOptions = { ...phraseOptions, [key]: value }
    setPhraseOptions(newOptions)
    setPassword(generatePassphrase(newOptions))
    setCopied(false)
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
        <h1 className="text-2xl font-bold mb-2">Generador de contraseñas</h1>
        <p className="text-[var(--text-secondary)]">
          Genera contraseñas seguras directamente en tu navegador. Nada se envía a ningún servidor.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-md border border-[var(--border)] overflow-hidden mb-6">
        <button
          onClick={() => handleModeChange('characters')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            mode === 'characters'
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text)]'
          }`}
        >
          Caracteres aleatorios
        </button>
        <button
          onClick={() => handleModeChange('passphrase')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            mode === 'passphrase'
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text)]'
          }`}
        >
          Frase de palabras
        </button>
      </div>

      {/* When to use */}
      <div className="text-sm text-[var(--text-secondary)] mb-6 p-3 rounded-md bg-[var(--bg-secondary)]">
        {mode === 'characters' ? (
          <p>Para contraseñas que guarda tu gestor por ti. No necesitas memorizarlas.</p>
        ) : (
          <p>
            Para las pocas contraseñas que necesitas recordar de memoria — la del gestor, la del
            disco, o tu correo principal.
          </p>
        )}
      </div>

      {/* Password display */}
      <div className="border border-[var(--border)] rounded-md p-4 mb-4">
        <div className="flex items-center gap-3">
          <p className="flex-1 font-mono text-lg break-all select-all leading-relaxed">
            {password}
          </p>
          <button
            onClick={handleCopy}
            className="px-3 py-2 rounded-md border border-[var(--border)] text-sm hover:bg-[var(--bg-secondary)] transition-colors whitespace-nowrap"
          >
            {copied ? '✓ Copiada' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-md bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity mb-6"
      >
        Generar nueva
      </button>

      {/* Strength indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>
            Fortaleza: <span className="font-medium">{strength.label}</span>
          </span>
          <span className="text-[var(--text-secondary)]">{entropy} bits</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className={`h-full ${strength.color} transition-all duration-300`}
            style={{ width: `${Math.min((entropy / 128) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-[var(--text-secondary)] mt-2">{strength.description}</p>
      </div>

      {/* Options */}
      <div className="border border-[var(--border)] rounded-md p-4 space-y-4">
        <h2 className="font-medium text-sm">Opciones</h2>

        {mode === 'characters' ? (
          <>
            {/* Length slider */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Largo</span>
                <span className="font-mono">{charOptions.length} caracteres</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={charOptions.length}
                onChange={e => handleCharOptionChange('length', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character toggles */}
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={charOptions.uppercase}
                  onChange={e => handleCharOptionChange('uppercase', e.target.checked)}
                  className="rounded"
                />
                Mayúsculas (A-Z)
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={charOptions.lowercase}
                  onChange={e => handleCharOptionChange('lowercase', e.target.checked)}
                  className="rounded"
                />
                Minúsculas (a-z)
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={charOptions.numbers}
                  onChange={e => handleCharOptionChange('numbers', e.target.checked)}
                  className="rounded"
                />
                Números (0-9)
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={charOptions.symbols}
                  onChange={e => handleCharOptionChange('symbols', e.target.checked)}
                  className="rounded"
                />
                Símbolos (!@#$...)
              </label>
            </div>
          </>
        ) : (
          <>
            {/* Word count */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cantidad de palabras</span>
                <span className="font-mono">{phraseOptions.wordCount}</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                value={phraseOptions.wordCount}
                onChange={e => handlePhraseOptionChange('wordCount', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>3</span>
                <span>8</span>
              </div>
            </div>

            {/* Separator */}
            <div>
              <p className="text-sm mb-2">Separador</p>
              <div className="flex gap-2">
                {['-', '.', '_', ' '].map(sep => (
                  <button
                    key={sep}
                    onClick={() => handlePhraseOptionChange('separator', sep)}
                    className={`px-3 py-1.5 rounded-md border text-sm font-mono ${
                      phraseOptions.separator === sep
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--bg)]'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)]'
                    }`}
                  >
                    {sep === ' ' ? 'espacio' : sep}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={phraseOptions.capitalize}
                  onChange={e => handlePhraseOptionChange('capitalize', e.target.checked)}
                  className="rounded"
                />
                Primera letra en mayúscula
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={phraseOptions.includeNumber}
                  onChange={e => handlePhraseOptionChange('includeNumber', e.target.checked)}
                  className="rounded"
                />
                Incluir un número
              </label>
            </div>
          </>
        )}
      </div>

      {/* Context */}
      <div className="mt-8 text-sm text-[var(--text-secondary)] p-4 rounded-md border border-[var(--border)]">
        <p className="mb-2">
          Todo se genera en tu navegador usando{' '}
          <code className="bg-[var(--bg-secondary)] px-1 rounded text-xs">
            crypto.getRandomValues()
          </code>
          , el generador criptográfico del sistema operativo. No se envía ni se almacena en ningún
          lugar.
        </p>
        <p>
          Aprende cuándo usar cada tipo en{' '}
          <Link
            href="/prevenir/contrasenas-seguras"
            className="text-[var(--accent)] hover:underline"
          >
            Cómo crear contraseñas seguras
          </Link>{' '}
          y cómo gestionarlas en{' '}
          <Link
            href="/prevenir/gestores-de-contrasenas"
            className="text-[var(--accent)] hover:underline"
          >
            Gestores de contraseñas
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
