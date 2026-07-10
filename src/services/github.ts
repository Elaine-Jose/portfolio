import type { GitHubStats, GitHubRepo, GitHubUser, GitHubCommit } from '@/types/portfolio'

const GITHUB_API = 'https://api.github.com'

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${GITHUB_API}${endpoint}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

async function fetchPinnedRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://gh-pinned-repos.egoist.dev/?username=${username}`
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.map((repo: { repo: string; description: string; stars: number; forks: number; language: string; topics: string[] }) => ({
      id: Math.random(),
      name: repo.repo.split('/')[1],
      description: repo.description,
      html_url: `https://github.com/${repo.repo}`,
      stargazers_count: repo.stars,
      forks_count: repo.forks,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: new Date().toISOString(),
      homepage: null,
    }))
  } catch {
    return []
  }
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  const [user, repos] = await Promise.all([
    fetchGitHub<GitHubUser>(`/users/${username}`),
    fetchGitHub<GitHubRepo[]>(`/users/${username}/repos?sort=updated&per_page=30`),
  ])

  if (!user || !repos) return null

  const pinnedRepos = await fetchPinnedRepos(username)
  const displayRepos = pinnedRepos.length > 0 ? pinnedRepos : repos.slice(0, 6)

  const languages: Record<string, number> = {}
  let totalStars = 0

  for (const repo of repos) {
    totalStars += repo.stargazers_count
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1
    }
  }

  const recentCommits: GitHubCommit[] = []
  const topRepos = repos.slice(0, 3)

  for (const repo of topRepos) {
    const commits = await fetchGitHub<GitHubCommit[]>(
      `/repos/${username}/${repo.name}/commits?per_page=2`
    )
    if (commits) {
      recentCommits.push(...commits)
    }
  }

  recentCommits.sort(
    (a, b) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime()
  )

  return {
    user,
    repos: repos.slice(0, 12),
    pinnedRepos: displayRepos,
    languages,
    totalStars,
    recentCommits: recentCommits.slice(0, 6),
  }
}

export function getFallbackGitHubStats(username: string): GitHubStats {
  return {
    user: {
      login: username,
      name: 'Elaine Jose',
      bio: 'AI & Software Engineering Student',
      public_repos: 0,
      followers: 0,
      following: 0,
      avatar_url: '',
      html_url: `https://github.com/${username}`,
    },
    repos: [],
    pinnedRepos: [],
    languages: {},
    totalStars: 0,
    recentCommits: [],
  }
}
