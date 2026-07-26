import { getAllArticles } from '@/lib/content'
import { SITE_URL } from '@/lib/config'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleUrls = articles.map(a => ({
    url: `${SITE_URL}/${a.section}/${a.slug}`,
    lastModified: a.updated,
  }))

  const staticPages = [
    { url: SITE_URL, lastModified: '2026-07-23' },
    { url: `${SITE_URL}/prevenir`, lastModified: '2026-07-23' },
    { url: `${SITE_URL}/reconocer`, lastModified: '2026-07-23' },
    { url: `${SITE_URL}/reaccionar`, lastModified: '2026-07-23' },
    { url: `${SITE_URL}/aprender`, lastModified: '2026-07-23' },
    { url: `${SITE_URL}/sobre`, lastModified: '2026-07-22' },
  ]

  return [...staticPages, ...articleUrls]
}
