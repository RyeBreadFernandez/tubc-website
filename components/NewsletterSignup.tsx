'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewsletterSignup() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubscribe() {
    setStatus(null)
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      })

      const data: { success?: boolean; error?: string } = await res.json()

      if (!res.ok || !data.success) {
        setStatus({ type: 'error', message: data.error ?? 'Something went wrong. Try again.' })
      } else {
        setStatus({ type: 'success', message: 'Check your email to confirm the signup.' })
        setEmail('')
        setCompany('')
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSubscribe() }}
      className="space-y-2"
      aria-label="Newsletter signup"
    >
      <div className="flex gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <label htmlFor={`${id}-company`} className="hidden">
          Company
        </label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <Input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-required="true"
          aria-invalid={status?.type === 'error'}
          aria-describedby={status ? `${id}-status` : undefined}
          className="h-11 flex-1 bg-parchment px-4 text-bark placeholder-soil/60 focus-visible:ring-3 focus-visible:ring-terra/40"
        />
        <Button
          type="submit"
          disabled={loading}
          className="h-11 px-6 bg-terra hover:bg-terra-dark text-parchment whitespace-nowrap focus-visible:ring-3 focus-visible:ring-terra/40"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      <p
        id={`${id}-status`}
        role={status?.type === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className={`min-h-5 text-sm ${status?.type === 'error' ? 'text-destructive' : 'text-forest'}`}
      >
        {status?.message}
      </p>
    </form>
  )
}
