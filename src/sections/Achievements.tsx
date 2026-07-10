import { DynamicIcon } from '@/components/DynamicIcon'
import { motion } from 'framer-motion'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Badge } from '@/components/ui/badge'

export function Achievements() {
  const { data } = usePortfolio()

  return (
    <section id="achievements" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Achievements"
          subtitle="Hackathons, research, and academic milestones"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent-cyan/30 to-transparent md:-translate-x-px" />

          {data.achievements.map((achievement, i) => (
            <ScrollReveal key={achievement.id} delay={i * 0.1}>
              <motion.div
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="hidden md:block md:w-1/2" />

                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent-cyan p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0a0a0f]">
                      <DynamicIcon name={achievement.icon} className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="ml-20 md:ml-0 md:w-1/2 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 hover:shadow-glow">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{achievement.category}</Badge>
                    <span className="text-xs text-white/30">{achievement.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{achievement.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
