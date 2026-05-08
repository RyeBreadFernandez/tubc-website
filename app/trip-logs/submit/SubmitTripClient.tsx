'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Toaster } from '@/components/ui/sonner'

interface FormData {
  title: string
  location: string
  trip_date: string
  miles: string
  elevation_gain: string
  content: string
}

async function cropToFocalPoint(previewUrl: string, fileName: string, focalX: number, focalY: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => {
      const targetAspect = 3 / 2
      let cropW = img.width
      let cropH = img.width / targetAspect
      if (cropH > img.height) {
        cropH = img.height
        cropW = img.height * targetAspect
      }
      let cropX = img.width * focalX - cropW / 2
      let cropY = img.height * focalY - cropH / 2
      cropX = Math.max(0, Math.min(img.width - cropW, cropX))
      cropY = Math.max(0, Math.min(img.height - cropH, cropY))

      const canvas = document.createElement('canvas')
      canvas.width = Math.round(cropW)
      canvas.height = Math.round(cropH)
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas unavailable')); return }
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('Canvas export failed')); return }
        resolve(new File([blob], fileName, { type: 'image/jpeg' }))
      }, 'image/jpeg', 0.92)
    }
    img.onerror = () => reject(new Error('Image load failed'))
    img.src = previewUrl
  })
}

