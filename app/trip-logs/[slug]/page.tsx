import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DifficultyBadge, { isDifficulty } from '@/components/ui/DifficultyBadge'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'
import { ChevronLeftIcon } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { absoluteUrl, breadcrumbJsonLd } from '@/lib/seo'
import { formatDateOnly } from '@/lib/dates'
import { getPublishedTripLogBySlug } from '@/lib/trip-logs.server'

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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const trip = await getPublishedTripLogBySlug(slug)
  if (!trip) return { title: 'Trip Not Found' }

  const description = metadataDescription(trip)

  const ogImage = trip.cover_image_url
    ? [{ url: trip.cover_image_url, width: 1200, height: 630, alt: trip.title }]
    : [{ url: '/og/trip-logs-hero.jpg', width: 1200, height: 630, alt: trip.title }]

  return {
    title: trip.title,
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
      images: trip.cover_image_url ? [trip.cover_image_url] : ['/og/trip-logs-hero.jpg'],
    },
  }
}

export default async function TripLogPage({ params }: Props) {
  const { slug } = await params
  const trip = await getPublishedTripLogBySlug(slug)

  if (!trip) notFound()

  const description = metadataDescription(trip)
  const canonicalPath = `/trip-logs/${trip.slug}`
  const contentPublishedAt = trip.created_at ?? trip.trip_date ?? undefined
  const tripDifficulty = isDifficulty(trip.difficulty) ? trip.difficulty : null

  return (
    <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Trip Logs', path: '/trip-logs' },
          { name: trip.title, path: canonicalPath },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${absoluteUrl(canonicalPath)}#article`,
          headline: trip.title,
          description,
          image: absoluteUrl(trip.cover_image_url ?? '/og/trip-logs-hero.jpg'),
          datePublished: contentPublishedAt,
          dateModified: trip.created_at ?? undefined,
          articleSection: 'Trip Logs',
          keywords: [trip.location, trip.difficulty, 'UCLA backpacking', 'trip report'].filter(Boolean),
          articleBody: trip.content?.replace(/[#*`>_[\]()]/g, '').replace(/\s+/g, ' ').trim(),
          author: {
            '@id': 'https://www.uclabackpackingclub.com/#organization',
          },
          publisher: {
            '@id': 'https://www.uclabackpackingclub.com/#organization',
          },
          spatialCoverage: trip.location,
          url: absoluteUrl(canonicalPath),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${absoluteUrl(canonicalPath)}#webpage`,
          },
          inLanguage: 'en-US',
        }}
      />

      {/* Header — clean title block, no image background */}
      <div className="bg-secondary/40 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-5 flex items-center gap-3">
            <Link
              href="/trip-logs"
              aria-label="Back to trip logs"
              title="Back to trip logs"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-parchment text-bark shadow-sm transition-colors hover:bg-parchment-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </Link>
            {tripDifficulty && <DifficultyBadge difficulty={tripDifficulty} />}
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-2">
            {trip.title}
          </h1>
          <p className="text-muted-foreground text-base">{trip.location}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 text-sm text-soil mt-6 pt-6 border-t border-border">
            {trip.trip_date && (
              <div>
                <span className="text-xs text-soil uppercase tracking-wide block mb-0.5">Date</span>
                {formatDateOnly(trip.trip_date, 'MMMM d, yyyy')}
              </div>
            )}
            {trip.miles && (
              <div>
                <span className="text-xs text-soil uppercase tracking-wide block mb-0.5">Distance</span>
                {trip.miles} miles
              </div>
            )}
            {trip.elevation_gain && (
              <div>
                <span className="text-xs text-soil uppercase tracking-wide block mb-0.5">Elevation Gain</span>
                {trip.elevation_gain.toLocaleString()} ft
              </div>
            )}
            <div>
              <span className="text-xs text-soil uppercase tracking-wide block mb-0.5">Report</span>
              TUBC member field notes
            </div>
          </div>
        </div>
      </div>

      {/* Cover photo — contained, max-width, no full-bleed stretch */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm border border-border">
          <Image
            src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
            alt=""
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

    </main>
  )
}
