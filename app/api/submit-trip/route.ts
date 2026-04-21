import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function POST(request: Request) {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Server misconfiguration: missing service role key.' }, { status: 500 })
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  const form = await request.formData()
  const title = form.get('title') as string
  const location = form.get('location') as string
  const trip_date = form.get('trip_date') as string
  const difficulty = form.get('difficulty') as string
  const miles = form.get('miles') as string
  const elevation_gain = form.get('elevation_gain') as string
  const content = form.get('content') as string
  const authorId = form.get('author_id') as string | null
  const coverFile = form.get('cover') as File | null

  if (!coverFile) {
    return NextResponse.json({ error: 'Cover photo is required.' }, { status: 400 })
  }

  const slug = `${slugify(title)}-${Date.now()}`
  const ext = coverFile.name.split('.').pop()
  const folder = authorId ?? 'public'
  const path = `${folder}/${slug}.${ext}`

  const arrayBuffer = await coverFile.arrayBuffer()
  const { error: uploadError } = await admin.storage
    .from('trip-covers')
    .upload(path, arrayBuffer, { contentType: coverFile.type, upsert: true })

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
  }

  const { data: { publicUrl } } = admin.storage.from('trip-covers').getPublicUrl(path)

  const { error: insertError } = await admin.from('trip_logs').insert({
    title,
    slug,
    location,
    trip_date,
    difficulty,
    miles: miles ? parseFloat(miles) : null,
    elevation_gain: elevation_gain ? parseInt(elevation_gain) : null,
    cover_image_url: publicUrl,
    content,
    author_id: authorId || null,
    published: false,
  })

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
