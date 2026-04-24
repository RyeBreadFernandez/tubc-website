'use client'

const STROKE = '#1B4332'
const BG_STROKE = '#1B4332'

interface HikerLoadingScreenProps {
  immediate?: boolean
}

export default function HikerLoadingScreen({ immediate = false }: HikerLoadingScreenProps) {
  const poseStyle = (anim: string): React.CSSProperties => ({
    animation: `${anim} 0.55s linear infinite both`,
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={immediate ? undefined : { animation: 'hiker-screen-fadein 0.8s ease-out forwards' }}
    >
      <svg
        viewBox="0 0 300 200"
        width="360"
        height="240"
        fill="none"
        stroke={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-hidden="true"
        overflow="hidden"
      >
        {/* ── Background mountains ── */}
        <g stroke={BG_STROKE} opacity={0.25} strokeWidth={1.5}>
          <path d="M0,170 L60,80 L120,170" />
          <path d="M80,170 L160,50 L240,170" />
          <path d="M180,170 L240,100 L300,170" />
        </g>

        {/* ── Sun ── */}
        <circle cx="255" cy="38" r="14" stroke={BG_STROKE} strokeWidth={1.5} opacity={0.3} />

        {/* ── Static slope (ground the hiker stands on) ── */}
        <line x1="0" y1="178" x2="300" y2="148" strokeWidth={2} opacity={0.6} />

        {/* ── Scrolling foreground ground details ── */}
        <g style={{ animation: 'ground-scroll 3.5s linear infinite' }}>
          {/* Rocks — 0–300 */}
          <path d="M20,180 Q26,172 34,180" strokeWidth={1.5} />
          <path d="M70,177 Q76,170 82,177" strokeWidth={1.5} />
          <path d="M130,183 Q137,175 144,183" strokeWidth={1.5} />
          <path d="M185,179 Q192,171 199,179" strokeWidth={1.5} />
          <path d="M240,182 Q247,174 254,182" strokeWidth={1.5} />
          {/* Grass tufts — 0–300 */}
          <line x1="50" y1="180" x2="46" y2="173" strokeWidth={1.2} />
          <line x1="50" y1="180" x2="54" y2="172" strokeWidth={1.2} />
          <line x1="110" y1="178" x2="106" y2="171" strokeWidth={1.2} />
          <line x1="110" y1="178" x2="114" y2="170" strokeWidth={1.2} />
          <line x1="165" y1="181" x2="161" y2="174" strokeWidth={1.2} />
          <line x1="165" y1="181" x2="169" y2="173" strokeWidth={1.2} />
          <line x1="220" y1="179" x2="216" y2="172" strokeWidth={1.2} />
          <line x1="220" y1="179" x2="224" y2="171" strokeWidth={1.2} />
          <line x1="275" y1="181" x2="271" y2="174" strokeWidth={1.2} />
          <line x1="275" y1="181" x2="279" y2="173" strokeWidth={1.2} />
          {/* Rocks — 300–600 (duplicate for seamless loop) */}
          <path d="M320,180 Q326,172 334,180" strokeWidth={1.5} />
          <path d="M370,177 Q376,170 382,177" strokeWidth={1.5} />
          <path d="M430,183 Q437,175 444,183" strokeWidth={1.5} />
          <path d="M485,179 Q492,171 499,179" strokeWidth={1.5} />
          <path d="M540,182 Q547,174 554,182" strokeWidth={1.5} />
          {/* Grass tufts — 300–600 */}
          <line x1="350" y1="180" x2="346" y2="173" strokeWidth={1.2} />
          <line x1="350" y1="180" x2="354" y2="172" strokeWidth={1.2} />
          <line x1="410" y1="178" x2="406" y2="171" strokeWidth={1.2} />
          <line x1="410" y1="178" x2="414" y2="170" strokeWidth={1.2} />
          <line x1="465" y1="181" x2="461" y2="174" strokeWidth={1.2} />
          <line x1="465" y1="181" x2="469" y2="173" strokeWidth={1.2} />
          <line x1="520" y1="179" x2="516" y2="172" strokeWidth={1.2} />
          <line x1="520" y1="179" x2="524" y2="171" strokeWidth={1.2} />
          <line x1="575" y1="181" x2="571" y2="174" strokeWidth={1.2} />
          <line x1="575" y1="181" x2="579" y2="173" strokeWidth={1.2} />
        </g>

        {/* ════════════════════════════════════
            HIKER  — feet at slope ~(148, 163)
            Outer g = position; inner g = bob
            ════════════════════════════════════ */}
        <g transform="translate(148,163)">
          <g style={{ animation: 'hiker-bob 0.55s ease-in-out infinite' }}>

            {/* ── Head + hat ── */}
            <circle cx="0" cy="-58" r="7" strokeWidth={2} />
            {/* Hat brim */}
            <line x1="-10" y1="-64" x2="10" y2="-64" strokeWidth={2} />
            {/* Hat crown */}
            <path d="M-6,-64 L-5,-74 L6,-74 L7,-64" strokeWidth={2} />

            {/* ── Neck ── */}
            <line x1="0" y1="-51" x2="0" y2="-46" strokeWidth={2.5} />

            {/* ── Torso ── */}
            <line x1="-5" y1="-46" x2="-6" y2="-26" strokeWidth={2} />
            <line x1=" 5" y1="-46" x2=" 6" y2="-26" strokeWidth={2} />
            {/* shoulder bar */}
            <line x1="-7" y1="-44" x2="7" y2="-44" strokeWidth={2} />
            {/* hip bar */}
            <line x1="-6" y1="-26" x2="6" y2="-26" strokeWidth={2} />

            {/* ── Backpack ── */}
            <path d="M6,-44 Q20,-36 19,-30 Q18,-22 6,-26" strokeWidth={2} />
            <line x1="6" y1="-42" x2="-1" y2="-36" strokeWidth={1.5} />

            {/* ── Left arm + pole (static, slightly forward) ── */}
            <line x1="-7" y1="-44" x2="-15" y2="-30" strokeWidth={2} />
            <line x1="-15" y1="-30" x2="-20" y2="-20" strokeWidth={2} />
            <line x1="-20" y1="-20" x2="-28" y2="4" strokeWidth={1.5} />
            <circle cx="-28" cy="4" r="2" strokeWidth={1.5} />

            {/* ── Right arm + pole (static, slightly back) ── */}
            <line x1=" 7" y1="-44" x2="14" y2="-32" strokeWidth={2} />
            <line x1="14" y1="-32" x2="18" y2="-22" strokeWidth={2} />
            <line x1="18" y1="-22" x2="22" y2="4" strokeWidth={1.5} />
            <circle cx="22" cy="4" r="2" strokeWidth={1.5} />

            {/* ══ Leg pose A (stride) ══ */}
            <g style={poseStyle('pose-a')}>
              {/* left leg forward */}
              <line x1="-5" y1="-26" x2="-12" y2="-10" strokeWidth={2.5} />
              <line x1="-12" y1="-10" x2="-8" y2="4" strokeWidth={2.5} />
              <line x1="-8" y1="4" x2="-14" y2="4" strokeWidth={3} />
              {/* right leg back */}
              <line x1=" 5" y1="-26" x2="10" y2="-8" strokeWidth={2.5} />
              <line x1="10" y1="-8" x2="14" y2="4" strokeWidth={2.5} />
              <line x1="14" y1="4" x2="20" y2="4" strokeWidth={3} />
            </g>

            {/* ══ Leg pose B (opposite stride) ══ */}
            <g style={poseStyle('pose-b')}>
              {/* left leg back */}
              <line x1="-5" y1="-26" x2="-2" y2="-10" strokeWidth={2.5} />
              <line x1="-2" y1="-10" x2="2" y2="4" strokeWidth={2.5} />
              <line x1="2" y1="4" x2="8" y2="4" strokeWidth={3} />
              {/* right leg forward */}
              <line x1=" 5" y1="-26" x2="-2" y2="-8" strokeWidth={2.5} />
              <line x1="-2" y1="-8" x2="-10" y2="4" strokeWidth={2.5} />
              <line x1="-10" y1="4" x2="-16" y2="4" strokeWidth={3} />
            </g>

          </g>
        </g>
      </svg>
    </div>
  )
}
