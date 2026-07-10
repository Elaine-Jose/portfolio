import { Outlet } from 'react-router-dom'
import { Navbar } from '@/layout/Navbar'
import { Footer } from '@/layout/Footer'
import { CursorGlow } from '@/components/CursorGlow'
import { ParticleBackground } from '@/components/ParticleBackground'
import { LoadingScreen } from '@/components/LoadingScreen'

export function MainLayout() {
  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <CursorGlow />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
