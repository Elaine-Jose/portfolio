import { Download, FileText } from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useMagneticButton } from '@/hooks/useMagneticButton'

export function Resume() {
  const { data } = usePortfolio()
  const btnRef = useMagneticButton(0.3)

  return (
    <section id="resume" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Resume"
          subtitle="Download my resume to learn more about my experience and skills"
        />

        <ScrollReveal>
          <Card className="max-w-lg mx-auto p-10 text-center hover:border-primary/20 transition-all hover:shadow-glow">
            <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-cyan/20">
              <FileText className="h-10 w-10 text-primary" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              {data.personal.name} — Resume
            </h3>
            <p className="text-white/50 text-sm mb-8">
              AI & Software Engineering · Computer Science Undergraduate
            </p>

            <Button ref={btnRef} variant="gradient" size="lg" asChild>
              <a href={data.personal.resume.url} download={data.personal.resume.filename}>
                <Download className="h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
