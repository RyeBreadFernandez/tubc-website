'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function setPublished(id: string, published: boolean) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  await supabase.from('trip_logs').update({ published }).eq('id', id)
  revalidatePath('/dashboard/review')
  revalidatePath('/trip-logs')
}
