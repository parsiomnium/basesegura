import Link from 'next/link'
import { getArticlesBySection, getSections } from '@/lib/content'
import { notFound } from 'next/navigation'

const sectionNames: Record<string, string> = {
  empezar: 'Empezar',
  cuentas: 'Cuentas',
  navegacion: 'Navegación',
  estafas: 'Estafas',
  emergencias: 'Emergencias',
  dispositivos: 'Dispositivos',
  privacidad: 'Privacidad',
  empresas: 'Empresas',
  familias: 'Familias',
  guias: 'Guías',
}

const riskColors: Record<string, string> = {
  bajo: 'text-green-600',
  medio: 'text-yellow-600',
  alto: 'text-orange-600',
  critico: 'text-red-600',
}

export function generateStaticParams() {
  return getSections().map(section => ({ section }))
}

export default function SectionPage({ params }: { params: { section: string } }) {
  const articles = getArticlesBySection(params.section)

  if (articles.length === 0) {
    notFound()
  }

  const title = sectionNames[params.section] || params.section

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.slug}>
            <Link
              href={`/${params.section}/${article.slug}`}
              className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <h2 className="font-semibold mb-1">{article.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-2">{article.description}</p>
              <div className="flex gap-3 text-xs text-[var(--text-secondary)]">
                {article.level && <span className="capitalize">{article.level}</span>}
                {article.reading_time && <span>{article.reading_time} min</span>}
                {article.risk && (
                  <span className={riskColors[article.risk] || ''}>
                    Riesgo {article.risk}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
