import { serializeJsonLd } from '@/lib/json-ld'
import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'Resources | The Backpacking Club at UCLA',
  description: 'Guides and tools for UCLA backpackers — packing lists, gear rental, trail guides, backcountry cooking tips, wilderness first aid, and more.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/resources',
  },
  openGraph: {
    title: 'Resources | The Backpacking Club at UCLA',
    description: 'Guides and tools for UCLA backpackers — packing lists, gear rental, trail guides, backcountry cooking tips, wilderness first aid, and more.',
    url: 'https://www.uclabackpackingclub.com/resources',
    images: [{ url: '/trips-hero.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club Resources' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | The Backpacking Club at UCLA',
    description: 'Guides and tools for UCLA backpackers — packing lists, gear rental, trail guides, backcountry cooking tips, wilderness first aid, and more.',
    images: ['/trips-hero.jpg'],
  },
}

function ResourcesBreadcrumb() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
            { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://www.uclabackpackingclub.com/resources' },
          ],
        }),
      }}
    />
  )
}

export default function ResourcesPage() {
  return (
    <>
      <ResourcesBreadcrumb />
      <ResourcesClient />
    </>
  )
}
