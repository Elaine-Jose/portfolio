import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
}

export function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r from-primary via-accent-cyan to-accent-purple bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Tag>
  )
}
