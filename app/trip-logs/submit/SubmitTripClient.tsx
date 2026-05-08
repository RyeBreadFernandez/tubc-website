'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Toaster } from '@/components/ui/sonner'

const CROP_ASPECT = 3 / 2   // width ÷ height pixel ratio
const MIN_CROP_W  = 80      // minimum crop width in container px
const HANDLE_PX   = 14      // corner handle size

interface CropRect { x: number; y: number; w: number; h: number }
type Corner = 'nw' | 'ne' | 'sw' | 'se'
type DragMode = 'move' | Corner

interface DragState {
  mode: DragMode
  startX: number
  startY: number
  startCrop: CropRect
}

interface FormData {
  title: string
  location: string
  trip_date: string
  miles: string
  elevation_gain: string
  content: string
}

function clamp(value: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, value))
}

function clampCrop(c: CropRect, cw: number, ch: number): CropRect {
  let { x, y, w, h } = c
  // enforce min size and aspect
  w = Math.max(MIN_CROP_W, w)
  h = w / CROP_ASPECT
  // don't exceed container
  if (w > cw) { w = cw; h = w / CROP_ASPECT }
  if (h > ch) { h = ch; w = h * CROP_ASPECT }
  // keep inside bounds
  x = clamp(x, 0, cw - w)
  y = clamp(y, 0, ch - h)
  return { x, y, w, h }
}

function initialCrop(cw: number, ch: number): CropRect {
  // largest 3:2 rect that fits, at 90% of max, centered
  let w = cw * 0.9
  let h = w / CROP_ASPECT
  if (h > ch * 0.9) { h = ch * 0.9; w = h * CROP_ASPECT }
  return { x: (cw - w) / 2, y: (ch - h) / 2, w, h }
}

async function extractCrop(
  src: string, fileName: string,
  crop: CropRect, cw: number, ch: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => {
      const sx = (crop.x / cw) * img.naturalWidth
      const sy = (crop.y / ch) * img.naturalHeight
      const sw = (crop.w / cw) * img.naturalWidth
      const sh = (crop.h / ch) * img.naturalHeight
      const canvas = document.createElement('canvas')
      canvas.width  = Math.round(sw)
      canvas.height = Math.round(sh)
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas unavailable')); return }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error('Canvas export failed')); return }
          resolve(new File([blob], fileName, { type: 'image/jpeg' }))
        },
        'image/jpeg', 0.92
      )
    }
    img.onerror = () => reject(new Error('Image load failed'))
    img.src = src
  })
}

