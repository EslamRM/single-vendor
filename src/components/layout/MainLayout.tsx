import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'
import { SearchPanel } from '../features/search/SearchPanel'

export function MainLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="font-sans bg-white text-gray-900 antialiased min-h-screen flex flex-col">
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <SearchPanel />
      <Footer />
    </div>
  )
}
