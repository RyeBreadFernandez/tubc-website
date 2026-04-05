'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { createClient } from '@/utils/supabase/client'
import toast, { Toaster } from 'react-hot-toast'

interface FormData {
  title: string
  location: string
  trip_date: string
  difficulty: 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'
  miles: string
  elevation_gain: string
  content: string
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function NewTripPage() {
  const router = useRouter()
  const supabase = createClient()
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { toast.error('You must be logged in.'); return }

      const slug = `${slugify(data.title)}-${Date.now()}`

      const { error } = await supabase.from('trip_logs').insert({
        title: data.title,
        slug,
        location: data.location,
        trip_date: data.trip_date,
        difficulty: data.difficulty,
        miles: data.miles ? parseFloat(data.miles) : null,
        elevation_gain: data.elevation_gain ? parseInt(data.elevation_gain) : null,
        content: data.content,
        author_id: user.id,
        published: false,
      })

      if (error) throw error

      toast.success('Trip report submitted! An officer will review and publish it shortly.')
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 bg-parchment border border-border rounded-xl text-bark placeholder-soil/50 focus:outline-none focus:border-terra transition-colors text-sm'
  const errorClass = 'text-terra text-xs mt-1'

  return (
    <main className="flex-1 pt-16 bg-parchment min-h-screen">
      <Toaster position="top-right" toastOptions={{ style: { background: '#F5F0E8', color: '#2C1F14' } }} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-1">Share your adventure</p>
          <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">Write a Trip Report</h1>
          <p className="text-soil text-sm mt-2">Reports are reviewed before publishing. Photos can be added after approval.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-bark mb-1.5">Trip Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="e.g. Mount Whitney via Main Trail"
              className={inputClass}
            />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Location / Trail Name</label>
              <input
                {...register('location', { required: 'Location is required' })}
                placeholder="e.g. Inyo National Forest, CA"
                className={inputClass}
              />
              {errors.location && <p className={errorClass}>{errors.location.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Trip Date</label>
              <input
                {...register('trip_date', { required: 'Date is required' })}
                type="date"
                className={inputClass}
              />
              {errors.trip_date && <p className={errorClass}>{errors.trip_date.message}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Difficulty</label>
              <select {...register('difficulty', { required: true })} className={inputClass}>
                <option value="">Select…</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Strenuous">Strenuous</option>
                <option value="Expert">Expert</option>
              </select>
              {errors.difficulty && <p className={errorClass}>Required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Miles</label>
              <input
                {...register('miles')}
                type="number"
                step="0.1"
                placeholder="e.g. 22.5"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bark mb-1.5">Elevation Gain (ft)</label>
              <input
                {...register('elevation_gain')}
                type="number"
                placeholder="e.g. 6200"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-bark mb-1.5">Trip Report</label>
            <p className="text-xs text-soil/60 mb-2">Write in plain text or Markdown. Tell us about the trail, the conditions, highlights, and any tips for future hikers.</p>
            <textarea
              {...register('content', { required: 'Please write your trip report' })}
              rows={14}
              placeholder="The alarm went off at 3am..."
              className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
            />
            {errors.content && <p className={errorClass}>{errors.content.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3.5 bg-terra hover:bg-terra-dark disabled:opacity-60 text-parchment font-semibold rounded-full transition-colors"
            >
              {submitting ? 'Submitting…' : 'Submit for Review'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3.5 border border-border hover:bg-parchment-dark text-soil rounded-full transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
