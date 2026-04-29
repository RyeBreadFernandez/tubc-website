import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your UCLA Backpacking Club member account to access trip reports and the member dashboard.',
  alternates: {
    canonical: 'https://tubcla.com/login',
  },
  openGraph: {
    title: 'Sign In | UCLA Backpacking Club',
    description: 'Sign in to your UCLA Backpacking Club member account.',
    url: 'https://tubcla.com/login',
    images: [{ url: '/staff-group.jpg', width: 1200, height: 630, alt: 'UCLA Backpacking Club' }],
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginClient />
}
