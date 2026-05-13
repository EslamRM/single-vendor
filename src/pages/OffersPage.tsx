import { OFFERS } from '@/data/constants'
import { OfferCard } from '@/components/features/offers/OfferCard'
import { useT } from '@/hooks/useT'

export default function OffersPage() {
  const { t, isRTL } = useT()

  function handleCopy() {
    navigator.clipboard.writeText('AKOLNI50').catch(() => {})
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl lg:text-4xl font-black mb-1">{t('offersPageTitle')}</h1>
        <p className="text-gray-500">{t('offersPageDesc')}</p>
      </div>

      {/* Hero banner */}
      <div className={`mb-8 bg-gradient-to-l from-brand to-orange-400 rounded-2xl p-6 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className="text-2xl font-black mb-1">{t('offersBannerTitle')}</h2>
        <p className="text-white/80 text-sm mb-3">{t('offersBannerDesc')}</p>
        <div className={`inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="font-mono font-black text-lg tracking-widest">AKOLNI50</span>
          <button onClick={handleCopy} className="text-xs bg-white text-brand font-black px-3 py-1 rounded-lg hover:bg-brand-50 transition">
            {t('offersCopy')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {OFFERS.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
      </div>
    </section>
  )
}