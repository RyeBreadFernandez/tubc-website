'use client'

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

interface CalendarEvent {
  summary: string
  start: string | null
  end: string | null
  description: string | null
  location: string | null
  htmlLink: string | null
}

function formatEventDate(start: string | null): { day: string; monthYear: string; time: string | null } {
  if (!start) return { day: '?', monthYear: '', time: null }
  const isDateTime = start.includes('T')
  const date = parseISO(start)
  return {
    day: format(date, 'd'),
    monthYear: format(date, 'MMM yyyy'),
    time: isDateTime ? format(date, 'h:mm a') : null,
  }
}

function formatDuration(start: string | null, end: string | null): string | null {
  if (!start || !end) return null
  const s = parseISO(start)
  const e = parseISO(end)
  // Google Calendar all-day end dates are exclusive (+1 day), so round to nearest day
  const days = Math.round((e.getTime() - s.getTime()) / 86400000)
  if (days <= 1) return null
  return `${days} days`
}

export default function CalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error' | 'unconfigured'>('loading')

  useEffect(() => {
    fetch('/api/calendar')
      .then((r) => {
        if (r.status === 503) return setStatus('unconfigured')
        if (!r.ok) throw new Error()
        return r.json().then((data) => {
          setEvents(data)
          setStatus('ok')
        })
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-2 border-sand">
            <CardContent className="p-5 flex gap-4">
              <div className="shrink-0 w-14 space-y-1.5">
                <Skeleton className="h-7 w-10 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (status === 'unconfigured') {
    return (
      <div className="text-center py-12 bg-parchment rounded-md border border-secondary">
        <p className="font-display text-xl text-bark mb-2">Calendar coming soon</p>
        <p className="text-muted-foreground text-sm">Follow us on Instagram for event announcements.</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12 bg-parchment rounded-md border border-secondary">
        <p className="font-display text-xl text-bark mb-2">Couldn&apos;t load events</p>
        <p className="text-muted-foreground text-sm">Try refreshing the page.</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-parchment rounded-md border border-secondary">
        <p className="font-display text-xl text-bark mb-2">No upcoming events</p>
        <p className="text-muted-foreground text-sm">Check back soon or follow us on Instagram.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {events.map((event, i) => {
        const { day, monthYear, time } = formatEventDate(event.start)
        const duration = formatDuration(event.start, event.end)
        return (
          <a
            key={i}
            href={event.htmlLink ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="h-full border-2 border-sand hover:border-terra/40 hover:shadow-md transition-all">
              <CardContent className="p-5 flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div className="shrink-0 w-14 text-center">
                    <p className="font-display text-2xl font-bold text-primary leading-none">{day}</p>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mt-0.5">{monthYear}</p>
                    {time && <p className="text-muted-foreground/60 text-xs mt-1">{time}</p>}
                    {duration && (
                      <span className="inline-block mt-1.5 text-[10px] bg-terra/10 text-terra px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                        {duration}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-bark group-hover:text-terra transition-colors leading-snug">
                      {event.summary}
                    </h3>
                    {event.location && (
                      <p className="flex items-center gap-1 text-muted-foreground text-xs mt-1.5 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {event.location}
                      </p>
                    )}
                    {event.description && (
                      <p className="text-soil/80 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {event.description.replace(/<[^>]+>/g, '')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-terra text-xs font-semibold group-hover:gap-1.5 flex items-center gap-1 transition-all">
                  View on calendar
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </a>
        )
      })}
    </div>
  )
}
