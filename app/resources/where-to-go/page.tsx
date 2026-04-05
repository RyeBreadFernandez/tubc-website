import Link from 'next/link'

export const metadata = { title: 'Where to Go — TUBC Resources' }

const destinations = [
  { name: 'John Muir Trail', region: 'Sierra Nevada', difficulty: 'Expert', distance: '211 miles end-to-end', description: 'The classic long-distance trail through the High Sierra. Section hikes are popular for shorter trips.' },
  { name: 'Sequoia & Kings Canyon', region: 'Sierra Nevada', difficulty: 'Moderate–Expert', distance: 'Various', description: 'Giant trees, deep canyons, and incredible backcountry. Rae Lakes Loop is a TUBC favorite.' },
  { name: 'Yosemite High Country', region: 'Sierra Nevada', difficulty: 'Moderate–Strenuous', distance: 'Various', description: 'Tuolumne Meadows area. Less crowded than the valley with stunning alpine scenery.' },
  { name: 'Joshua Tree', region: 'Southern California', difficulty: 'Easy–Moderate', distance: 'Various', description: 'Desert scrambling, bouldering, and stargazing. Great for fall, winter, and spring trips.' },
  { name: 'Angeles National Forest', region: 'Los Angeles', difficulty: 'Easy–Strenuous', distance: 'Various', description: 'Right in our backyard. San Gabriels have excellent trails 45 minutes from campus.' },
  { name: 'Channel Islands', region: 'Southern California', difficulty: 'Moderate', distance: 'Various', description: 'Island camping with incredible marine wildlife. Requires a ferry — plan ahead.' },
  { name: 'Zion National Park', region: 'Utah', difficulty: 'Moderate–Expert', distance: 'Various', description: 'Narrows, Angels Landing, and the backcountry Zion Traverse. A classic road trip destination.' },
  { name: 'Death Valley', region: 'California', difficulty: 'Easy–Strenuous', distance: 'Various', description: 'Best in November–February. Dunes, canyons, and the lowest point in North America.' },
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
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Where to Go</h1>
          <p className="text-soil text-lg">From backyard hikes to bucket-list Sierra crossings — destinations we love.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {destinations.map((dest) => (
              <div key={dest.name} className="bg-parchment-dark border border-sand rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="font-display text-lg font-bold text-bark">{dest.name}</h2>
                    <p className="text-soil text-xs mt-0.5">{dest.region}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${difficultyColor[dest.difficulty] ?? 'bg-sand text-soil'}`}>
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
