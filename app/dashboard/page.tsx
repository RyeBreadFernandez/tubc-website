import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata = { title: 'Dashboard — TUBC' }

async function getUserAndTrips() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  let trips: { id: string; title: string; location: string; trip_date: string; published: boolean; slug: string }[] = []
  try {
    const { data } = await supabase
      .from('trip_logs')
      .select('id, title, location, trip_date, published, slug')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false })
    trips = data ?? []
  } catch { /* table may not exist yet */ }

  return { user, trips }
}

export default async function DashboardPage() {
  const { user, trips } = await getUserAndTrips()

  const published = trips.filter((t) => t.published)
  const drafts = trips.filter((t) => !t.published)

  return (
    <main className="flex-1 pt-16 bg-parchment min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Member area</p>
            <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">
              Hey, {user.user_metadata?.full_name?.split(' ')[0] ?? 'Explorer'}
            </h1>
            <p className="text-soil text-sm mt-1">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/review"
              className="px-6 py-3 border border-sand hover:bg-parchment-dark text-soil font-semibold rounded-md transition-colors text-sm"
            >
              Review Reports
            </Link>
            <Link
              href="/dashboard/new-trip"
              className="px-6 py-3 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md transition-colors text-sm"
            >
              + Write a Trip Report
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: trips.length, label: 'Total posts' },
            { value: published.length, label: 'Published' },
            { value: drafts.length, label: 'Pending review' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-parchment-dark border border-sand rounded-md p-5 text-center">
              <p className="font-display text-3xl font-bold text-bark">{value}</p>
              <p className="text-soil text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Trip logs */}
        <h2 className="font-display text-xl text-bark font-bold mb-4">Your Trip Reports</h2>

        {trips.length === 0 ? (
          <div className="text-center py-16 bg-parchment-dark border border-sand rounded-md">
            <p className="font-display text-xl text-bark mb-2">No trip reports yet</p>
            <p className="text-soil text-sm mb-6">Share your adventures with the club.</p>
            <Link
              href="/dashboard/new-trip"
              className="inline-block px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors"
            >
              Write your first report
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-parchment-dark border border-sand rounded-md p-5 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-bark truncate">{trip.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${trip.published ? 'bg-moss text-sage-dark' : 'bg-sand text-soil'}`}>
                      {trip.published ? 'Published' : 'Pending review'}
                    </span>
                  </div>
                  <p className="text-soil text-sm mt-0.5">
                    {trip.location} · {trip.trip_date ? format(new Date(trip.trip_date), 'MMM d, yyyy') : ''}
                  </p>
                </div>
                {trip.published && (
                  <Link
                    href={`/trip-logs/${trip.slug}`}
                    className="text-terra text-sm font-semibold hover:text-terra-dark transition-colors whitespace-nowrap"
                  >
                    View →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
