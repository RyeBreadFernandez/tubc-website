import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your TUBC member account.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
