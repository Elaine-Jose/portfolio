import { motion } from 'framer-motion'
import {
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { useTypingAnimation } from '@/hooks/useTypingAnimation'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/GradientText'
import { scrollToSection } from '@/lib/utils'

export function Hero() {
  const { data } = usePortfolio()
  const typedText = useTypingAnimation(data.hero.typingWords)
  const primaryBtnRef = useMagneticButton(0.25)
  const secondaryBtnRef = useMagneticButton(0.25)
  const scrollY = useScrollPosition()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-hero-gradient"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-[100px] animate-glow-pulse" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-accent-cyan" />
            <span className="text-sm text-white/70">{data.personal.title}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <GradientText as="span" className="block">
              {data.personal.name}
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.7 }}
            className="text-lg md:text-xl text-white/50 mb-2"
          >
            {data.personal.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.9 }}
            className="h-8 md:h-10 mb-8"
          >
            <span className="text-xl md:text-2xl font-mono text-accent-cyan">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.1 }}
            className="text-white/40 max-w-2xl mb-10 leading-relaxed"
          >
            {data.personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.3 }}
            className="flex items-center gap-2 text-white/40 text-sm mb-10"
          >
            <MapPin className="h-4 w-4" />
            <span>
              {data.personal.location.city}, {data.personal.location.state},{' '}
              {data.personal.location.country}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button ref={primaryBtnRef} size="lg" variant="gradient" asChild>
              <a href={data.personal.resume.url} download={data.personal.resume.filename}>
                <Download className="h-5 w-5" />
                {data.hero.cta.primary}
              </a>
            </Button>
            <Button
              ref={secondaryBtnRef}
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection('/#projects')}
            >
              {data.hero.cta.secondary}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.7 }}
            className="flex items-center gap-3"
          >
            {[
              { icon: Github, href: data.personal.github.url, label: 'GitHub' },
              { icon: Linkedin, href: data.personal.linkedin.url, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${data.personal.email}`, label: 'Contact' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-primary/30 hover:shadow-glow transition-all duration-300"
                aria-label={label}
              >
                <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
