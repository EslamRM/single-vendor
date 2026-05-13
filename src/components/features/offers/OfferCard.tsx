import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { toast } from 'sonner'
import type { Offer } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useT } from '@/hooks/useT'

interface OfferCardProps {
  offer: Offer
  compact?: boolean
}

export const OfferCard = memo(function OfferCard({ offer, compact = false }: OfferCardProps) {
  const { t, isRTL } = useT()

  function copyCode() {
    navigator.clipboard.writeText(offer.code).catch(() => {})
    toast.success(`✅ ${t('offersCopied')} ${offer.code}`)
  }

  return (
    <article className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
        <div className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 ease-in-out ${isRTL ? '-right-full group-hover:right-full' : '-left-full group-hover:left-full'}`} />
      </div>

      <div className={`flex ${isRTL ? 'flex-col sm:flex-row-reverse' : 'flex-col sm:flex-row'}`}>
        {/* Image */}
        <div className={`relative bg-gray-50 shrink-0 ${compact ? 'w-full sm:w-40 h-40' : 'w-full sm:w-44 h-44'}`}>
          <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
          <span className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} ${offer.color} text-white text-xs font-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg`}>
            {offer.discount === 100 ? '🆓' : `${offer.discount}%`}
          </span>
          {!compact && (
            <span className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1`}>
              <Clock size={8} /> {t('offersLimited')}
            </span>
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 p-4 sm:p-5 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className={`font-black mb-1 text-gray-900 ${compact ? 'text-base' : 'text-lg'}`}>{offer.title}</h3>
          <p className={`text-gray-500 mb-3 ${compact ? 'text-sm line-clamp-2' : 'text-sm'}`}>{offer.desc}</p>

          {!compact && offer.minOrder && offer.minOrder > 0 && (
            <p className="text-xs text-amber-600 font-bold mb-2">
              {t('offersMinOrder')} {formatPrice(offer.minOrder)}
            </p>
          )}
          {!compact && (
            <div className={`flex items-center gap-2 mb-2 text-xs text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock size={12} /> {t('offersValidUntil')} {offer.valid}
            </div>
          )}

          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="bg-gray-100 text-gray-700 text-xs font-mono font-black px-3 py-1.5 rounded-lg tracking-widest">
              {offer.code}
            </span>
            <button onClick={copyCode} className="text-brand text-xs font-bold hover:underline">
              {t('offersCopyCode')}
            </button>
          </div>

          {compact ? (
            <button onClick={copyCode} className="w-fit h-9 px-5 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-full transition">
              {t('offersGetDiscount')}
            </button>
          ) : (
            <Link to="/products" className="w-full h-10 bg-brand hover:bg-brand-dark text-white text-sm font-bold rounded-full transition flex items-center justify-center">
              {t('offersOrderNow')}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
})
