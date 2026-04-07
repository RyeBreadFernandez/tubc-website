import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from TUBC trips — the Sierra Nevada, Southern California trails, and beyond.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
