import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const contentDir = path.join(process.cwd(), 'content')

export interface ArticleMeta {
  slug: string
  section: string
  title: string
  description: string
  level?: string
  risk?: string
  reading_time?: number
  created: string
  updated: string
  tags?: string[]
  platforms?: string[]
  related?: string[]
  tool?: string
  status?: string
  country?: string
}

export interface ArticleData extends ArticleMeta {
  content: string
  html: string
}

export function getAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = []

  const sections = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory())

  for (const section of sections) {
    const sectionPath = path.join(contentDir, section.name)
    const files = fs.readdirSync(sectionPath)
      .filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(sectionPath, file)
      const source = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(source)

      if (data.status === 'draft') continue

      articles.push({
        slug: file.replace('.md', ''),
        section: section.name,
        ...data,
        created: String(data.created),
        updated: String(data.updated),
      } as ArticleMeta)
    }
  }

  return articles
}

export function getArticlesBySection(section: string): ArticleMeta[] {
  return getAllArticles().filter(a => a.section === section)
}

export async function getArticle(section: string, slug: string): Promise<ArticleData | null> {
  const filePath = path.join(contentDir, section, `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return {
    slug,
    section,
    ...data,
    created: String(data.created),
    updated: String(data.updated),
    content,
    html: String(result),
  } as ArticleData
}

export function getSections(): string[] {
  return fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(name => {
      const files = fs.readdirSync(path.join(contentDir, name))
        .filter(f => f.endsWith('.md'))
      return files.length > 0
    })
}
