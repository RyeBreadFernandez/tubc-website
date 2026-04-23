import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

type Difficulty = 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'

const difficultyStyles: Record<Difficulty, string> = {
  Easy:      'bg-moss text-sage-dark border-transparent',
  Moderate:  'bg-sand text-soil border-transparent',
  Strenuous: 'bg-rose text-terra-dark border-transparent',
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
