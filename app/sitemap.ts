import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { absoluteUrl } from '@/lib/seo'

const lastModified = new Date()

const staticRoutes: MetadataRoute.Sitemap = [
  { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1, images: [absoluteUrl('/cottonwood-lakes.jpg')] },
  { url: absoluteUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.8, images: [absoluteUrl('/about-hero.jpg')] },
  { url: absoluteUrl('/trips'), lastModified, changeFrequency: 'weekly', priority: 0.9, images: [absoluteUrl('/trips-hero.jpg')] },
  { url: absoluteUrl('/trip-logs'), lastModified, changeFrequency: 'weekly', priority: 0.8, images: [absoluteUrl('/trip-logs-hero.jpg')] },
  { url: absoluteUrl('/gallery'), lastModified, changeFrequency: 'monthly', priority: 0.6, images: [absoluteUrl('/cottonwood-lakes.jpg'), absoluteUrl('/staff-group.jpg')] },
  { url: absoluteUrl('/newsletter'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  { url: absoluteUrl('/faq'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
  { url: absoluteUrl('/resources/la-hiking'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources/trail-guides'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources/where-to-go'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources/packing-list'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources/how-to-pack'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources/gear-rental'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
  { url: absoluteUrl('/resources/backcountry-cooking'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  { url: absoluteUrl('/resources/first-aid'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  { url: absoluteUrl('/resources/vocab'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  { url: absoluteUrl('/resources/entrance-fees'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  { url: absoluteUrl('/resources/parks-monuments'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  { url: absoluteUrl('/resources/seminars'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let tripLogRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    )
    const { data } = await supabase
      .from('trip_logs')
      .select('slug, trip_date, cover_image_url')
      .eq('published', true)

    if (data) {
      tripLogRoutes = data.map((trip) => ({
        url: absoluteUrl(`/trip-logs/${trip.slug}`),
        lastModified: trip.trip_date ? new Date(trip.trip_date) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        images: trip.cover_image_url ? [absoluteUrl(trip.cover_image_url)] : undefined,
      }))
    }
  } catch {
    // Supabase may be unavailable at build time, so trip logs are excluded.
  }

  return [...staticRoutes, ...tripLogRoutes]
}
