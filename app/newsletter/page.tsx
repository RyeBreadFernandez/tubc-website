import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import NewsletterSignup from '@/components/NewsletterSignup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'The UCLA Backpacking Club quarterly newsletter — trip recaps, gear tips, and club news delivered four times a year. Read past issues and subscribe.',
  alternates: {
    canonical: 'https://tubcla.com/newsletter',
  },
  openGraph: {
    title: 'Newsletter | UCLA Backpacking Club',
    description: 'The UCLA Backpacking Club quarterly newsletter — trip recaps, gear tips, and club news delivered four times a year.',
    url: 'https://tubcla.com/newsletter',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club Newsletter' }],
    type: 'website',
  },
}

async function getNewsletters() {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)
    const { data } = await supabase
      .from('newsletter_issues')
      .select('*')
      .order('published_at', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

export default async function NewsletterPage() {
  const issues = await getNewsletters()

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

      {/* Archive */}
      <section className="py-16 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-bark font-bold mb-8">Past Issues</h2>

          {issues.length > 0 ? (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-parchment-dark border border-sand rounded-md p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="sm:w-24 shrink-0">
                    <p className="font-display text-3xl font-bold text-terra">#{issue.issue_number}</p>
                    <p className="text-xs text-soil/60">{issue.quarter} {issue.year}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-bark">{issue.title}</h3>
                    {issue.description && <p className="text-soil text-sm mt-1">{issue.description}</p>}
                  </div>
                  {issue.file_url && (
                    <a
                      href={issue.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 px-5 py-2 bg-terra hover:bg-terra-dark text-parchment text-sm font-semibold rounded-md transition-colors"
                    >
                      Read
                    </a>
                  )}
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
