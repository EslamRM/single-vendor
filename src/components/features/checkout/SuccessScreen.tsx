import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { useCartStore } from '@/stores/useCartStore'
import { useT } from '@/hooks/useT'

export function SuccessScreen() {
  const { close, reset } = useCheckoutStore()
  const clearCart = useCartStore((s) => s.clearCart)
  const navigate = useNavigate()
  const { t } = useT()

  function handleClose() {
    close()
    reset()
    clearCart()
    navigate('/products')
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-up">
      {/* Animated check */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center animate-pop">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        {/* Ripple rings */}
        <div className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-30" />
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-3">{t('checkoutDoneTitle')}</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">{t('checkoutDoneDesc')}</p>

      {/* WhatsApp brand badge */}
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-8">
        <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5 shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <p className="text-xs text-emerald-700 font-bold">تم فتح واتساب لإتمام الطلب</p>
      </div>

      <button
        onClick={handleClose}
        className="h-12 px-8 bg-brand hover:bg-brand-dark text-white font-black rounded-full transition shadow-lg shadow-brand/25"
      >
        {t('checkoutDoneClose')}
      </button>
    </div>
  )
}
