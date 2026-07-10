import { DynamicIcon } from '@/components/DynamicIcon'
import { Briefcase, MapPin } from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function Experience() {
  const { data } = usePortfolio()

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="Professional internships in software engineering and artificial intelligence"
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent-cyan to-transparent md:-translate-x-px" />

          {data.experience.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={i * 0.15}>
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent-purple p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0a0a0f]">
                      <DynamicIcon name={exp.icon} className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <Card className="p-6 ml-16 md:ml-0 hover:border-primary/20 transition-all duration-300 hover:shadow-glow">
                    <div className={`flex flex-wrap items-center gap-2 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Badge variant="gradient">{exp.type}</Badge>
                      <span className="text-xs text-white/30">{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-accent-cyan text-sm mb-2 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      {exp.company}
                    </p>

                    <div className={`flex items-center gap-1.5 text-white/40 text-xs mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </div>

                    <p className="text-white/50 text-sm mb-4 leading-relaxed">{exp.description}</p>

                    <ul className={`space-y-2 mb-4 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className={`text-sm text-white/50 flex items-start gap-2 ${
                            i % 2 === 0 ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
