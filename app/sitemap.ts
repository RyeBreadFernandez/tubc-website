import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE = 'https://uclabackpackingclub.com'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, changeFrequency: 'weekly', priority: 1 },
  { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/trips`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE}/trip-logs`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/resources/la-hiking`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources/trail-guides`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources/where-to-go`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources/packing-list`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources/how-to-pack`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources/gear-rental`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/resources/backcountry-cooking`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/resources/first-aid`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/resources/vocab`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/resources/entrance-fees`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/resources/parks-monuments`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/resources/seminars`, changeFrequency: 'monthly', priority: 0.5 },
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
      .select('slug, trip_date')
      .eq('published', true)

    if (data) {
      tripLogRoutes = data.map((trip) => ({
        url: `${BASE}/trip-logs/${trip.slug}`,
        lastModified: trip.trip_date ? new Date(trip.trip_date) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch {
    // Supabase unavailable at build time — trip logs excluded
  }

  return [...staticRoutes, ...tripLogRoutes]
}
