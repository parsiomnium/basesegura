import Link from 'next/link'
import { getArticlesBySection } from '@/lib/content'

export default function IntermedioPage() {
  const articles = getArticlesBySection('aprender').filter(a => a.level === 'intermedio')

  return (
    <div>
      <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block">
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-2">Aprender — Intermedio</h1>
      <p className="text-[var(--text-secondary)] mb-8">
        Ya sabes protegerte. Ahora entiende cómo funcionan las cosas por dentro.
      </p>

      {articles.length > 0 ? (
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
      ) : (
        <p className="text-[var(--text-secondary)]">Contenido en preparación.</p>
      )}
    </div>
  )
}
