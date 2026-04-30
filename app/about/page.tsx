import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import { staff } from '@/data/staff'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about The Backpacking Club at UCLA — a student-run outdoor club with 10+ years of leading Bruins through the Sierra Nevada, Southern California, and beyond.',
  alternates: {
    canonical: 'https://www.uclabackpackingclub.com/about',
  },
  openGraph: {
    title: 'About | UCLA Backpacking Club',
    description: 'Learn about The Backpacking Club at UCLA — a student-run outdoor club with 10+ years of leading Bruins through the Sierra Nevada, Southern California, and beyond.',
    url: 'https://www.uclabackpackingclub.com/about',
    images: [{ url: '/about-hero.jpg', width: 1200, height: 630, alt: 'TUBC club photo' }],
    type: 'website',
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
        subtitle="Backcountry adventures for every Bruin."
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
              The Backpacking Club at UCLA (TUBC) has been taking Bruins into the backcountry for over a decade. We&apos;re a student-run club built on the idea that the outdoors should be for everyone — no gear, no experience, and no budget required to show up and get outside.
            </p>
            <p>
              Every quarter we run a full lineup of trips: day hikes through the Santa Monica Mountains, car camps at Joshua Tree, weekend backpacks in the San Gabriels, and multi-day Sierra crossings for the ones who want to go deep. Whatever your level, there&apos;s a trip on the calendar for you.
            </p>
            <p>
              We also do gear workshops, Leave No Trace clinics, and the occasional social event for when you just want to hang out with people who get unreasonably excited about topo maps. Our gear rental program keeps costs low so that a tight budget is never a reason to miss a trip.
            </p>
            <p>
              Whether this is your first time sleeping under the stars or you&apos;ve logged more miles than you can count, there&apos;s a spot for you in TUBC. Come for the mountains. Stay for the people.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Years running' },
              { value: '30+', label: 'Trips per year' },
              { value: '1500+', label: 'Active members' },
              { value: '$0', label: 'Membership fee' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-muted rounded-md p-5 text-center">
                <p className="font-display text-3xl font-bold text-bark">{value}</p>
                <p className="text-muted-foreground text-sm mt-1">{label}</p>
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
            Meet the Team
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
                  <p className="text-primary text-sm font-semibold mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
