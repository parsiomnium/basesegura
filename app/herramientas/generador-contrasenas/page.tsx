'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

interface Options {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function generatePassword(options: Options): string {
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

function calculateEntropy(options: Options): number {
  let poolSize = 0
  if (options.uppercase) poolSize += 26
  if (options.lowercase) poolSize += 26
  if (options.numbers) poolSize += 10
  if (options.symbols) poolSize += CHARSETS.symbols.length

  if (poolSize === 0) poolSize = 36
  return Math.floor(options.length * Math.log2(poolSize))
}

function getStrengthLabel(entropy: number): { label: string; color: string; description: string } {
  if (entropy < 28)
    return {
      label: 'Muy débil',
      color: 'bg-red-500',
      description: 'Se puede adivinar en segundos.',
    }
  if (entropy < 36)
    return {
      label: 'Débil',
      color: 'bg-red-400',
      description: 'Vulnerable a ataques comunes.',
    }
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
  const [options, setOptions] = useState<Options>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState(() =>
    generatePassword({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    }),
  )
  const [copied, setCopied] = useState(false)

  const entropy = calculateEntropy(options)
  const strength = getStrengthLabel(entropy)

  const handleGenerate = useCallback(() => {
    setPassword(generatePassword(options))
    setCopied(false)
  }, [options])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
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

  const handleOptionChange = (key: keyof Options, value: boolean | number) => {
    const newOptions = { ...options, [key]: value }
    setOptions(newOptions)
    setPassword(generatePassword(newOptions))
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
          Genera contraseñas seguras y aleatorias directamente en tu navegador. Nada se envía a
          ningún servidor.
        </p>
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
            title="Copiar al portapapeles"
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
          <span className="text-[var(--text-secondary)]">{entropy} bits de entropía</span>
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

        {/* Length slider */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Largo</span>
            <span className="font-mono">{options.length} caracteres</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={options.length}
            onChange={e => handleOptionChange('length', parseInt(e.target.value))}
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
              checked={options.uppercase}
              onChange={e => handleOptionChange('uppercase', e.target.checked)}
              className="rounded"
            />
            Mayúsculas (A-Z)
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={e => handleOptionChange('lowercase', e.target.checked)}
              className="rounded"
            />
            Minúsculas (a-z)
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={e => handleOptionChange('numbers', e.target.checked)}
              className="rounded"
            />
            Números (0-9)
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={e => handleOptionChange('symbols', e.target.checked)}
              className="rounded"
            />
            Símbolos (!@#$...)
          </label>
        </div>
      </div>

      {/* Context */}
      <div className="mt-8 text-sm text-[var(--text-secondary)] p-4 rounded-md border border-[var(--border)]">
        <p className="mb-2">
          Esta contraseña se genera en tu navegador usando{' '}
          <code className="bg-[var(--bg-secondary)] px-1 rounded text-xs">
            crypto.getRandomValues()
          </code>
          , el generador criptográfico del sistema operativo. No se envía ni se almacena en ningún
          lugar.
        </p>
        <p>
          Aprende por qué importa una buena contraseña en{' '}
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
