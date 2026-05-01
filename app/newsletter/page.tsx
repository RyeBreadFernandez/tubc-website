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

  return (
    <main id="main-content" className="flex-1 pt-16">
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">Quarterly dispatches</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Newsletter</h1>
          <p className="text-soil text-lg">Trip recaps, gear tips, and club news.</p>
        </div>
      </section>

      {/* Signup */}
      <section className="py-10 bg-moss">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-bark font-semibold mb-4">Get the next issue in your inbox</p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Archive */}
      <section className="py-16 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-bark font-bold mb-8">Past Issues</h2>

          {issues.length > 0 ? (
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <div
                  key={issue.id}
                  className="bg-parchment-dark border border-sand rounded-md p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="sm:w-24 shrink-0">
                    <p className="font-display text-3xl font-bold text-terra">#{issues.length - index}</p>
                    <p className="text-xs text-soil/60">{formatDate(issue.sentAt)}</p>
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
