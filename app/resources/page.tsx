'use client'

import Link from 'next/link'
import { useState } from 'react'

type Category = 'All' | 'Planning' | 'Gear' | 'On the Trail' | 'Club'

const resources: { title: string; href: string; icon: string; description: string; category: Category }[] = [
  { title: 'Where to Go', href: '/resources/where-to-go', icon: '🗺', description: 'Curated destinations for every level — from day hikes to week-long expeditions.', category: 'Planning' },
  { title: 'Trail Guides', href: '/resources/trail-guides', icon: '🥾', description: 'Detailed info on the trails we love, including maps, conditions, and beta.', category: 'Planning' },
  { title: 'Packing List', href: '/resources/packing-list', icon: '🎒', description: 'Our tried-and-true gear checklist for overnight and multi-day trips.', category: 'Gear' },
  { title: 'Gear Rental', href: '/resources/gear-rental', icon: '⛺', description: 'Borrow a pack, tent, sleeping bag, or pad from the club gear library.', category: 'Gear' },
  { title: 'How to Pack', href: '/resources/how-to-pack', icon: '📦', description: 'Pack smarter, not heavier. Techniques for fitting everything in your bag.', category: 'Gear' },
  { title: 'Vocab', href: '/resources/vocab', icon: '📖', description: 'Backpacking and outdoor terms explained for beginners.', category: 'On the Trail' },
  { title: 'Backcountry Cooking', href: '/resources/backcountry-cooking', icon: '🍲', description: 'Meal ideas, stove tips, and how to eat well on the trail.', category: 'On the Trail' },
  { title: 'First Aid', href: '/resources/first-aid', icon: '🩹', description: 'Wilderness first aid basics every hiker should know.', category: 'On the Trail' },
  { title: 'LA Hiking', href: '/resources/la-hiking', icon: '🌇', description: 'The best hikes within an hour of UCLA campus.', category: 'Planning' },
  { title: 'Parks & Monuments', href: '/resources/parks-monuments', icon: '🏔', description: 'Know before you go — info on the parks we frequent.', category: 'Planning' },
  { title: 'Entrance Fees', href: '/resources/entrance-fees', icon: '💳', description: 'Fees, passes, and how to save money in the national parks.', category: 'Planning' },
  { title: 'Seminars', href: '/resources/seminars', icon: '📋', description: 'Notes and recordings from our workshops and skill sessions.', category: 'Club' },
]

const categories: Category[] = ['All', 'Planning', 'Gear', 'On the Trail', 'Club']

export default function ResourcesPage() {
  const [active, setActive] = useState<Category>('All')
  const filtered = active === 'All' ? resources : resources.filter((r) => r.category === active)

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
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  active === cat
                    ? 'bg-terra text-parchment border-terra'
                    : 'bg-transparent text-soil border-sand hover:border-terra/50 hover:text-bark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(({ title, href, icon, description }) => (
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
