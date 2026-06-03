'use client'

import { Button } from '@/components/ui/button'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content" className="flex-1 pt-16 bg-parchment min-h-screen">
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Trail temporarily washed out
          </p>
          <h1 className="font-display text-4xl text-bark font-bold">Something did not load.</h1>
          <p className="text-muted-foreground mt-4">
            The site hit a backend error while loading this page. Try again, and if it keeps happening, let the officers know.
          </p>
          <Button type="button" onClick={reset} className="mt-8">
            Try again
          </Button>
        </div>
      </section>
    </main>
  )
}
