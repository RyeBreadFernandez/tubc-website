import Link from 'next/link'

export const metadata = { title: 'Seminars — TUBC Resources' }

const seminars = [
  { title: 'Intro to Backpacking', description: 'Everything a first-timer needs to know before their first overnight trip. Gear overview, packing demo, leave no trace principles, and trip planning basics.', frequency: 'Each new quarter' },
  { title: 'Navigation 101', description: 'How to read a topo map and use a compass. We cover declination, triangulation, and how to navigate when your phone dies.', frequency: 'Fall quarter' },
  { title: 'Wilderness First Aid Basics', description: 'An overview of common trail emergencies and how to respond: blisters, sprains, altitude sickness, hypothermia, and when to evacuate.', frequency: 'Winter quarter' },
  { title: 'Gear Deep Dive', description: 'Side-by-side comparisons of packs, shelters, sleep systems, and stoves. How to evaluate gear for your style and budget.', frequency: 'Spring quarter' },
  { title: 'Sierra Permit Workshop', description: 'A step-by-step walkthrough of the Yosemite, Whitney, and Kings Canyon permit systems. How to apply, backup strategies, and alternate routes.', frequency: 'Winter quarter (before permit season)' },
  { title: 'Women in the Outdoors', description: 'Gear, safety, and community for women and gender-nonconforming hikers. Led by TUBC members who want to see more representation on the trail.', frequency: 'As scheduled' },
  { title: 'Photography on the Trail', description: 'How to take great photos with your phone or camera on a backpacking trip. Light, composition, and protecting your gear.', frequency: 'As scheduled' },
]

export default function SeminarsPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Seminars</h1>
          <p className="text-soil text-lg">Free workshops and skill sessions open to all members. Check Slack for dates and RSVP links.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {seminars.map(({ title, description, frequency }) => (
            <div key={title} className="bg-parchment-dark border border-sand rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h2 className="font-display text-xl font-bold text-bark">{title}</h2>
                <span className="text-xs text-terra font-semibold bg-rose/60 px-3 py-1 rounded-full shrink-0">{frequency}</span>
              </div>
              <p className="text-soil text-sm leading-relaxed">{description}</p>
            </div>
          ))}

          <div className="bg-moss rounded-2xl p-6 text-center">
            <p className="font-display text-lg font-bold text-bark mb-2">Want to attend or lead a seminar?</p>
            <p className="text-soil text-sm mb-4">Join the Slack to see when the next one is scheduled, or pitch an idea to the officers.</p>
            <a
              href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-full text-sm transition-colors"
            >
              Join Slack
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
