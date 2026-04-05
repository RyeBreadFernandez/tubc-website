import Link from 'next/link'

export const metadata = { title: 'How to Pack — TUBC Resources' }

const sections = [
  {
    title: 'The Golden Rule: Heavy Close, Light High',
    content: 'Pack your heaviest items (food, water, bear canister) close to your back and centered around your shoulder blades. Lighter items go toward the top and outside pockets. This keeps the load balanced and reduces strain on your hips and spine.',
  },
  {
    title: 'Bottom of the Pack',
    content: 'Sleeping bag and sleeping pad. You won\'t need these until camp, so bury them at the bottom. Use your sleeping bag stuff sack as a soft buffer between the bag and the pack frame.',
  },
  {
    title: 'Core / Middle Zone',
    content: 'Heaviest gear goes here: food bag or bear canister, water filter, cook kit. Keep these snug against your back. A bear canister, being rigid, is often best positioned sideways in the main compartment.',
  },
  {
    title: 'Top of the Pack',
    content: 'Rain gear, puffy jacket, first aid kit. Things you might need quickly if weather rolls in. Keep them accessible without digging.',
  },
  {
    title: 'Hip Belt Pockets',
    content: 'Phone, snacks, lip balm, sunscreen. Anything you want trail-side without stopping to dig through the main compartment.',
  },
  {
    title: 'Outer Pockets',
    content: 'Water bottles, trekking poles, wet items (rain jacket, sweaty layers). Keep wet things away from the interior to avoid soaking dry gear.',
  },
  {
    title: 'Fit Your Pack Before You Go',
    content: 'Load your pack at home with all your gear and try it on. Adjust the torso length, load lifters, hip belt, and shoulder straps until the weight sits on your hips (80% hip, 20% shoulders). A properly fitted pack at 35 lbs feels lighter than a bad fit at 25.',
  },
  {
    title: 'The 10% Body Weight Rule',
    content: 'A common guideline: your fully loaded pack should be no more than 20–25% of your body weight for comfort. For beginners, aim for 30 lbs or under. Ultralight hikers often get it below 15 lbs base weight — but that takes practice and gear investment.',
  },
]

export default function HowToPackPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">How to Pack</h1>
          <p className="text-soil text-lg">Pack smart and your back will thank you. Here's how to load a backpack properly.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((s) => (
            <div key={s.title} className="bg-parchment-dark border border-sand rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-bark mb-3">{s.title}</h2>
              <p className="text-soil text-sm leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
