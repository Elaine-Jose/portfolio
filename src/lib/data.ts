import type { PortfolioData } from '@/types/portfolio'
import portfolioData from '@/data/portfolio-data.json'

export function getPortfolioData(): PortfolioData {
  return portfolioData as PortfolioData
}
