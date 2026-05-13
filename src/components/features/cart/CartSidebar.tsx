import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/stores/useCartStore'
import { useModalStore } from '@/stores/useModalStore'
import { useScrollLock } from '@/hooks/useScrollLock'
import { formatPrice } from '@/lib/utils'
import { BRAND } from '@/data/constants'
import { useT } from '@/hooks/useT'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import type { CartItem } from '@/types'

export function CartSidebar() {
  const { type, close } = useModalStore()
  const openCheckout = useCheckoutStore((s) => s.open)
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const { t, isRTL } = useT()

  const isOpen = type === 'cart'
  useScrollLock(isOpen)

  if (!isOpen) return null

  const subtotal   = getTotal()
  const deliveryFee = subtotal > 0 ? (subtotal >= BRAND.freeDeliveryAt ? 0 : BRAND.deliveryMin) : 0
  const total      = subtotal + deliveryFee
  const count      = items.reduce((s: number, i: CartItem) => s + i.qty, 0)
  const remaining  = Math.max(0, BRAND.freeDeliveryAt - subtotal)

  function handleRemove(item: CartItem) {
    removeItem(item.id)
    toast.info(`${t('cartRemoved')} "${item.name}" ${t('cartRemovedSuffix')}`)
  }

  return (
    <div className="fixed inset-0 z-[70]" onClick={close}>
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl animate-slide-in-r flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t('cartTitle')}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b border-gray-100 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className="font-black text-lg text-gray-900">{t('cartTitle')} ({count})</h2>
          <button onClick={close} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition" aria-label={t('cartClose')}>
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Free delivery progress */}
        {subtotal > 0 && subtotal < BRAND.freeDeliveryAt && (
          <div className={`px-5 py-3 bg-amber-50 border-b border-amber-100 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-xs text-amber-700 font-bold mb-1.5">
              🚚 {t('cartFreeProgress')} {formatPrice(remaining)} {t('cartFreeGoal')}
            </p>
            <div className="h-1.5 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / BRAND.freeDeliveryAt) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= BRAND.freeDeliveryAt && subtotal > 0 && (
          <div className={`px-5 py-2.5 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-700 font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('cartFreeUnlocked')}
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <ShoppingBag size={28} className="text-gray-300" />
            </div>
            <p className="font-bold text-gray-700 mb-1 text-lg">{t('cartEmpty')}</p>
            <p className="text-sm text-gray-400">{t('cartEmptyHint')}</p>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item: CartItem) => (
                <div key={item.id} className={`flex gap-3 p-3 bg-gray-50 rounded-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{item.name}</h4>
                    <p className={`text-xs text-gray-400 mt-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>{item.category}</p>
                    <div className={`flex items-center justify-between mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition" aria-label={t('cartDecrease')}>
                          <Minus size={10} className="text-gray-400" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-black">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition" aria-label={t('cartIncrease')}>
                          <Plus size={10} className="text-gray-400" />
                        </button>
                      </div>
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="font-black text-sm text-brand">{formatPrice(item.price * item.qty)}</span>
                        <button onClick={() => handleRemove(item)} className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-500 transition" aria-label={`${t('cartRemove')} ${item.name}`}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-gray-100 p-5 space-y-2.5 shrink-0 bg-white">
              <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-medium">{formatPrice(subtotal)}</span>
                <span className="text-gray-500">{t('cartSubtotal')}</span>
              </div>
              <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-600' : ''}`}>
                  {deliveryFee === 0 ? t('cartFree') : formatPrice(deliveryFee)}
                </span>
                <span className="text-gray-500">{t('cartDelivery')}</span>
              </div>
              <div className={`flex justify-between text-base pt-2 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-black text-brand text-xl">{formatPrice(total)}</span>
                <span className="font-bold text-gray-900">{t('cartTotal')}</span>
              </div>

              <div className={`bg-emerald-50 rounded-xl px-3 py-2 text-xs text-emerald-700 font-bold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t('cartCod')}
              </div>

              <button
                onClick={() => { close(); openCheckout() }}
                className="w-full h-14 rounded-2xl font-black text-base flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b558] active:scale-95 text-white shadow-xl shadow-emerald-500/30 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('checkoutWhatsappBtn')}
              </button>

              <p className={`text-xs text-gray-400 text-center`}>
                ⏱ {t('cartEta')} {BRAND.estimatedTime}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
