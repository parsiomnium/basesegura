import Link from 'next/link'
import { getArticlesBySection } from '@/lib/content'

export default function AprenderPage() {
  const articles = getArticlesBySection('aprender')

  return (
    <div>
      <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block">
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-2">Aprender</h1>
      <p className="text-[var(--text-secondary)] mb-8">Entiende cómo funciona la seguridad digital a tu ritmo.</p>

      <h2 className="text-lg font-semibold mb-4">Básico</h2>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.slug}>
            <Link
              href={`/aprender/${article.slug}`}
              className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <h3 className="font-semibold mb-1">{article.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2 text-sm text-[var(--text-secondary)]">
        <p>Intermedio (pronto)</p>
        <p>Avanzado (pronto)</p>
      </div>
    </div>
  )
}
