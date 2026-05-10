'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { safeNextPath } from '@/lib/navigation'

const DEFAULT_SITE_URL = 'https://www.uclabackpackingclub.com'

export interface AuthFormState {
  message?: string
  success?: boolean
}

function getEmailAndPassword(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  return { email, password }
}

function invalidCredentials({ email, password }: { email: string; password: string }) {
  if (!email || !email.includes('@')) return 'Use a valid email address.'
  if (password.length < 8) return 'Password must be at least 8 characters.'
  return null
}

function canonicalSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
  if (!configured) return DEFAULT_SITE_URL

  try {
    const url = new URL(configured)
    if (url.protocol !== 'https:' && url.hostname !== 'localhost') return DEFAULT_SITE_URL
    return url.origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const nextPath = safeNextPath(formData.get('next'))
  const credentials = getEmailAndPassword(formData)
  const invalid = invalidCredentials(credentials)
  if (invalid) return { message: invalid }

  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    return { message: 'Could not sign in with those credentials.' }
  }

  redirect(nextPath)
}

export async function signup(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const nextPath = safeNextPath(formData.get('next'))
  const credentials = getEmailAndPassword(formData)
  const invalid = invalidCredentials(credentials)
  if (invalid) return { message: invalid }

  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: `${canonicalSiteUrl()}${nextPath}`,
    },
  })

  if (error) {
    return { message: error.message }
  }

  if (!data.session) {
    return {
      success: true,
      message: 'Check your email to confirm your account, then come back to sign in.',
    }
  }

  redirect(nextPath)
}

export async function logout() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  await supabase.auth.signOut()
  redirect('/login')
}
