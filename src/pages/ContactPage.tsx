import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { WORKING_HOURS, BRAND, DELIVERY_ZONES } from '@/data/constants'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useT } from '@/hooks/useT'
import { formatPrice } from '@/lib/utils'

export default function ContactPage() {
  const { t, tArr, isRTL } = useT()

  const contactItems = [
    { Icon: MapPin, title: t('contactAddrTitle'), detail: t('contactAddrDetail') },
    { Icon: Phone,  title: t('contactPhTitle'),   detail: t('contactPhDetail')   },
    { Icon: Mail,   title: t('contactMailTitle'), detail: t('contactMailDetail') },
    { Icon: Clock,  title: t('contactHrsTitle'),  detail: t('contactHrsDetail')  },
  ]

  const social = [
    { icon: Facebook,       label: 'Facebook'  },
    { icon: Instagram,      label: 'Instagram' },
    { icon: MessageCircle,  label: 'WhatsApp'  },
  ]

  const subjectOptions = tArr('subjectOptions')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success(t('contactSent'))
    e.currentTarget.reset()
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl lg:text-4xl font-black mb-2">{t('contactTitle')}</h1>
        <p className="text-gray-500">{t('contactDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-4" noValidate>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <label htmlFor="c-name" className="block text-sm font-bold mb-1.5 text-gray-700">{t('contactName')}</label>
              <Input id="c-name" type="text" required placeholder={t('contactNamePh')} autoComplete="name" className={isRTL ? 'text-right' : 'text-left'} />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <label htmlFor="c-phone" className="block text-sm font-bold mb-1.5 text-gray-700">{t('contactPhone')}</label>
              <Input id="c-phone" type="tel" required placeholder={t('contactPhonePh')} autoComplete="tel" className={isRTL ? 'text-right' : 'text-left'} />
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <label htmlFor="c-email" className="block text-sm font-bold mb-1.5 text-gray-700">{t('contactEmail')}</label>
              <Input id="c-email" type="email" placeholder={t('contactEmailPh')} autoComplete="email" className={isRTL ? 'text-right' : 'text-left'} />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <label htmlFor="c-subject" className="block text-sm font-bold mb-1.5 text-gray-700">{t('contactSubject')}</label>
              <select id="c-subject" required className={`w-full h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                <option value="">{t('contactSubjectPh')}</option>
                {subjectOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className={isRTL ? 'text-right' : 'text-left'}>
            <label htmlFor="c-msg" className="block text-sm font-bold mb-1.5 text-gray-700">{t('contactMessage')}</label>
            <textarea id="c-msg" required rows={5} placeholder={t('contactMsgPh')} className={`w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition resize-none ${isRTL ? 'text-right' : 'text-left'}`} />
          </div>

          <Button type="submit" size="lg">{t('contactSend')}</Button>
        </form>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className={`font-black mb-4 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contactInfo')}</h3>
            <div className="space-y-4">
              {contactItems.map(({ Icon, title, detail }) => (
                <div key={title} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-brand" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="font-bold text-sm text-gray-700">{title}</p>
                    <p className="text-sm text-gray-500">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className={`font-black mb-4 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contactHours')}</h3>
            <ul className="space-y-3">
              {WORKING_HOURS.map(({ day, time }) => (
                <li key={day} className={`flex flex-col gap-0.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs text-gray-500 font-medium">{day}</span>
                  <span className="text-brand font-black text-sm">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery zones */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className={`font-black mb-3 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contactZones')}</h3>
            <div className="flex flex-wrap gap-1.5">
              {DELIVERY_ZONES.map((z) => (
                <span key={z} className="text-xs bg-brand-50 text-brand font-bold px-2.5 py-1 rounded-full">{z}</span>
              ))}
            </div>
            <p className={`text-xs text-gray-400 mt-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('contactDeliveryFee')} {formatPrice(BRAND.deliveryMin)} — {t('contactFreeAt')} {formatPrice(BRAND.freeDeliveryAt)}
            </p>
          </div>

          {/* Social */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className={`font-black mb-4 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('contactSocial')}</h3>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {social.map(({ icon: Icon, label }) => (
                <button key={label} onClick={() => toast.info(`${label} — ${isRTL ? 'قريبًا' : 'coming soon'}`)}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand flex items-center justify-center text-white transition" aria-label={label}>
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* COD */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
            <span className="text-4xl">💵</span>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <p className="font-black text-emerald-800 text-sm">{t('contactCodTitle')}</p>
              <p className="text-xs text-emerald-700 mt-0.5">{t('contactCodDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}