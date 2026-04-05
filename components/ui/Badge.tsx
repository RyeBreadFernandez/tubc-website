type Difficulty = 'Easy' | 'Moderate' | 'Strenuous' | 'Expert'

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-moss text-sage-dark',
  Moderate: 'bg-sand text-soil',
  Strenuous: 'bg-rose text-terra-dark',
  Expert: 'bg-terra text-parchment',
}

interface Props {
  difficulty: Difficulty
  className?: string
}

export default function Badge({ difficulty, className = '' }: Props) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[difficulty]} ${className}`}>
      {difficulty}
    </span>
  )
}
