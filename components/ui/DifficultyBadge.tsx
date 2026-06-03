import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export const DIFFICULTIES = ['Easy', 'Moderate', 'Strenuous', 'Expert'] as const

export type Difficulty = (typeof DIFFICULTIES)[number]

export function isDifficulty(value: string | null | undefined): value is Difficulty {
  return typeof value === 'string' && (DIFFICULTIES as readonly string[]).includes(value)
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy:      'bg-moss text-forest border-forest/25',
  Moderate:  'bg-sand text-terra-dark border-terra/25',
  Strenuous: 'bg-rose text-terra-dark border-terra/25',
  Expert:    'bg-terra text-parchment border-transparent',
}

interface Props {
  difficulty: Difficulty
  className?: string
}

export default function DifficultyBadge({ difficulty, className }: Props) {
  return (
    <Badge className={cn(difficultyStyles[difficulty], className)}>
      {difficulty}
    </Badge>
  )
}
