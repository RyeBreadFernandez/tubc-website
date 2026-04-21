'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
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
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onSubmit = async (data: FormData) => {
    if (!coverFile) {
      toast.error('Please upload a cover photo.')
      return
    }
    setSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const slug = `${slugify(data.title)}-${Date.now()}`

      // Upload image to Supabase Storage
      const ext = coverFile.name.split('.').pop()
      const uploadFolder = user ? user.id : 'public'
      const path = `${uploadFolder}/${slug}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('trip-covers')
        .upload(path, coverFile, { upsert: true })
      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from('trip-covers')
        .getPublicUrl(path)
      const { error } = await supabase.from('trip_logs').insert({
        title: data.title,
        slug,
        location: data.location,
        trip_date: data.trip_date,
        difficulty: data.difficulty,
        miles: data.miles ? parseFloat(data.miles) : null,
        elevation_gain: data.elevation_gain ? parseInt(data.elevation_gain) : null,
        cover_image_url: publicUrl,
        content: data.content,
        author_id: user?.id ?? null,
        published: false,
      })

      if (error) throw error

      toast.success('Trip report submitted! An officer will review and publish it shortly.')
      setTimeout(() => router.push('/trip-logs'), 1500)
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
          <p className="text-soil text-sm mt-2">Reports are reviewed before publishing.</p>
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

          {/* Cover photo drop zone */}
          <div>
            <label className="block text-sm font-medium text-bark mb-1.5">
              Cover Photo <span className="text-terra text-xs">*required</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />
            {coverPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-sand">
                <div className="relative h-52">
                  <Image src={coverPreview} alt="Cover preview" fill className="object-cover" unoptimized />
                </div>
                <button
                  type="button"
                  onClick={() => { setCoverFile(null); setCoverPreview(null) }}
                  className="absolute top-2 right-2 bg-bark/70 hover:bg-bark text-parchment text-xs px-3 py-1.5 rounded-full transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragging ? 'border-terra bg-terra/5' : 'border-sand hover:border-terra hover:bg-terra/5'
                }`}
              >
                <svg className="w-8 h-8 text-soil/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-soil/60">Drag & drop a photo, or <span className="text-terra font-semibold">browse</span></p>
                <p className="text-xs text-soil/40 mt-1">One image required</p>
              </div>
            )}
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
              {submitting ? 'Uploading & submitting…' : 'Submit for Review'}
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
