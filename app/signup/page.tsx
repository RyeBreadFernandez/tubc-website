import type { Metadata } from 'next'
import SignupClient from './SignupClient'

export const metadata: Metadata = {
  title: 'Join the Club',
  description: 'Create your free UCLA Backpacking Club member account to sign up for trips, submit trip reports, and connect with the community.',
  alternates: {
    canonical: 'https://tubcla.com/signup',
  },
  openGraph: {
    title: 'Join the Club | UCLA Backpacking Club',
    description: 'Create your free UCLA Backpacking Club member account.',
    url: 'https://tubcla.com/signup',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club' }],
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  return <SignupClient />
}
