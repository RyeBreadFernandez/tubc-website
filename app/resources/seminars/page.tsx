import { serializeJsonLd } from '@/lib/json-ld'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { itemListJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Seminars',
  description: 'Free workshops from UCLA Backpacking Club — intro to backpacking, navigation, wilderness first aid, gear deep dives, Sierra permit strategy, and more.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/resources/seminars',
  },
  openGraph: {
    title: 'Seminars | The Backpacking Club at UCLA',
    description: 'Free workshops from UCLA Backpacking Club — intro to backpacking, navigation, wilderness first aid, gear deep dives, and Sierra permit strategy.',
    url: 'https://www.uclabackpackingclub.com/resources/seminars',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'TUBC seminars and workshops' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seminars | The Backpacking Club at UCLA',
    description: 'Free workshops from UCLA Backpacking Club — intro to backpacking, navigation, wilderness first aid, gear deep dives, Sierra permit strategy, and more.',
    images: ['/staff-group.jpg'],
  },
}

const seminars = [
  { title: 'Intro to Backpacking', description: 'Never backpacked before? This is the one to start with. We cover what to pack, how to fit a rental pack, Leave No Trace basics, and what to actually expect on your first overnight.', frequency: 'Each new quarter' },
  { title: 'Navigation 101', description: 'How to read a topo map and use a compass — because your phone dies at the worst moment. We cover contour lines, declination, triangulation, and how to navigate off-trail in the Sierra.', frequency: 'Fall quarter' },
  { title: 'Wilderness First Aid Basics', description: 'Blisters, altitude sickness, twisted ankles, hypothermia. What to do when something goes wrong on the trail and the trailhead is 10 miles back. Not a substitute for a WFA course, but a solid starting point.', frequency: 'Winter quarter' },
  { title: 'Gear Deep Dive', description: 'We bring out the gear and compare it side-by-side — packs, shelters, sleep systems, stoves. How to tell what\'s actually worth the money versus what\'s just expensive.', frequency: 'Spring quarter' },
  { title: 'Sierra Permit Workshop', description: 'The Whitney lottery. Yosemite wilderness permits. Kings Canyon zone quotas. We walk through how each system works, when to apply, and what your backup options look like if you miss the first round.', frequency: 'Winter quarter (before permit season)' },
  { title: 'Women in the Outdoors', description: 'Gear fit, safety considerations, and trail community for women and gender-nonconforming hikers. Led by TUBC members. The backcountry should feel like yours too.', frequency: 'As scheduled' },
  { title: 'Photography on the Trail', description: 'Golden hour at 11,000 feet looks incredible. This session covers how to actually capture it — phone or camera, composition, light, and keeping your gear alive in the cold.', frequency: 'As scheduled' },
]

export default function SeminarsPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
              { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.uclabackpackingclub.com/resources' },
              { '@type': 'ListItem', position: 3, name: 'Seminars', item: 'https://www.uclabackpackingclub.com/resources/seminars' },
            ],
          }),
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          path: '/resources/seminars',
          name: 'Seminars',
          description: 'Free UCLA Backpacking Club workshops on backpacking, navigation, wilderness first aid, gear, permits, and outdoor skills.',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/resources/seminars',
          name: 'TUBC seminars and workshops',
          description: 'Recurring outdoor education workshops from The Backpacking Club at UCLA.',
          items: seminars.map((seminar) => ({
            name: seminar.title,
            description: `${seminar.description} Frequency: ${seminar.frequency}.`,
          })),
        })}
      />
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
            <div key={title} className="bg-parchment-dark border border-sand rounded-md p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h2 className="font-display text-xl font-bold text-bark">{title}</h2>
                <span className="text-xs text-terra font-semibold bg-rose/60 px-3 py-1 rounded-md shrink-0">{frequency}</span>
              </div>
              <p className="text-soil text-sm leading-relaxed">{description}</p>
            </div>
          ))}

          <div className="bg-moss rounded-md p-6 text-center">
            <p className="font-display text-lg font-bold text-bark mb-2">Want to come — or run one yourself?</p>
            <p className="text-soil text-sm mb-4">Dates and RSVP links go out in Slack. If you have a topic you want to see covered, message the officers and we can make it happen.</p>
            <a
              href="https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors"
            >
              Join Slack
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
