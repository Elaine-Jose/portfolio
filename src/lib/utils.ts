import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    React: '#61dafb',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Dart: '#00B4AB',
    Jupyter: '#DA5B0B',
    Shell: '#89e051',
  }
  return colors[language] || '#8b8b8b'
}

export function scrollToSection(href: string): void {
  if (href.startsWith('/#')) {
    const id = href.replace('/#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
