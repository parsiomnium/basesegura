import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

const guidesDir = path.join(process.cwd(), 'content', 'guias')

function getGuide(plataforma: string, tema: string) {
  const filePath = path.join(guidesDir, plataforma, `${tema}.md`)
  if (!fs.existsSync(filePath)) return null
  return filePath
}

export async function generateMetadata({ params }: { params: { plataforma: string; tema: string } }): Promise<Metadata> {
  const filePath = getGuide(params.plataforma, params.tema)
  if (!filePath) return {}

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(source)

  return {
    title: `${data.title} — Base Segura`,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'article',
      siteName: 'Base Segura',
    },
  }
}

export default async function GuiaPage({ params }: { params: { plataforma: string; tema: string } }) {
  const filePath = getGuide(params.plataforma, params.tema)

  if (!filePath) {
    notFound()
  }

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const platformLabel = params.plataforma.charAt(0).toUpperCase() + params.plataforma.slice(1)

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-2 inline-block"
        >
          ← Inicio
        </Link>
        <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
        <p className="text-[var(--text-secondary)] mb-4">{data.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-[var(--bg-secondary)] capitalize">
            {platformLabel}
          </span>
          {data.reading_time && (
            <span className="px-2 py-1 rounded bg-[var(--bg-secondary)]">
              {data.reading_time} min de lectura
            </span>
          )}
        </div>
      </div>

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: String(result).replace(/<h1[^>]*>.*?<\/h1>/, '')
        }}
      />

      <div className="mt-12 pt-4 border-t border-[var(--border)] text-sm text-[var(--text-secondary)]">
        Última actualización: {data.updated instanceof Date ? data.updated.toISOString().split('T')[0] : String(data.updated)}
      </div>
    </div>
  )
}

export function generateStaticParams() {
  const params: Array<{ plataforma: string; tema: string }> = []

  if (!fs.existsSync(guidesDir)) return params

  const platforms = fs.readdirSync(guidesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())

  for (const platform of platforms) {
    const platformPath = path.join(guidesDir, platform.name)
    const files = fs.readdirSync(platformPath).filter(f => f.endsWith('.md'))

    for (const file of files) {
      params.push({
        plataforma: platform.name,
        tema: file.replace('.md', ''),
      })
    }
  }

  return params
}
