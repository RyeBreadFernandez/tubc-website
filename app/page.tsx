import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Badge from '@/components/ui/DifficultyBadge'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'
import { format } from 'date-fns'

export const metadata = {
  title: 'The Backpacking Club at UCLA',
  description: 'UCLA\'s premier backpacking and hiking club. Join us for trips to the Sierra Nevada, Southern California trails, and beyond.',
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

const stats = [
  { value: '30+', label: 'Trips per year' },
  { value: '1500+', label: 'Active members' },
  { value: '10+', label: 'Years exploring' },
]

export default async function Home() {
  const tripLogs = await getLatestTripLogs()

  return (
    <main className="flex-1">

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
          <p className="text-parchment/80 font-body text-sm uppercase tracking-widest mb-4">
            The Backpacking Club at UCLA
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-parchment font-bold leading-tight mb-6">
            Go further.<br />Go wilder.
          </h1>
          <p className="text-parchment/80 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Experience the outdoors with us! We run trips every quarter — no experience required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trips"
              className="px-8 py-3.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-base transition-colors"
            >
              See Upcoming Trips
            </Link>
            <a
              href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-parchment/15 hover:bg-parchment/25 border border-parchment/40 text-parchment font-semibold rounded-md text-base transition-colors backdrop-blur-sm"
            >
              Join the Club
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-parchment/50 animate-bounce">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-moss py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-4xl md:text-5xl font-bold text-bark">{value}</p>
                <p className="text-soil text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-md overflow-hidden">
            <Image
              src="/staff-group.jpg"
              alt="Group around a campfire"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3">Who we are</p>
            <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-5">
              UCLA&apos;s home for the outdoors
            </h2>
            <p className="text-soil leading-relaxed mb-4">
              TUBC has been taking Bruins into the backcountry for over a decade. From day hikes to weekend car camps to multi-day Sierra crossings, we run trips for every experience level and budget.
            </p>
            <p className="text-soil leading-relaxed mb-8">
              We also host seminars and social events to increase awareness in the outdoors and outdoor education.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-terra hover:text-terra-dark font-semibold transition-colors"
            >
              Meet the team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest trip logs */}
      <section className="py-20 bg-rose/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">From the field</p>
              <h2 className="font-display text-3xl md:text-4xl text-bark font-bold">Latest Trip Logs</h2>
            </div>
            <Link href="/trip-logs" className="text-sm text-terra hover:text-terra-dark font-semibold transition-colors hidden sm:block">
              View all →
            </Link>
          </div>

          {tripLogs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {tripLogs.map((trip) => (
                <Link key={trip.id} href={`/trip-logs/${trip.slug}`} className="group block">
                  <div className="bg-parchment border border-sand rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
                        alt={trip.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-soil">
              <p className="font-display text-xl mb-2">Trip logs coming soon</p>
              <p className="text-sm">Be the first to share a trip report.</p>
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
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3">Ready?</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-5">
            Your next adventure starts here
          </h2>
          <p className="text-soil leading-relaxed mb-8 text-lg">
            Join hundreds of Bruins who&apos;ve traded campus for the backcountry. No experience needed just curiosity to explore and keeping an open mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-base transition-colors"
            >
              Join our Slack
            </Link>
            <Link
              href="/trips"
              className="px-8 py-3.5 border border-border hover:bg-parchment-dark text-bark font-semibold rounded-md text-base transition-colors"
            >
              Browse trips
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-moss">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl text-bark font-bold mb-2">Stay in the loop</h2>
          <p className="text-soil text-sm mb-6">Quarterly newsletter — trip recaps, gear tips, upcoming adventures.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-parchment border border-border rounded-md text-bark placeholder-soil/60 focus:outline-none focus:border-terra transition-colors text-sm"
            />
            <button className="px-6 py-3 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}
