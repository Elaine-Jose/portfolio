import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { scrollToSection } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { data } = usePortfolio()
  const scrollY = useScrollPosition()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const isScrolled = scrollY > 50

  useEffect(() => {
    const sections = data.navigation
      .filter((n) => n.href.startsWith('/#'))
      .map((n) => n.href.replace('/#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [data.navigation])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      scrollToSection(href)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-glass'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <button
          onClick={() => handleNavClick('/')}
          className="text-lg font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
            EJ
          </span>
          <span className="text-white/80 hidden sm:inline">.dev</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {data.navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? scrollY < 300
                : activeSection === item.href.replace('/#', '')

            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="flex flex-col p-4 gap-1">
              {data.navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
