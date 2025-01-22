import { getProducts } from '@/modules/products/services/product'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  if (products.length < 1) return []
  const sitemapLinks = products.map(item => {
    return ({
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })
  })
  return sitemapLinks
}