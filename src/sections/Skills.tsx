import { DynamicIcon } from '@/components/DynamicIcon'
import { motion } from 'framer-motion'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Card } from '@/components/ui/card'

export function Skills() {
  const { data } = usePortfolio()

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to build intelligent systems"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.categories.map((category, catIndex) => (
            <ScrollReveal key={category.name} delay={catIndex * 0.1}>
              <Card className="p-6 h-full hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent-cyan/20">
                    <DynamicIcon name={category.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-white/70">{skill.name}</span>
                        <span className="text-xs text-white/40">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent-cyan"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: catIndex * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
