import Link from 'next/link'

export const metadata = { title: 'Parks & Monuments — TUBC Resources' }

const parks = [
  { name: 'Yosemite National Park', state: 'CA', description: 'Valley, High Sierra, Tuolumne Meadows. Iconic for a reason. Reservations required May–Sept for day use. Wilderness permits required for overnight.' },
  { name: 'Sequoia & Kings Canyon NP', state: 'CA', description: 'Giant trees and the deepest canyon in North America. Less crowded than Yosemite. TUBC\'s most-visited Sierra park.' },
  { name: 'Joshua Tree NP', state: 'CA', description: 'Desert hiking, climbing, and stargazing. No water in backcountry — pack everything in.' },
  { name: 'Death Valley NP', state: 'CA / NV', description: 'Largest national park in the contiguous US. Best Nov–Feb. No permits required for most camping.' },
  { name: 'Channel Islands NP', state: 'CA', description: 'Accessible only by boat. Pristine coastline, endemic wildlife. Reserve ferry and campsite well in advance.' },
  { name: 'Zion National Park', state: 'UT', description: 'Narrows, Angels Landing, Zion Traverse. Shuttle system in peak season. Permits required for Angels Landing and Zion Narrows bottom-up.' },
  { name: 'Inyo National Forest', state: 'CA', description: 'Manages access to many iconic eastern Sierra destinations including Whitney, Bishop area, and the JMT.' },
  { name: 'Angeles National Forest', state: 'CA', description: 'Our local backyard. No entrance fee. Adventure Pass required for parking at some trailheads.' },
  { name: 'Los Padres National Forest', state: 'CA', description: 'Stretches from Ventura to Big Sur. Condor wilderness, hot springs, and rugged terrain.' },
  { name: 'Mojave National Preserve', state: 'CA', description: 'Often overlooked gem. Lava tubes, sand dunes, Joshua trees, historic mining sites. No entrance fee.' },
]

export default function ParksMonumentsPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Parks & Monuments</h1>
          <p className="text-soil text-lg">Know before you go. An overview of the parks and forests we visit most.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {parks.map(({ name, state, description }) => (
            <div key={name} className="bg-parchment-dark border border-sand rounded-2xl p-6 flex gap-5">
              <div className="shrink-0 w-14 text-center">
                <span className="text-xs font-semibold text-soil/60 uppercase tracking-wide">{state}</span>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-bark mb-2">{name}</h2>
                <p className="text-soil text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
