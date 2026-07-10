import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { PortfolioData } from '@/types/portfolio'
import type { GitHubStats } from '@/types/portfolio'
import { getPortfolioData } from '@/lib/data'
import { fetchGitHubStats, getFallbackGitHubStats } from '@/services/github'

interface PortfolioContextType {
  data: PortfolioData
  githubStats: GitHubStats | null
  githubLoading: boolean
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data] = useState<PortfolioData>(getPortfolioData())
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [githubLoading, setGithubLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const loadGitHub = useCallback(async () => {
    setGithubLoading(true)
    const stats = await fetchGitHubStats(data.personal.github.username)
    setGithubStats(stats || getFallbackGitHubStats(data.personal.github.username))
    setGithubLoading(false)
  }, [data.personal.github.username])

  useEffect(() => {
    loadGitHub()
  }, [loadGitHub])

  return (
    <PortfolioContext.Provider
      value={{ data, githubStats, githubLoading, isLoading, setIsLoading }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }
  return context
}
