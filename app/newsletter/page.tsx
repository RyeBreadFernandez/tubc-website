import NewsletterSignup from '@/components/NewsletterSignup'
import { fetchNewsletters } from '@/lib/mailchimp'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'The UCLA Backpacking Club newsletter — trip recaps, gear tips, and club news. Read past issues and subscribe to get the next one in your inbox.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/newsletter',
  },
  openGraph: {
    title: 'Newsletter | The Backpacking Club at UCLA',
    description: 'The UCLA Backpacking Club newsletter — trip recaps, gear tips, and club news. Read past issues and subscribe.',
    url: 'https://www.uclabackpackingclub.com/newsletter',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club Newsletter' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsletter | The Backpacking Club at UCLA',
    description: 'The UCLA Backpacking Club newsletter — trip recaps, gear tips, and club news. Read past issues and subscribe.',
    images: ['/staff-group.jpg'],
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export default async function NewsletterPage() {
  const issues = await fetchNewsletters()
  const [latest, ...rest] = issues

  return (
    <main id="main-content" className="flex-1 pt-16">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Newsletter', path: '/newsletter' }])} />
      <JsonLd
        data={webPageJsonLd({
          path: '/newsletter',
          name: 'Newsletter',
          description: 'TUBC newsletter archive with trip recaps, gear notes, route beta, and club news.',
          type: 'CollectionPage',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/newsletter',
          name: 'TUBC newsletter archive',
          description: 'Past newsletter issues from The Backpacking Club at UCLA.',
          items: issues.map((issue) => ({
            name: issue.title,
            description: issue.subject,
            url: issue.archiveUrl,
          })),
        })}
      />
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Newsletter</h1>
          <p className="text-soil text-lg">Trip reports, gear writeups, and what we&apos;re planning next — straight from the people running the club.</p>
        </div>
      </section>

      {/* Signup */}
      <section className="py-10 bg-moss">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-bark font-semibold mb-4">Drop your email — we&apos;ll send you the next one</p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Latest issue hero */}
      {latest && (
        <section className="py-16 bg-parchment border-b border-sand">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-terra text-xs font-semibold uppercase tracking-widest mb-4">Latest Issue</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="text-soil/60 text-sm mb-1">{formatDate(latest.sentAt)}</p>
                <h2 className="font-display text-3xl md:text-4xl text-bark font-bold leading-tight">{latest.title}</h2>
                {latest.subject !== latest.title && (
                  <p className="text-soil mt-2 text-base">{latest.subject}</p>
                )}
              </div>
              <a
                href={latest.archiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read issue: ${latest.title}`}
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md transition-colors text-base"
              >
                Read Issue
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Archive */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {rest.length > 0 && <h2 className="font-display text-2xl text-bark font-bold mb-8">Past Issues</h2>}

          {issues.length > 0 ? (
            <div className="space-y-4">
              {rest.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-parchment border border-sand rounded-md p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="shrink-0">
                    <p className="text-sm text-soil/60">{formatDate(issue.sentAt)}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-bark">{issue.title}</h3>
                    {issue.subject !== issue.title && (
                      <p className="text-soil text-sm mt-1">{issue.subject}</p>
                    )}
                  </div>
                  <a
                    href={issue.archiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read issue: ${issue.title}`}
                    className="shrink-0 px-5 py-2 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-md transition-colors"
                  >
                    Read
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-terra text-xs font-semibold uppercase tracking-widest mb-3">First dispatch</p>
                <h2 className="font-display text-3xl text-bark font-bold">The next issue is being packed.</h2>
                <p className="text-soil mt-3">
                  We&apos;ll use this space for trip signups, gear notes, route beta, and the occasional
                  after-hike lesson someone learned the memorable way.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-10">
                {[
                  ['Trip signups', 'What is going out, what skill level it is, and when to jump in.'],
                  ['Gear notes', 'Rental reminders, packing mistakes, and what actually stayed dry.'],
                  ['Trail reports', 'Short notes from the latest crew back from the mountains.'],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-md border border-sand bg-parchment p-5">
                    <h3 className="font-display text-lg font-bold text-bark">{title}</h3>
                    <p className="text-sm text-soil mt-2 leading-relaxed">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
