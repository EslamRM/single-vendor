import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { CATEGORIES, OFFERS, PRODUCTS } from '@/data/constants'
import { HeroSlider } from '@/components/features/hero/HeroSlider'
import { CategoryCard } from '@/components/features/categories/CategoryCard'
import { OfferCard } from '@/components/features/offers/OfferCard'
import { ProductGrid } from '@/components/features/products/ProductGrid'
import { useT } from '@/hooks/useT'

export default function HomePage() {
  const { t, isRTL } = useT()

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ]

  const whyUs = [
    { icon: '🚀', title: t('why1Title'), desc: t('why1Desc') },
    { icon: '💵', title: t('why2Title'), desc: t('why2Desc') },
    { icon: '⭐', title: t('why3Title'), desc: t('why3Desc') },
  ]

  return (
    <>
      <HeroSlider />

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label} className="py-2">
                <div className="text-2xl font-black text-brand">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className={`text-center mb-10`}>
          <h2 className="text-3xl lg:text-4xl font-black mb-2">{t('categoriesTitle')}</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base">{t('categoriesDesc')}</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((c) => <CategoryCard key={c.name} category={c} variant="compact" />)}
        </div>
      </section>

      {/* Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className={`flex items-end justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl lg:text-4xl font-black mb-1">{t('offersTitle')}</h2>
            <p className="text-gray-500">{t('offersDesc')}</p>
          </div>
          <Link to="/offers" className={`hidden sm:flex items-center gap-1 text-brand font-bold text-sm hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t('viewAllOffers')} <ArrowLeft size={14} className={isRTL ? '' : 'rotate-180'} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OFFERS.map((offer) => <OfferCard key={offer.id} offer={offer} compact />)}
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className={`flex items-end justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl lg:text-4xl font-black mb-1">{t('popularTitle')}</h2>
            <p className="text-gray-500">{t('popularDesc')}</p>
          </div>
          <Link to="/products" className={`hidden sm:flex items-center gap-1 text-brand font-bold text-sm hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t('viewAllMenu')} <ArrowLeft size={14} className={isRTL ? '' : 'rotate-180'} />
          </Link>
        </div>
        <ProductGrid products={PRODUCTS} />
      </section>

      {/* Why us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {whyUs.map((item) => (
            <div key={item.title} className={`bg-brand-50 rounded-2xl p-6 text-center hover:shadow-md transition`}>
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-black text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App CTA */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#FF6700,#FF8533)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,white 1px,transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-10 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`text-center text-white flex-1 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <h2 className="text-3xl lg:text-5xl font-black mb-4">{t('appTitle')}</h2>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto lg:mx-0">{t('appDesc')}</p>
              <div className={`flex items-center justify-center gap-3 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
                <button onClick={() => toast.info(t('appStoreComing'))} className="h-12 px-6 bg-white text-gray-900 font-bold rounded-full flex items-center gap-2.5 hover:bg-gray-100 transition shadow-lg">
                  <span className="text-xl">🍎</span>
                  <div className="text-left"><span className="text-[10px] text-gray-500 block leading-none">{t('appStoreLabel')}</span><span className="text-sm font-black leading-tight">App Store</span></div>
                </button>
                <button onClick={() => toast.info(t('googlePlayComing'))} className="h-12 px-6 bg-white text-gray-900 font-bold rounded-full flex items-center gap-2.5 hover:bg-gray-100 transition shadow-lg">
                  <span className="text-xl">▶️</span>
                  <div className="text-left"><span className="text-[10px] text-gray-500 block leading-none">{t('googlePlayLabel')}</span><span className="text-sm font-black leading-tight">Google Play</span></div>
                </button>
              </div>
            </div>
            <div className="w-48 h-48 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shrink-0" aria-hidden="true">
              <span className="text-7xl">📱</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}