'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
      <p className="text-[var(--text-secondary)] mb-8">
        Ocurrió un error inesperado. Si el problema persiste, puedes reportarlo en GitHub.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--bg-secondary)]"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
