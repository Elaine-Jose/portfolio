import { lazy, Suspense } from 'react'
import {
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  ExternalLink,
  GitCommit,
  Loader2,
} from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatDate, getLanguageColor, truncateText } from '@/lib/utils'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const GitHubCalendar = lazy(() => import('react-github-calendar'))

function GitHubSkeleton() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export function GitHubSection() {
  const { data, githubStats, githubLoading } = usePortfolio()

  const stats = [
    { label: 'Repositories', value: githubStats?.user.public_repos ?? 0, icon: BookOpen },
    { label: 'Followers', value: githubStats?.user.followers ?? 0, icon: Users },
    { label: 'Following', value: githubStats?.user.following ?? 0, icon: Users },
    { label: 'Total Stars', value: githubStats?.totalStars ?? 0, icon: Star },
  ]

  const displayRepos = githubStats?.pinnedRepos.length
    ? githubStats.pinnedRepos
    : githubStats?.repos.slice(0, 6) ?? []

  const sortedLanguages = Object.entries(githubStats?.languages ?? {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  return (
    <section id="github" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="GitHub Activity"
          subtitle={`Open source contributions and projects on @${data.personal.github.username}`}
        />

        {githubLoading ? (
          <GitHubSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <Card className="p-5 text-center hover:border-primary/20 transition-all">
                    <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mb-12">
              <Card className="p-6 overflow-x-auto">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Contribution Calendar
                </h3>
                <ErrorBoundary
                  fallback={
                    <p className="text-white/40 text-sm py-4">
                      Unable to load contribution calendar.
                    </p>
                  }
                >
                  <Suspense fallback={<GitHubSkeleton />}>
                    <div className="flex justify-center">
                      <GitHubCalendar
                        username={data.personal.github.username}
                        colorScheme="dark"
                        fontSize={12}
                        blockSize={12}
                        blockMargin={3}
                      />
                    </div>
                  </Suspense>
                </ErrorBoundary>
              </Card>
            </ScrollReveal>

            {sortedLanguages.length > 0 && (
              <ScrollReveal className="mb-12">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    {sortedLanguages.map(([lang, count]) => (
                      <div key={lang} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(lang) }}
                        />
                        <span className="text-sm text-white/70">{lang}</span>
                        <span className="text-xs text-white/30">({count})</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {displayRepos.length > 0 && (
              <ScrollReveal className="mb-12">
                <h3 className="text-lg font-semibold text-white mb-6">Repositories</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayRepos.map((repo) => (
                    <Card
                      key={repo.id}
                      className="p-5 hover:border-primary/20 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium group-hover:text-primary transition-colors truncate">
                          {repo.name}
                        </h4>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-white shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-white/40 text-sm mb-3 line-clamp-2 min-h-[40px]">
                        {repo.description || 'No description available'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/30">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {githubStats && githubStats.recentCommits.length > 0 && (
              <ScrollReveal>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <GitCommit className="h-5 w-5" />
                    Recent Commits
                  </h3>
                  <div className="space-y-3">
                    {githubStats.recentCommits.map((commit) => (
                      <a
                        key={commit.sha}
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <GitCommit className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/70 group-hover:text-white truncate">
                            {truncateText(commit.commit.message, 80)}
                          </p>
                          <p className="text-xs text-white/30 mt-0.5">
                            {commit.commit.author.name} &middot;{' '}
                            {formatDate(commit.commit.author.date)}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            <div className="text-center mt-10">
              <Button variant="gradient" asChild>
                <a
                  href={data.personal.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  View Full Profile
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
