import Link from 'next/link'
import { connection } from 'next/server'
import PageHero from '@/components/ui/PageHero'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from '@/lib/seo'
import { getPublishedTripLogs } from '@/lib/trip-logs.server'
import TripLogsArchive from './TripLogsArchive'

export const metadata: Metadata = {
  title: 'Trip Logs',
  description: 'Read trip reports from The Backpacking Club at UCLA — Sierra Nevada, Joshua Tree, Angeles National Forest, and more. Real accounts from real Bruins on the trail.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/trip-logs',
  },
  openGraph: {
    title: 'Trip Logs | The Backpacking Club at UCLA',
    description: 'Read trip reports from The Backpacking Club at UCLA — Sierra Nevada, Joshua Tree, Angeles National Forest, and more.',
    url: 'https://www.uclabackpackingclub.com/trip-logs',
    images: [{ url: '/og/trip-logs-hero.jpg', width: 1200, height: 630, alt: 'TUBC trip logs' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trip Logs | The Backpacking Club at UCLA',
    description: 'Read trip reports from The Backpacking Club at UCLA — Sierra Nevada, Joshua Tree, Angeles National Forest, and more.',
    images: ['/og/trip-logs-hero.jpg'],
  },
}

export default async function TripLogsPage() {
  await connection()

  const trips = await getPublishedTripLogs()

  return (
    <main id="main-content" className="flex-1 pt-16">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Trip Logs', path: '/trip-logs' }])} />
      <JsonLd
        data={webPageJsonLd({
          path: '/trip-logs',
          name: 'Trip Logs',
          description: 'Published trip reports from The Backpacking Club at UCLA, with routes, conditions, photos, and member notes.',
          type: 'CollectionPage',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/trip-logs',
          name: 'TUBC trip logs',
          description: 'Trip reports from UCLA Backpacking Club members.',
          items: trips.map((trip) => ({
            name: trip.title,
            description: [trip.location, trip.difficulty].filter(Boolean).join(' - '),
            url: `/trip-logs/${trip.slug}`,
          })),
        })}
      />
      <PageHero
        title="Trip Logs"
        subtitle="Reports from the trail."
        image="/trip-logs-hero.jpg"
        imageAlt="Backcountry landscape from a UCLA Backpacking Club trip."
        imagePosition="center 80%"
      />

      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TripLogsArchive trips={trips} />
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-bark mb-4">Been on a TUBC trip?</h2>
          <p className="text-muted-foreground mb-8">
            Share your experience with the club. Write up your trip and we&apos;ll add it to the log.
          </p>
          <Link
            href="/trip-logs/submit"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Submit a Trip Log
          </Link>
        </div>
      </section>
    </main>
  )
}
