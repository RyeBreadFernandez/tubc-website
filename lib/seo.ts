import type { Metadata } from 'next'

export const SITE_URL = 'https://www.uclabackpackingclub.com'
export const SITE_NAME = 'The Backpacking Club at UCLA'
export const SITE_SHORT_NAME = 'TUBC'
export const SITE_EMAIL = 'uclabackpackingclub@gmail.com'
export const INSTAGRAM_URL = 'https://www.instagram.com/uclabackpacking/'
export const SLACK_SIGNUP_URL = 'https://jqkmlifwwqdhuwn-1314.slack.com/signup#/domain-signup'

export const SITE_DESCRIPTION =
  "UCLA's student backpacking club for free trips, gear guidance, outdoor education, trip reports, and beginner-friendly hiking community."

export const DEFAULT_OG_IMAGE = '/cottonwood-lakes.jpg'
export const DEFAULT_OG_IMAGE_ALT = 'Cottonwood Lakes in the Sierra Nevada'

export const CORE_TOPICS = [
  'UCLA backpacking club',
  'UCLA hiking club',
  'beginner backpacking',
  'backpacking trips',
  'gear rental',
  'Los Angeles hiking',
  'Sierra Nevada backpacking',
  'outdoor education',
  'Leave No Trace',
]

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = title,
  type = 'website',
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
      width: 894,
      height: 894,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    foundingDate: '2012',
    slogan: 'Bruins in the backcountry since 2012.',
    sameAs: [INSTAGRAM_URL],
    areaServed: [
      { '@type': 'Place', name: 'University of California, Los Angeles' },
      { '@type': 'Place', name: 'Los Angeles, California' },
      { '@type': 'Place', name: 'California' },
    ],
    knowsAbout: CORE_TOPICS,
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  }
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'FAQPage'
}) {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
    about: CORE_TOPICS,
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function itemListJsonLd({
  path,
  name,
  description,
  items,
}: {
  path: string
  name: string
  description: string
  items: Array<{ name: string; description?: string; url?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#item-list`,
    name,
    description,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: item.url ? absoluteUrl(item.url) : undefined,
    })),
  }
}

export function howToJsonLd({
  path,
  name,
  description,
  steps,
}: {
  path: string
  name: string
  description: string
  steps: Array<{ name: string; text: string }>
}) {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#how-to`,
    name,
    description,
    mainEntityOfPage: {
      '@id': `${url}#webpage`,
    },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}
