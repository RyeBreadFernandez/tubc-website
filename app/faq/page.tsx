'use client'

import { faqs } from '@/data/faq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-10 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Got questions?</p>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mb-3">Before Your First Trip</h1>
          <p className="text-muted-foreground text-lg">Everything you need to know before your first trip.</p>
        </div>
      </section>

      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-secondary rounded-md overflow-hidden bg-parchment px-2"
              >
                <AccordionTrigger className="font-display text-bark font-semibold text-base px-4 py-5 hover:bg-parchment-dark rounded-md hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 bg-muted rounded-md p-8 text-center">
            <p className="font-display text-xl text-bark font-bold mb-2">Still have questions?</p>
            <p className="text-muted-foreground text-sm mb-5">We&apos;re happy to help. Reach out anytime.</p>
            <a
              href="mailto:uclabackpackingclub@gmail.com"
              className="inline-block px-6 py-2.5 bg-primary hover:bg-terra-dark text-primary-foreground font-semibold rounded-md text-sm transition-colors"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
