import { serializeJsonLd } from '@/lib/json-ld'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { itemListJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Where to Go',
  description: 'Backpacking destinations near UCLA — the John Muir Trail, Kings Canyon, Yosemite, Joshua Tree, Channel Islands, Zion, and more curated by TUBC trip leaders.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/resources/where-to-go',
  },
  openGraph: {
    title: 'Where to Go | The Backpacking Club at UCLA',
    description: 'Backpacking destinations near UCLA — the John Muir Trail, Kings Canyon, Yosemite, Joshua Tree, Channel Islands, Zion, and more.',
    url: 'https://www.uclabackpackingclub.com/resources/where-to-go',
    images: [{ url: '/cottonwood-lakes.jpg', width: 1200, height: 630, alt: 'Backpacking destinations guide' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Go | The Backpacking Club at UCLA',
    description: 'Backpacking destinations near UCLA — the John Muir Trail, Kings Canyon, Yosemite, Joshua Tree, Channel Islands, Zion, and more curated by TUBC trip leaders.',
    images: ['/cottonwood-lakes.jpg'],
  },
}

const destinations = [
  { name: 'John Muir Trail', region: 'Sierra Nevada', difficulty: 'Expert', distance: '211 miles end-to-end', description: 'The full JMT runs from Yosemite Valley to the Whitney summit. Most people do it in 3 weeks. Section hikes — Reds Meadow to VVR, or the Cottonwood Pass entry — make it doable in a week.' },
  { name: 'Sequoia & Kings Canyon', region: 'Sierra Nevada', difficulty: 'Moderate–Expert', distance: '41-mile Rae Lakes Loop or custom', description: 'The Rae Lakes Loop is the most-run TUBC trip for good reason: alpine lakes, manageable permits, and enough elevation to feel like the real Sierra. The backcountry here is massive and less picked-over than Yosemite.' },
  { name: 'Yosemite High Country', region: 'Sierra Nevada', difficulty: 'Moderate–Strenuous', distance: 'Various from Tuolumne Meadows', description: 'Tuolumne Meadows is the staging point for dozens of backcountry routes. Far fewer crowds than the valley. Cathedral Lakes, Young Lakes, and the Vogelsang loop are all solid options.' },
  { name: 'Joshua Tree', region: 'Southern California', difficulty: 'Easy–Moderate', distance: 'Various', description: '2.5 hours from Westwood. Desert bouldering, sunrise from Skull Rock, and some of the best stargazing in SoCal. Best months are October through April — summer is brutal.' },
  { name: 'Angeles National Forest', region: 'Los Angeles', difficulty: 'Easy–Strenuous', distance: 'Various', description: '45 minutes from campus. The San Gabriels are genuinely good — Mt. Baldy, Mount Islip, Mt. Wilson. Great for training hikes or quick overnight trips before a bigger Sierra push.' },
  { name: 'Channel Islands', region: 'Southern California', difficulty: 'Moderate', distance: 'Various by island', description: 'Anacapa and Santa Cruz are the most accessible. Book the Island Packers ferry early — it fills up. No resupply, no water on most islands, but almost no other people either.' },
  { name: 'Zion National Park', region: 'Utah', difficulty: 'Moderate–Expert', distance: 'Various', description: 'The Narrows and the Zion Traverse are both worth the drive. Permits for Angels Landing and the Narrows bottom-up fill fast. Great shoulder-season destination — hit it in March or October.' },
  { name: 'Death Valley', region: 'California', difficulty: 'Easy–Strenuous', distance: 'Various', description: 'November through February only. Mesquite Flat Dunes, Mosaic Canyon, Telescope Peak. The landscape is genuinely unlike anywhere else — go at least once.' },
]

const difficultyColor: Record<string, string> = {
  'Easy': 'bg-moss text-sage-dark',
  'Moderate': 'bg-sand text-soil',
  'Easy–Moderate': 'bg-sand text-soil',
  'Moderate–Strenuous': 'bg-rose text-terra-dark',
  'Moderate–Expert': 'bg-rose text-terra-dark',
  'Strenuous': 'bg-rose text-terra-dark',
  'Expert': 'bg-terra text-parchment',
}

export default function WhereToGoPage() {
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
              { '@type': 'ListItem', position: 3, name: 'Where to Go', item: 'https://www.uclabackpackingclub.com/resources/where-to-go' },
            ],
          }),
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          path: '/resources/where-to-go',
          name: 'Where to Go',
          description: 'Backpacking and hiking destination ideas near UCLA, across California, and throughout the Southwest.',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/resources/where-to-go',
          name: 'Backpacking destinations',
          description: 'Destinations TUBC members recommend for backpacking, camping, and hiking.',
          items: destinations.map((destination) => ({
            name: destination.name,
            description: `${destination.region}. ${destination.distance}. ${destination.difficulty}. ${destination.description}`,
          })),
        })}
      />
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Where to Go</h1>
          <p className="text-soil text-lg">Spots we&apos;ve actually been, with real beta on what to expect. From the San Gabriels to the Sierra to southern Utah.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {destinations.map((dest) => (
              <div key={dest.name} className="bg-parchment-dark border border-sand rounded-md p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="font-display text-lg font-bold text-bark">{dest.name}</h2>
                    <p className="text-soil text-xs mt-0.5">{dest.region}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-md font-medium shrink-0 ${difficultyColor[dest.difficulty] ?? 'bg-sand text-soil'}`}>
                    {dest.difficulty}
                  </span>
                </div>
                <p className="text-soil text-sm leading-relaxed mb-3">{dest.description}</p>
                <p className="text-soil/60 text-xs">{dest.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
