import Link from 'next/link'

export const metadata = { title: 'First Aid — TUBC Resources' }

const topics = [
  { title: 'Blisters', content: 'Drain with a sterile needle at the blister edge, not the center. Apply antibiotic ointment and cover with Moleskin or a blister bandage. Don\'t remove the skin. Prevention: break in boots before the trip, wear liner socks, use Bodyglide on hot spots.' },
  { title: 'Dehydration', content: 'Symptoms: dark urine, headache, fatigue, irritability. Drink 2–4 liters per day, more at altitude and in heat. Electrolyte tabs help replace what sweat takes. When in doubt, drink more.' },
  { title: 'Altitude Sickness (AMS)', content: 'Symptoms: headache, nausea, dizziness, fatigue appearing above 8,000 ft. Prevention: ascend slowly, hydrate, sleep lower than you hike. Treatment: descend if symptoms worsen. Don\'t push through severe symptoms — this can escalate to HACE or HAPE, which are life-threatening.' },
  { title: 'Twisted Ankle', content: 'RICE: Rest, Ice (use stream water if no ice), Compression (wrap with bandana or ACE bandage), Elevation. If weight-bearing is impossible, evacuate. Trekking poles help stability after a mild sprain.' },
  { title: 'Hypothermia', content: 'Symptoms: shivering, confusion, slurred speech, clumsiness. Prevention: stay dry, layer up before you get cold, eat regularly for fuel. Treatment: get out of wind, remove wet clothes, add dry insulation, share body heat, give warm fluids if conscious.' },
  { title: 'Heat Exhaustion', content: 'Symptoms: heavy sweating, weakness, cool/pale skin, nausea. Move to shade, rest, hydrate with electrolytes. Hike early morning to avoid midday heat. Different from heat stroke (hot/red/dry skin, confusion) — heat stroke is a medical emergency requiring immediate evacuation.' },
  { title: 'Bee Stings & Allergies', content: 'Remove stinger by scraping (not pinching). Apply cold water. If the person has a known allergy, use their EpiPen and evacuate immediately. Anyone experiencing hives, swelling, or breathing difficulty after a sting needs emergency evacuation.' },
  { title: 'When to Evacuate', content: 'Evacuate immediately if someone: cannot walk out under their own power, has altered mental status, chest pain, severe allergic reaction, signs of HACE/HAPE, or a wound that won\'t stop bleeding. When uncertain, err toward evacuation. TUBC recommends all trip leaders complete a Wilderness First Aid course.' },
]

export default function FirstAidPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">First Aid</h1>
          <p className="text-soil text-lg">Wilderness first aid basics every hiker should know. This is not a substitute for formal training.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rose/50 border border-sand rounded-2xl p-5 mb-8">
            <p className="text-bark text-sm font-semibold">Disclaimer</p>
            <p className="text-soil text-sm mt-1">This page covers general wilderness first aid concepts only. For real preparedness, take a Wilderness First Aid (WFA) or Wilderness First Responder (WFR) course. TUBC recommends all trip leaders be WFA certified.</p>
          </div>
          <div className="space-y-5">
            {topics.map(({ title, content }) => (
              <div key={title} className="bg-parchment-dark border border-sand rounded-2xl p-6">
                <h2 className="font-display text-lg font-bold text-bark mb-3">{title}</h2>
                <p className="text-soil text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
