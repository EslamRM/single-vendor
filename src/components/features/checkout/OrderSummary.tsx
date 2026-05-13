import { Minus, Plus, Trash2, Edit3 } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { useModalStore } from '@/stores/useModalStore'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { formatPrice } from '@/lib/utils'
import { BRAND } from '@/data/constants'
import { useT } from '@/hooks/useT'
import type { CartItem } from '@/types'

export function OrderSummary() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore()
  const openModal = useModalStore((s) => s.open)
  const closeCheckout = useCheckoutStore((s) => s.close)
  const { t, isRTL } = useT()

  const subtotal    = getTotal()
  const deliveryFee = subtotal >= BRAND.freeDeliveryAt ? 0 : BRAND.deliveryMin
  const total       = subtotal + deliveryFee
  const remaining   = Math.max(0, BRAND.freeDeliveryAt - subtotal)

  function handleEditCart() {
    closeCheckout()
    openModal('cart')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h3 className="font-black text-gray-900 text-lg">{t('checkoutOrderSummary')}</h3>
        <button
          onClick={handleEditCart}
          className="flex items-center gap-1.5 text-xs text-brand font-bold hover:underline"
        >
          <Edit3 size={12} />
          {t('checkoutEditCart')}
        </button>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item: CartItem) => (
          <div key={item.id} className={`flex items-center gap-3 p-3 bg-gray-50 rounded-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Image with qty badge */}
            <div className="relative shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand text-white text-[10px] font-black rounded-full flex items-center justify-center shadow">
                {item.qty}
              </span>
            </div>

            {/* Name + controls */}
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm text-gray-900 truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                {item.name}
              </p>
              <p className={`text-xs text-brand font-black mt-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                {formatPrice(item.price * item.qty)}
              </p>
              {/* Qty stepper */}
              <div className={`flex items-center gap-1.5 mt-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand transition"
                  aria-label="Decrease"
                >
                  <Minus size={9} />
                </button>
                <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand transition"
                  aria-label="Increase"
                >
                  <Plus size={9} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-red-300 hover:text-red-500 transition ml-1"
                  aria-label="Remove"
                >
                  <Trash2 size={9} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Free delivery progress bar */}
      {remaining > 0 && (
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
          <p className={`text-xs text-amber-700 font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            🚚 {t('checkoutFreeHint')} {formatPrice(remaining)} {t('checkoutFreeHint2')}
          </p>
          <div className="h-1.5 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (subtotal / BRAND.freeDeliveryAt) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5">
        <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="font-medium">{formatPrice(subtotal)}</span>
          <span className="text-gray-500">{t('checkoutSubtotal')}</span>
        </div>
        <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-600' : ''}`}>
            {deliveryFee === 0 ? t('checkoutFreeDelivery') : formatPrice(deliveryFee)}
          </span>
          <span className="text-gray-500">{t('checkoutDelivery')}</span>
        </div>
        <div className={`flex justify-between pt-2.5 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="font-black text-brand text-lg">{formatPrice(total)}</span>
          <span className="font-black text-gray-900">{t('checkoutTotal')}</span>
        </div>
      </div>

      {/* ETA */}
      <div className={`flex items-center gap-2 text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span>{t('checkoutEta')} {BRAND.estimatedTime}</span>
      </div>
    </div>
  )
}
