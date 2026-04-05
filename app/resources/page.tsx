import Link from 'next/link'

export const metadata = {
  title: 'Resources — TUBC',
  description: 'Guides, packing lists, trail info, and everything you need to get outside.',
}

const resources = [
  { title: 'Where to Go', href: '/resources/where-to-go', icon: '🗺', description: 'Curated destinations for every level — from day hikes to week-long expeditions.' },
  { title: 'Trail Guides', href: '/resources/trail-guides', icon: '🥾', description: 'Detailed info on the trails we love, including maps, conditions, and beta.' },
  { title: 'Packing List', href: '/resources/packing-list', icon: '🎒', description: 'Our tried-and-true gear checklist for overnight and multi-day trips.' },
  { title: 'Gear Rental', href: '/resources/gear-rental', icon: '⛺', description: 'Borrow a pack, tent, sleeping bag, or pad from the club gear library.' },
  { title: 'How to Pack', href: '/resources/how-to-pack', icon: '📦', description: 'Pack smarter, not heavier. Techniques for fitting everything in your bag.' },
  { title: 'Vocab', href: '/resources/vocab', icon: '📖', description: 'Backpacking and outdoor terms explained for beginners.' },
  { title: 'Backcountry Cooking', href: '/resources/backcountry-cooking', icon: '🍲', description: 'Meal ideas, stove tips, and how to eat well on the trail.' },
  { title: 'First Aid', href: '/resources/first-aid', icon: '🩹', description: 'Wilderness first aid basics every hiker should know.' },
  { title: 'LA Hiking', href: '/resources/la-hiking', icon: '🌇', description: 'The best hikes within an hour of UCLA campus.' },
  { title: 'Parks & Monuments', href: '/resources/parks-monuments', icon: '🏔', description: 'Know before you go — info on the parks we frequent.' },
  { title: 'Entrance Fees', href: '/resources/entrance-fees', icon: '💳', description: 'Fees, passes, and how to save money in the national parks.' },
  { title: 'Seminars', href: '/resources/seminars', icon: '📋', description: 'Notes and recordings from our workshops and skill sessions.' },
]

export default function ResourcesPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">Knowledge base</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Resources</h1>
          <p className="text-soil text-lg max-w-2xl">
            Everything you need to plan your next adventure — from picking a destination to knowing what to eat at 11,000 feet.
          </p>
        </div>
      </section>

      <section className="py-12 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map(({ title, href, icon, description }) => (
              <Link key={href} href={href} className="group block">
                <div className="bg-parchment-dark border border-sand rounded-2xl p-6 hover:shadow-md hover:border-terra/30 transition-all h-full">
                  <span className="text-3xl mb-4 block">{icon}</span>
                  <h2 className="font-display text-lg font-bold text-bark group-hover:text-terra transition-colors mb-2">
                    {title}
                  </h2>
                  <p className="text-soil text-sm leading-relaxed">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
