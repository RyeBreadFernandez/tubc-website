'use client'

import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        toast.success('Message sent! We\'ll get back to you soon.')
        reset()
      } else {
        throw new Error()
      }
    } catch {
      toast.error('Something went wrong. Try emailing us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 bg-parchment border border-border rounded-xl text-bark placeholder-soil/50 focus:outline-none focus:border-terra transition-colors text-sm'
  const errorClass = 'text-terra text-xs mt-1'

  return (
    <main className="flex-1 pt-16">
      <Toaster position="top-right" toastOptions={{ style: { background: '#F5F0E8', color: '#2C1F14' } }} />

      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">Get in touch</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Contact</h1>
          <p className="text-soil text-lg">Questions, feedback, or just want to say hi? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="pb-20 bg-parchment">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-bark mb-1.5">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-bark mb-1.5">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                  })}
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Subject</label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                placeholder="What's this about?"
                className={inputClass}
              />
              {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Message</label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={6}
                placeholder="Your message..."
                className={inputClass}
              />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-terra hover:bg-terra-dark disabled:opacity-60 text-parchment font-semibold rounded-full transition-colors"
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-border flex flex-col sm:flex-row gap-6 text-sm text-soil">
            <div>
              <p className="font-semibold text-bark mb-1">Email</p>
              <a href="mailto:uclabackpackingclub@gmail.com" className="hover:text-terra transition-colors">
                uclabackpackingclub@gmail.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-bark mb-1">Instagram</p>
              <a href="https://www.instagram.com/uclabackpackingclub" target="_blank" rel="noopener noreferrer" className="hover:text-terra transition-colors">
                @uclabackpackingclub
              </a>
            </div>
            <div>
              <p className="font-semibold text-bark mb-1">Slack</p>
              <a href="https://join.slack.com/t/uclabackpackingclub/shared_invite" target="_blank" rel="noopener noreferrer" className="hover:text-terra transition-colors">
                Join our workspace
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
