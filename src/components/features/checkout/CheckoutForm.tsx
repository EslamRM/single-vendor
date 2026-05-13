import { useRef, useEffect } from 'react'
import { User, Phone, MapPin, ChevronDown, FileText, AlertCircle } from 'lucide-react'
import { useCheckoutStore } from '@/stores/useCheckoutStore'
import { useT } from '@/hooks/useT'
import { DELIVERY_ZONES } from '@/data/constants'

interface FieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  icon: React.ReactNode
  type?: string
  error?: string
  isRTL: boolean
  required?: boolean
  autoFocus?: boolean
}

function Field({ id, label, placeholder, value, onChange, icon, type = 'text', error, isRTL, required = false, autoFocus = false }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={`flex items-center gap-1.5 text-sm font-bold text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {label}
        {required && <span className="text-brand">*</span>}
      </label>
      <div className="relative">
        <div className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`}>
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          className={`w-full h-12 text-sm rounded-xl border-2 transition-all duration-200 outline-none bg-white
            ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}
            ${error
              ? 'border-red-300 focus:border-red-400 bg-red-50'
              : 'border-gray-200 focus:border-brand focus:bg-brand-50/30'
            }`}
        />
        {error && (
          <div className={`absolute top-1/2 -translate-y-1/2 text-red-500 ${isRTL ? 'left-3' : 'right-3'}`}>
            <AlertCircle size={16} />
          </div>
        )}
      </div>
      {error && (
        <p className={`text-xs text-red-500 font-medium flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {error}
        </p>
      )}
    </div>
  )
}

interface CheckoutFormProps {
  errors: Partial<Record<string, string>>
  touched: Partial<Record<string, boolean>>
  onBlur: (field: string) => void
}

export function CheckoutFormFields({ errors, touched, onBlur }: CheckoutFormProps) {
  const { form, setField } = useCheckoutStore()
  const { t, isRTL } = useT()
  const firstInputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = firstInputRef.current?.querySelector('input')
    if (el) setTimeout(() => el.focus(), 150)
  }, [])

  return (
    <div className="space-y-4" ref={firstInputRef}>
      <h3 className={`font-black text-gray-900 text-base ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('checkoutFormTitle')}
      </h3>

      {/* Name */}
      <Field
        id="co-name"
        label={t('checkoutNameLabel')}
        placeholder={t('checkoutNamePh')}
        value={form.name}
        onChange={(v) => setField('name', v)}
        icon={<User size={16} />}
        required
        autoFocus
        isRTL={isRTL}
        error={touched.name ? errors.name : undefined}
      />

      {/* Phone */}
      <Field
        id="co-phone"
        label={t('checkoutPhoneLabel')}
        placeholder={t('checkoutPhonePh')}
        value={form.phone}
        onChange={(v) => setField('phone', v.replace(/\D/g, '').slice(0, 11))}
        icon={<Phone size={16} />}
        type="tel"
        required
        isRTL={isRTL}
        error={touched.phone ? errors.phone : undefined}
      />

      {/* Address */}
      <div className="space-y-1.5">
        <label htmlFor="co-address" className={`flex items-center gap-1.5 text-sm font-bold text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {t('checkoutAddressLabel')} <span className="text-brand">*</span>
        </label>
        <div className="relative">
          <div className={`absolute top-3.5 text-gray-400 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`}>
            <MapPin size={16} />
          </div>
          <textarea
            id="co-address"
            value={form.address}
            onChange={(e) => setField('address', e.target.value)}
            onBlur={() => onBlur('address')}
            placeholder={t('checkoutAddressPh')}
            rows={2}
            className={`w-full text-sm rounded-xl border-2 transition-all duration-200 outline-none bg-white py-3 resize-none
              ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}
              ${touched.address && errors.address
                ? 'border-red-300 focus:border-red-400 bg-red-50'
                : 'border-gray-200 focus:border-brand focus:bg-brand-50/30'
              }`}
          />
        </div>
        {touched.address && errors.address && (
          <p className="text-xs text-red-500 font-medium">{errors.address}</p>
        )}
      </div>

      {/* Area — select from delivery zones */}
      <div className="space-y-1.5">
        <label htmlFor="co-area" className={`block text-sm font-bold text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('checkoutAreaLabel')} <span className="text-brand">*</span>
        </label>
        <div className="relative">
          <div className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`}>
            <MapPin size={16} />
          </div>
          <div className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}>
            <ChevronDown size={14} />
          </div>
          <select
            id="co-area"
            value={form.area}
            onChange={(e) => setField('area', e.target.value)}
            onBlur={() => onBlur('area')}
            className={`w-full h-12 text-sm rounded-xl border-2 border-gray-200 focus:border-brand outline-none bg-white appearance-none transition-all
              ${isRTL ? 'pr-10 pl-8 text-right' : 'pl-10 pr-8 text-left'}
              ${touched.area && errors.area
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-brand'
              }`}
          >
            <option value="">{t('checkoutAreaPh')}</option>
            {DELIVERY_ZONES.map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
        {touched.area && errors.area && (
          <p className="text-xs text-red-500 font-medium">{errors.area}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label htmlFor="co-notes" className={`block text-sm font-bold text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('checkoutNotesLabel')}
        </label>
        <div className="relative">
          <div className={`absolute top-3.5 text-gray-400 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`}>
            <FileText size={16} />
          </div>
          <textarea
            id="co-notes"
            value={form.notes}
            onChange={(e) => setField('notes', e.target.value)}
            placeholder={t('checkoutNotesPh')}
            rows={2}
            className={`w-full text-sm rounded-xl border-2 border-gray-200 focus:border-brand outline-none bg-white py-3 resize-none transition-all
              ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'}`}
          />
        </div>
      </div>
    </div>
  )
}
