import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | The Backpacking Club at UCLA',
  description: 'Photos from UCLA Backpacking Club trips — summits, trails, and campsites across the Sierra Nevada, Southern California, and beyond.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/gallery',
  },
  openGraph: {
    title: 'Gallery | The Backpacking Club at UCLA',
    description: 'Photos from UCLA Backpacking Club trips — summits, trails, and campsites across the Sierra Nevada, Southern California, and beyond.',
    url: 'https://www.uclabackpackingclub.com/gallery',
    images: [{ url: '/trip-logs-hero.jpg', width: 1200, height: 630, alt: 'TUBC trip photos' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | The Backpacking Club at UCLA',
    description: 'Photos from UCLA Backpacking Club trips — summits, trails, and campsites across the Sierra Nevada, Southern California, and beyond.',
    images: ['/trip-logs-hero.jpg'],
  },
}

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
              { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://www.uclabackpackingclub.com/gallery' },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="pt-16 pb-10 bg-parchment border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">From the field</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold">Gallery</h1>
          <p className="text-soil mt-3 text-lg">Moments from the trail, the summit, and everywhere in between.</p>
        </div>
      </section>

      {/* Coming soon */}
      <section className="pb-32 pt-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
            <svg className="w-8 h-8 text-soil" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="font-display text-2xl text-bark font-bold mb-3">Photos coming soon</p>
          <p className="text-soil text-base max-w-md mx-auto">We&apos;re pulling together the best shots from our trips. For now, the Instagram has it all — Whitney sunrises, Cottonwood Lakes camp setups, and everyone&apos;s post-hike faces.</p>
          <a
            href="https://www.instagram.com/uclabackpacking/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors"
          >
            Follow on Instagram
          </a>
        </div>
      </section>
    </main>
  )
}
