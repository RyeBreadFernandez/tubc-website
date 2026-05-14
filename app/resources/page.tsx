import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'
import JsonLd from '@/components/JsonLd'
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Resources',
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

const resourceSchemaItems = [
  { name: 'Where to Go', url: '/resources/where-to-go', description: 'Curated backpacking destinations for Bruins, from day hikes to week-long expeditions.' },
  { name: 'Trail Guides', url: '/resources/trail-guides', description: 'Trail details, distances, difficulty, permits, and trip beta for TUBC favorites.' },
  { name: 'Packing List', url: '/resources/packing-list', description: 'A complete backpacking gear checklist for overnight and multi-day trips.' },
  { name: 'Gear Rental', url: '/resources/gear-rental', description: 'How UCLA students can rent packs, tents, sleeping bags, pads, and other gear.' },
  { name: 'How to Pack', url: '/resources/how-to-pack', description: 'How to load and fit a backpack for better comfort on trail.' },
  { name: 'LA Hiking', url: '/resources/la-hiking', description: 'Day hike recommendations near UCLA and around Los Angeles.' },
  { name: 'First Aid', url: '/resources/first-aid', description: 'Wilderness first aid basics for hikers and trip leaders.' },
  { name: 'Backcountry Cooking', url: '/resources/backcountry-cooking', description: 'Meal planning, trail food ideas, and camp cooking tips.' },
]

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }])} />
      <JsonLd
        data={webPageJsonLd({
          path: '/resources',
          name: 'Resources',
          description: 'Guides and tools for UCLA backpackers, including packing lists, gear rental, trail guides, cooking tips, and first aid.',
          type: 'CollectionPage',
        })}
      />
      <JsonLd
        data={itemListJsonLd({
          path: '/resources',
          name: 'TUBC resource guides',
          description: 'Core backpacking, hiking, gear, and outdoor education guides from The Backpacking Club at UCLA.',
          items: resourceSchemaItems,
        })}
      />
      <ResourcesClient />
    </>
  )
}
