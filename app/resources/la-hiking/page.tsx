import Link from 'next/link'

export const metadata = { title: 'LA Hiking — TUBC Resources' }

const hikes = [
  { name: 'Runyon Canyon', area: 'Hollywood Hills', distance: '1.5–3.5 miles', difficulty: 'Easy–Moderate', notes: 'Off-leash dog park + city views. Crowded but quick. Great for a weekday workout.' },
  { name: 'Griffith Observatory Loop', area: 'Griffith Park', distance: '4 miles', difficulty: 'Moderate', notes: 'Iconic LA views. Park lower and hike up. Combine with observatory visit.' },
  { name: 'Sturtevant Falls', area: 'Angeles NF', distance: '3.8 miles RT', difficulty: 'Easy', notes: '45 min from campus. Beautiful 50-ft waterfall. Popular on weekends.' },
  { name: 'Mt. Lowe via Cobb Estate', area: 'Angeles NF', distance: '10 miles RT', difficulty: 'Strenuous', notes: 'Long approach, big views. Start early. No permit required.' },
  { name: 'Eaton Canyon Falls', area: 'Altadena', distance: '4 miles RT', difficulty: 'Easy', notes: 'Another waterfall close to Pasadena. Family-friendly.' },
  { name: 'San Jacinto Peak via Tram', area: 'San Bernardino NF', distance: '11 miles RT', difficulty: 'Moderate', notes: '90 min drive. Take the Palm Springs Aerial Tramway up, hike to the summit. Mind-bending transition from desert to alpine.' },
  { name: 'Mugu Peak Loop', area: 'Point Mugu SP', distance: '8 miles', difficulty: 'Moderate', notes: 'Santa Monica Mountains. Coastal views, wildflowers in spring. Combine with beach time.' },
  { name: 'Nicholas Flat – La Jolla Canyon', area: 'Point Mugu SP', distance: '9.5 miles', difficulty: 'Strenuous', notes: 'One of the best day hikes near LA. Remote feel, waterfall, swimming hole.' },
]

export default function LAHikingPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">LA Hiking</h1>
          <p className="text-soil text-lg">The best hikes within an hour or two of UCLA. No car? Many are Metro-accessible.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {hikes.map((hike) => (
              <div key={hike.name} className="bg-parchment-dark border border-sand rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold text-bark mb-0.5">{hike.name}</h2>
                <p className="text-terra text-xs font-semibold mb-3">{hike.area}</p>
                <p className="text-soil text-sm leading-relaxed mb-4">{hike.notes}</p>
                <div className="flex gap-4 text-xs text-soil/70">
                  <span>{hike.distance}</span>
                  <span>{hike.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
