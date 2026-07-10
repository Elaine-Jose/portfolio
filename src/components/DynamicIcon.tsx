import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface DynamicIconProps {
  name: string
  className?: string
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name]
  if (!Icon) return null
  return <Icon className={className} />
}
