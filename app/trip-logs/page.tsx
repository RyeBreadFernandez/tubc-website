import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import DifficultyBadge from '@/components/ui/DifficultyBadge'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Trip Logs — TUBC',
  description: 'Read trip reports and adventure logs from The Backpacking Club at UCLA.',
}

async function getTripLogs() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data, error } = await supabase
    .from('trip_logs')
    .select('id, title, slug, location, trip_date, difficulty, miles, elevation_gain, cover_image_url, content')
    .eq('published', true)
    .order('trip_date', { ascending: false })
  if (error) console.error('trip_logs fetch error:', error)
  return data ?? []
}

export default async function TripLogsPage() {
  const trips = await getTripLogs()

  return (
    <main className="flex-1 pt-16">
      <PageHero
        title="Trip Logs"
        subtitle="This is where we have been recently!"
        image="/trip-logs-hero.jpg"
        imagePosition="center 80%"
      />

      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {trips.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <Link key={trip.id} href={`/trip-logs/${trip.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-secondary shadow-sm hover:shadow-md transition-shadow bg-parchment flex flex-col">
                    <div className="relative h-52 overflow-hidden shrink-0">
                      <Image
                        src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
                        alt={trip.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {trip.difficulty && (
                          <DifficultyBadge difficulty={trip.difficulty as 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'} />
                        )}
                        {trip.trip_date && (
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(trip.trip_date), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-bark group-hover:text-primary transition-colors mb-1">
                        {trip.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{trip.location}</p>
                      {trip.content && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                          {trip.content.replace(/[#*`]/g, '').slice(0, 150)}…
                        </p>
                      )}
                      {(trip.miles || trip.elevation_gain) && (
                        <>
                          <Separator className="mt-4 mb-3" />
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            {trip.miles && <span>{trip.miles} mi</span>}
                            {trip.elevation_gain && <span>{trip.elevation_gain.toLocaleString()} ft</span>}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-bark mb-3">No trip logs yet</p>
              <p className="text-muted-foreground">Check back after our next trip!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
