'use client'

import { useState } from 'react'
import Link from 'next/link'
import { items, ChecklistItem } from './data'

interface UserAnswer {
  item: ChecklistItem
  answer: boolean
}

function getScoreLabel(
  score: number,
  total: number,
): { label: string; description: string; color: string } {
  const pct = score / total
  if (pct >= 0.9)
    return {
      label: 'Excelente',
      description: 'Tu seguridad digital está muy bien. Sigue así.',
      color: 'text-green-700 dark:text-green-300',
    }
  if (pct >= 0.7)
    return {
      label: 'Buena',
      description: 'Vas bien, pero hay puntos que puedes mejorar.',
      color: 'text-green-600 dark:text-green-400',
    }
  if (pct >= 0.5)
    return {
      label: 'Regular',
      description: 'Tienes algunos hábitos buenos, pero varias áreas necesitan atención.',
      color: 'text-yellow-600 dark:text-yellow-400',
    }
  if (pct >= 0.3)
    return {
      label: 'Vulnerable',
      description: 'Varias prácticas básicas no están cubiertas. Empieza por las más fáciles.',
      color: 'text-red-500 dark:text-red-400',
    }
  return {
    label: 'En riesgo',
    description:
      'Tu seguridad digital necesita atención urgente. Pero la buena noticia: cada paso que des mejora tu situación.',
    color: 'text-red-600 dark:text-red-300',
  }
}

export default function ChecklistSeguridadPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [showResult, setShowResult] = useState(false)

  const item = items[current]
  const isFinished = showResult
  const score = answers.filter(a => a.answer).length

  function handleAnswer(answer: boolean) {
    const userAnswer: UserAnswer = { item, answer }
    const newAnswers = [...answers, userAnswer]
    setAnswers(newAnswers)

    if (current + 1 < items.length) {
      setCurrent(current + 1)
    } else {
      setShowResult(true)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setAnswers([])
    setShowResult(false)
  }

  if (isFinished) {
    const scoreLabel = getScoreLabel(score, items.length)
    const noAnswers = answers.filter(a => !a.answer)

    // Group no answers by category
    const categories = new Map<string, UserAnswer[]>()
    for (const a of noAnswers) {
      const cat = a.item.category
      if (!categories.has(cat)) categories.set(cat, [])
      categories.get(cat)!.push(a)
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
          <h1 className="text-2xl font-bold mb-2">Tu resultado</h1>
        </div>

        {/* Score */}
        <div className="p-6 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] mb-6 text-center">
          <p className={`text-4xl font-bold mb-1 ${scoreLabel.color}`}>
            {score}/{items.length}
          </p>
          <p className={`text-lg font-medium mb-2 ${scoreLabel.color}`}>{scoreLabel.label}</p>
          <p className="text-sm text-[var(--text-secondary)]">{scoreLabel.description}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500"
              style={{ width: `${(score / items.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Recommendations */}
        {noAnswers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Qué puedes mejorar</h2>
            <div className="space-y-6">
              {Array.from(categories.entries()).map(([category, catAnswers]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {catAnswers.map(a => (
                      <div
                        key={a.item.id}
                        className="p-4 rounded-md bg-[var(--bg-secondary)] border-l-4 border-l-yellow-500"
                      >
                        <p className="text-sm font-medium mb-1">{a.item.question}</p>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                          {a.item.recommendation}
                        </p>
                        <Link
                          href={a.item.articleLink}
                          className="text-sm text-[var(--accent)] hover:underline"
                        >
                          → {a.item.articleLabel}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All good */}
        {noAnswers.length === 0 && (
          <div className="p-4 rounded-md bg-green-50 border border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200 mb-8">
            <p className="font-medium">Todas las prácticas cubiertas.</p>
            <p className="text-sm mt-1">
              Sigue manteniéndote actualizado. La seguridad es un hábito, no un destino.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded-md bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Repetir checklist
          </button>
          <Link
            href="/aprender/que-es-la-seguridad-digital"
            className="px-4 py-2 rounded-md border border-[var(--border)] text-sm hover:text-[var(--accent)] transition-colors flex items-center"
          >
            Leer: Qué es la seguridad digital
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
        <h1 className="text-2xl font-bold mb-2">Checklist de seguridad personal</h1>
        <p className="text-[var(--text-secondary)]">
          Responde con honestidad — al final te digo en qué puedes mejorar y cómo hacerlo.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[var(--text-secondary)] mb-2">
          <span>
            Pregunta {current + 1} de {items.length}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-secondary)]">
            {item.category}
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${(current / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="border border-[var(--border)] rounded-md p-6 mb-6">
        <p className="text-lg leading-relaxed">{item.question}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 py-3 rounded-md border border-green-300 text-green-700 font-medium hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-950/20 transition-colors"
        >
          Sí
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 py-3 rounded-md border border-red-300 text-red-700 font-medium hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors"
        >
          No
        </button>
      </div>

      {/* Note */}
      <div className="mt-8 text-sm text-[var(--text-secondary)] p-4 rounded-md border border-[var(--border)]">
        <p>Esta checklist no guarda tus respuestas. Es solo para ti — nadie más ve el resultado.</p>
      </div>
    </div>
  )
}
