import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export default async function SobrePage() {
  const filePath = path.join(process.cwd(), 'content', 'sobre.md')
  const source = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(source)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: String(result) }}
    />
  )
}
