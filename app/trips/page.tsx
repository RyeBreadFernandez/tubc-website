import PageHero from '@/components/ui/PageHero'
import CalendarEvents from '@/components/CalendarEvents'

export const metadata = {
  title: 'Trips & Events',
  description: 'Upcoming backpacking and hiking trips from The Backpacking Club at UCLA.',
}

const CALENDAR_ID = 'uclabackpackingclub@gmail.com'
const CALENDAR_EMBED_SRC = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&mode=MONTH`
const CALENDAR_ADD_URL = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(CALENDAR_ID)}`

export default function TripsPage() {
  return (
    <main className="flex-1 pt-16">
      <PageHero
        title="Trips & Events"
        subtitle="Every trip is a chance to go somewhere new. Our trips fill up quickly — check the calendar and sign up early."
        image="/trips-hero.jpg"
        imagePosition="center 30%"
      />

      {/* Upcoming events cards */}
      <section className="py-16 bg-parchment">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3 text-center">Club calendar</p>
          <h2 className="font-display text-2xl md:text-3xl text-bark font-bold mb-8 text-center">
            Upcoming Events
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
