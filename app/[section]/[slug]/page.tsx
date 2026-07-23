import { getArticle, getAllArticles } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const riskLabels: Record<string, string> = {
  bajo: 'Riesgo bajo',
  medio: 'Riesgo medio',
  alto: 'Riesgo alto',
  critico: 'Riesgo crítico',
}

const riskColors: Record<string, string> = {
  bajo: 'bg-green-100 text-green-800',
  medio: 'bg-yellow-100 text-yellow-800',
  alto: 'bg-orange-100 text-orange-800',
  critico: 'bg-red-100 text-red-800',
}

export function generateStaticParams() {
  return getAllArticles().map(a => ({
    section: a.section,
    slug: a.slug,
  }))
}

export default async function ArticlePage({ params }: { params: { section: string; slug: string } }) {
  const article = await getArticle(params.section, params.slug)

  if (!article) {
    notFound()
  }

  // Format date properly
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toISOString().split('T')[0]
  }

  return (
    <div>
      {/* Meta */}
      <div className="mb-8">
        <Link
          href={`/${params.section}`}
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-2 inline-block"
        >
          ← {params.section}
        </Link>
        <h1 className="text-2xl font-bold mb-3">{article.title}</h1>
        <p className="text-[var(--text-secondary)] mb-4">{article.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {article.level && (
            <span className="px-2 py-1 rounded bg-[var(--bg-secondary)] capitalize">
              {article.level}
            </span>
          )}
          {article.reading_time && (
            <span className="px-2 py-1 rounded bg-[var(--bg-secondary)]">
              {article.reading_time} min de lectura
            </span>
          )}
          {article.risk && (
            <span className={`px-2 py-1 rounded ${riskColors[article.risk] || 'bg-[var(--bg-secondary)]'}`}>
              {riskLabels[article.risk] || article.risk}
            </span>
          )}
        </div>
      </div>

      {/* Content — strip the first H1 since we already show the title above */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: article.html.replace(/<h1[^>]*>.*?<\/h1>/, '')
        }}
      />

      {/* Updated */}
      <div className="mt-12 pt-4 border-t border-[var(--border)] text-sm text-[var(--text-secondary)]">
        Última actualización: {formatDate(article.updated)}
      </div>
    </div>
  )
}
