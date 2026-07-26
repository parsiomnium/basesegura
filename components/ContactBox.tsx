'use client'

import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_CHECKER_API_URL || 'http://localhost:8787'
const MAX_LENGTH = 500

export function ContactBox() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || status === 'sending') return

    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          page: window.location.pathname,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-10 pt-6 border-t border-[var(--border)] text-sm text-[var(--text-secondary)]">
        Mensaje enviado. Gracias.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 pt-6 border-t border-[var(--border)]">
      <p className="text-sm text-[var(--text-secondary)] mb-2">
        ¿Algo no se entiende? ¿Falta algo? ¿Tienes una pregunta?
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Escribe aquí..."
          maxLength={MAX_LENGTH}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          disabled={status === 'sending'}
        />
        <button
          type="submit"
          disabled={!message.trim() || status === 'sending'}
          className="px-4 py-2 text-sm rounded-md bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-1">No se pudo enviar. Intenta de nuevo.</p>
      )}
    </form>
  )
}
