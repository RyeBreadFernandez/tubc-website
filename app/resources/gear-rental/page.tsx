import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gear Rental',
  description: 'Rent backpacking gear through UCLA Outdoor Adventures Equipment Rental Center — tents, sleeping bags, packs, bear canisters, and more. Recreation membership included in UCLA student fees.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/resources/gear-rental',
  },
  openGraph: {
    title: 'Gear Rental | UCLA Backpacking Club',
    description: 'Rent backpacking gear through UCLA Outdoor Adventures Equipment Rental Center — affordable rates for Recreation members (included in UCLA student fees).',
    url: 'https://www.uclabackpackingclub.com/resources/gear-rental',
    images: [{ url: '/trips-hero.jpg', width: 1200, height: 630, alt: 'TUBC gear rental' }],
    type: 'website',
  },
}

interface Rates {
  d5: string
  d6_9: string
  d21: string
  late: string
}

interface GearItem {
  item: string
  description: string
  member: Rates
  nonMember: Rates & { replacement: string }
}

const essential: GearItem[] = [
  {
    item: 'Backpack, overnight',
    description: 'Internal frame, up to 85L; suitable for short or long backpacking trips',
    member: { d5: '$25', d6_9: '$30', d21: '$52', late: '$8' },
    nonMember: { d5: '$38', d6_9: '$45', d21: '$78', late: '$13', replacement: '$475' },
  },
  {
    item: 'Ground pad',
    description: 'ThermaRest RidgeRest or similar; foam; used with a sleeping bag for warmth',
    member: { d5: '$10', d6_9: '$12', d21: '$21', late: '$3' },
    nonMember: { d5: '$15', d6_9: '$18', d21: '$32', late: '$5', replacement: '$60' },
  },
  {
    item: 'Sleeping bag',
    description: 'Mummy shape; synthetic fill; 0° or 20°; short, regular, or long lengths',
    member: { d5: '$22', d6_9: '$26', d21: '$48', late: '$7' },
    nonMember: { d5: '$33', d6_9: '$40', d21: '$72', late: '$11', replacement: '$240' },
  },
  {
    item: 'Tent, 2-person',
    description: '3-season; includes tarp, stakes, cord, and rainfly',
    member: { d5: '$20', d6_9: '$24', d21: '$39', late: '$7' },
    nonMember: { d5: '$30', d6_9: '$36', d21: '$59', late: '$10', replacement: '$190' },
  },
  {
    item: 'Tent, 4-person',
    description: '3-season; includes tarp, stakes, cord, and rainfly',
    member: { d5: '$26', d6_9: '$31', d21: '$52', late: '$9' },
    nonMember: { d5: '$39', d6_9: '$47', d21: '$78', late: '$13', replacement: '$240' },
  },
]

const other: GearItem[] = [
  {
    item: 'Bear canister',
    description: 'BearVault BV500 or similar, 11.5L; see-through body',
    member: { d5: '$6', d6_9: '$7', d21: '$10', late: '$2' },
    nonMember: { d5: '$9', d6_9: '$11', d21: '$15', late: '$3', replacement: '$125' },
  },
  {
    item: 'Daypack',
    description: '38L; internal frame; for day hikes — not intended for overnight use',
    member: { d5: '$15', d6_9: '$18', d21: '$35', late: '$5' },
    nonMember: { d5: '$23', d6_9: '$27', d21: '$53', late: '$8', replacement: '$200' },
  },
  {
    item: 'Snowshoes',
    description: 'MSR Evo or similar, adjustable size. Not snowboots.',
    member: { d5: '$15', d6_9: '$18', d21: '$35', late: '$5' },
    nonMember: { d5: '$23', d6_9: '$27', d21: '$53', late: '$8', replacement: '$230' },
  },
  {
    item: 'Camping chair',
    description: 'Large folding canvas chair',
    member: { d5: '$12', d6_9: '$14', d21: '$26', late: '$4' },
    nonMember: { d5: '$18', d6_9: '$22', d21: '$39', late: '$6', replacement: '$95' },
  },
  {
    item: 'Lantern',
    description: 'Requires 4 D-batteries (not included)',
    member: { d5: '$4', d6_9: '$5', d21: '$8', late: '$1' },
    nonMember: { d5: '$6', d6_9: '$7', d21: '$12', late: '$2', replacement: '$50' },
  },
  {
    item: 'Trowel',
    description: 'Plastic hand shovel for digging catholes',
    member: { d5: '$1', d6_9: '$1', d21: '$2', late: '$1' },
    nonMember: { d5: '$2', d6_9: '$2', d21: '$3', late: '$1', replacement: '$10' },
  },
]

function SectionRow({ label }: { label: string }) {
  return (
    <tr className="bg-accent">
      <td colSpan={10} className="px-4 py-2 text-bark font-semibold text-xs uppercase tracking-wide">
        {label}
      </td>
    </tr>
  )
}

