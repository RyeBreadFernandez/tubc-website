import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import PageHero from '@/components/ui/PageHero'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata = {
  title: 'Trips & Events — TUBC',
  description: 'Upcoming backpacking and hiking trips from The Backpacking Club at UCLA.',
}

async function getUpcomingTrips() {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('trip_logs')
      .select('id, title, slug, location, trip_date, difficulty, miles, elevation_gain')
      .eq('published', true)
      .gte('trip_date', today)
      .order('trip_date', { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

export default async function TripsPage() {
  const trips = await getUpcomingTrips()

  return (
    <main className="flex-1 pt-16">
      <PageHero
        title="Trips & Events"
        subtitle="Every trip is a chance to go somewhere new. Check the calendar and sign up early — spots go fast."
        image="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Calendar embed */}
      <section className="py-16 bg-parchment">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3 text-center">Club calendar</p>
          <h2 className="font-display text-2xl md:text-3xl text-bark font-bold mb-8 text-center">
            Upcoming Events
          </h2>
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-parchment-dark">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=uclabackpackingclub%40gmail.com&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&bgcolor=%23F5F0E8"
              style={{ border: 0 }}
              width="100%"
              height="500"
              title="TUBC Club Calendar"
            />
          </div>
        </div>
      </section>

      {/* Upcoming trips list */}
      <section className="py-16 bg-moss">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl text-bark font-bold mb-8">
            Upcoming Trips
          </h2>

          {trips.length > 0 ? (
            <div className="space-y-4">
              {trips.map((trip) => (
                <Link key={trip.id} href={`/trip-logs/${trip.slug}`} className="group block">
                  <div className="bg-parchment border border-sand rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="sm:w-24 shrink-0 text-center">
                      <p className="font-display text-2xl font-bold text-terra">
                        {format(new Date(trip.trip_date), 'd')}
                      </p>
                      <p className="text-soil text-xs uppercase tracking-wide">
                        {format(new Date(trip.trip_date), 'MMM yyyy')}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 flex-wrap">
                        <h3 className="font-display text-lg font-bold text-bark group-hover:text-terra transition-colors">
                          {trip.title}
                        </h3>
                        {trip.difficulty && <Badge difficulty={trip.difficulty as 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'} />}
                      </div>
                      <p className="text-soil text-sm mt-1">{trip.location}</p>
                      <div className="flex gap-4 mt-2 text-xs text-soil/70">
                        {trip.miles && <span>{trip.miles} miles</span>}
                        {trip.elevation_gain && <span>{trip.elevation_gain.toLocaleString()} ft gain</span>}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1 text-terra text-sm font-semibold group-hover:gap-2 transition-all">
                        Details
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-parchment rounded-2xl border border-sand">
              <p className="font-display text-xl text-bark mb-2">No trips scheduled yet</p>
              <p className="text-soil text-sm">Check back soon or follow us on Instagram for announcements.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
