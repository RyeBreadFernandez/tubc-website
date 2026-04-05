import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { setPublished } from './actions'

export const metadata = { title: 'Review Trip Reports — TUBC' }

export default async function ReviewPage() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: trips } = await supabase
    .from('trip_logs')
    .select('id, title, location, trip_date, difficulty, miles, published, slug, author_id')
    .order('created_at', { ascending: false })

  const all = trips ?? []

  return (
    <main className="flex-1 pt-16 bg-parchment min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Officer area</p>
          <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">Review Trip Reports</h1>
          <p className="text-soil text-sm mt-1">{all.filter(t => !t.published).length} pending · {all.filter(t => t.published).length} published</p>
        </div>

        {all.length === 0 ? (
          <div className="text-center py-16 bg-parchment-dark border border-sand rounded-2xl">
            <p className="font-display text-xl text-bark mb-2">No reports submitted yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {all.map((trip) => (
              <div key={trip.id} className="bg-parchment-dark border border-sand rounded-xl p-5 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-semibold text-bark">{trip.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trip.published ? 'bg-moss text-sage-dark' : 'bg-sand text-soil'}`}>
                      {trip.published ? 'Published' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-soil text-sm">
                    {trip.location}
                    {trip.trip_date ? ` · ${format(new Date(trip.trip_date), 'MMM d, yyyy')}` : ''}
                    {trip.difficulty ? ` · ${trip.difficulty}` : ''}
                    {trip.miles ? ` · ${trip.miles} mi` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {trip.published && (
                    <a
                      href={`/trip-logs/${trip.slug}`}
                      className="text-terra text-sm font-semibold hover:text-terra-dark transition-colors whitespace-nowrap"
                    >
                      View →
                    </a>
                  )}
                  <form action={setPublished.bind(null, trip.id, !trip.published)}>
                    <button
                      type="submit"
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                        trip.published
                          ? 'border border-sand text-soil hover:bg-sand'
                          : 'bg-terra hover:bg-terra-dark text-parchment'
                      }`}
                    >
                      {trip.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
