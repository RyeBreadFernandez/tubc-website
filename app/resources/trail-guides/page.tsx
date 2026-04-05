import Link from 'next/link'

export const metadata = { title: 'Trail Guides — TUBC Resources' }

const guides = [
  { name: 'Rae Lakes Loop', park: 'Kings Canyon NP', days: '4–5 days', miles: '41 miles', difficulty: 'Strenuous', description: 'One of the most scenic loops in the Sierra. Alpine lakes, granite peaks, and reliable water. Requires permit — apply in advance.' },
  { name: 'Mount Whitney', park: 'Inyo NF', days: '1–3 days', miles: '22 miles RT', difficulty: 'Strenuous', description: 'Highest peak in the contiguous US at 14,505 ft. Day hike or overnight at Guitar Lake. Highly competitive permit lottery.' },
  { name: 'Half Dome', park: 'Yosemite NP', days: '1 day or overnight', miles: '16 miles RT', difficulty: 'Strenuous', description: 'Iconic cables route. Day hike permits required in addition to park entry. Start at 5am to beat the crowds.' },
  { name: 'Condor Gulch – High Peaks Loop', park: 'Pinnacles NP', days: '1 day', miles: '8.5 miles', difficulty: 'Moderate', description: 'Two-hour drive from LA. Rocky spires, California condors, and excellent views. Best in spring.' },
  { name: 'Chantry Flat to Sturtevant Falls', park: 'Angeles NF', days: '1 day', miles: '3.8 miles RT', difficulty: 'Easy', description: 'A quick favorite 45 minutes from campus. Waterfall payoff makes it great for first-timers.' },
  { name: 'San Jacinto Peak via Palm Springs Aerial Tramway', park: 'San Bernardino NF', days: '1 day', miles: '11 miles RT', difficulty: 'Moderate', description: 'Take the tram up 8,000 ft, then hike to the 10,834 ft summit. Surreal to be above the desert.' },
]

const difficultyColor: Record<string, string> = {
  Easy: 'bg-moss text-sage-dark',
  Moderate: 'bg-sand text-soil',
  Strenuous: 'bg-rose text-terra-dark',
  Expert: 'bg-terra text-parchment',
}

export default function TrailGuidesPage() {
  return (
    <main className="flex-1 pt-16">
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
            <div key={guide.name} className="bg-parchment-dark border border-sand rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-bark">{guide.name}</h2>
                  <p className="text-soil text-xs mt-0.5">{guide.park}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyColor[guide.difficulty]}`}>
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
