import { getAllArticles } from '@/lib/content'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://basesegura.pages.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleUrls = articles.map(a => ({
    url: `${BASE_URL}/${a.section}/${a.slug}`,
    lastModified: a.updated,
  }))

  const staticPages = [
    { url: BASE_URL, lastModified: '2026-07-23' },
    { url: `${BASE_URL}/prevenir`, lastModified: '2026-07-23' },
    { url: `${BASE_URL}/reconocer`, lastModified: '2026-07-23' },
    { url: `${BASE_URL}/reaccionar`, lastModified: '2026-07-23' },
    { url: `${BASE_URL}/aprender`, lastModified: '2026-07-23' },
    { url: `${BASE_URL}/sobre`, lastModified: '2026-07-22' },
  ]

  return [...staticPages, ...articleUrls]
}
