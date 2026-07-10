import { DynamicIcon } from '@/components/DynamicIcon'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Card } from '@/components/ui/card'

export function About() {
  const { data } = usePortfolio()

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title="About Me" subtitle={data.about.headline} />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {data.about.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-white/60 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {data.about.stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="p-6 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 2 : 0}
                    />
                  </p>
                  <p className="text-white/40 text-sm">{stat.label}</p>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {data.about.highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <Card className="p-6 h-full hover:border-primary/20 transition-all duration-300 group hover:shadow-glow">
                <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <DynamicIcon name={item.icon} className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