function GearRow({ row, shade }: { row: GearItem; shade: boolean }) {
  const bg = shade ? 'bg-secondary' : 'bg-background'
  return (
    <tr className={bg}>
      <td className="px-4 py-3 text-bark font-medium text-sm align-top min-w-[130px]">
        <span className="block">{row.item}</span>
        <span className="block text-muted-foreground text-xs mt-0.5 font-normal hidden md:block">{row.description}</span>
      </td>
      <td className="px-3 py-3 text-center text-sm text-foreground">{row.member.d5}</td>
      <td className="px-3 py-3 text-center text-sm text-foreground hidden sm:table-cell">{row.member.d6_9}</td>
      <td className="px-3 py-3 text-center text-sm text-foreground hidden lg:table-cell">{row.member.d21}</td>
      <td className="px-3 py-3 text-center text-sm text-muted-foreground hidden lg:table-cell">{row.member.late}</td>
      <td className="px-3 py-3 text-center text-sm text-foreground">{row.nonMember.d5}</td>
      <td className="px-3 py-3 text-center text-sm text-foreground hidden sm:table-cell">{row.nonMember.d6_9}</td>
      <td className="px-3 py-3 text-center text-sm text-foreground hidden lg:table-cell">{row.nonMember.d21}</td>
      <td className="px-3 py-3 text-center text-sm text-muted-foreground hidden lg:table-cell">{row.nonMember.late}</td>
      <td className="px-3 py-3 text-center text-sm text-muted-foreground hidden xl:table-cell">{row.nonMember.replacement}</td>
    </tr>
  )
}

export default function GearRentalPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-foreground font-bold mt-4 mb-3">Gear Rental</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            UCLA students can rent backpacking gear through the{' '}
            <span className="text-foreground font-medium">UCLA Outdoor Adventures Equipment Rental Center</span>{' '}
            at the back of the John Wooden Center. Recreation membership is included in UCLA student fees — most members qualify for the Recreation Member rate.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted rounded-md p-6 mb-8">
            <h2 className="font-display text-lg font-bold text-foreground mb-3">How to Rent</h2>
            <ol className="space-y-2 text-muted-foreground text-sm list-decimal list-inside">
              <li>Head to the Equipment Rental Center at the <span className="text-foreground">back of the John Wooden Center</span></li>
              <li>Bring your BruinCard — Recreation membership is bundled with UCLA student fees</li>
              <li>Check in-person availability; reservations recommended for busy weekends</li>
              <li>Inspect all gear at pickup and report any pre-existing damage before leaving</li>
            </ol>
            <p className="text-muted-foreground text-xs mt-4">
              Prices below are from the 2026 Winter pricing sheet.{' '}
              <a
                href="https://ucla.app.box.com/s/dqib8ox9wi48az372vydypkd8qnp1o3x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                View the full pricing sheet on Box ↗
              </a>
            </p>
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="px-4 py-3 text-left text-foreground font-semibold" rowSpan={2}>Item</th>
                  <th colSpan={4} className="px-3 py-2 text-center text-foreground font-semibold border-b border-border border-l border-border">
                    Recreation Member
                  </th>
                  <th colSpan={5} className="px-3 py-2 text-center text-foreground font-semibold border-b border-border border-l border-border">
                    Non-Member of Recreation
                  </th>
                </tr>
                <tr className="bg-secondary border-b border-border">
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs border-l border-border">Up to 5 days</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden sm:table-cell">6–9 Days</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden lg:table-cell">Up to 3 Weeks</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden lg:table-cell">Late Fee/day</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs border-l border-border">Up to 5 days</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden sm:table-cell">6–9 Days</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden lg:table-cell">Up to 3 Weeks</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden lg:table-cell">Late Fee/day</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium text-xs hidden xl:table-cell">Replacement</th>
                </tr>
              </thead>
              <tbody>
                <SectionRow label="Essential Equipment" />
                {essential.map((row, i) => (
                  <GearRow key={row.item} row={row} shade={i % 2 !== 0} />
                ))}
                <SectionRow label="Other Equipment" />
                {other.map((row, i) => (
                  <GearRow key={row.item} row={row} shade={i % 2 !== 0} />
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground text-xs mt-3">
            Columns hidden on small screens: 6–9 Days, Up to 3 Weeks, Late Fee, Replacement. View full sheet on Box for all details.
          </p>

          <div className="mt-8 bg-secondary border border-border rounded-md p-6 text-center">
            <p className="font-display text-lg text-foreground font-bold mb-2">Need the full price list?</p>
            <p className="text-muted-foreground text-sm mb-4">Download the official UCLA Outdoor Adventures pricing sheet for all rates and policies.</p>
            <a
              href="https://ucla.app.box.com/s/dqib8ox9wi48az372vydypkd8qnp1o3x"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-primary hover:opacity-90 text-primary-foreground font-semibold rounded-md text-sm transition-opacity"
            >
              View Pricing Sheet on Box ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
