import { useState, useCallback } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { useCartStore } from '@/stores/useCartStore'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useT } from '@/hooks/useT'
import { isFormValid, buildWhatsAppUrl } from '@/lib/whatsapp'
import { BRAND } from '@/data/constants'
import { OrderSummary } from './OrderSummary'
import { CheckoutFormFields } from './CheckoutForm'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { WhatsAppButton } from './WhatsAppButton'
import { SuccessScreen } from './SuccessScreen'

export function CheckoutModal() {
  const { isOpen, step, form, close, setStep } = useCheckoutStore()
  const { items, getTotal } = useCartStore()
  const { t, isRTL } = useT()
  useScrollLock(isOpen)

  // Touched fields for inline validation
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({})

  const subtotal    = getTotal()
  const deliveryFee = subtotal >= BRAND.freeDeliveryAt ? 0 : BRAND.deliveryMin

  // Validation errors
  const errors: Partial<Record<string, string>> = {}
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = t('checkoutValidName')
  if (!/^01[0-9]{9}$/.test(form.phone.trim())) errors.phone = t('checkoutValidPhone')
  if (!form.address.trim() || form.address.trim().length < 5) errors.address = t('checkoutValidAddress')
  if (!form.area.trim()) errors.area = t('checkoutValidArea')

  const valid = isFormValid(form)

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  async function handleSubmit() {
    // Mark all fields touched to show errors
    setTouched({ name: true, phone: true, address: true, area: true })
    if (!valid) {
      toast.error(isRTL ? 'أكمل البيانات المطلوبة' : 'Please complete the required fields')
      return
    }

    // Confirming state — brief pause for UX
    setStep('confirming')

    await new Promise((r) => setTimeout(r, 1500))

    // Build WhatsApp URL and open
    const url = buildWhatsAppUrl(items, form, deliveryFee)
    window.open(url, '_blank', 'noopener,noreferrer')

    // Show success screen
    setStep('done')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={t('checkoutTitle')}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={step === 'form' ? close : undefined}
      />

      {/* Panel — full screen on mobile, centered modal on desktop */}
      <div className={`
        relative bg-white w-full sm:max-w-5xl sm:mx-4 sm:rounded-3xl overflow-hidden shadow-2xl animate-fade-up
        h-[95vh] sm:h-auto sm:max-h-[92vh] rounded-t-3xl
        flex flex-col
      `}>

        {/* Header */}
        {step !== 'done' && (
          <div className={`
            flex items-center justify-between px-5 py-4
            border-b border-gray-100 shrink-0
            ${isRTL ? 'flex-row-reverse' : ''}
          `}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="font-black text-lg text-gray-900">{t('checkoutTitle')}</h2>
              {items.length > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">{t('checkoutSubtitle')}</p>
              )}
            </div>
            <button
              onClick={close}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label={isRTL ? 'إغلاق' : 'Close'}
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        )}

        {/* ── EMPTY CART STATE ──────────────────────────────────────────── */}
        {items.length === 0 && step === 'form' && (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-5">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>
            <h3 className="font-black text-gray-700 text-xl mb-2">{t('checkoutEmptyTitle')}</h3>
            <p className="text-gray-400 text-sm mb-8">{t('checkoutEmptyDesc')}</p>
            <Link
              to="/products"
              onClick={close}
              className="h-12 px-8 bg-brand text-white font-black rounded-full hover:bg-brand-dark transition"
            >
              {t('checkoutEmptyBtn')}
            </Link>
          </div>
        )}

        {/* ── SUCCESS SCREEN ────────────────────────────────────────────── */}
        {step === 'done' && <SuccessScreen />}

        {/* ── CONFIRMING OVERLAY ────────────────────────────────────────── */}
        {step === 'confirming' && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-10 h-10 animate-float">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-40" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">{t('checkoutConfirming')}</h3>
          </div>
        )}

        {/* ── MAIN FORM ─────────────────────────────────────────────────── */}
        {items.length > 0 && step === 'form' && (
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">

              {/* LEFT — Form + Payment */}
              <div className={`p-5 sm:p-6 space-y-6 border-gray-100 ${isRTL ? 'lg:border-l' : 'lg:border-r'} overflow-y-auto`}>
                <CheckoutFormFields
                  errors={errors}
                  touched={touched}
                  onBlur={handleBlur}
                />
                <PaymentMethodSelector />
              </div>

              {/* RIGHT — Order summary (hidden on mobile, shown at bottom via sticky) */}
              <div className="hidden lg:block p-5 sm:p-6 bg-gray-50/50 overflow-y-auto">
                <OrderSummary />
              </div>
            </div>

            {/* Mobile — compact summary strip */}
            <div className="lg:hidden border-t border-gray-100 bg-gray-50/80 px-5 py-4">
              <div className={`flex items-center justify-between text-sm mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-black text-brand text-base">
                  {isRTL
                    ? `${(subtotal + deliveryFee).toLocaleString('ar-EG')} ج.م`
                    : `${(subtotal + deliveryFee).toLocaleString('en-EG')} EGP`
                  }
                </span>
                <span className="text-gray-500 text-xs">
                  {items.reduce((s, i) => s + i.qty, 0)} {t('checkoutItemCount')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── STICKY BOTTOM CTA ─────────────────────────────────────────── */}
        {items.length > 0 && step === 'form' && (
          <div className="shrink-0 px-5 py-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <WhatsAppButton
              disabled={!valid}
              loading={false}
              onClick={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  )
}
