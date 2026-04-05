'use client'

import { useState } from 'react'
import Image from 'next/image'

const photos = [
  { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', caption: 'Sierra Nevada at sunrise' },
  { url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', caption: 'On the trail' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', caption: 'Alpine lake reflections' },
  { url: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=800&q=80', caption: 'Camp vibes' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80', caption: 'High Sierra crossing' },
  { url: 'https://images.unsplash.com/photo-1476611317561-60117649dd94?auto=format&fit=crop&w=800&q=80', caption: 'Morning mist on the trail' },
  { url: 'https://images.unsplash.com/photo-1439853949212-36089fb60f47?auto=format&fit=crop&w=800&q=80', caption: 'Golden hour summit' },
  { url: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80', caption: 'Into the forest' },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', caption: 'Valley view' },
  { url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80', caption: 'Winter backpacking' },
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', caption: 'Starry night at camp' },
  { url: 'https://images.unsplash.com/photo-1543965170-e399ce108155?auto=format&fit=crop&w=800&q=80', caption: 'Desert canyon' },
]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null))
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % photos.length : null))

  return (
    <main className="flex-1 pt-16">
      {/* Hero */}
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">From the field</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold">Gallery</h1>
          <p className="text-soil mt-3 text-lg">Moments from the trail, the summit, and everywhere in between.</p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="pb-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl border border-sand shadow-sm"
                onClick={() => setLightbox(i)}
              >
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  width={400}
                  height={300}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/30 transition-colors flex items-end">
                  <p className="text-parchment text-sm px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform w-full bg-bark/40">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-bark/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-parchment/70 hover:text-parchment p-2"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment/70 hover:text-parchment p-2"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            className="max-w-4xl max-h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].url.replace('w=800', 'w=1200')}
              alt={photos[lightbox].caption}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain rounded-lg"
              unoptimized
            />
            <p className="text-parchment/80 text-center text-sm mt-3">{photos[lightbox].caption}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-parchment/70 hover:text-parchment p-2"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </main>
  )
}
