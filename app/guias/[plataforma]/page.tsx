import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const guidesDir = path.join(process.cwd(), 'content', 'guias')

function getGuidesForPlatform(plataforma: string) {
  const platformPath = path.join(guidesDir, plataforma)
  if (!fs.existsSync(platformPath)) return null

  const files = fs.readdirSync(platformPath).filter(f => f.endsWith('.md'))

  return files.map(file => {
    const source = fs.readFileSync(path.join(platformPath, file), 'utf-8')
    const { data } = matter(source)
    return {
      slug: file.replace('.md', ''),
      title: data.title || file.replace('.md', ''),
      description: data.description || '',
    }
  })
}

export default function PlataformaPage({ params }: { params: { plataforma: string } }) {
  const guides = getGuidesForPlatform(params.plataforma)

  if (!guides) {
    notFound()
  }

  const platformLabel = params.plataforma.charAt(0).toUpperCase() + params.plataforma.slice(1)

  return (
    <div>
      <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-4 inline-block">
        ← Inicio
      </Link>
      <h1 className="text-2xl font-bold mb-2">Guías — {platformLabel}</h1>
      <p className="text-[var(--text-secondary)] mb-8">
        Todas las guías disponibles para {platformLabel}.
      </p>

      {guides.length > 0 ? (
        <ul className="space-y-4">
          {guides.map(guide => (
            <li key={guide.slug}>
              <Link
                href={`/guias/${params.plataforma}/${guide.slug}`}
                className="block p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <h3 className="font-semibold mb-1">{guide.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{guide.description}</p>
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

export function generateStaticParams() {
  if (!fs.existsSync(guidesDir)) return []

  return fs.readdirSync(guidesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => ({ plataforma: d.name }))
}
