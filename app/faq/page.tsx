'use client'

import { useState } from 'react'
import { faqs } from '@/data/faq'

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-2">Got questions?</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">FAQ</h1>
          <p className="text-soil text-lg">Everything you need to know before your first trip.</p>
        </div>
      </section>

      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-sand rounded-xl overflow-hidden bg-parchment">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-parchment-dark transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-display text-bark font-semibold text-base pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-terra shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${open === i ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className="px-6 pb-5 text-soil leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-moss rounded-2xl p-8 text-center">
            <p className="font-display text-xl text-bark font-bold mb-2">Still have questions?</p>
            <p className="text-soil text-sm mb-5">We're happy to help. Reach out anytime.</p>
            <a
              href="mailto:uclabackpackingclub@gmail.com"
              className="inline-block px-6 py-2.5 bg-terra hover:bg-terra-dark text-parchment font-semibold rounded-full text-sm transition-colors"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
