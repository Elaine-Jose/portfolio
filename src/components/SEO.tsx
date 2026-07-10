import { Helmet } from 'react-helmet-async'
import { usePortfolio } from '@/contexts/PortfolioContext'

export function SEO() {
  const { data } = usePortfolio()
  const { seo, personal } = data

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.siteUrl} />
      <meta property="og:image" content={`${seo.siteUrl}${seo.ogImage}`} />
      <meta property="og:site_name" content={personal.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${seo.siteUrl}${seo.ogImage}`} />
      <meta name="twitter:creator" content={seo.twitterHandle} />

      <meta name="theme-color" content="#0a0a0f" />
    </Helmet>
  )
}
