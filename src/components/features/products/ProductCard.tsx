import { memo } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/useCartStore'
import { useModalStore } from '@/stores/useModalStore'
import { StarRating } from '@/components/ui/StarRating'
import { formatPrice } from '@/lib/utils'
import { useT } from '@/hooks/useT'

interface ProductCardProps {
  product: Product
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const openModal = useModalStore((s) => s.open)
  const { t, isRTL } = useT()

  const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price

  function handleQuickAdd(e: React.MouseEvent) {
    e.stopPropagation()
    addItem(product, 1)
    toast.success(`✅ ${t('addedToCart')} "${product.name}" ${t('addedToCartSuffix')}`)
  }

  return (
    <article
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 animate-fade-up"
      onClick={() => openModal('product', product.id)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && openModal('product', product.id)}
      aria-label={`${t('viewDetails')} ${product.name}`}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/400/400` }}
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white text-[10px] font-black px-2.5 py-1 rounded-full ${
            product.isBestseller ? 'bg-amber-500' : product.isNew ? 'bg-emerald-500' : 'bg-brand'
          }`}>
            {product.isBestseller && '🏆 '}
            {product.isNew && '✨ '}
            {isRTL
              ? product.badge
              : product.isBestseller ? t('badgeBestseller')
              : product.isNew ? t('badgeNew')
              : product.badge === 'عرض اليوم' ? t('badgeTodayDeal')
              : product.badge === 'لفترة محدودة' ? t('badgeLimited')
              : product.badge === 'اختيار صحي' ? t('badgeHealthy')
              : product.badge
            }
          </span>
        )}

        {/* Discount ribbon */}
        {hasDiscount && (
          <span className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full`}>
            -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
          </span>
        )}

        {/* Quick Add */}
        <button
          className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} w-10 h-10 bg-brand hover:bg-brand-dark text-white rounded-full flex items-center justify-center shadow-lg shadow-brand/30 transition opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-200`}
          onClick={handleQuickAdd}
          aria-label={`${t('addToCartBtn')} ${product.name}`}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Info */}
      <div className={`p-3.5 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center justify-between mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-gray-400 font-medium">{product.orders}</span>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>
        <h3 className="font-bold text-sm mb-0.5 text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-2">{product.nameEn}</p>
        <div className={`flex items-baseline justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">
            {isRTL ? '🚚 25 ج.م' : '🚚 25 EGP'}
          </span>
          <div className={`flex items-baseline gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="font-black text-brand text-base">{formatPrice(product.price)}</span>
            {hasDiscount && <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice!)}</span>}
          </div>
        </div>
      </div>
    </article>
  )
})
