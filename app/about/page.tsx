import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import { staff } from '@/data/staff'
import { getMountainPlaceholder } from '@/lib/utils/placeholder'

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
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3">Who we are</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-6">
            UCLA's home for the backcountry
          </h2>
          <div className="prose prose-lg text-soil space-y-4 leading-relaxed">
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
              Whether you've never spent a night outside or you're a seasoned backcountry traveler, there's a place for you in TUBC. Come for the mountains. Stay for the vibes.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Years running' },
              { value: '30+', label: 'Trips per year' },
              { value: '1500+', label: 'Active members' },
              { value: '$0', label: 'Membership fee' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-moss rounded-xl p-5 text-center">
                <p className="font-display text-3xl font-bold text-bark">{value}</p>
                <p className="text-soil text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff grid */}
      <section className="py-20 bg-parchment-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-terra text-sm font-semibold uppercase tracking-widest mb-3 text-center">The people behind the trips</p>
          <h2 className="font-display text-3xl md:text-4xl text-bark font-bold mb-12 text-center">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member) => (
              <div key={member.name} className="bg-parchment border border-sand rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-48 bg-moss">
                  {member.imageUrl ? (
                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center">
                        <svg className="w-10 h-10 text-soil/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold text-bark">{member.name}</p>
                  <p className="text-terra text-sm font-semibold mb-2">{member.role}</p>
                  <p className="text-soil text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
