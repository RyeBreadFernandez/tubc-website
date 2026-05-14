import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

type Difficulty = 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'

const difficultyStyles: Record<Difficulty, string> = {
  Easy:      'bg-moss text-forest border-forest/25',
  Moderate:  'bg-sand text-bark border-bark/20',
  Strenuous: 'bg-rose text-bark border-bark/20',
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
