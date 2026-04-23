import { NextResponse } from 'next/server'

const CALENDAR_ID = 'uclabackpackingclub@gmail.com'
const MAX_RESULTS = 10

export async function GET() {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Calendar API not configured' }, { status: 503 })
  }

  const timeMin = new Date().toISOString()
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`
  )
  url.searchParams.set('key', apiKey)
  url.searchParams.set('timeMin', timeMin)
  url.searchParams.set('maxResults', String(MAX_RESULTS))
  url.searchParams.set('singleEvents', 'true')
  url.searchParams.set('orderBy', 'startTime')

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 502 })
  }

  const data = await res.json()
  const events = (data.items ?? []).map((item: {
    summary?: string
    start?: { dateTime?: string; date?: string }
    end?: { dateTime?: string; date?: string }
    description?: string
    location?: string
    htmlLink?: string
  }) => ({
    summary: item.summary ?? 'Untitled Event',
    start: item.start?.dateTime ?? item.start?.date ?? null,
    end: item.end?.dateTime ?? item.end?.date ?? null,
    description: item.description ?? null,
    location: item.location ?? null,
    htmlLink: item.htmlLink ?? null,
  }))

  return NextResponse.json(events)
}
