import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'gradient'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium transition-colors',
        variant === 'default' && 'bg-primary/20 text-primary border border-primary/30',
        variant === 'outline' && 'border border-white/20 text-white/70 bg-white/5',
        variant === 'gradient' &&
          'bg-gradient-to-r from-primary/20 to-accent-cyan/20 text-white border border-white/10',
        className
      )}
    >
      {children}
    </span>
  )
}
