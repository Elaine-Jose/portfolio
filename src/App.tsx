import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { PortfolioProvider } from '@/contexts/PortfolioContext'
import { MainLayout } from '@/layout/MainLayout'
import { HomePage } from '@/pages/Home'
import { ErrorBoundary } from '@/components/ErrorBoundary'

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <PortfolioProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </PortfolioProvider>
    </HelmetProvider>
  )
}
