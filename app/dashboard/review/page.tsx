import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { setPublished } from './actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getOfficerEmails, isOfficerEmail } from '@/lib/officers'
import { createClient as createServerClient } from '@/utils/supabase/server'
import { logout } from '@/app/auth/actions'

import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Review Trip Reports',
  description: 'Officer dashboard for reviewing and publishing trip reports.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function ReviewPage() {
  const cookieStore = await cookies()
  const supabase = await createServerClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/dashboard/review')
  }

  const officerEmails = getOfficerEmails()
  const isOfficer = isOfficerEmail(user.email)

  if (!isOfficer) {
    return (
      <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Officer area</p>
          <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">Access Not Configured</h1>
          <p className="text-soil mt-4 leading-relaxed">
            You are signed in as {user.email}, but this email is not in the officer allowlist.
            {officerEmails.length === 0
              ? ' Add OFFICER_EMAILS to the environment before enabling this dashboard.'
              : ' Ask a site admin to add this email to OFFICER_EMAILS.'}
          </p>
          <form action={logout} className="mt-6">
            <button type="submit" className="text-terra font-semibold hover:text-terra-dark transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </main>
    )
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!serviceRoleKey || !supabaseUrl) {
    return (
      <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Officer area</p>
          <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">Dashboard Not Configured</h1>
          <p className="text-soil mt-4 leading-relaxed">
            Supabase server credentials are missing, so trip reports cannot be reviewed yet.
          </p>
        </div>
      </main>
    )
  }

  const admin = createClient(
    supabaseUrl,
    serviceRoleKey,
    { auth: { persistSession: false } },
  )

  const { data: trips } = await admin
    .from('trip_logs')
    .select('id, title, location, trip_date, difficulty, miles, published, slug, author_id')
    .order('created_at', { ascending: false })

  const all = trips ?? []

  return (
    <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Officer area</p>
          <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">Review Trip Reports</h1>
          <p className="text-soil text-sm mt-1">{all.filter(t => !t.published).length} pending · {all.filter(t => t.published).length} published</p>
          <form action={logout} className="mt-3">
            <button type="submit" className="text-terra text-sm font-semibold hover:text-terra-dark transition-colors">
              Sign out
            </button>
          </form>
        </div>

        {all.length === 0 ? (
          <div className="text-center py-16 bg-parchment-dark border border-sand rounded-md">
            <p className="font-display text-xl text-bark mb-2">No reports submitted yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {all.map((trip) => (
              <div key={trip.id} className="bg-parchment-dark border border-sand rounded-md p-5 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-semibold text-bark">{trip.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${trip.published ? 'bg-moss text-sage-dark' : 'bg-sand text-soil'}`}>
                      {trip.published ? 'Published' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-soil text-sm">
                    {trip.location}
                    {trip.trip_date ? ` · ${format(new Date(trip.trip_date), 'MMM d, yyyy')}` : ''}
                    {trip.difficulty ? ` · ${trip.difficulty}` : ''}
                    {trip.miles ? ` · ${trip.miles} mi` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {trip.published && (
                    <a
                      href={`/trip-logs/${trip.slug}`}
                      aria-label={`View ${trip.title}`}
                      className="text-terra text-sm font-semibold hover:text-terra-dark transition-colors whitespace-nowrap"
                    >
                      View →
                    </a>
                  )}
                  <form action={setPublished.bind(null, trip.id, !trip.published)}>
                    <button
                      type="submit"
                      aria-label={`${trip.published ? 'Unpublish' : 'Publish'} ${trip.title}`}
                      className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                        trip.published
                          ? 'border border-sand text-soil hover:bg-sand'
                          : 'bg-terra hover:bg-terra-dark text-parchment'
                      }`}
                    >
                      {trip.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
