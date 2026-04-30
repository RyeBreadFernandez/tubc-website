import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').replace(/[<>]/g, '')

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })

const { data, error } = await supabase
  .from('trip_logs')
  .delete()
  .eq('title', 'San Simeon Car Camping')
  .select('slug, cover_image_url')

if (error) { console.error('Delete failed:', error.message); process.exit(1) }

console.log('Deleted records:', data)

for (const row of data ?? []) {
  const path = row.cover_image_url?.split('/trip-covers/')[1]
  if (path) {
    const { error: storageError } = await supabase.storage.from('trip-covers').remove([path])
    if (storageError) console.error('Storage remove failed:', storageError.message)
    else console.log('Removed storage file:', path)
  }
}
