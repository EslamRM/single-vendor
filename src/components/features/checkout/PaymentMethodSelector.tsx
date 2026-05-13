import { Wallet, Smartphone } from 'lucide-react'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { BRAND } from '@/data/constants'
import { useT } from '@/hooks/useT'
import { Input } from '@/components/ui/Input'
import type { PaymentMethod } from '@/types'

interface MethodCardProps {
  method: PaymentMethod
  icon: React.ReactNode
  label: string
  desc: string
  selected: boolean
  onSelect: () => void
  isRTL: boolean
}

function MethodCard({ method: _method, icon, label, desc, selected, onSelect, isRTL }: MethodCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? 'border-brand bg-brand-50 shadow-md shadow-brand/10'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
      aria-pressed={selected}
    >
      {/* Radio dot */}
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
        selected ? 'border-brand bg-brand' : 'border-gray-300'
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        selected ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500'
      }`}>
        {icon}
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className={`font-black text-sm ${selected ? 'text-brand' : 'text-gray-900'}`}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </button>
  )
}

export function PaymentMethodSelector() {
  const { form, setPayment, setField } = useCheckoutStore()
  const { t, isRTL } = useT()

  return (
    <div className="space-y-3">
      <h3 className={`font-black text-gray-900 text-base ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('checkoutPaymentTitle')}
      </h3>

      {/* Cash on delivery */}
      <MethodCard
        method="cod"
        icon={<Wallet size={18} />}
        label={t('checkoutCodLabel')}
        desc={t('checkoutCodDesc')}
        selected={form.paymentMethod === 'cod'}
        onSelect={() => setPayment('cod')}
        isRTL={isRTL}
      />

      {/* Vodafone Cash */}
      <MethodCard
        method="vodafone_cash"
        icon={<Smartphone size={18} />}
        label={t('checkoutVfLabel')}
        desc={t('checkoutVfDesc')}
        selected={form.paymentMethod === 'vodafone_cash'}
        onSelect={() => setPayment('vodafone_cash')}
        isRTL={isRTL}
      />

      {/* Vodafone Cash details panel */}
      {form.paymentMethod === 'vodafone_cash' && (
        <div className="animate-fade-up bg-red-50 border border-red-200 rounded-2xl p-4 space-y-3">
          {/* Number display */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center shrink-0">
              <Smartphone size={16} className="text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="text-xs text-red-600 font-bold">{t('checkoutVfNumber')}</p>
              <p className="text-base font-black text-red-800 tracking-widest">{BRAND.vodafoneCashNumber}</p>
            </div>
          </div>

          {/* Steps */}
          <p className={`text-xs text-red-700 leading-relaxed bg-red-100 rounded-xl p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('checkoutVfSteps')}
          </p>

          {/* Reference input */}
          <div>
            <label className={`block text-xs font-bold text-red-700 mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('checkoutVfRefLabel')}
            </label>
            <Input
              type="text"
              placeholder={t('checkoutVfRefPh')}
              value={form.vodafoneRef}
              onChange={(e) => setField('vodafoneRef', e.target.value)}
              className={`border-red-200 focus:border-red-400 ${isRTL ? 'text-right' : 'text-left'}`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
