'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  const inputClass = 'w-full px-4 py-3 bg-parchment border border-border rounded-md text-bark placeholder-soil/50 focus:outline-none focus:border-terra transition-colors text-sm'

  return (
    <main className="flex-1 pt-16 flex items-center justify-center min-h-screen bg-parchment">
      <Toaster position="top-right" toastOptions={{ style: { background: '#F5F0E8', color: '#2C1F14' } }} />

      <div className="w-full max-w-md px-4">
        <div className="bg-parchment-dark border border-sand rounded-md p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-2xl font-bold text-bark">TUBC</Link>
            <h1 className="font-display text-2xl text-bark font-bold mt-4">Welcome back</h1>
            <p className="text-soil text-sm mt-1">Sign in to your member account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="••••••••"
                required
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-terra hover:bg-terra-dark disabled:opacity-60 text-parchment font-semibold rounded-md transition-colors mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-soil mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-terra hover:text-terra-dark font-semibold transition-colors">
              Join TUBC
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
