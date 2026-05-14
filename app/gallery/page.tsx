import type { Metadata } from 'next'
import Image from 'next/image'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from '@/lib/seo'

const photos = [
  {
    src: '/cottonwood-lakes.jpg',
    alt: 'Cottonwood Lakes basin with snow-dusted Sierra peaks',
    title: 'Cottonwood Lakes',
    caption: 'Alpine starts, cold water, and the kind of views that make the drive worth it.',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/staff-group.jpg',
    alt: 'Backpacking club members gathered outdoors',
    title: 'Camp Crew',
    caption: 'The part where everyone finds out who packed the best snacks.',
    className: '',
  },
  {
    src: '/trips-hero.jpg',
    alt: 'Yosemite valley at sunset',
    title: 'Yosemite Evenings',
    caption: 'Big walls, small headlamps, and a quiet ride home.',
    className: '',
  },
  {
    src: '/trip-logs-hero.jpg',
    alt: 'Backcountry landscape used for trip logs',
    title: 'From the Logs',
    caption: 'Photos tied to the stories members bring back from the trail.',
    className: '',
  },
  {
    src: '/about-hero.jpg',
    alt: 'TUBC members on a club outing',
    title: 'Bruins Outside',
    caption: 'No experience required - just enough curiosity to say yes.',
    className: 'md:col-span-2',
  },
]

export const metadata: Metadata = {
  title: 'Gallery',
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
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }])} />
      <JsonLd
        data={webPageJsonLd({
          path: '/gallery',
          name: 'Gallery',
          description: 'Photos from UCLA Backpacking Club trips, summits, trails, and campsites.',
          type: 'CollectionPage',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/gallery',
          name: 'TUBC trip photo gallery',
          description: 'Featured images from UCLA Backpacking Club trips and outdoor community events.',
          items: photos.map((photo) => ({
            name: photo.title,
            description: photo.caption,
            url: photo.src,
          })),
        })}
      />
      {/* Hero */}
      <section className="pt-16 pb-10 bg-parchment border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">From the field</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold">Gallery</h1>
          <p className="text-soil mt-3 text-lg">Moments from the trail, the summit, and everywhere in between.</p>
        </div>
      </section>

      <section className="py-14 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 auto-rows-[260px] gap-4">
            {photos.map((photo) => (
              <figure
                key={photo.src}
                className={`group relative overflow-hidden rounded-md bg-bark ${photo.className}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bark/80 via-bark/15 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-parchment">
                  <h2 className="font-display text-2xl font-bold">{photo.title}</h2>
                  <p className="mt-1 text-sm text-parchment/80 max-w-md">{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-8">
            <div>
              <h2 className="font-display text-2xl text-bark font-bold">Have photos from a trip?</h2>
              <p className="text-soil mt-1">Send the good summit shots, camp chaos, and trail candids our way.</p>
            </div>
            <a
              href="https://www.instagram.com/uclabackpacking/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-md text-sm transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
