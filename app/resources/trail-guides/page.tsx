import { serializeJsonLd } from '@/lib/json-ld'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { itemListJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Trail Guides',
  description: 'Trail guides for TUBC favorites — Rae Lakes Loop, Mount Whitney, Half Dome, Condor Gulch, and more. Distances, difficulty, permits, and trip beta.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/resources/trail-guides',
  },
  openGraph: {
    title: 'Trail Guides | The Backpacking Club at UCLA',
    description: 'Trail guides for TUBC favorites — Rae Lakes Loop, Mount Whitney, Half Dome, and more. Distances, difficulty, permits, and trip beta.',
    url: 'https://www.uclabackpackingclub.com/resources/trail-guides',
    images: [{ url: '/og/cottonwood-lakes.jpg', width: 1200, height: 630, alt: 'Trail guides for backpacking' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trail Guides | The Backpacking Club at UCLA',
    description: 'Trail guides for TUBC favorites — Rae Lakes Loop, Mount Whitney, Half Dome, Condor Gulch, and more. Distances, difficulty, permits, and trip beta.',
    images: ['/og/cottonwood-lakes.jpg'],
  },
}

const guides = [
  { name: 'Rae Lakes Loop', park: 'Kings Canyon NP', days: '4–5 days', miles: '41 miles', difficulty: 'Strenuous', description: 'One of the most scenic loops in the Sierra. Alpine lakes, granite peaks, and reliable water. Requires permit — apply in advance.' },
  { name: 'Mount Whitney', park: 'Inyo NF', days: '1–3 days', miles: '22 miles RT', difficulty: 'Strenuous', description: 'Highest peak in the contiguous US at 14,505 ft. Day hike or overnight at Guitar Lake. Highly competitive permit lottery.' },
  { name: 'Half Dome', park: 'Yosemite NP', days: '1 day or overnight', miles: '16 miles RT', difficulty: 'Strenuous', description: 'Iconic cables route. Day hike permits required in addition to park entry. Start at 5am to beat the crowds.' },
  { name: 'Condor Gulch – High Peaks Loop', park: 'Pinnacles NP', days: '1 day', miles: '8.5 miles', difficulty: 'Moderate', description: 'Two-hour drive from LA. Rocky spires, California condors, and excellent views. Best in spring.' },
  { name: 'Chantry Flat to Sturtevant Falls', park: 'Angeles NF', days: '1 day', miles: '3.8 miles RT', difficulty: 'Easy', description: 'A quick favorite 45 minutes from campus. Waterfall payoff makes it great for first-timers.' },
  { name: 'San Jacinto Peak via Palm Springs Aerial Tramway', park: 'San Bernardino NF', days: '1 day', miles: '11 miles RT', difficulty: 'Moderate', description: 'Take the tram up 8,000 ft, then hike to the 10,834 ft summit. Surreal to be above the desert.' },
]

const difficultyColor: Record<string, string> = {
  Easy: 'bg-moss text-forest border border-forest/25',
  Moderate: 'bg-sand text-terra-dark border border-terra/25',
  Strenuous: 'bg-rose text-terra-dark border border-terra/25',
  Expert: 'bg-terra text-parchment',
}

export default function TrailGuidesPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
              { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.uclabackpackingclub.com/resources' },
              { '@type': 'ListItem', position: 3, name: 'Trail Guides', item: 'https://www.uclabackpackingclub.com/resources/trail-guides' },
            ],
          }),
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          path: '/resources/trail-guides',
          name: 'Trail Guides',
          description: 'Trail guides for TUBC favorites with distance, difficulty, permits, and trip planning notes.',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/resources/trail-guides',
          name: 'Backpacking and hiking trail guides',
          description: 'Trail guides and route notes from The Backpacking Club at UCLA.',
          items: guides.map((guide) => ({
            name: guide.name,
            description: `${guide.park}. ${guide.miles}. ${guide.days}. ${guide.difficulty}. ${guide.description}`,
          })),
        })}
      />
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Trail Guides</h1>
          <p className="text-soil text-lg">Trails we know and love, with the beta you need to plan your trip.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {guides.map((guide) => (
            <div key={guide.name} className="bg-parchment-dark border border-sand rounded-md p-6">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-bark">{guide.name}</h2>
                  <p className="text-soil text-xs mt-0.5">{guide.park}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${difficultyColor[guide.difficulty]}`}>
                  {guide.difficulty}
                </span>
              </div>
              <p className="text-soil text-sm leading-relaxed mb-4">{guide.description}</p>
              <div className="flex gap-5 text-xs text-soil/70">
                <span>{guide.miles}</span>
                <span>{guide.days}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
