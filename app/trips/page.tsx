import PageHero from '@/components/ui/PageHero'
import CalendarEvents from '@/components/CalendarEvents'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trips & Events | The Backpacking Club at UCLA',
  description: 'Browse upcoming backpacking and hiking trips from The Backpacking Club at UCLA. Free to join — all levels welcome, from day hikes to multi-day Sierra crossings.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/trips',
  },
  openGraph: {
    title: 'Trips & Events | The Backpacking Club at UCLA',
    description: 'Browse upcoming backpacking and hiking trips from The Backpacking Club at UCLA. Free to join — all levels welcome.',
    url: 'https://www.uclabackpackingclub.com/trips',
    images: [{ url: '/trips-hero.jpg', width: 1200, height: 630, alt: 'TUBC trips and events' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trips & Events | The Backpacking Club at UCLA',
    description: 'Browse upcoming backpacking and hiking trips from The Backpacking Club at UCLA. Free to join — all levels welcome.',
    images: ['/trips-hero.jpg'],
  },
}

const CALENDAR_ID = 'uclabackpackingclub@gmail.com'
const CALENDAR_EMBED_SRC = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&mode=MONTH`
const CALENDAR_ADD_URL = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(CALENDAR_ID)}`

export default function TripsPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
              { '@type': 'ListItem', position: 2, name: 'Trips & Events', item: 'https://www.uclabackpackingclub.com/trips' },
            ],
          }),
        }}
      />
      <PageHero
        title="Trips & Events"
        subtitle="Browse upcoming trips and add them to your calendar. Join our Slack to sign up once you spot one you want."
        image="/trips-hero.jpg"
        imagePosition="center 30%"
      />

      {/* Upcoming events cards */}
      <section className="py-16 bg-parchment">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3 text-center">Club calendar</p>
          <h2 className="font-display text-2xl md:text-3xl text-bark font-bold mb-8 text-center">
            What&apos;s Coming Up
          </h2>
          <CalendarEvents />
        </div>
      </section>

      {/* Full Google Calendar embed */}
      <section className="py-16 bg-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Full schedule</p>
              <h2 className="font-display text-2xl md:text-3xl text-bark font-bold">Monthly View</h2>
            </div>
            <a
              href={CALENDAR_ADD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add to your calendar
            </a>
          </div>
          <div className="rounded-md overflow-hidden border border-border shadow-sm">
            <iframe
              src={CALENDAR_EMBED_SRC}
              className="w-full"
              style={{ height: '600px', border: 0 }}
              title="TUBC Club Calendar"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
