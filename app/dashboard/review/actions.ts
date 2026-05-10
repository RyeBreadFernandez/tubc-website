'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { isOfficerEmail } from '@/lib/officers'
import { createClient as createServerClient } from '@/utils/supabase/server'

export async function setPublished(id: string, published: boolean) {
  const cookieStore = await cookies()
  const supabase = await createServerClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!isOfficerEmail(user?.email)) {
    throw new Error('Only configured officers can publish trip reports.')
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!serviceRoleKey || !supabaseUrl) {
    throw new Error('Officer dashboard is missing Supabase server configuration.')
  }

  const admin = createClient(
    supabaseUrl,
    serviceRoleKey,
    { auth: { persistSession: false } },
  )
  const { data, error } = await admin
    .from('trip_logs')
    .update({ published })
    .eq('id', id)
    .select('id, slug')
    .maybeSingle()

  if (error) {
    throw new Error('Could not update the trip report.')
  }
  if (!data) {
    throw new Error('Trip report was not found.')
  }

  revalidatePath('/dashboard/review')
  revalidatePath('/trip-logs')
  revalidatePath(`/trip-logs/${data.slug}`)
}
