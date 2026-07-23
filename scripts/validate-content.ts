import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { articleSchema } from '../lib/schema'

const contentDir = path.join(process.cwd(), 'content')

let errors = 0

function validateDir(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      validateDir(fullPath)
      continue
    }

    if (!entry.name.endsWith('.md')) continue

    const source = fs.readFileSync(fullPath, 'utf-8')
    const { data } = matter(source)

    const result = articleSchema.safeParse(data)

    if (!result.success) {
      const relativePath = path.relative(process.cwd(), fullPath)
      console.error(`\n✗ ${relativePath}`)
      for (const issue of result.error.issues) {
        console.error(`  → ${issue.path.join('.')}: ${issue.message}`)
      }
      errors++
    }
  }
}

console.log('Validating content schemas...\n')
validateDir(contentDir)

if (errors > 0) {
  console.error(`\n✗ ${errors} file(s) with invalid frontmatter`)
  process.exit(1)
} else {
  console.log('✓ All content valid')
}
