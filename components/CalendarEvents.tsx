'use client'

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

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
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-2 border-terra border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'unconfigured') {
    return (
      <div className="text-center py-12 bg-parchment rounded-2xl border border-sand">
        <p className="font-display text-xl text-bark mb-2">Calendar coming soon</p>
        <p className="text-soil text-sm">Follow us on Instagram for event announcements.</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12 bg-parchment rounded-2xl border border-sand">
        <p className="font-display text-xl text-bark mb-2">Couldn't load events</p>
        <p className="text-soil text-sm">Try refreshing the page.</p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-parchment rounded-2xl border border-sand">
        <p className="font-display text-xl text-bark mb-2">No upcoming events</p>
        <p className="text-soil text-sm">Check back soon or follow us on Instagram.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {events.map((event, i) => {
        const { day, monthYear, time } = formatEventDate(event.start)
        return (
          <a
            key={i}
            href={event.htmlLink ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="bg-parchment border border-sand rounded-2xl p-5 hover:shadow-md hover:border-terra/30 transition-all flex gap-4 h-full">
              <div className="shrink-0 w-14 text-center">
                <p className="font-display text-2xl font-bold text-terra leading-none">{day}</p>
                <p className="text-soil text-xs uppercase tracking-wide mt-0.5">{monthYear}</p>
                {time && <p className="text-soil/60 text-xs mt-1">{time}</p>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-bark font-bold group-hover:text-terra transition-colors leading-snug">
                  {event.summary}
                </h3>
                {event.location && (
                  <p className="text-soil text-xs mt-1 truncate">{event.location}</p>
                )}
                {event.description && (
                  <p className="text-soil/70 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {event.description.replace(/<[^>]+>/g, '')}
                  </p>
                )}
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