export default function SubmitTripClient() {
  const router = useRouter()
  const [submitting, setSubmitting]     = useState(false)
  const [coverFile, setCoverFile]       = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [dropHover, setDropHover]       = useState(false)
  const [difficulty, setDifficulty]     = useState('')
  const [crop, setCrop]                 = useState<CropRect | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef      = useRef<DragState | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  // ── pointer events (document-level so dragging outside container works) ──
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current
      const el   = containerRef.current
      if (!drag || !el) return
      const { width: cw, height: ch } = el.getBoundingClientRect()
      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY
      const sc = drag.startCrop
      let next: CropRect

      if (drag.mode === 'move') {
        next = { x: sc.x + dx, y: sc.y + dy, w: sc.w, h: sc.h }
      } else {
        let w: number, x: number, y: number
        switch (drag.mode) {
          case 'se': w = sc.w + dx; x = sc.x;           y = sc.y;                     break
          case 'sw': w = sc.w - dx; x = sc.x + sc.w - w; y = sc.y;                   break
          case 'ne': w = sc.w + dx; x = sc.x;           y = sc.y + sc.h - w / CROP_ASPECT; break
          case 'nw': w = sc.w - dx; x = sc.x + sc.w - w; y = sc.y + sc.h - w / CROP_ASPECT; break
        }
        next = { x: x!, y: y!, w: w!, h: w! / CROP_ASPECT }
      }
      setCrop(clampCrop(next, cw, ch))
    }
    const onUp = () => { dragRef.current = null }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup',   onUp)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup',   onUp)
    }
  }, [])

  const startDrag = useCallback((mode: DragMode) => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!crop) return
    dragRef.current = { mode, startX: e.clientX, startY: e.clientY, startCrop: { ...crop } }
  }, [crop])

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file.'); return }
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
    setCrop(null)
  }, [])

  const onImageLoad = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width: cw, height: ch } = el.getBoundingClientRect()
    setCrop(initialCrop(cw, ch))
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDropHover(false)
    const f = e.dataTransfer.files[0]; if (f) handleFile(f)
  }, [handleFile])

  const removeCover = useCallback(() => {
    setCoverFile(null); setCoverPreview(null); setCrop(null)
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!coverFile || !coverPreview) { toast.error('Please upload a cover photo.'); return }
    if (!difficulty)                 { toast.error('Please select a difficulty.');  return }
    if (!crop || !containerRef.current) { toast.error('Please wait for the photo to load.'); return }
    setSubmitting(true)
    try {
      const { width: cw, height: ch } = containerRef.current.getBoundingClientRect()
      const croppedFile = await extractCrop(coverPreview, coverFile.name, crop, cw, ch)
      const body = new globalThis.FormData()
      body.append('title',          data.title)
      body.append('location',       data.location)
      body.append('trip_date',      data.trip_date)
      body.append('difficulty',     difficulty)
      body.append('miles',          data.miles          ?? '')
      body.append('elevation_gain', data.elevation_gain ?? '')
      body.append('content',        data.content)
      body.append('cover',          croppedFile)
      const res  = await fetch('/api/submit-trip', { method: 'POST', body })
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

  // ── corner handle positions ──────────────────────────────────────────────
  const cornerStyle = (c: Corner): React.CSSProperties => ({
    position:  'absolute',
    width:     HANDLE_PX,
    height:    HANDLE_PX,
    background: 'white',
    borderRadius: 2,
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
    cursor:    `${c}-resize`,
    ...(c.includes('n') ? { top:    -HANDLE_PX / 2 } : { bottom: -HANDLE_PX / 2 }),
    ...(c.includes('w') ? { left:   -HANDLE_PX / 2 } : { right:  -HANDLE_PX / 2 }),
  })

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
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Trip Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="e.g. Mount Whitney via Main Trail"
              required aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && <p id="title-error" role="alert" className="text-destructive text-xs">{errors.title.message}</p>}
          </div>

          {/* Location + Date */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="location">Location / Trail Name</Label>
              <Input
                id="location"
                {...register('location', { required: 'Location is required' })}
                placeholder="e.g. Inyo National Forest, CA"
                required aria-required="true"
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
                type="date" required aria-required="true"
                aria-invalid={!!errors.trip_date}
                aria-describedby={errors.trip_date ? 'trip-date-error' : undefined}
              />
              {errors.trip_date && <p id="trip-date-error" role="alert" className="text-destructive text-xs">{errors.trip_date.message}</p>}
            </div>
          </div>

          {/* Difficulty + Stats */}
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={(v: string | null) => { if (v) setDifficulty(v) }}>
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
              <Input id="miles" {...register('miles')} type="number" step="0.1" placeholder="e.g. 22.5" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="elevation_gain">Elevation Gain (ft)</Label>
              <Input id="elevation_gain" {...register('elevation_gain')} type="number" placeholder="e.g. 6200" />
            </div>
          </div>

          {/* Cover photo */}
          <div className="space-y-1.5">
            <Label htmlFor="cover-photo">
              Cover Photo <span className="text-primary text-xs">*required</span>
            </Label>
            <input
              ref={fileInputRef} id="cover-photo" type="file" accept="image/*"
              aria-required="true" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />

            {coverPreview ? (
              <div className="space-y-2">
                {/* ── Crop editor ─────────────────────────────────────────── */}
                <div
                  ref={containerRef}
                  className="relative rounded-md overflow-hidden border border-secondary select-none bg-black"
                  style={{ touchAction: 'none' }}
                >
                  {/* Full image — sizes itself naturally */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverPreview}
                    alt="Cover photo"
                    className="block w-full h-auto"
                    onLoad={onImageLoad}
                    draggable={false}
                  />

                  {crop && (
                    <>
                      {/* Dark overlay — 4 panels around the crop rect */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* top */}
                        <div className="absolute bg-black/60" style={{ top: 0, left: 0, right: 0, height: crop.y }} />
                        {/* bottom */}
                        <div className="absolute bg-black/60" style={{ top: crop.y + crop.h, left: 0, right: 0, bottom: 0 }} />
                        {/* left */}
                        <div className="absolute bg-black/60" style={{ top: crop.y, left: 0, width: crop.x, height: crop.h }} />
                        {/* right */}
                        <div className="absolute bg-black/60" style={{ top: crop.y, left: crop.x + crop.w, right: 0, height: crop.h }} />
                      </div>

                      {/* Crop rectangle */}
                      <div
                        className="absolute cursor-move"
                        style={{
                          left:   crop.x,
                          top:    crop.y,
                          width:  crop.w,
                          height: crop.h,
                          border: '2px solid white',
                          boxShadow: '0 0 0 1px rgba(0,0,0,0.35)',
                        }}
                        onPointerDown={startDrag('move')}
                      >
                        {/* Rule-of-thirds grid */}
                        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                          <div className="absolute inset-y-0" style={{ left: '33.33%',  borderLeft: '1px solid rgba(255,255,255,0.25)' }} />
                          <div className="absolute inset-y-0" style={{ left: '66.66%',  borderLeft: '1px solid rgba(255,255,255,0.25)' }} />
                          <div className="absolute inset-x-0" style={{ top:  '33.33%', borderTop:  '1px solid rgba(255,255,255,0.25)' }} />
                          <div className="absolute inset-x-0" style={{ top:  '66.66%', borderTop:  '1px solid rgba(255,255,255,0.25)' }} />
                        </div>

                        {/* Corner handles */}
                        {(['nw', 'ne', 'sw', 'se'] as const).map((c) => (
                          <div
                            key={c}
                            style={cornerStyle(c)}
                            onPointerDown={startDrag(c)}
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={removeCover}
                        aria-label="Remove cover photo"
                        className="absolute top-2 right-2 z-10 bg-foreground/70 hover:bg-foreground text-background text-xs px-3 py-1.5 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Drag the rectangle to reposition · drag a corner to resize · aspect ratio is fixed at 3:2
                </p>
              </div>
            ) : (
              /* ── Upload drop zone ───────────────────────────────────────── */
              <div
                role="button" tabIndex={0}
                aria-label="Upload cover photo — drag and drop or press Enter to browse"
                onDragOver={(e) => { e.preventDefault(); setDropHover(true) }}
                onDragLeave={() => setDropHover(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click() } }}
                className={`border-2 border-dashed rounded-md h-40 flex flex-col items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  dropHover ? 'border-primary bg-primary/5' : 'border-secondary hover:border-primary hover:bg-primary/5'
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

          {/* Trip report */}
          <div className="space-y-1.5">
            <Label htmlFor="content">Trip Report</Label>
            <p id="content-hint" className="text-xs text-muted-foreground">Plain text or Markdown. What were conditions like? Any route-finding issues? What would you tell someone doing it next month?</p>
            <Textarea
              id="content"
              {...register('content', { required: 'Please write your trip report' })}
              rows={14} placeholder="The alarm went off at 3am..."
              required aria-required="true"
              className="resize-none font-mono text-xs leading-relaxed"
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? 'content-error content-hint' : 'content-hint'}
            />
            {errors.content && <p id="content-error" role="alert" className="text-destructive text-xs">{errors.content.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting} className="flex-1 py-3.5 h-auto rounded-md">
              {submitting ? 'Uploading & submitting…' : 'Submit for Review'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="px-6 py-3.5 h-auto rounded-md">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
