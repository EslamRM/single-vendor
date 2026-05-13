import { ChevronLeft, ChevronRight, Clock, Star, Truck } from 'lucide-react'
import { HERO_SLIDES, BRAND } from '@/data/constants'
import { useSlider } from '@/hooks/useSlider'
import { useT } from '@/hooks/useT'
import { Slide } from './Slide'

export function HeroSlider() {
  const { current, next, prev, goTo, pause, resume } = useSlider({ count: HERO_SLIDES.length, interval: 5000 })
  const { t, isRTL } = useT()

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white min-h-[500px] lg:min-h-[560px]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-label={isRTL ? 'عروض مميزة' : 'Featured offers'}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative h-[500px] lg:h-[560px]">
          {HERO_SLIDES.map((slide, i) => (
            <Slide key={i} slide={slide} isActive={i === current} />
          ))}

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pb-8 absolute bottom-0 left-0 right-0 z-10">
            <button
              onClick={isRTL ? next : prev}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-brand hover:text-brand flex items-center justify-center text-gray-400 transition"
              aria-label={isRTL ? 'التالي' : 'Previous'}
            >
              <ChevronRight size={16} />
            </button>
            <div className="flex items-center gap-2" role="tablist">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`${isRTL ? 'شريحة' : 'Slide'} ${i + 1}`}
                  className={`slider-dot ${i === current ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              onClick={isRTL ? prev : next}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-brand hover:text-brand flex items-center justify-center text-gray-400 transition"
              aria-label={isRTL ? 'السابق' : 'Next'}
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="hidden lg:flex items-center justify-center gap-8 text-sm text-gray-500 pb-4">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand" /> {BRAND.estimatedTime}</span>
        <span className="flex items-center gap-1.5"><Star size={14} className="fill-amber-400 text-amber-400" /> 4.9 {t('heroStat2')}</span>
        <span className="flex items-center gap-1.5"><Truck size={14} className="text-brand" /> {t('heroStat3')}</span>
      </div>
    </section>
  )
}
