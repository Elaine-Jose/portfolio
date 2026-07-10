import { GraduationCap, MapPin, Award } from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function Education() {
  const { data } = usePortfolio()

  return (
    <section id="education" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="Academic foundation in computer science and engineering"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent-cyan to-accent-purple" />

          {data.education.map((edu, i) => (
            <ScrollReveal key={edu.id} delay={i * 0.15}>
              <div className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-5 top-2 h-6 w-6 rounded-full bg-primary border-4 border-[#0a0a0f] z-10" />

                <Card className="p-6 hover:border-primary/20 transition-all duration-300 hover:shadow-glow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                        <p className="text-accent-cyan text-sm">{edu.degree}</p>
                      </div>
                    </div>
                    <Badge>{edu.period}</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
                    <MapPin className="h-3.5 w-3.5" />
                    {edu.location}
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4">{edu.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {edu.cgpa && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm text-white">CGPA: {edu.cgpa}</span>
                      </div>
                    )}
                    {edu.percentage && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
                        <Award className="h-4 w-4 text-accent-cyan" />
                        <span className="text-sm text-white">{edu.percentage}</span>
                      </div>
                    )}
                    {edu.highlights.map((h) => (
                      <Badge key={h} variant="outline">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
