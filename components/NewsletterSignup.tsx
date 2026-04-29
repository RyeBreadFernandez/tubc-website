'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data: { success?: boolean; error?: string } = await res.json()

      if (!res.ok || !data.success) {
        toast.error('Something went wrong. Try again.')
      } else {
        toast.success("You're on the list!")
        setEmail('')
      }
    } catch {
      toast.error('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 bg-parchment border border-border rounded-md text-bark placeholder-soil/60 focus:outline-none focus:border-terra transition-colors text-sm"
      />
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="px-6 py-3 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Subscribing…' : 'Subscribe'}
      </button>
    </div>
  )
}
