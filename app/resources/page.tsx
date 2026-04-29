import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Guides and tools for UCLA backpackers — packing lists, gear rental, trail guides, backcountry cooking tips, wilderness first aid, and more.',
  alternates: {
    canonical: 'https://tubcla.com/resources',
  },
  openGraph: {
    title: 'Resources | UCLA Backpacking Club',
    description: 'Guides and tools for UCLA backpackers — packing lists, gear rental, trail guides, backcountry cooking tips, wilderness first aid, and more.',
    url: 'https://tubcla.com/resources',
    images: [{ url: '/trips-hero.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club Resources' }],
    type: 'website',
  },
}

export default function ResourcesPage() {
  return <ResourcesClient />
}
