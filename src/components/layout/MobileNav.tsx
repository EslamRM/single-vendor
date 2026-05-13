import { NavLink } from 'react-router-dom'
import { X, User } from 'lucide-react'
import { NAV_LINKS, BRAND } from '@/data/constants'
import { useModalStore } from '@/stores/useModalStore'
import { useI18nStore } from '@/stores/useI18nStore'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useT } from '@/hooks/useT'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useScrollLock(isOpen)
  const openModal = useModalStore((s) => s.open)
  const toggle = useI18nStore((s) => s.toggle)
  const { t, isRTL } = useT()

  if (!isOpen) return null

  const navLabels = [t('navHome'), t('navMenu'), t('navCategories'), t('navOffers'), t('navContact')]

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <nav
        className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl animate-slide-in-r flex flex-col"
        aria-label={isRTL ? 'قائمة التنقل' : 'Navigation menu'}
      >
        <div className="p-5 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center">
                <span className="text-white font-black text-xl">أ</span>
              </div>
              <div>
                <div className="font-black text-lg">{BRAND.nameEn}</div>
                <div className="text-[10px] text-brand font-bold">{t('brandTagline')}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label={t('mobileNavClose')}
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={onClose}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center px-4 py-3 rounded-xl font-semibold transition text-base ${
                    isActive ? 'bg-brand-50 text-brand' : 'text-gray-700 hover:bg-gray-50'
                  } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`
                }
              >
                {navLabels[i]}
              </NavLink>
            ))}

            <button
              onClick={() => { onClose(); openModal('login') }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand transition font-semibold w-full mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <User size={16} />
              {t('mobileNavLogin')}
            </button>
          </div>

          {/* Lang toggle */}
          <button
            onClick={toggle}
            className="mt-4 w-full flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-gray-200 hover:border-brand text-sm font-black text-gray-600 hover:text-brand transition"
          >
            <span className="text-lg">{isRTL ? '🇬🇧' : '🇪🇬'}</span>
            {t('langToggle')}
          </button>

          {/* Delivery zones */}
          <div className="mt-6 bg-brand-50 rounded-2xl p-4">
            <p className="text-xs text-brand font-bold mb-1">{t('deliveryZonesTitle')}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{BRAND.cities}</p>
          </div>
        </div>
      </nav>
    </div>
  )
}
