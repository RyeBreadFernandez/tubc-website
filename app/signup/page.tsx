'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import toast, { Toaster } from 'react-hot-toast'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      toast.error(error.message)
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  const inputClass = 'w-full px-4 py-3 bg-parchment border border-border rounded-md text-bark placeholder-soil/50 focus:outline-none focus:border-terra transition-colors text-sm'

  return (
    <main className="flex-1 pt-16 flex items-center justify-center min-h-screen bg-parchment">
      <Toaster position="top-right" toastOptions={{ style: { background: '#F5F0E8', color: '#2C1F14' } }} />

      <div className="w-full max-w-md px-4">
        <div className="bg-parchment-dark border border-sand rounded-md p-8 shadow-sm">
          {done ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-moss rounded-md flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-bark font-bold mb-2">Check your email</h2>
              <p className="text-soil text-sm leading-relaxed">
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
              </p>
              <Link href="/" className="inline-block mt-6 text-terra text-sm font-semibold hover:text-terra-dark transition-colors">
                Back to home →
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <Link href="/" className="font-display text-2xl font-bold text-bark">TUBC</Link>
                <h1 className="font-display text-2xl text-bark font-bold mt-4">Join the club</h1>
                <p className="text-soil text-sm mt-1">Create your free member account</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bark mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bark mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bark mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-terra hover:bg-terra-dark disabled:opacity-60 text-parchment font-semibold rounded-md transition-colors mt-2"
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-soil mt-6">
                Already a member?{' '}
                <Link href="/login" className="text-terra hover:text-terra-dark font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
