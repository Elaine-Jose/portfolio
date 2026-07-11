import { lazy, Suspense } from 'react'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { Achievements } from '@/sections/Achievements'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Resume } from '@/sections/Resume'
import { SEO } from '@/components/SEO'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const GitHubSection = lazy(() =>
  import('@/sections/GitHub').then((mod) => ({ default: mod.GitHubSection }))
)

function SectionLoader() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <SEO />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <Experience />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <GitHubSection />
        </Suspense>
      </ErrorBoundary>
      <Resume />
    </>
  )
}
