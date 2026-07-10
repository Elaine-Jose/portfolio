import { useState } from 'react'
import { DynamicIcon } from '@/components/DynamicIcon'
import {
  Github,
  ExternalLink,
  FileText,
  Star,
  ChevronDown,
  Layers,
  Clock,
  BarChart3,
} from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTilt } from '@/hooks/useTilt'
import type { Project } from '@/types/portfolio'

function ProjectCard({ project, onExpand }: { project: Project; onExpand: () => void }) {
  const tiltRef = useTilt(8)

  return (
    <Card
      ref={tiltRef}
      className="group overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-glow cursor-pointer"
      onClick={onExpand}
    >
      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[#0a0a0f]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <DynamicIcon
            name={project.icon}
            className="h-16 w-16 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500"
          />
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Badge variant="gradient">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-accent-cyan text-sm mb-3">{project.subtitle}</p>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/30">Click to explore</span>
          <ChevronDown className="h-4 w-4 text-white/30 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Card>
  )
}

function ProjectDetail({ project, open, onClose }: { project: Project; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription>{project.subtitle}</DialogDescription>
        </DialogHeader>

        <div className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} mb-6 relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <DynamicIcon name={project.icon} className="h-12 w-12 text-white/40" />
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <p className="text-white/60 leading-relaxed">{project.longDescription}</p>
            <div>
              <h4 className="text-white font-medium mb-2">Features</h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="mt-4">
            <div className="space-y-4">
              {project.architecture.layers.map((layer, i) => (
                <div
                  key={layer.name}
                  className="p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4 text-primary" />
                    <h4 className="text-white font-medium">{layer.name}</h4>
                    <span className="text-xs text-white/30 ml-auto">Layer {i + 1}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((comp) => (
                      <Badge key={comp} variant="outline">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-4">
            <div className="space-y-3">
              {project.timeline.map((phase, i) => (
                <div key={phase.phase} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    {i < project.timeline.length - 1 && (
                      <div className="w-px h-8 bg-white/10" />
                    )}
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{phase.phase}</span>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.statistics.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 text-center"
                >
                  <BarChart3 className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
          {project.links.github && (
            <Button variant="secondary" size="sm" asChild>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button variant="secondary" size="sm" asChild>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Demo
              </a>
            </Button>
          )}
          {project.links.documentation && (
            <Button variant="secondary" size="sm" asChild>
              <a href={project.links.documentation} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" /> Docs
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const { data } = usePortfolio()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="AI systems and software engineering projects that solve real-world problems"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard
                project={project}
                onExpand={() => setSelectedProject(project)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
