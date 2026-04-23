import Link from 'next/link'

export const metadata = { title: 'Entrance Fees — TUBC Resources' }

const fees = [
  { park: 'Yosemite NP', vehicle: '$35', individual: '$20', annual: 'America the Beautiful', notes: 'Reservations required May–Sept in addition to fee.' },
  { park: 'Sequoia & Kings Canyon NP', vehicle: '$35', individual: '$20', annual: 'America the Beautiful', notes: 'Same pass covers both parks.' },
  { park: 'Joshua Tree NP', vehicle: '$30', individual: '$15', annual: 'America the Beautiful', notes: '' },
  { park: 'Death Valley NP', vehicle: '$30', individual: '$15', annual: 'America the Beautiful', notes: 'Valid for 7 days.' },
  { park: 'Zion NP', vehicle: '$35', individual: '$20', annual: 'America the Beautiful', notes: 'Shuttle free with park admission.' },
  { park: 'Channel Islands NP', vehicle: 'Free (no entrance)', individual: 'Free', annual: '—', notes: 'Pay for ferry separately (~$60/person).' },
  { park: 'Angeles National Forest', vehicle: 'Adventure Pass $5/day', individual: 'N/A', annual: '$30/yr', notes: 'Required at many trailheads. Annual America the Beautiful pass accepted.' },
  { park: 'Inyo National Forest', vehicle: 'Free (some areas)', individual: 'Free', annual: '—', notes: 'Wilderness permits may have a fee. Check recreation.gov.' },
  { park: 'Mojave National Preserve', vehicle: 'Free', individual: 'Free', annual: '—', notes: 'No entrance fee.' },
]

export default function EntranceFeesPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Entrance Fees</h1>
          <p className="text-soil text-lg">Know what you&apos;ll pay before you get to the gate — and how to save.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-moss rounded-md p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-bark mb-3">America the Beautiful Pass — $80/year</h2>
            <p className="text-soil text-sm leading-relaxed mb-3">
              The single best investment for frequent hikers. One pass covers the entrance fee for all national parks and many federal recreation areas for one full year. Split with a friend or carpool group and it pays for itself in one trip.
            </p>
            <p className="text-soil text-sm">
              Buy it at any national park entrance or at <span className="font-medium text-bark">usgs.gov/passes</span>.
            </p>
          </div>

          <div className="overflow-x-auto rounded-md border border-sand">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment-dark border-b border-sand">
                  <th className="text-left px-5 py-3 text-bark font-semibold">Park / Forest</th>
                  <th className="text-left px-5 py-3 text-bark font-semibold">Vehicle</th>
                  <th className="text-left px-5 py-3 text-bark font-semibold">On Foot</th>
                  <th className="text-left px-5 py-3 text-bark font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((row, i) => (
                  <tr key={row.park} className={i % 2 === 0 ? 'bg-parchment' : 'bg-parchment-dark'}>
                    <td className="px-5 py-3 text-bark font-medium">{row.park}</td>
                    <td className="px-5 py-3 text-soil">{row.vehicle}</td>
                    <td className="px-5 py-3 text-soil">{row.individual}</td>
                    <td className="px-5 py-3 text-soil/70 text-xs hidden md:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-soil/50 mt-3">Fees as of 2025. Verify current rates at nps.gov before your trip.</p>
        </div>
      </section>
    </main>
  )
}
