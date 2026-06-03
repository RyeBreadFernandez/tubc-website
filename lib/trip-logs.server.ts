import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

export const TRIP_LOGS_TAG = 'trip-logs'
const TRIP_LOGS_REVALIDATE_SECONDS = 60 * 60

export class PublicTripLogDataError extends Error {
  constructor(message = 'Could not load trip logs.') {
    super(message)
    this.name = 'PublicTripLogDataError'
  }
}

export interface PublicTripLogCard {
  id: string
  title: string
  slug: string
  location: string | null
  trip_date: string | null
  difficulty: string | null
  miles?: number | null
  elevation_gain?: number | null
  cover_image_url: string | null
  content?: string | null
  created_at?: string | null
}

export interface PublicTripLogDetail extends PublicTripLogCard {
  content: string | null
  author_id: string | null
}

function publicSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new PublicTripLogDataError('Supabase public configuration is missing.')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })
}

async function fetchLatestPublishedTripLogs(limit: number): Promise<PublicTripLogCard[]> {
  const { data, error } = await publicSupabase()
    .from('trip_logs')
    .select('id, title, slug, location, trip_date, difficulty, cover_image_url, created_at')
    .eq('published', true)
    .order('trip_date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('latest trip_logs fetch error:', error)
    throw new PublicTripLogDataError()
  }

  return data ?? []
}

async function fetchPublishedTripLogs(): Promise<PublicTripLogCard[]> {
  const { data, error } = await publicSupabase()
    .from('trip_logs')
    .select('id, title, slug, location, trip_date, difficulty, miles, elevation_gain, cover_image_url, content, created_at')
    .eq('published', true)
    .order('trip_date', { ascending: false })

  if (error) {
    console.error('trip_logs fetch error:', error)
    throw new PublicTripLogDataError()
  }

  return data ?? []
}

async function fetchPublishedTripLogBySlug(slug: string): Promise<PublicTripLogDetail | null> {
  const { data, error } = await publicSupabase()
    .from('trip_logs')
    .select('id, title, slug, location, trip_date, difficulty, miles, elevation_gain, cover_image_url, content, author_id, created_at')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    console.error('trip_log fetch error:', error)
    throw new PublicTripLogDataError()
  }

  return data
}

export const getLatestPublishedTripLogs = unstable_cache(
  fetchLatestPublishedTripLogs,
  ['latest-published-trip-logs'],
  { revalidate: TRIP_LOGS_REVALIDATE_SECONDS, tags: [TRIP_LOGS_TAG] },
)

export const getPublishedTripLogs = unstable_cache(
  fetchPublishedTripLogs,
  ['published-trip-logs'],
  { revalidate: TRIP_LOGS_REVALIDATE_SECONDS, tags: [TRIP_LOGS_TAG] },
)

export const getPublishedTripLogBySlug = unstable_cache(
  fetchPublishedTripLogBySlug,
  ['published-trip-log-by-slug'],
  { revalidate: TRIP_LOGS_REVALIDATE_SECONDS, tags: [TRIP_LOGS_TAG] },
)
