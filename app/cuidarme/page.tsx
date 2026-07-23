import Link from 'next/link'
import { getArticlesBySection } from '@/lib/content'

export default function CuidarmePage() {
  const articles = getArticlesBySection('cuidarme')

  return (
    <div>
      <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block">
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-6">Me quiero cuidar de algo</h1>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.slug}>
            <Link
              href={`/cuidarme/${article.slug}`}
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
