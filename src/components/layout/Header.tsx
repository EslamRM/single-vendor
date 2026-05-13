import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBag, Search, User, Menu } from 'lucide-react'
import { NAV_LINKS, BRAND } from '@/data/constants'
import { useCartStore } from '@/stores/useCartStore'
import { useModalStore } from '@/stores/useModalStore'
import { useSearchStore } from '@/stores/useSearchStore'
import { useI18nStore } from '@/stores/useI18nStore'
import { useT } from '@/hooks/useT'

interface HeaderProps {
  onOpenMobileNav: () => void
}

export function Header({ onOpenMobileNav }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const cartCount = useCartStore((s) => s.getCount())
  const openModal = useModalStore((s) => s.open)
  const openSearch = useSearchStore((s) => s.open)
  const toggleLang = useI18nStore((s) => s.toggle)
  const { t, isRTL } = useT()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-gray-200/50' : ''}`}>
      {/* Announcement bar */}
      <div className="bg-brand text-white text-xs py-1.5 px-4 text-center font-medium">
        {t('headerBanner')}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-md shadow-brand/30">
            <span className="text-white font-black text-xl leading-none">أ</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-xl tracking-tight text-gray-900">{BRAND.nameEn}</span>
            <span className="text-[10px] text-brand font-bold">{t('brandTagline')}</span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link, i) => {
            const labels = [t('navHome'), t('navMenu'), t('navCategories'), t('navOffers'), t('navContact')]
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition ${isActive ? 'text-brand bg-brand-50 font-bold' : 'text-gray-600 hover:text-brand hover:bg-brand-50'}`
                }
              >
                {labels[i]}
              </NavLink>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search bar — opens panel */}
          <button
            onClick={openSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 border border-gray-100 hover:border-brand/40 hover:bg-brand-50 transition text-sm text-gray-400 w-48 group"
            aria-label={t('searchLabel')}
          >
            <Search size={13} className="group-hover:text-brand transition" />
            <span className="group-hover:text-brand transition">{t('searchPlaceholder')}</span>
          </button>

          {/* Mobile search icon */}
          <button
            onClick={openSearch}
            className="sm:hidden w-10 h-10 rounded-full bg-gray-50 hover:bg-brand-50 flex items-center justify-center transition"
            aria-label={t('searchLabel')}
          >
            <Search size={18} className="text-gray-600" />
          </button>

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="hidden sm:flex h-9 px-3.5 rounded-full border-2 border-gray-200 hover:border-brand text-sm font-black text-gray-600 hover:text-brand transition items-center gap-1.5"
            aria-label="Toggle language"
          >
            <span className="text-base leading-none">{isRTL ? '🇬🇧' : '🇪🇬'}</span>
            {t('langToggle')}
          </button>

          {/* Cart */}
          <button
            onClick={() => openModal('cart')}
            className="relative w-10 h-10 rounded-full bg-gray-50 hover:bg-brand-50 flex items-center justify-center transition"
            aria-label={`${t('cartLabel')} — ${cartCount}`}
          >
            <ShoppingBag size={18} className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pop">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login */}
          <button
            onClick={() => openModal('login')}
            className="hidden sm:flex h-10 px-5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-full items-center gap-2 transition shadow-md shadow-brand/20"
          >
            <User size={14} />
            {t('loginBtn')}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center"
            aria-label={t('openMenu')}
          >
            <Menu size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
