import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').replace(/[<>]/g, '')
const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })

const { data: { users } } = await supabase.auth.admin.listUsers()
const tubcUser = users.find(u => u.email === 'uclabackpackingclub@gmail.com')
console.log('Author:', tubcUser.id)

const slug = `kearsarge-lakes-${Date.now()}`
const localFile = join(homedir(), 'Downloads', 'kearsarge-lakes.jpg')
const buffer = readFileSync(localFile)
console.log(`Read ${buffer.length} bytes`)

const storagePath = `public/${slug}.jpg`
const { error: uploadError } = await supabase.storage
  .from('trip-covers')
  .upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true })
if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

const { data: { publicUrl } } = supabase.storage.from('trip-covers').getPublicUrl(storagePath)
console.log('Cover URL:', publicUrl)

const { error: insertError } = await supabase.from('trip_logs').insert({
  title: 'Kearsarge Lakes',
  slug,
  location: 'Kearsarge Pass Trail, John Muir Wilderness and Kings Canyon National Park',
  trip_date: '2025-10-03',
  difficulty: 'Strenuous',
  miles: 12,
  elevation_gain: 3500,
  cover_image_url: publicUrl,
  content: `In the first week of the 2025-26 school year, Ellie, Quinn, and Yash took a group of hardy backpackers to Kearsarge Lakes, deep in the backcountry of Kings Canyon National Park. After acclimatizing at Grays Meadow Campground Friday night, the group embarked on a challenging but gorgeous trek through pine forest, past turquoise lakes, and over the Sierra Crest, reaching a peak elevation of 11,800ft as we exited the John Muir Wilderness and entered Kings Canyon. At the top, we were greeted with stunning views of our destination for the night – a cluster of pristine alpine lakes at the foot of the dramatic granite spine known as the Kearsarge Pinnacles. While camping at Kearsarge Lakes, some brave souls cooled off with a polar plunge (as if the upcoming night at 11,000ft wasn't going to do that anyway), while everyone refueled with a hearty backcountry dinner of instant ramen and TVP. Even though we had lucked out with pleasant, sunny weather during the day, nighttime temperatures dropped well below freezing, and one pair of wet swim trunks that had been left outside a rock froze solid overnight. As the sun rose above the Kearsarge Pinnacles, our once-freezing group of backpackers felt a sense of rejuvenation, said bye to the lakes and the mysterious metal bear locker that had stored some of their food for the night (we have no idea how it got there). We doubled back over Kearsarge Pass again, took a quick lunch while sunbathing on a huge rock overlooking Gilbert Lake, and made it back to our cars and Westwood as changed and inspired Bruins ready for a successful school year.`,
  author_id: tubcUser.id,
  published: true,
})
if (insertError) throw new Error(`Insert failed: ${insertError.message}`)

console.log('✓ Kearsarge Lakes inserted successfully')
