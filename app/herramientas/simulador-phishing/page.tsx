'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { emails, PhishingEmail } from './data'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface Answer {
  email: PhishingEmail
  userSaidPhishing: boolean
  correct: boolean
}

export default function SimuladorPhishingPage() {
  const shuffledEmails = useMemo(() => shuffleArray(emails), [])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<Answer | null>(null)

  const email = shuffledEmails[current]
  const isFinished = current >= shuffledEmails.length && !showFeedback
  const score = answers.filter(a => a.correct).length

  function handleAnswer(userSaidPhishing: boolean) {
    const correct = userSaidPhishing === email.isPhishing
    const answer: Answer = { email, userSaidPhishing, correct }
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
            {score}/{shuffledEmails.length}
          </p>
          <p className="text-[var(--text-secondary)]">
            {score === shuffledEmails.length
              ? 'Perfecto — identificaste todos los correos correctamente.'
              : score >= shuffledEmails.length * 0.7
                ? 'Buen resultado. Revisa los errores para mejorar.'
                : 'Hay margen para mejorar. Revisa las señales de cada correo.'}
          </p>
        </div>

        {/* Review */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Resumen por correo</h2>
          {answers.map((a, i) => (
            <div
              key={a.email.id}
              className={`p-4 rounded-md border-l-4 ${
                a.correct ? 'border-l-green-500' : 'border-l-red-500'
              } bg-[var(--bg-secondary)]`}
            >
              <div className="flex justify-between items-start gap-2 mb-1">
                <p className="font-medium text-sm">
                  {i + 1}. {a.email.subject}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    a.correct
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {a.correct ? 'Correcto' : 'Incorrecto'}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                Era: {a.email.isPhishing ? 'Phishing' : 'Legítimo'} — Tú dijiste:{' '}
                {a.userSaidPhishing ? 'Phishing' : 'Legítimo'}
              </p>
              {!a.correct && (
                <p className="text-sm text-[var(--text-secondary)]">{a.email.explanation}</p>
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
            href="/reconocer/phishing"
            className="px-4 py-2 rounded-md border border-[var(--border)] text-sm hover:text-[var(--accent)] transition-colors flex items-center"
          >
            Leer: Cómo detectar phishing
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
        <h1 className="text-2xl font-bold mb-2">Simulador de phishing</h1>
        <p className="text-[var(--text-secondary)]">
          Te muestro correos electrónicos — tú decides cuáles son reales y cuáles son intentos de
          phishing.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--text-secondary)] mb-2">
          <span>
            Correo {current + 1} de {shuffledEmails.length}
          </span>
          <span>{answers.filter(a => a.correct).length} correctas</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{
              width: `${((current + (showFeedback ? 1 : 0)) / shuffledEmails.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Email card */}
      <div className="border border-[var(--border)] rounded-md overflow-hidden mb-6">
        {/* Email header */}
        <div className="bg-[var(--bg-secondary)] p-4 border-b border-[var(--border)]">
          <p className="text-sm">
            <span className="text-[var(--text-secondary)]">De:</span>{' '}
            <span className="font-mono text-sm">{email.from}</span>
          </p>
          <p className="text-sm mt-1">
            <span className="text-[var(--text-secondary)]">Asunto:</span>{' '}
            <span className="font-medium">{email.subject}</span>
          </p>
        </div>

        {/* Email body */}
        <div className="p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{email.body}</pre>
        </div>
      </div>

      {/* Actions or Feedback */}
      {!showFeedback ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 py-3 rounded-md border border-green-300 text-green-700 font-medium hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-950/20 transition-colors"
          >
            Es legítimo
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 py-3 rounded-md border border-red-300 text-red-700 font-medium hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors"
          >
            Es phishing
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
                {lastAnswer.correct ? '✓ Correcto' : '✗ Incorrecto'} — este correo{' '}
                {lastAnswer.email.isPhishing ? 'es phishing' : 'es legítimo'}.
              </p>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-md bg-[var(--bg-secondary)]">
              <p className="text-sm font-medium mb-2">Explicación</p>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {lastAnswer.email.explanation}
              </p>
              <p className="text-sm font-medium mb-1">Señales clave:</p>
              <ul className="list-disc pl-5 space-y-1">
                {lastAnswer.email.signals.map((signal, i) => (
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
              {current + 1 < shuffledEmails.length ? 'Siguiente correo' : 'Ver resultado final'}
            </button>
          </div>
        )
      )}

      {/* Context */}
      <div className="mt-8 text-sm text-[var(--text-secondary)] p-4 rounded-md border border-[var(--border)]">
        <p>
          Este simulador usa correos de ejemplo basados en técnicas reales de phishing. Aprende más
          en{' '}
          <Link href="/reconocer/phishing" className="text-[var(--accent)] hover:underline">
            Cómo detectar un correo de phishing
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
