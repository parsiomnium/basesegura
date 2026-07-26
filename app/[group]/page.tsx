import Link from 'next/link'
import { getArticlesBySection } from '@/lib/content'
import { notFound } from 'next/navigation'
import { sections } from '@/lib/config'

type Params = Promise<{ group: string }>

export default async function GroupPage({ params }: { params: Params }) {
  const { group } = await params
  const section = sections[group]

  if (!section) {
    notFound()
  }

  const articles = getArticlesBySection(group)

  return (
    <div>
      <Link
        href="/"
        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block"
      >
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-2">{section.label}</h1>
      <p className="text-[var(--text-secondary)] mb-6">{section.description}</p>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.slug}>
            <Link
              href={`/${group}/${article.slug}`}
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

export function generateStaticParams() {
  return Object.keys(sections).map(group => ({ group }))
}