export default function SubmitTripClient() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [difficulty, setDifficulty] = useState<string>('')
  const [focalX, setFocalX] = useState(0.5)
  const [focalY, setFocalY] = useState(0.5)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
    setFocalX(0.5)
    setFocalY(0.5)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleFocalClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setFocalX(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
    setFocalY(Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)))
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!coverFile || !coverPreview) {
      toast.error('Please upload a cover photo.')
      return
    }
    if (!difficulty) {
      toast.error('Please select a difficulty.')
      return
    }
    setSubmitting(true)
    try {
      const croppedFile = await cropToFocalPoint(coverPreview, coverFile.name, focalX, focalY)

      const body = new globalThis.FormData()
      body.append('title', data.title)
      body.append('location', data.location)
      body.append('trip_date', data.trip_date)
      body.append('difficulty', difficulty)
      body.append('miles', data.miles ?? '')
      body.append('elevation_gain', data.elevation_gain ?? '')
      body.append('content', data.content)
      body.append('cover', croppedFile)

      const res = await fetch('/api/submit-trip', { method: 'POST', body })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Something went wrong.')

      toast.success('Trip report submitted! An officer will review and publish it shortly.')
      setTimeout(() => router.push('/trip-logs'), 1500)
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-1">From the field</p>
          <h1 className="font-display text-3xl md:text-4xl text-bark font-bold">Write a Trip Report</h1>
          <p className="text-muted-foreground text-sm mt-2">Tell us what the trail was actually like. An officer will review it before it goes live.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="title">Trip Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="e.g. Mount Whitney via Main Trail"
              required
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && <p id="title-error" role="alert" className="text-destructive text-xs">{errors.title.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="location">Location / Trail Name</Label>
              <Input
                id="location"
                {...register('location', { required: 'Location is required' })}
                placeholder="e.g. Inyo National Forest, CA"
                required
                aria-required="true"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'location-error' : undefined}
              />
              {errors.location && <p id="location-error" role="alert" className="text-destructive text-xs">{errors.location.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="trip_date">Trip Date</Label>
              <Input
                id="trip_date"
                {...register('trip_date', { required: 'Date is required' })}
                type="date"
                required
                aria-required="true"
                aria-invalid={!!errors.trip_date}
                aria-describedby={errors.trip_date ? 'trip-date-error' : undefined}
              />
              {errors.trip_date && <p id="trip-date-error" role="alert" className="text-destructive text-xs">{errors.trip_date.message}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={(v) => { if (v != null) setDifficulty(String(v)) }}>
                <SelectTrigger id="difficulty" className="w-full" aria-required="true">
                  <SelectValue placeholder="Select…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Strenuous">Strenuous</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="miles">Miles</Label>
              <Input
                id="miles"
                {...register('miles')}
                type="number"
                step="0.1"
                placeholder="e.g. 22.5"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="elevation_gain">Elevation Gain (ft)</Label>
              <Input
                id="elevation_gain"
                {...register('elevation_gain')}
                type="number"
                placeholder="e.g. 6200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cover-photo">
              Cover Photo <span className="text-primary text-xs">*required</span>
            </Label>
            <input
              ref={fileInputRef}
              id="cover-photo"
              type="file"
              accept="image/*"
              aria-required="true"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />
            {coverPreview ? (
              <div className="space-y-2">
                <div className="relative rounded-md overflow-hidden border border-secondary">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Click to set focal point for the cover photo crop"
                    className="relative aspect-[3/2] cursor-crosshair select-none"
                    onClick={handleFocalClick}
                    onKeyDown={(e) => {
                      const step = 0.05
                      if (e.key === 'ArrowLeft') { e.preventDefault(); setFocalX(x => Math.max(0, x - step)) }
                      if (e.key === 'ArrowRight') { e.preventDefault(); setFocalX(x => Math.min(1, x + step)) }
                      if (e.key === 'ArrowUp') { e.preventDefault(); setFocalY(y => Math.max(0, y - step)) }
                      if (e.key === 'ArrowDown') { e.preventDefault(); setFocalY(y => Math.min(1, y + step)) }
                    }}
                  >
                    <Image
                      src={coverPreview}
                      alt="Cover photo preview"
                      fill
                      className="object-cover pointer-events-none"
                      style={{ objectPosition: `${focalX * 100}% ${focalY * 100}%` }}
                      unoptimized
                    />
                    {/* Focal point crosshair */}
                    <div
                      className="absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg pointer-events-none transition-all duration-100"
                      style={{
                        left: `${focalX * 100}%`,
                        top: `${focalY * 100}%`,
                        background: 'rgba(var(--color-primary) / 0.7)',
                        boxShadow: '0 0 0 1px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.4)',
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                      <span className="bg-bark/70 text-parchment text-xs px-2.5 py-1 rounded-full whitespace-nowrap pointer-events-none">
                        Click to set focal point
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setCoverFile(null); setCoverPreview(null); setFocalX(0.5); setFocalY(0.5) }}
                    aria-label="Remove cover photo"
                    className="absolute top-2 right-2 bg-foreground/70 hover:bg-foreground text-background text-xs px-3 py-1.5 rounded-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This preview shows how your photo will be cropped. Click anywhere to move the focus point.
                </p>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload cover photo — drag and drop or press Enter to browse"
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click() } }}
                className={`border-2 border-dashed rounded-md h-40 flex flex-col items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  dragging ? 'border-primary bg-primary/5' : 'border-secondary hover:border-primary hover:bg-primary/5'
                }`}
              >
                <svg className="size-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-muted-foreground">Drag & drop a photo, or <span className="text-primary font-semibold">browse</span></p>
                <p className="text-xs text-muted-foreground/60 mt-1">One image required</p>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content">Trip Report</Label>
            <p id="content-hint" className="text-xs text-muted-foreground">Plain text or Markdown. What were conditions like? Any route-finding issues? What would you tell someone doing it next month?</p>
            <Textarea
              id="content"
              {...register('content', { required: 'Please write your trip report' })}
              rows={14}
              placeholder="The alarm went off at 3am..."
              required
              aria-required="true"
              className="resize-none font-mono text-xs leading-relaxed"
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? 'content-error content-hint' : 'content-hint'}
            />
            {errors.content && <p id="content-error" role="alert" className="text-destructive text-xs">{errors.content.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3.5 h-auto rounded-md"
            >
              {submitting ? 'Uploading & submitting…' : 'Submit for Review'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="px-6 py-3.5 h-auto rounded-md"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
