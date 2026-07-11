import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { ScrollReveal } from '@/components/ScrollReveal'

export function Footer() {
  const { data } = usePortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent-cyan/10 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Open to Opportunities</h3>
            <p className="text-white/70 mb-4">
              I'm actively interested in Software Engineering and AI/ML related jobs, internships, and collaborative projects.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <a
                  href={`mailto:${data.personal.email}`}
                  className="text-primary hover:text-accent-cyan transition-colors font-medium"
                >
                  {data.personal.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-white mb-1">
                {data.personal.name}
              </p>
              <p className="text-white/40 text-sm max-w-md">{data.footer.tagline}</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={data.personal.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={data.personal.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${data.personal.email}`}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
            <p>&copy; {year} {data.footer.copyright}</p>
            <p className="flex items-center gap-1">
              Built with <Heart size={14} className="text-red-400" /> using React & AI
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
