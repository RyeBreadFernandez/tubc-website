import { serializeJsonLd } from '@/lib/json-ld'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/DifficultyBadge'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'
import { format, parse } from 'date-fns'

interface Props {
  params: Promise<{ slug: string }>
}

function metadataDescription(trip: { content?: string | null; location?: string | null; difficulty?: string | null }) {
  const cleaned = trip.content?.replace(/[#*`>_[\]()]/g, '').replace(/\s+/g, ' ').trim()

  if (cleaned && cleaned.length >= 80) {
    return cleaned.length > 155 ? `${cleaned.slice(0, 152).trim()}...` : cleaned
  }

  const details = [trip.location, trip.difficulty].filter(Boolean).join(' - ')
  return `${details || 'A member trip'} report from The Backpacking Club at UCLA, with route notes and conditions from the trail.`
}

async function getTrip(slug: string) {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)
    const { data } = await supabase
      .from('trip_logs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const trip = await getTrip(slug)
  if (!trip) return { title: 'Trip Not Found' }

  const description = metadataDescription(trip)

  const ogImage = trip.cover_image_url
    ? [{ url: trip.cover_image_url, width: 1200, height: 630, alt: trip.title }]
    : [{ url: '/trip-logs-hero.jpg', width: 1200, height: 630, alt: trip.title }]

  return {
    title: `${trip.title} | The Backpacking Club at UCLA`,
    description,
    alternates: {
      canonical: `https://www.uclabackpackingclub.com/trip-logs/${slug}`,
    },
    openGraph: {
      title: `${trip.title} | The Backpacking Club at UCLA`,
      description,
      url: `https://www.uclabackpackingclub.com/trip-logs/${slug}`,
      images: ogImage,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${trip.title} | The Backpacking Club at UCLA`,
      description,
      images: trip.cover_image_url ? [trip.cover_image_url] : ['/trip-logs-hero.jpg'],
    },
  }
}

export default async function TripLogPage({ params }: Props) {
  const { slug } = await params
  const trip = await getTrip(slug)

  if (!trip) notFound()

  const photos: { url: string; caption?: string; order_index: number }[] = []
  const author = 'A TUBC Member'

  return (
    <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
              { '@type': 'ListItem', position: 2, name: 'Trip Logs', item: 'https://www.uclabackpackingclub.com/trip-logs' },
              { '@type': 'ListItem', position: 3, name: trip.title, item: `https://www.uclabackpackingclub.com/trip-logs/${trip.slug}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: trip.title,
            description: `${trip.location}${trip.difficulty ? ' · ' + trip.difficulty : ''}`,
            image: trip.cover_image_url ?? 'https://www.uclabackpackingclub.com/trip-logs-hero.jpg',
            datePublished: trip.trip_date ?? undefined,
            author: {
              '@type': 'Organization',
              name: 'The Backpacking Club at UCLA',
              url: 'https://www.uclabackpackingclub.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'The Backpacking Club at UCLA',
              url: 'https://www.uclabackpackingclub.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.uclabackpackingclub.com/logo.png',
              },
            },
            url: `https://www.uclabackpackingclub.com/trip-logs/${trip.slug}`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.uclabackpackingclub.com/trip-logs/${trip.slug}`,
            },
          }),
        }}
      />

      {/* Header — clean title block, no image background */}
      <div className="bg-secondary/40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {trip.difficulty && <Badge difficulty={trip.difficulty} className="mb-4" />}
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-2">
            {trip.title}
          </h1>
          <p className="text-muted-foreground text-base">{trip.location}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 text-sm text-soil mt-6 pt-6 border-t border-border">
            {trip.trip_date && (
              <div>
                <span className="text-xs text-soil/60 uppercase tracking-wide block mb-0.5">Date</span>
                {format(parse(trip.trip_date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}
              </div>
            )}
            {trip.miles && (
              <div>
                <span className="text-xs text-soil/60 uppercase tracking-wide block mb-0.5">Distance</span>
                {trip.miles} miles
              </div>
            )}
            {trip.elevation_gain && (
              <div>
                <span className="text-xs text-soil/60 uppercase tracking-wide block mb-0.5">Elevation Gain</span>
                {trip.elevation_gain.toLocaleString()} ft
              </div>
            )}
            <div>
              <span className="text-xs text-soil/60 uppercase tracking-wide block mb-0.5">Posted by</span>
              {author}
            </div>
          </div>
        </div>
      </div>

      {/* Cover photo — contained, max-width, no full-bleed stretch */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm border border-border">
          <Image
            src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
            alt={trip.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Trip report content */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-stone max-w-none text-soil leading-relaxed whitespace-pre-wrap">
            {trip.content}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      {photos.length > 0 && (
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl text-bark font-bold mb-8">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo: { url: string; caption?: string; order_index: number }) => (
                <div key={photo.order_index} className="relative aspect-square rounded-md overflow-hidden group">
                  <Image
                    src={photo.url}
                    alt={photo.caption ?? 'Trip photo'}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {photo.caption && (
                    <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/40 transition-colors flex items-end">
                      <p className="text-parchment text-sm px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform">
                        {photo.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
