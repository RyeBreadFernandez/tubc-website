'use client'

import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import {
  Map,
  Compass,
  List,
  Tent,
  Package,
  BookOpen,
  Flame,
  HeartPulse,
  Trees,
  Mountain,
  Ticket,
  GraduationCap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Category = 'All' | 'Planning' | 'Gear' | 'On the Trail' | 'Club'

const resources: { title: string; href: string; icon: LucideIcon; description: string; category: Category }[] = [
  { title: 'Where to Go', href: '/resources/where-to-go', icon: Map, description: 'Curated destinations for every level — from day hikes to week-long expeditions.', category: 'Planning' },
  { title: 'Trail Guides', href: '/resources/trail-guides', icon: Compass, description: 'Detailed info on the trails we love, including maps, conditions, and beta.', category: 'Planning' },
  { title: 'Packing List', href: '/resources/packing-list', icon: List, description: 'Our tried-and-true gear checklist for overnight and multi-day trips.', category: 'Gear' },
  { title: 'Gear Rental', href: '/resources/gear-rental', icon: Tent, description: 'Borrow a pack, tent, sleeping bag, or pad from the club gear library.', category: 'Gear' },
  { title: 'How to Pack', href: '/resources/how-to-pack', icon: Package, description: 'Pack smarter, not heavier. Techniques for fitting everything in your bag.', category: 'Gear' },
  { title: 'Vocab', href: '/resources/vocab', icon: BookOpen, description: 'Backpacking and outdoor terms explained for beginners.', category: 'On the Trail' },
  { title: 'Backcountry Cooking', href: '/resources/backcountry-cooking', icon: Flame, description: 'Meal ideas, stove tips, and how to eat well on the trail.', category: 'On the Trail' },
  { title: 'First Aid', href: '/resources/first-aid', icon: HeartPulse, description: 'Wilderness first aid basics every hiker should know.', category: 'On the Trail' },
  { title: 'LA Hiking', href: '/resources/la-hiking', icon: Trees, description: 'The best hikes within an hour of UCLA campus.', category: 'Planning' },
  { title: 'Parks & Monuments', href: '/resources/parks-monuments', icon: Mountain, description: 'Know before you go — info on the parks we frequent.', category: 'Planning' },
  { title: 'Entrance Fees', href: '/resources/entrance-fees', icon: Ticket, description: 'Fees, passes, and how to save money in the national parks.', category: 'Planning' },
  { title: 'Seminars', href: '/resources/seminars', icon: GraduationCap, description: 'Notes and recordings from our workshops and skill sessions.', category: 'Club' },
]

const categories: Category[] = ['All', 'Planning', 'Gear', 'On the Trail', 'Club']

function ResourceGrid({ items }: { items: typeof resources }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(({ title, href, icon: Icon, description }) => (
        <Link key={href} href={href} className="group block">
          <Card className="h-full border-secondary hover:shadow-md hover:border-primary/30 transition-all bg-parchment-dark">
            <CardContent className="p-6">
              <Icon className="w-7 h-7 text-terra mb-4" strokeWidth={1.5} />
              <h2 className="font-display text-lg font-bold text-bark group-hover:text-primary transition-colors mb-2">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Knowledge base</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Resources</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Everything you need to plan your next adventure — from picking a destination to knowing what to eat at 11,000 feet.
          </p>
        </div>
      </section>

      <section className="py-12 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid lg:grid-cols-[1.2fr_2fr] gap-6 items-start">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Start here</p>
              <h2 className="font-display text-2xl md:text-3xl text-bark font-bold">Pick the guide that matches today&apos;s problem.</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                ['First overnight', '/resources/packing-list', 'Pack list, borrowed gear, and what not to overthink.'],
                ['No car, no problem', '/resources/la-hiking', 'Trail ideas close to campus and transit-friendly options.'],
                ['Leading a crew', '/resources/first-aid', 'Safety basics, evacuation calls, and field judgment.'],
              ].map(([title, href, copy]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md border border-sand bg-parchment-dark p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <h3 className="font-display text-lg font-bold text-bark">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{copy}</p>
                </Link>
              ))}
            </div>
          </div>

          <Tabs defaultValue="All">
            <div className="mb-8">
              <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0 w-full sm:w-max">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="flex-none rounded-md border border-secondary data-active:bg-primary data-active:text-primary-foreground data-active:border-primary px-4 py-1.5 text-sm font-semibold text-muted-foreground hover:text-bark transition-colors whitespace-nowrap"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="All">
              <ResourceGrid items={resources} />
            </TabsContent>
            {categories.slice(1).map((cat) => (
              <TabsContent key={cat} value={cat}>
                <ResourceGrid items={resources.filter((r) => r.category === cat)} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  )
}
