import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'
import { format } from 'date-fns'

interface Props {
  params: Promise<{ slug: string }>
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
  if (!trip) return { title: 'Trip Not Found — TUBC' }
  return {
    title: `${trip.title} — TUBC`,
    description: `${trip.location} · ${trip.difficulty}`,
  }
}

export default async function TripLogPage({ params }: Props) {
  const { slug } = await params
  const trip = await getTrip(slug)

  if (!trip) notFound()

  const photos: { url: string; caption?: string; order_index: number }[] = []
  const author = 'A TUBC Member'

  return (
    <main className="flex-1 pt-16">

      {/* Hero image */}
      <div className="relative h-[60vh] min-h-80">
        <Image
          src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
          alt={trip.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          {trip.difficulty && <Badge difficulty={trip.difficulty} className="mb-4" />}
          <h1 className="font-display text-4xl md:text-5xl text-parchment font-bold mb-2">
            {trip.title}
          </h1>
          <p className="text-parchment/80">{trip.location}</p>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-parchment-dark border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-6 text-sm text-soil">
          {trip.trip_date && (
            <div>
              <span className="text-xs text-soil/60 uppercase tracking-wide block">Date</span>
              {format(new Date(trip.trip_date), 'MMMM d, yyyy')}
            </div>
          )}
          {trip.miles && (
            <div>
              <span className="text-xs text-soil/60 uppercase tracking-wide block">Distance</span>
              {trip.miles} miles
            </div>
          )}
          {trip.elevation_gain && (
            <div>
              <span className="text-xs text-soil/60 uppercase tracking-wide block">Elevation Gain</span>
              {trip.elevation_gain.toLocaleString()} ft
            </div>
          )}
          <div>
            <span className="text-xs text-soil/60 uppercase tracking-wide block">Posted by</span>
            {author}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-stone max-w-none text-soil leading-relaxed whitespace-pre-wrap">
            {trip.content}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      {photos.length > 0 && (
        <section className="py-12 bg-parchment-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl text-bark font-bold mb-8">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo: { url: string; caption?: string; order_index: number }) => (
                <div key={photo.order_index} className="relative aspect-square rounded-xl overflow-hidden group">
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
