import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { HeroSlide } from '@/types'
import { BRAND } from '@/data/constants'
import { useT } from '@/hooks/useT'

interface SlideProps {
  slide: HeroSlide
  isActive: boolean
}

export function Slide({ slide, isActive }: SlideProps) {
  const { t, isRTL } = useT()

  return (
    <div className={`slider-slide ${isActive ? 'active' : ''}`} aria-hidden={!isActive}>
      <div className="h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pt-16 lg:pt-0">

        {/* Text */}
        <div className={`flex-1 text-center z-10 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          <span className="inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <Star size={10} className="fill-brand" aria-hidden="true" />
            {slide.badge}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            {slide.title1}{' '}
            <span className="text-brand relative inline-block">
              {slide.title2}
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" aria-hidden="true">
                <path d="M2 6C40 2 80 2 100 4C120 6 160 2 198 4" stroke="#FF6700" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-gray-500 text-base lg:text-lg mb-8 max-w-md mx-auto lg:mx-0">
            {slide.subtitle}
          </p>

          <div className={`flex items-center justify-center gap-3 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <Link
              to="/products"
              className="h-12 px-8 bg-brand hover:bg-brand-dark text-white font-black rounded-full flex items-center gap-2 transition shadow-lg shadow-brand/25 text-base"
            >
              {t('heroCta')}
            </Link>
            <Link
              to="/offers"
              className="h-12 px-8 border-2 border-gray-200 hover:border-brand text-gray-700 hover:text-brand font-bold rounded-full flex items-center gap-2 transition text-base"
            >
              {t('heroSecondary')}
            </Link>
          </div>

          {/* Trust signals */}
          <div className={`flex items-center justify-center gap-5 mt-6 text-sm text-gray-500 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
            <span>⏱ {BRAND.estimatedTime} {isRTL ? '' : t('heroStat1')}</span>
            <span>⭐ 4.9 {t('heroStat2')}</span>
            <span className="hidden sm:inline">🚚 {t('heroStat3')}</span>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 relative hidden lg:block">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand rounded-full hero-blur" aria-hidden="true" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-400 rounded-full hero-blur" aria-hidden="true" />
          <img
            src={slide.image}
            alt={`${slide.title1} ${slide.title2}`}
            className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-square"
          />
          <span className="absolute top-6 left-6 bg-red-500 text-white font-black text-sm px-4 py-2 rounded-2xl shadow-lg animate-float">
            {t('heroDiscount')}
          </span>
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg text-right">
            <p className="text-xs text-gray-500">{t('heroCustomers')}</p>
            <p className="text-lg font-black text-gray-900">+2,000 ⭐</p>
          </div>
        </div>
      </div>
    </div>
  )
}
