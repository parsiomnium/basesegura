import Link from 'next/link'
import { getArticlesBySection } from '@/lib/content'

export default function ReconocerPage() {
  const articles = getArticlesBySection('reconocer')

  return (
    <div>
      <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block">
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-2">Reconocer</h1>
      <p className="text-[var(--text-secondary)] mb-6">Aprende a identificar estafas y mensajes falsos</p>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.slug}>
            <Link
              href={`/reconocer/${article.slug}`}
              className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <h2 className="font-semibold mb-1">{article.title}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
