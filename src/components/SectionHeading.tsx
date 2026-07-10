import { ScrollReveal } from '@/components/ScrollReveal'
import { GradientText } from '@/components/GradientText'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn('mb-16', align === 'center' && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        <GradientText>{title}</GradientText>
      </h2>
      {subtitle && (
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div
        className={cn(
          'mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent-cyan',
          align === 'center' && 'mx-auto'
        )}
      />
    </ScrollReveal>
  )
}
