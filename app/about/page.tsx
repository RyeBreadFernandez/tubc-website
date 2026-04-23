import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import { staff } from '@/data/staff'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'About — TUBC',
  description: 'Learn about The Backpacking Club at UCLA and meet our team.',
}

export default function AboutPage() {
  return (
    <main className="flex-1 pt-16">
      <PageHero
        title="About TUBC"
        subtitle="Experience the outdoors without restrictions."
        image="/about-hero.jpg"
      />

      {/* About section */}
      <section className="py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Who we are</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-6">
            UCLA&apos;s home for the backcountry
          </h2>
          <div className="prose prose-lg text-muted-foreground space-y-4 leading-relaxed">
            <p>
              The Backpacking Club at UCLA (TUBC) has been taking Bruins into the wilderness for over a decade. We are a student-run organization dedicated to making outdoor adventure accessible to everyone regardless of experience, budget, or gear.
            </p>
            <p>
              From beginner-friendly day hikes in the Santa Monica Mountains to multi-day Sierra Nevada crossings, we plan and lead trips every single quarter. We also host seminars, gear workshops, and social events to build community around a shared love of wild places.
            </p>
            <p>
              Collaboration with the gear rental program keeps costs low. Our trip leaders keep things safe. Our community keeps bringing people back quarter after quarter, year after year.
            </p>
            <p>
              Whether you&apos;ve never spent a night outside or you&apos;re a seasoned backcountry traveler, there&apos;s a place for you in TUBC. Come for the mountains. Stay for the vibes.
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
      <section className="py-20 bg-parchment-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 text-center">The people behind the trips</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-12 text-center">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member) => (
              <Card key={member.name} className="overflow-hidden border-secondary shadow-sm bg-parchment">
                <div className="relative h-48 bg-muted flex items-center justify-center">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
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
