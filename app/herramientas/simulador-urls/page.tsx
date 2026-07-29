'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { urls, UrlChallenge } from './data'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface Answer {
  challenge: UrlChallenge
  userSaidLegitimate: boolean
  correct: boolean
}

export default function SimuladorUrlsPage() {
  const shuffledUrls = useMemo(() => shuffleArray(urls), [])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<Answer | null>(null)

  const challenge = shuffledUrls[current]
  const isFinished = current >= shuffledUrls.length && !showFeedback
  const score = answers.filter(a => a.correct).length

  function handleAnswer(userSaidLegitimate: boolean) {
    const correct = userSaidLegitimate === challenge.isLegitimate
    const answer: Answer = { challenge, userSaidLegitimate, correct }
    setLastAnswer(answer)
    setAnswers(prev => [...prev, answer])
    setShowFeedback(true)
  }

  function handleNext() {
    setShowFeedback(false)
    setLastAnswer(null)
    setCurrent(prev => prev + 1)
  }

  function handleRestart() {
    setCurrent(0)
    setAnswers([])
    setShowFeedback(false)
    setLastAnswer(null)
  }

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-2 inline-block"
          >
            ← Inicio
          </Link>
          <h1 className="text-2xl font-bold mb-2">Resultado del simulador</h1>
        </div>

        {/* Score */}
        <div className="p-6 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] mb-6 text-center">
          <p className="text-4xl font-bold mb-2">
            {score}/{shuffledUrls.length}
          </p>
          <p className="text-[var(--text-secondary)]">
            {score === shuffledUrls.length
              ? 'Perfecto — identificaste todas las URLs correctamente.'
              : score >= shuffledUrls.length * 0.7
                ? 'Buen resultado. Revisa los errores para afinar tu ojo.'
                : 'Hay margen para mejorar. Revisa la explicación de cada URL.'}
          </p>
        </div>

        {/* Review */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Resumen por URL</h2>
          {answers.map((a, i) => (
            <div
              key={a.challenge.id}
              className={`p-4 rounded-md border-l-4 ${
                a.correct ? 'border-l-green-500' : 'border-l-red-500'
              } bg-[var(--bg-secondary)]`}
            >
              <div className="flex justify-between items-start gap-2 mb-1">
                <p className="font-mono text-sm break-all">{a.challenge.url}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${
                    a.correct
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {a.correct ? 'Correcto' : 'Incorrecto'}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                Era: {a.challenge.isLegitimate ? 'Legítima' : 'Falsa'} — Tú dijiste:{' '}
                {a.userSaidLegitimate ? 'Legítima' : 'Falsa'}
              </p>
              {!a.correct && (
                <p className="text-sm text-[var(--text-secondary)]">{a.challenge.explanation}</p>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded-md bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/aprender/que-es-una-url"
            className="px-4 py-2 rounded-md border border-[var(--border)] text-sm hover:text-[var(--accent)] transition-colors flex items-center"
          >
            Leer: Qué es una URL
          </Link>
        </div>
      </div>
    )
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
        <h1 className="text-2xl font-bold mb-2">Simulador de URLs</h1>
        <p className="text-[var(--text-secondary)]">
          Te muestro direcciones web — tú decides cuáles son legítimas y cuáles son falsas.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--text-secondary)] mb-2">
          <span>
            URL {current + 1} de {shuffledUrls.length}
          </span>
          <span>{answers.filter(a => a.correct).length} correctas</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{
              width: `${((current + (showFeedback ? 1 : 0)) / shuffledUrls.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* URL card */}
      <div className="border border-[var(--border)] rounded-md p-6 mb-6 text-center">
        <p className="text-xs text-[var(--text-secondary)] mb-3">¿Esta URL es legítima o falsa?</p>
        <p className="font-mono text-base break-all leading-relaxed select-all">{challenge.url}</p>
      </div>

      {/* Actions or Feedback */}
      {!showFeedback ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 py-3 rounded-md border border-green-300 text-green-700 font-medium hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-950/20 transition-colors"
          >
            Legítima
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 py-3 rounded-md border border-red-300 text-red-700 font-medium hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors"
          >
            Falsa
          </button>
        </div>
      ) : (
        lastAnswer && (
          <div className="space-y-4">
            {/* Correct/Incorrect banner */}
            <div
              className={`p-4 rounded-md border ${
                lastAnswer.correct
                  ? 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200'
                  : 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200'
              }`}
            >
              <p className="font-medium">
                {lastAnswer.correct ? '✓ Correcto' : '✗ Incorrecto'} — esta URL{' '}
                {lastAnswer.challenge.isLegitimate ? 'es legítima' : 'es falsa'}.
              </p>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-md bg-[var(--bg-secondary)]">
              <p className="text-sm font-medium mb-2">Explicación</p>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {lastAnswer.challenge.explanation}
              </p>
              <p className="text-sm font-medium mb-1">Señales clave:</p>
              <ul className="list-disc pl-5 space-y-1">
                {lastAnswer.challenge.signals.map((signal, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-md bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
            >
              {current + 1 < shuffledUrls.length ? 'Siguiente URL' : 'Ver resultado final'}
            </button>
          </div>
        )
      )}

      {/* Context */}
      <div className="mt-8 text-sm text-[var(--text-secondary)] p-4 rounded-md border border-[var(--border)]">
        <p>
          Aprende a leer URLs correctamente en{' '}
          <Link href="/aprender/que-es-una-url" className="text-[var(--accent)] hover:underline">
            Qué es una URL y cómo leerla
          </Link>{' '}
          y en{' '}
          <Link
            href="/reconocer/sitios-peligrosos"
            className="text-[var(--accent)] hover:underline"
          >
            Cómo identificar sitios peligrosos
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
