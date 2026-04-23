import { cn } from '@/lib/utils'

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="size-8 rounded-full border-2 border-secondary border-t-primary animate-spin" />
    </div>
  )
}
