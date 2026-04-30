import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  (process.env.SUPABASE_SERVICE_ROLE_KEY || '').replace(/[<>]/g, ''),
  { auth: { persistSession: false } }
)

const buffer = readFileSync('/Users/ryanfernandez/Downloads/kearsarge-compressed.jpg')
console.log(`Uploading ${(buffer.length / 1024 / 1024).toFixed(1)} MB...`)

// Get the existing slug from trip_logs
const { data: trip } = await supabase
  .from('trip_logs')
  .select('cover_image_url')
  .eq('title', 'Kearsarge Lakes')
  .single()

const storagePath = trip.cover_image_url.split('/trip-covers/')[1]
console.log('Overwriting:', storagePath)

const { error } = await supabase.storage
  .from('trip-covers')
  .upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true })

if (error) throw new Error(error.message)
console.log('✓ Done — same URL, no DB update needed')
