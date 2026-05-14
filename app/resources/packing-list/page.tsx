import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Packing List',
  description: 'Complete backpacking packing list for overnight and multi-day trips — gear, clothing, food, safety, and Leave No Trace essentials from UCLA Backpacking Club.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/resources/packing-list',
  },
  openGraph: {
    title: 'Packing List | The Backpacking Club at UCLA',
    description: 'Complete backpacking packing list for overnight and multi-day trips — gear, clothing, food, safety, and Leave No Trace essentials.',
    url: 'https://www.uclabackpackingclub.com/resources/packing-list',
    images: [{ url: '/trips-hero.jpg', width: 1200, height: 630, alt: 'Backpacking packing list' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Packing List | The Backpacking Club at UCLA',
    description: 'Complete backpacking packing list for overnight and multi-day trips — gear, clothing, food, safety, and Leave No Trace essentials from UCLA Backpacking Club.',
    images: ['/trips-hero.jpg'],
  },
}

const categories = [
  {
    name: 'The Big Three',
    items: ['Backpack (40–65L)', 'Tent or shelter', 'Sleeping bag (rated for expected temps)', 'Sleeping pad'],
  },
  {
    name: 'Navigation',
    items: ['Topo map (printed)', 'Compass', 'GPS device or downloaded offline maps', 'Permit (if required)'],
  },
  {
    name: 'Clothing (layering system)',
    items: ['Moisture-wicking base layer', 'Insulating mid layer (fleece or puffy)', 'Waterproof shell jacket', 'Hiking pants or shorts', 'Warm hat + gloves', 'Sun hat', 'Merino wool socks (2–3 pairs)', 'Gaiters (for snow/mud)', 'Camp shoes or sandals'],
  },
  {
    name: 'Food & Water',
    items: ['Water filter or purification tablets', 'Water bottles or reservoir (3L capacity minimum)', 'Camp stove + fuel canister', 'Lighter + backup matches', 'Cookpot', 'Spork', 'Food for all meals + extra emergency rations', 'Bear canister or hang bag (required in many areas)', 'Trash bags'],
  },
  {
    name: 'Safety & First Aid',
    items: ['First aid kit', 'Emergency whistle', 'Headlamp + extra batteries', 'Emergency bivy or space blanket', 'Repair kit (duct tape, tent poles, stove parts)', 'Sunscreen SPF 30+', 'Bug repellent', 'Personal medications'],
  },
  {
    name: 'Leave No Trace',
    items: ['Waste trowel or cat hole digger', 'Waste bags (WAG bags for certain areas)', 'Biodegradable soap', 'Hand sanitizer'],
  },
  {
    name: 'Optional but Nice',
    items: ['Trekking poles', 'Camp towel', 'Power bank', 'Camera', 'Journal', 'Blister pads (Moleskin)', 'Sunglasses'],
  },
]

export default function PackingListPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: 'Packing List', path: '/resources/packing-list' }])} />
      <JsonLd
        data={webPageJsonLd({
          path: '/resources/packing-list',
          name: 'Packing List',
          description: 'A complete backpacking packing list for overnight and multi-day trips, organized by gear category.',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/resources/packing-list',
          name: 'Backpacking packing list',
          description: 'Backpacking gear, clothing, food, water, safety, and Leave No Trace essentials recommended by TUBC.',
          items: categories.flatMap((category) =>
            category.items.map((item) => ({
              name: item,
              description: category.name,
            })),
          ),
        })}
      />
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Packing List</h1>
          <p className="text-soil text-lg">What to bring on an overnight or multi-day backpacking trip. Adjust for trip length and season.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-parchment-dark border border-sand rounded-md p-6">
              <h2 className="font-display text-xl text-bark font-bold mb-4">{cat.name}</h2>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-soil text-sm">
                    <span className="mt-0.5 w-4 h-4 rounded border border-border shrink-0 inline-block" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-soil/60 text-xs text-center">Always check the specific requirements for your destination — some parks require bear canisters, have fire restrictions, or need specific permits.</p>
        </div>
      </section>
    </main>
  )
}
