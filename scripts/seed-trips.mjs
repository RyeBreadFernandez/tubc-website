import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').replace(/[<>]/g, '')

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const downloads = join(homedir(), 'Downloads')

const TRIPS = [
  {
    title: 'San Simeon Car Camping',
    location: 'San Simeon',
    trip_date: '2025-11-14',
    difficulty: 'Easy',
    miles: 4,
    elevation_gain: null,
    localFile: join(downloads, 'A7402296 - Sloane Beeli.jpeg'),
    content: `This trip was a last minute twist after the Big Sur Backpacking trip we planned got rained out! We made the best of it and ended up loving our time in San Simeon and Morro Bay where we hiked along the misty and rainy coast, saw some elephant seals, and collected sand dollars! Whether we were talking to our camp neighbors to borrow their machete to cut firewood, sharing minimal rain gear, or enjoying In-N-Out and a hot tub to seal (get it) the trip, it was an EPIC excursion with some AWESOME people.`,
  },
  {
    title: 'Pinnacles National Park',
    location: 'Pinnacles National Park',
    trip_date: '2026-02-27',
    difficulty: 'Moderate',
    miles: 15,
    elevation_gain: null,
    localFile: '/Users/ryanfernandez/Downloads/IMG_3604 - Sloane Beeli.jpeg',
    content: `Snakes! Condors! Frogs! Poppies! Pinnacles! This trio was full of wildlife, adventure, and beautiful people. Due to backpacking restrictions due to the fragile condor habitat, we chose to car camp at this beautiful and less visited National Park to not only to contribute to Sloane's National Park sticker water bottle, but to see a fun new environment pretty close to home! Between the cows on the I-5, the weird cloud circle around the moon, exploring abandoned barns at night, and everyone holding a snake (thanks to Phillip), we had an incredible trip! Not only did we get lucky and explore caves that weren't supposed to open until a month later (literally opened the day we got there), we also all become junior rangers and shared the beauty of PB&J's with some international students! Definitely a surprisingly beautiful park full of adventure — and remember that white tipped wings are turkey vultures, condors need to have an inner white triangle with dark tips.`,
  },
  {
    title: 'Kearsarge Lakes',
    location: 'Kearsarge Pass Trail, John Muir Wilderness and Kings Canyon National Park',
    trip_date: '2025-10-03',
    difficulty: 'Strenuous',
    miles: 12,
    elevation_gain: 3500,
    localFile: join(downloads, 'kearsarge-lakes.jpg'),
    content: `In the first week of the 2025-26 school year, Ellie, Quinn, and Yash took a group of hardy backpackers to Kearsarge Lakes, deep in the backcountry of Kings Canyon National Park. After acclimatizing at Grays Meadow Campground Friday night, the group embarked on a challenging but gorgeous trek through pine forest, past turquoise lakes, and over the Sierra Crest, reaching a peak elevation of 11,800ft as we exited the John Muir Wilderness and entered Kings Canyon. At the top, we were greeted with stunning views of our destination for the night – a cluster of pristine alpine lakes at the foot of the dramatic granite spine known as the Kearsarge Pinnacles. While camping at Kearsarge Lakes, some brave souls cooled off with a polar plunge (as if the upcoming night at 11,000ft wasn't going to do that anyway), while everyone refueled with a hearty backcountry dinner of instant ramen and TVP. Even though we had lucked out with pleasant, sunny weather during the day, nighttime temperatures dropped well below freezing, and one pair of wet swim trunks that had been left outside a rock froze solid overnight. As the sun rose above the Kearsarge Pinnacles, our once-freezing group of backpackers felt a sense of rejuvenation, said bye to the lakes and the mysterious metal bear locker that had stored some of their food for the night (we have no idea how it got there). We doubled back over Kearsarge Pass again, took a quick lunch while sunbathing on a huge rock overlooking Gilbert Lake, and made it back to our cars and Westwood as changed and inspired Bruins ready for a successful school year.`,
  },
]

async function prepareImage(localFile) {
  const raw = readFileSync(localFile)
  const isHeic = localFile.toLowerCase().endsWith('.heic') || localFile.toLowerCase().endsWith('.heif')
  if (isHeic) {
    console.log('  Converting HEIC → JPEG via Sharp...')
    const buffer = await sharp(raw).jpeg({ quality: 88 }).toBuffer()
    return { buffer, contentType: 'image/jpeg', ext: 'jpg' }
  }
  const ext = localFile.split('.').pop().toLowerCase()
  const contentType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
  return { buffer: raw, contentType, ext: ext === 'jpeg' ? 'jpg' : ext }
}

async function main() {
  console.log('Looking up TUBC author account...')
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  if (listError) throw new Error(`Failed to list users: ${listError.message}`)

  const tubcUser = users.find(u => u.email === 'uclabackpackingclub@gmail.com')
  if (!tubcUser) throw new Error('TUBC user not found in auth.users')
  console.log(`TUBC author ID: ${tubcUser.id}`)

  for (const trip of TRIPS) {
    console.log(`\nProcessing: ${trip.title}`)

    const slug = `${slugify(trip.title)}-${Date.now()}`
    let cover_image_url = null

    if (trip.localFile) {
      const { buffer, contentType, ext } = await prepareImage(trip.localFile)
      console.log(`  Read ${buffer.length} bytes (${contentType})`)

      const storagePath = `public/${slug}.${ext}`
      console.log(`  Uploading to trip-covers/${storagePath}...`)
      const { error: uploadError } = await supabase.storage
        .from('trip-covers')
        .upload(storagePath, buffer, { contentType, upsert: true })
      if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage.from('trip-covers').getPublicUrl(storagePath)
      cover_image_url = publicUrl
      console.log(`  Cover URL: ${publicUrl}`)
    } else {
      console.log('  No cover photo — will use placeholder on site')
    }

    console.log('  Inserting trip_logs record...')
    const { error: insertError } = await supabase.from('trip_logs').insert({
      title: trip.title,
      slug,
      location: trip.location,
      trip_date: trip.trip_date,
      difficulty: trip.difficulty,
      miles: trip.miles,
      elevation_gain: trip.elevation_gain,
      cover_image_url,
      content: trip.content,
      author_id: tubcUser.id,
      published: true,
    })
    if (insertError) throw new Error(`DB insert failed: ${insertError.message}`)

    console.log('  ✓ Done')
    await new Promise(r => setTimeout(r, 300))
  }

  console.log('\nAll 3 trips seeded successfully!')
  console.log('NOTE: Pinnacles National Park has no cover photo — add one via the dashboard.')
}

main().catch(err => {
  console.error('\nSeed failed:', err.message)
  process.exit(1)
})
