import Link from 'next/link'

// Thresholds in months per content type
const THRESHOLDS: Record<string, { review: number; stale: number }> = {
  guide: { review: 4, stale: 8 },
  action: { review: 6, stale: 12 },
  prevent: { review: 9, stale: 15 },
  learn: { review: 12, stale: 18 },
}

const DEFAULT_THRESHOLD = { review: 9, stale: 15 }

function monthsSince(dateStr: string): number {
  const updated = new Date(dateStr)
  const now = new Date()
  const months = (now.getFullYear() - updated.getFullYear()) * 12 + (now.getMonth() - updated.getMonth())
  return months
}

interface FreshnessBannerProps {
  updated: string
  contentType?: string
}

export function FreshnessBanner({ updated, contentType }: FreshnessBannerProps) {
  const threshold = THRESHOLDS[contentType || ''] || DEFAULT_THRESHOLD
  const months = monthsSince(updated)

  if (months < threshold.review) {
    return null // Vigente, no mostrar nada
  }

  if (months < threshold.stale) {
    return (
      <div className="mb-6 p-4 rounded-md bg-yellow-50 border border-yellow-200 text-sm text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-200">
        <p>
          Este artículo fue actualizado hace {months} meses. La información general sigue vigente, pero algunos detalles o pasos podrían verse diferente.{' '}
          <Link href="/vigencia" className="underline hover:opacity-80">
            Más sobre la vigencia del contenido →
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="mb-6 p-4 rounded-md bg-orange-50 border border-orange-200 text-sm text-orange-900 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-200">
      <p>
        Esta guía lleva más de {months} meses sin actualización. Puede contener información obsoleta. Estoy trabajando en revisarla.{' '}
        <Link href="/vigencia" className="underline hover:opacity-80">
          Más sobre la vigencia del contenido →
        </Link>
      </p>
    </div>
  )
}
