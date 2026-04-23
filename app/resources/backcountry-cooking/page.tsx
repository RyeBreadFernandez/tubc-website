import Link from 'next/link'

export const metadata = { title: 'Backcountry Cooking — TUBC Resources' }

const meals = [
  { meal: 'Breakfast', ideas: ['Instant oatmeal with dried fruit and nuts', 'Granola with powdered milk', 'Grits with cheese and bacon bits', 'Peanut butter tortilla (no cook)'] },
  { meal: 'Lunch', ideas: ['Hard cheese, salami, crackers', 'Peanut butter and honey tortilla', 'Tuna packets with crackers', 'Bars: Clif, RX, Larabar'] },
  { meal: 'Dinner', ideas: ['Ramen with a packet of miso and dehydrated veggies', 'Mac and cheese with tuna', 'Instant mashed potatoes with olive oil and seasonings', 'Backpacker\'s Pantry or Mountain House freeze-dried meals'] },
  { meal: 'Snacks', ideas: ['Trail mix (GORP)', 'Jerky (beef or turkey)', 'Chocolate — dark holds up better in heat', 'Energy chews or gels for big days'] },
]

const tips = [
  { tip: 'Calories are king', body: 'Aim for 100–150 calories per ounce of food. Fat is your highest-calorie-per-weight option. Olive oil packets are a backcountry hack for dense calories.' },
  { tip: 'Pre-measure everything', body: 'Repackage food at home in zip-lock bags with the exact amount you need per meal. Eliminates wasted weight from packaging.' },
  { tip: 'Altitude affects boiling', body: 'Water boils at lower temperatures at elevation (~194°F at 10,000 ft). Pasta and rice take longer to cook. Ramen and instant meals are more forgiving.' },
  { tip: 'Minimize dishes', body: 'Eat out of your cookpot. One pot, one spork. Bring a small square of a sponge for cleanup — never wash dishes in a creek.' },
  { tip: 'Leave No Trace with food scraps', body: 'Strain your dishwater and pack out all food scraps. Scatter strained water 200 ft from camp. Mice and bears don\'t need a reason to visit your tent.' },
]

export default function BackcountryCookingPage() {
  return (
    <main className="flex-1 pt-16">
      <section className="pt-16 pb-8 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/resources" className="text-terra text-sm hover:text-terra-dark transition-colors">← Resources</Link>
          <h1 className="font-display text-4xl md:text-5xl text-bark font-bold mt-4 mb-3">Backcountry Cooking</h1>
          <p className="text-soil text-lg">Eat well on the trail. Good food makes a hard day great.</p>
        </div>
      </section>
      <section className="pb-20 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl text-bark font-bold mb-5">Meal Ideas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {meals.map(({ meal, ideas }) => (
                <div key={meal} className="bg-parchment-dark border border-sand rounded-md p-5">
                  <h3 className="font-display text-lg font-bold text-bark mb-3">{meal}</h3>
                  <ul className="space-y-1.5">
                    {ideas.map((idea) => (
                      <li key={idea} className="text-soil text-sm flex items-start gap-2">
                        <span className="text-terra mt-1 shrink-0">·</span>{idea}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-bark font-bold mb-5">Tips</h2>
            <div className="space-y-4">
              {tips.map(({ tip, body }) => (
                <div key={tip} className="bg-parchment-dark border border-sand rounded-md p-5">
                  <h3 className="font-semibold text-bark mb-2">{tip}</h3>
                  <p className="text-soil text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
