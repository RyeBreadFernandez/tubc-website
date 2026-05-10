import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/utils/supabase/server'

const ALLOWED_DIFFICULTIES = new Set(['Easy', 'Moderate', 'Strenuous', 'Expert'])
const ALLOWED_IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])
const MAX_COVER_BYTES = 8 * 1024 * 1024

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function textValue(form: FormData, key: string) {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

type ParsedNumber = { ok: true; value: number | null } | { ok: false; error: string }

function numberValue(value: string, label: string, max: number, integer = false): ParsedNumber {
  if (!value) return { ok: true, value: null }
  const parsed = integer ? Number.parseInt(value, 10) : Number.parseFloat(value)
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > max) {
    return { ok: false, error: `${label} must be a valid positive number.` }
  }
  return { ok: true, value: parsed }
}

function isValidTripDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && value === parsed.toISOString().slice(0, 10)
}

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export async function POST(request: Request) {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Trip submissions are not configured yet.' }, { status: 503 })
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return validationError('Submit the trip report as form data.')
  }

  const title = textValue(form, 'title')
  const location = textValue(form, 'location')
  const trip_date = textValue(form, 'trip_date')
  const difficulty = textValue(form, 'difficulty')
  const miles = textValue(form, 'miles')
  const elevation_gain = textValue(form, 'elevation_gain')
  const content = textValue(form, 'content')
  const coverFile = form.get('cover')

  if (title.length < 3 || title.length > 120) {
    return validationError('Title must be between 3 and 120 characters.')
  }
  const slugBase = slugify(title)
  if (!slugBase) {
    return validationError('Title must include letters or numbers.')
  }
  if (location.length < 2 || location.length > 160) {
    return validationError('Location must be between 2 and 160 characters.')
  }
  if (!isValidTripDate(trip_date)) {
    return validationError('Trip date must be a valid date.')
  }
  if (!ALLOWED_DIFFICULTIES.has(difficulty)) {
    return validationError('Select a valid difficulty.')
  }

  const parsedMiles = numberValue(miles, 'Miles', 1000)
  if (!parsedMiles.ok) return validationError(parsedMiles.error)

  const parsedElevation = numberValue(elevation_gain, 'Elevation gain', 100000, true)
  if (!parsedElevation.ok) return validationError(parsedElevation.error)

  if (content.length < 20 || content.length > 20000) {
    return validationError('Trip report must be between 20 and 20,000 characters.')
  }

  if (!(coverFile instanceof File) || coverFile.size === 0) {
    return NextResponse.json({ error: 'Cover photo is required.' }, { status: 400 })
  }
  if (coverFile.size > MAX_COVER_BYTES) {
    return validationError('Cover photo must be 8 MB or smaller.')
  }

  const ext = ALLOWED_IMAGE_TYPES.get(coverFile.type)
  if (!ext) {
    return validationError('Cover photo must be a JPG, PNG, or WebP image.')
  }

  let authorId: string | null = null
  try {
    const cookieStore = await cookies()
    const supabase = await createServerClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    authorId = user?.id ?? null
  } catch {
    authorId = null
  }

  const slug = `${slugBase}-${Date.now()}`
  const folder = authorId ?? 'public'
  const path = `${folder}/${slug}.${ext}`

  const arrayBuffer = await coverFile.arrayBuffer()
  const { error: uploadError } = await admin.storage
    .from('trip-covers')
    .upload(path, arrayBuffer, { contentType: coverFile.type, upsert: true })

  if (uploadError) {
    return NextResponse.json({ error: 'Could not upload the cover photo.' }, { status: 500 })
  }

  const { data: { publicUrl } } = admin.storage.from('trip-covers').getPublicUrl(path)

  const { error: insertError } = await admin.from('trip_logs').insert({
    title,
    slug,
    location,
    trip_date,
    difficulty,
    miles: parsedMiles.value,
    elevation_gain: parsedElevation.value,
    cover_image_url: publicUrl,
    content,
    author_id: authorId,
    published: false,
  })

  if (insertError) {
    await admin.storage.from('trip-covers').remove([path])
    return NextResponse.json({ error: 'Could not submit the trip report.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
