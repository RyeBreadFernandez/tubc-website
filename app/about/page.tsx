import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import { staff } from '@/data/staff'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | The Backpacking Club at UCLA',
  description: 'Learn about The Backpacking Club at UCLA — a student-run outdoor club with 10+ years of leading Bruins through the Sierra Nevada, Southern California, and beyond.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/about',
  },
  openGraph: {
    title: 'About | The Backpacking Club at UCLA',
    description: 'Learn about The Backpacking Club at UCLA — a student-run outdoor club with 10+ years of leading Bruins through the Sierra Nevada, Southern California, and beyond.',
    url: 'https://www.uclabackpackingclub.com/about',
    images: [{ url: '/about-hero.jpg', width: 1200, height: 630, alt: 'TUBC club photo' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | The Backpacking Club at UCLA',
    description: 'Learn about The Backpacking Club at UCLA — a student-run outdoor club with 10+ years of leading Bruins through the Sierra Nevada, Southern California, and beyond.',
    images: ['/about-hero.jpg'],
  },
}

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.uclabackpackingclub.com' },
              { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.uclabackpackingclub.com/about' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'The Backpacking Club at UCLA',
            alternateName: 'TUBC',
            url: 'https://www.uclabackpackingclub.com',
            logo: 'https://www.uclabackpackingclub.com/logo.png',
            description: 'A student-run outdoor club at UCLA dedicated to making backpacking and hiking accessible to everyone.',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'uclabackpackingclub@gmail.com',
              contactType: 'customer support',
            },
            sameAs: [
              'https://www.instagram.com/uclabackpacking/',
            ],
          }),
        }}
      />
      <PageHero
        title="About TUBC"
        subtitle="A decade of taking Bruins into the backcountry — no gear, no experience, no cost to join."
        image="/about-hero.jpg"
      />

      {/* About section */}
      <section className="py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our story</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-6">
            UCLA&apos;s home for the backcountry
          </h2>
          <div className="prose prose-lg text-muted-foreground space-y-4 leading-relaxed">
            <p>
              TUBC has been taking Bruins into the backcountry for over a decade. We&apos;re student-run, free to join, and built around a simple idea: the outdoors should be accessible to anyone at UCLA, regardless of experience or budget.
            </p>
            <p>
              Every quarter we run a full lineup of trips. Day hikes through the Santa Monica Mountains. Car camps at Joshua Tree or at the Eastern Sierra. Weekend backpacks in the San Gabriels or San Bernardinos. Multi-day Sierra crossings to places like Cottonwood Lakes, Rae Lakes, or Whitney for the ones who want to go deep.
            </p>
            <p>
              We also do gear workshops, Leave No Trace clinics, and social events — for when you just want to hang out with people who get unreasonably excited about topo maps. Our club gear stash and rental hookup with UCLA Recreation means a tight budget is never a reason to miss a trip.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Years running', highlight: false },
              { value: '30+', label: 'Trips per year', highlight: false },
              { value: '1500+', label: 'Active members', highlight: false },
              { value: '$0', label: 'Membership fee', highlight: true },
            ].map(({ value, label, highlight }) => (
              <div key={label} className={`rounded-md p-5 text-center ${highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p className={`font-display font-bold ${highlight ? 'text-4xl text-primary-foreground' : 'text-3xl text-bark'}`}>{value}</p>
                <p className={`text-sm mt-1 ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Staff grid */}
      <section id="meet-the-team" className="py-20 bg-parchment-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 text-center">The people behind the trips</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-12 text-center">
            Who&apos;s Taking You Out There
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member) => (
              <Card key={member.name} className="overflow-hidden border-secondary shadow-sm bg-parchment pt-0">
                <div className="relative aspect-square w-full bg-muted flex items-center justify-center">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                      style={{
                        ...(member.objectPosition ? { objectPosition: member.objectPosition } : {}),
                        ...(member.imageScale ? { transform: `scale(${member.imageScale})` } : {}),
                      }}
                    />
                  ) : (
                    <Avatar className="size-20">
                      <AvatarImage src={undefined} alt={member.name} />
                      <AvatarFallback className="bg-secondary text-foreground text-2xl font-bold">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <CardContent className="p-5">
                  <p className="font-display text-lg font-bold text-bark">{member.name}</p>
                  <p className={`text-primary text-sm font-semibold ${member.bio ? 'mb-2' : ''}`}>{member.role}</p>
                  {member.bio && <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
