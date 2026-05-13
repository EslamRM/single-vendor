import { useState, useEffect } from 'react'
import { X, Heart, Plus, Minus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { PRODUCTS } from '@/data/constants'
import { useCartStore } from '@/stores/useCartStore'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useModalStore } from '@/stores/useModalStore'
import { Modal } from '@/components/ui/Modal'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice, discountPercent } from '@/lib/utils'
import { useT } from '@/hooks/useT'

export function ProductDetailModal() {
  const { type, data, close } = useModalStore()
  const addItem = useCartStore((s) => s.addItem)
  const { toggleFavorite, isFavorite } = useFavoriteStore()
  const { t, tArr, isRTL } = useT()

  const [qty, setQty] = useState(1)
  const [thumbIdx, setThumbIdx] = useState(0)

  const isOpen = type === 'product'
  const product = isOpen && data ? PRODUCTS.find((p) => p.id === data) : undefined

  useEffect(() => {
    if (isOpen) { setQty(1); setThumbIdx(0) }
  }, [isOpen])

  if (!product) return null

  const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price
  const savings = hasDiscount ? discountPercent(product.originalPrice!, product.price) : 0
  const fav = isFavorite(product.id)

  const highlights = tArr('highlight1').length > 1
    ? [t('highlight1'), t('highlight2'), t('highlight3'), t('highlight4')]
    : [t('highlight1'), t('highlight2'), t('highlight3'), t('highlight4')]

  const nutrition = [
    { label: t('nutCalories'), value: '520 ك' },
    { label: t('nutProtein'),  value: '28 ج'  },
    { label: t('nutCarbs'),    value: '44 ج'  },
    { label: t('nutFat'),      value: '22 ج'  },
  ]

  function handleAddToCart() {
    addItem(product!, qty)
    toast.success(`✅ ${t('addedToCart')} "${product!.name}" ${t('addedToCartSuffix')}`)
    close()
  }

  function handleToggleFav() {
    toggleFavorite(product!.id)
    toast(fav ? t('modalFavRemoved') : t('modalFavAdded'))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      className="absolute inset-3 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[95vw] sm:max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
    >
      <div className={`lg:flex ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        {/* Image Panel */}
        <div className="lg:w-1/2 p-4 lg:p-6 bg-gray-50">
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-gray-100 mb-3">
            <img src={product.thumbs[thumbIdx]} alt={product.name} className="w-full h-full object-cover" />
            <button onClick={close} className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition`} aria-label={t('modalClose')}>
              <X size={16} className="text-gray-600" />
            </button>
            <button onClick={handleToggleFav} className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition`} aria-label={fav ? t('modalFavRemove') : t('modalFavAdd')}>
              <Heart size={16} className={fav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
            </button>
            {product.badge && (
              <span className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} text-white text-[10px] font-black px-2.5 py-1 rounded-full ${product.isBestseller ? 'bg-amber-500' : product.isNew ? 'bg-emerald-500' : 'bg-brand'}`}>
                {product.badge}
              </span>
            )}
          </div>

          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {product.thumbs.map((thumb, i) => (
              <button key={i} onClick={() => setThumbIdx(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition cursor-pointer ${i === thumbIdx ? 'border-brand ring-2 ring-brand' : 'border-gray-200'}`}
                aria-label={`${t('modalThumbnail')} ${i + 1}`} aria-pressed={i === thumbIdx}
              >
                <img src={thumb} className="w-full h-full object-cover" alt={`${product.name} ${t('modalThumbnail')} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className={`lg:w-1/2 p-5 lg:p-8 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.nameEn}</span>
          <h2 className="text-2xl lg:text-3xl font-black mb-1 text-gray-900">{product.name}</h2>
          <span className="text-xs text-emerald-600 font-bold mb-3">{product.orders}</span>

          <div className={`mb-4 ${isRTL ? 'flex justify-end' : ''}`}>
            <StarRating rating={product.rating} reviews={product.reviews} showValue size="md" />
          </div>

          <div className={`flex items-baseline gap-3 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="text-3xl lg:text-4xl font-black text-brand">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice!)}</span>
                <Badge variant="emerald">{t('modalSave')} {savings}%</Badge>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-5">{product.description}</p>

          <div className="mb-5">
            <h4 className="text-sm font-bold mb-2 text-gray-800">{t('modalHighlights')}</h4>
            <ul className="space-y-1.5">
              {highlights.map((h) => (
                <li key={h} className={`flex items-start gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {nutrition.map((n) => (
              <div key={n.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-medium">{n.label}</p>
                <p className="text-sm font-bold mt-0.5">{n.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className={`flex items-center justify-between bg-gray-50 rounded-2xl p-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="font-bold text-sm text-gray-700">{t('modalQty')}</span>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition" aria-label={t('modalDecrease')}>
                  <Minus size={12} className="text-gray-400" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-sm font-black border-x border-gray-200">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition" aria-label={t('modalIncrease')}>
                  <Plus size={12} className="text-gray-400" />
                </button>
              </div>
            </div>

            <Button fullWidth onClick={handleAddToCart}>
              <ShoppingCart size={16} />
              {t('modalAddCart')} — {formatPrice(product.price * qty)}
            </Button>

            <div className={`mt-3 flex items-center justify-center gap-4 text-xs text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{t('modalDeliveryInfo')}</span>
              <span>{t('modalCod')}</span>
              <span>{t('modalEta')}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
