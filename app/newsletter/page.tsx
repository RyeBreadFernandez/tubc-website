import NewsletterSignup from '@/components/NewsletterSignup'
import { fetchNewsletters } from '@/lib/mailchimp'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'The UCLA Backpacking Club quarterly newsletter — trip recaps, gear tips, and club news delivered four times a year. Read past issues and subscribe.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/newsletter',
  },
  openGraph: {
    title: 'Newsletter | UCLA Backpacking Club',
    description: 'The UCLA Backpacking Club quarterly newsletter — trip recaps, gear tips, and club news delivered four times a year.',
    url: 'https://www.uclabackpackingclub.com/newsletter',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club Newsletter' }],
    type: 'website',
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
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">Quarterly dispatches</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Newsletter</h1>
          <p className="text-soil text-lg">Trip recaps, gear tips, and club news — delivered four times a year.</p>
        </div>
      </section>

      {/* Signup */}
      <section className="py-10 bg-moss">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-bark font-semibold mb-4">Get the next issue in your inbox</p>
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
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md transition-colors text-base"
              >
                Read Issue
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Archive */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-bark font-bold mb-8">Past Issues</h2>

          {issues.length > 0 ? (
            <div className="space-y-4">
              {rest.map((issue, index) => (
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
                    className="shrink-0 px-5 py-2 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-md transition-colors"
                  >
                    Read
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-soil">
              <p className="font-display text-xl mb-2">First issue dropping soon</p>
              <p className="text-sm">Subscribe above and you&apos;ll be the first to get it.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
