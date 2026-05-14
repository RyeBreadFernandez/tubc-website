import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Badge from '@/components/ui/DifficultyBadge'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/JsonLd'
import { SITE_NAME, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
  },
  description: 'UCLA\'s student backpacking club — free trips, gear rentals, and outdoor education for every level. From the Santa Monica Mountains to the Sierra Nevada.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com',
  },
  openGraph: {
    title: 'The Backpacking Club at UCLA',
    description: 'UCLA\'s student backpacking club — free trips, gear rentals, and outdoor education for every level. From the Santa Monica Mountains to the Sierra Nevada.',
    url: 'https://www.uclabackpackingclub.com',
    images: [{ url: '/cottonwood-lakes.jpg', width: 1200, height: 630, alt: 'Cottonwood Lakes — TUBC' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Backpacking Club at UCLA',
    description: 'UCLA\'s student backpacking club — free trips, gear rentals, and outdoor education for every level. From the Santa Monica Mountains to the Sierra Nevada.',
    images: ['/cottonwood-lakes.jpg'],
  },
}

async function getLatestTripLogs() {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)
    const { data } = await supabase
      .from('trip_logs')
      .select('id, title, slug, location, trip_date, difficulty, cover_image_url, author_id')
      .eq('published', true)
      .order('trip_date', { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

export default async function Home() {
  const tripLogs = await getLatestTripLogs()

  return (
    <main id="main-content" className="flex-1">
      <JsonLd
        data={webPageJsonLd({
          path: '/',
          name: SITE_NAME,
          description: "UCLA's student backpacking club for free trips, gear rentals, and outdoor education for every level.",
        })}
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/cottonwood-lakes.jpg"
          alt="Cottonwood Lakes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-bark/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p
            className="text-parchment/80 font-body text-sm uppercase tracking-widest mb-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] animate-reveal"
            style={{ animationDelay: '0ms' }}
          >
            The Backpacking Club at UCLA
          </p>
          <h1
            className="font-display text-5xl md:text-7xl text-parchment font-bold leading-tight mb-6 [text-shadow:0_2px_16px_rgba(0,0,0,0.7)] animate-reveal"
            style={{ animationDelay: '120ms' }}
          >
            We take you to the outdoors.
          </h1>
          <p
            className="text-parchment/80 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] animate-reveal"
            style={{ animationDelay: '260ms' }}
          >
            TUBC runs trips every quarter — day hikes in the Santa Monicas, car camps at Joshua Tree, multi-day Sierra crossings. Free to join. No experience required.
          </p>
          <div className="flex justify-center animate-reveal" style={{ animationDelay: '400ms' }}>
            <a
              href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-terra hover:bg-terra-dark text-parchment rounded-md text-sm transition-all duration-200 uppercase tracking-[0.08em] font-light hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 active:translate-y-0 active:scale-95"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Join our Slack
            </a>
          </div>
        </div>

        {/* Scroll indicator with pulse ring */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-parchment/70" aria-hidden="true">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-7 rounded-full bg-parchment/30 animate-pulse-ring" />
            <svg className="w-7 h-7 animate-bounce relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative h-80 md:h-96 rounded-md overflow-hidden shadow-md group">
              <Image
                src="/staff-group.jpg"
                alt="Group around a campfire"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3">Who we are</p>
              <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-5">
                UCLA&apos;s home for the outdoors
              </h2>
              <p className="text-soil leading-relaxed mb-4">
                TUBC has been taking Bruins into the backcountry for over a decade. From day hikes to weekend car camps to multi-day Sierra crossings, we run trips for every experience level and budget.
              </p>
              <p className="text-soil leading-relaxed mb-8">
                We also host gear workshops, Leave No Trace clinics, and social events so you can learn the ropes and meet people who care about the same places you do.
              </p>
              <Link
                href="/about#meet-the-team"
                className="inline-flex items-center gap-2 text-terra hover:text-terra-dark font-semibold transition-colors group/link"
              >
                Meet the team
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Latest trip logs */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">From the field</p>
                <h2 className="font-display text-3xl md:text-4xl text-bark font-bold">Latest Trip Logs</h2>
              </div>
              <Link
                href="/trip-logs"
                className="text-sm text-terra hover:text-terra-dark font-semibold transition-colors hidden sm:inline-flex items-center gap-1 group/link"
              >
                View all trip logs
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>

          {tripLogs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {tripLogs.map((trip, i) => (
                <Reveal key={trip.id} delay={i * 110}>
                  <Link href={`/trip-logs/${trip.slug}`} className="group block h-full">
                    <div className="bg-parchment border border-sand rounded-md overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-bark/10 h-full">
                      <div className="relative aspect-[3/2] w-full overflow-hidden">
                        <Image
                          src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
                          alt={trip.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        {trip.difficulty && <Badge difficulty={trip.difficulty as 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'} className="mb-3" />}
                        <h3 className="font-display text-lg text-bark font-bold mb-1 group-hover:text-terra transition-colors">
                          {trip.title}
                        </h3>
                        <p className="text-soil text-sm">{trip.location}</p>
                        {trip.trip_date && (
                          <p className="text-soil/60 text-xs mt-2">
                            {format(new Date(trip.trip_date), 'MMMM d, yyyy')}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-soil">
              <p className="font-display text-xl mb-2">No trip logs yet</p>
              <p className="text-sm">Go on a trip. Write it up. Be the first one in the archive.</p>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link href="/trip-logs" className="text-terra font-semibold text-sm hover:text-terra-dark transition-colors">
              View all trip logs →
            </Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3">Get outside</p>
            <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-5">
              You don&apos;t need gear. You don&apos;t need experience.
            </h2>
            <p className="text-soil leading-relaxed mb-8 text-lg">
              Most of our members went on their first backpacking trip with TUBC. All you need is a UCLA email and a free weekend. We handle the rest.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-terra hover:bg-terra-dark text-parchment rounded-md text-sm transition-all duration-200 uppercase tracking-[0.08em] font-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terra/25 active:translate-y-0 active:scale-95"
                style={{ fontFamily: "var(--font-label)" }}
              >
                Join our Slack
              </Link>
              <Link
                href="/trips"
                className="px-8 py-3.5 border border-border hover:bg-parchment-dark text-bark font-semibold rounded-md text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sand/60 active:translate-y-0 active:scale-95"
              >
                Browse trips
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


    </main>
  )
}
