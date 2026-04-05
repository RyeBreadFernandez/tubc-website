import Link from 'next/link'

export const metadata = { title: 'Vocab — TUBC Resources' }

const terms = [
  { term: 'Backcountry', def: 'Remote areas away from roads and developed facilities. Usually requires a permit to camp.' },
  { term: 'Base Weight', def: 'The weight of your pack without consumables (food, water, fuel). Serious hikers track this obsessively.' },
  { term: 'Bear Box / Bear Canister', def: 'A hard-sided container used to store food and scented items away from bears. Required in many Sierra Nevada areas.' },
  { term: 'Bivy', def: 'Short for bivouac. A minimalist shelter — often just a waterproof bag that fits around your sleeping bag.' },
  { term: 'CAT Hole', def: 'A hole dug 6–8 inches deep, at least 200 feet from water, for human waste. Covered after use.' },
  { term: 'Cowboy Camping', def: 'Sleeping outside without a tent, under the stars. Great in dry weather.' },
  { term: 'Deadfall', def: 'Fallen trees or branches blocking a trail.' },
  { term: 'Elevation Gain', def: 'The total amount of uphill climbing on a route, measured in feet or meters.' },
  { term: 'FKT', def: 'Fastest Known Time. The record for completing a route as fast as possible.' },
  { term: 'HYOH', def: 'Hike Your Own Hike. A trail philosophy meaning: do what works for you, not what works for others.' },
  { term: 'JMT', def: 'The John Muir Trail — 211 miles through the Sierra Nevada from Yosemite to Mount Whitney.' },
  { term: 'Leave No Trace (LNT)', def: 'Seven principles for minimizing human impact in the outdoors. The foundation of backcountry ethics.' },
  { term: 'Mileage', def: 'Total distance of a hike. Usually measured round-trip (RT) or one-way (OW).' },
  { term: 'Post-holing', def: 'Sinking through snow with each step — exhausting. Gaiters and snowshoes help.' },
  { term: 'Shakedown Hike', def: 'A shorter trip to test your gear and fitness before a longer one.' },
  { term: 'Switchback', def: 'A zigzag trail pattern used to climb steep terrain.' },
  { term: 'Thru-hike', def: 'Hiking a long trail end-to-end in a single continuous journey.' },
  { term: 'Topo Map', def: 'Topographic map showing elevation contours. Essential for off-trail navigation.' },
  { term: 'Trailhead', def: 'The starting point of a trail, usually where the parking area and register are.' },
  { term: 'UL (Ultralight)', def: 'A style of backpacking that prioritizes minimizing pack weight, usually below 10 lbs base weight.' },
  { term: 'WAG Bag', def: 'Waste Alleviation and Gelling bag — used in areas where cat holes aren\'t allowed (like Mount Whitney Zone). Pack out your waste.' },
]

export default function VocabPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Vocab</h1>
          <p className="text-soil text-lg">Backpacking terms explained — from bear canisters to thru-hikes.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {terms.map(({ term, def }) => (
              <div key={term} className="bg-parchment-dark border border-sand rounded-xl px-6 py-4 flex gap-5">
                <span className="font-display font-bold text-terra shrink-0 w-36 text-sm pt-0.5">{term}</span>
                <p className="text-soil text-sm leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
