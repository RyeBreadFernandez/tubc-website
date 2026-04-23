import Link from 'next/link'

export const metadata = { title: 'Gear Rental — TUBC Resources' }

const gear = [
  { item: 'Backpack (50–65L)', price: '$10/weekend', notes: 'Multiple sizes. Osprey and Gregory frames.' },
  { item: 'Tent (2-person)', price: '$15/weekend', notes: 'Freestanding 3-season. Stakes included.' },
  { item: 'Sleeping Bag (20°F)', price: '$10/weekend', notes: 'Down fill. Stuff sack included.' },
  { item: 'Sleeping Pad (foam)', price: '$5/weekend', notes: 'Lightweight closed-cell foam.' },
  { item: 'Sleeping Pad (inflatable)', price: '$8/weekend', notes: 'Self-inflating. R-value 3.' },
  { item: 'Camp Stove + Canister', price: '$8/weekend', notes: 'MSR PocketRocket or similar.' },
  { item: 'Water Filter', price: '$5/weekend', notes: 'Sawyer Squeeze or similar.' },
  { item: 'Bear Canister', price: '$5/weekend', notes: 'Required in many Sierra areas.' },
  { item: 'Trekking Poles (pair)', price: '$5/weekend', notes: 'Adjustable. Various sizes.' },
  { item: 'Headlamp', price: '$3/weekend', notes: 'Black Diamond or Petzl.' },
]

export default function GearRentalPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Gear Rental</h1>
          <p className="text-soil text-lg">Don&apos;t have gear? Borrow from the club. Rental is open to all TUBC members.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-moss rounded-md p-6 mb-8">
            <h2 className="font-display text-lg font-bold text-bark mb-2">How to Rent</h2>
            <ol className="space-y-2 text-soil text-sm list-decimal list-inside">
              <li>Check availability by messaging the Gear Manager on Slack (#gear-rental)</li>
              <li>Reserve your gear at least 3 days before your trip</li>
              <li>Pick up and return to the gear closet at the designated time</li>
              <li>Inspect gear on pickup — report any damage immediately</li>
            </ol>
          </div>

          <div className="overflow-hidden border border-sand rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-parchment-dark border-b border-sand">
                  <th className="text-left px-5 py-3 text-bark font-semibold">Item</th>
                  <th className="text-left px-5 py-3 text-bark font-semibold">Price</th>
                  <th className="text-left px-5 py-3 text-bark font-semibold hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {gear.map((row, i) => (
                  <tr key={row.item} className={i % 2 === 0 ? 'bg-parchment' : 'bg-parchment-dark'}>
                    <td className="px-5 py-3 text-bark font-medium">{row.item}</td>
                    <td className="px-5 py-3 text-terra font-semibold whitespace-nowrap">{row.price}</td>
                    <td className="px-5 py-3 text-soil hidden sm:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-rose/50 border border-sand rounded-md p-6 text-center">
            <p className="font-display text-lg text-bark font-bold mb-2">Ready to rent?</p>
            <p className="text-soil text-sm mb-4">Message the Gear Manager on Slack to check availability and reserve.</p>
            <a
              href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors"
            >
              Join Slack to Rent
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
