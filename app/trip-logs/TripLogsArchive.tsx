'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import DifficultyBadge, { DIFFICULTIES, isDifficulty, type Difficulty } from '@/components/ui/DifficultyBadge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { formatDateOnly } from '@/lib/dates'
import type { PublicTripLogCard } from '@/lib/trip-logs.server'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'

const INITIAL_VISIBLE = 9

function tripMatchesSearch(trip: PublicTripLogCard, search: string) {
  const query = search.trim().toLowerCase()
  if (!query) return true

  return [trip.title, trip.location, trip.difficulty, trip.content]
    .some((value) => typeof value === 'string' && value.toLowerCase().includes(query))
}

export default function TripLogsArchive({ trips }: { trips: PublicTripLogCard[] }) {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const difficulties = useMemo<Array<Difficulty | 'All'>>(() => {
    const usedDifficulties = new Set(trips.map((trip) => trip.difficulty).filter(isDifficulty))
    return ['All', ...DIFFICULTIES.filter((item) => usedDifficulties.has(item))]
  }, [trips])

  const filteredTrips = useMemo(
    () => trips.filter((trip) => {
      const matchesDifficulty = difficulty === 'All' || trip.difficulty === difficulty
      return matchesDifficulty && tripMatchesSearch(trip, search)
    }),
    [difficulty, search, trips],
  )

  function handleSearchChange(value: string) {
    setSearch(value)
    setVisibleCount(INITIAL_VISIBLE)
  }

  function handleDifficultyChange(value: Difficulty | 'All') {
    setDifficulty(value)
    setVisibleCount(INITIAL_VISIBLE)
  }

  const visibleTrips = filteredTrips.slice(0, visibleCount)

  if (trips.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-display text-2xl text-bark mb-3">No trip logs yet</p>
        <p className="text-muted-foreground">Check back after our next trip!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="sr-only">Trip log archive</h2>

      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <label htmlFor="trip-log-search" className="text-sm font-semibold text-bark">
            Search trip logs
          </label>
          <Input
            id="trip-log-search"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search by title, place, difficulty, or notes"
            className="mt-2 h-11 bg-parchment"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
          {difficulties.map((item) => (
            <Button
              key={item}
              type="button"
              variant={difficulty === item ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDifficultyChange(item)}
              aria-pressed={difficulty === item}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground" role="status" aria-live="polite">
        Showing {visibleTrips.length} of {filteredTrips.length} trip logs
      </p>

      {visibleTrips.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTrips.map((trip) => {
            const tripDifficulty = isDifficulty(trip.difficulty) ? trip.difficulty : null

            return (
              <Link key={trip.id} href={`/trip-logs/${trip.slug}`} className="group block h-full">
                <Card className="h-full gap-0 overflow-hidden border-secondary bg-parchment py-0 shadow-sm transition-shadow hover:shadow-md flex flex-col">
                  <div className="relative aspect-[3/2] w-full overflow-hidden shrink-0">
                    <Image
                      src={trip.cover_image_url ?? getMountainPlaceholder(trip.id)}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {tripDifficulty && <DifficultyBadge difficulty={tripDifficulty} />}
                      {trip.trip_date && (
                        <span className="text-xs text-muted-foreground">
                          {formatDateOnly(trip.trip_date, 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-bark group-hover:text-primary transition-colors mb-1">
                      {trip.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{trip.location}</p>
                    {trip.content && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                        {trip.content.replace(/[#*`]/g, '').slice(0, 150)}...
                      </p>
                    )}
                    {(trip.miles || trip.elevation_gain) && (
                      <>
                        <Separator className="mt-4 mb-3" />
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          {trip.miles && <span>{trip.miles} mi</span>}
                          {trip.elevation_gain && <span>{trip.elevation_gain.toLocaleString()} ft</span>}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 rounded-md border border-sand bg-parchment-dark">
          <p className="font-display text-2xl text-bark mb-3">No matching trip logs</p>
          <p className="text-muted-foreground">Try a broader search or clear the difficulty filter.</p>
        </div>
      )}

      {visibleCount < filteredTrips.length && (
        <div className="mt-8 text-center">
          <Button type="button" variant="outline" onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
