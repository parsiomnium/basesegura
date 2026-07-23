import Link from 'next/link'

export default function AprenderPage() {
  return (
    <div>
      <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block">
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-2">Aprender</h1>
      <p className="text-[var(--text-secondary)] mb-8">Elige tu nivel:</p>
      <ul className="space-y-4">
        <li><Link href="/aprender/basico" className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors font-semibold">Básico</Link></li>
        <li><Link href="/aprender/intermedio" className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors font-semibold">Intermedio</Link></li>
        <li><Link href="/aprender/avanzado" className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors font-semibold">Avanzado</Link></li>
      </ul>
    </div>
  )
}
