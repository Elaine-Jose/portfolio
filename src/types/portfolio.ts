export interface Location {
  city: string
  state: string
  country: string
}

export interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  tagline: string
  location: Location
  email: string
  github: { username: string; url: string }
  linkedin: { url: string }
  resume: { url: string; filename: string }
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  author: string
  siteUrl: string
  ogImage: string
  twitterHandle: string
}

export interface HeroData {
  typingWords: string[]
  cta: { primary: string; secondary: string }
}

export interface AboutHighlight {
  icon: string
  title: string
  description: string
}

export interface StatItem {
  label: string
  value: number
  suffix: string
}

export interface AboutData {
  headline: string
  bio: string
  highlights: AboutHighlight[]
  stats: StatItem[]
}

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  name: string
  icon: string
  skills: Skill[]
}

export interface SkillsData {
  categories: SkillCategory[]
}

export interface ProjectStatistic {
  label: string
  value: number
  suffix: string
}

export interface ArchitectureLayer {
  name: string
  components: string[]
}

export interface ProjectTimeline {
  phase: string
  duration: string
  status: string
}

export interface ProjectLinks {
  github: string | null
  demo: string | null
  documentation: string | null
}

export interface Project {
  id: string
  title: string
  subtitle: string
  featured: boolean
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  statistics: ProjectStatistic[]
  architecture: { layers: ArchitectureLayer[] }
  timeline: ProjectTimeline[]
  links: ProjectLinks
  gradient: string
  icon: string
}

export interface Achievement {
  id: string
  title: string
  category: string
  date: string
  description: string
  icon: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  cgpa?: string
  percentage?: string
  description: string
  highlights: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  type: string
  period: string
  location: string
  description: string
  responsibilities: string[]
  technologies: string[]
  icon: string
}

export interface NavItem {
  label: string
  href: string
}

export interface ContactField {
  name: string
  label: string
  type: string
  required: boolean
  placeholder: string
}

export interface ContactData {
  headline: string
  subheadline: string
  emailjs: {
    serviceId: string
    templateId: string
    publicKey: string
  }
  fields: ContactField[]
}

export interface FooterData {
  tagline: string
  copyright: string
}

export interface PortfolioData {
  personal: PersonalInfo
  seo: SEOData
  hero: HeroData
  about: AboutData
  skills: SkillsData
  projects: Project[]
  achievements: Achievement[]
  education: Education[]
  experience: Experience[]
  navigation: NavItem[]
  contact: ContactData
  footer: FooterData
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  homepage: string | null
}

export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: { name: string; date: string }
  }
  html_url: string
}

export interface GitHubStats {
  user: GitHubUser
  repos: GitHubRepo[]
  pinnedRepos: GitHubRepo[]
  languages: Record<string, number>
  totalStars: number
  recentCommits: GitHubCommit[]
}
