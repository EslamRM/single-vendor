import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Facebook, Instagram, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { WORKING_HOURS, BRAND, DELIVERY_ZONES } from '@/data/constants'
import { useT } from '@/hooks/useT'

const SOCIAL = [
  { icon: Facebook,       label: 'Facebook' },
  { icon: Instagram,      label: 'Instagram' },
  { icon: MessageCircle,  label: 'WhatsApp' },
]

export function Footer() {
  const { t, tArr, isRTL } = useT()

  const CONTACT = [
    { Icon: MapPin, title: t('contactAddrTitle'), detail: t('contactAddrDetail') },
    { Icon: Mail,   title: t('contactMailTitle'), detail: t('contactMailDetail') },
    { Icon: Phone,  title: t('contactPhTitle'),   detail: t('contactPhDetail') },
  ]

  const footerLinks = tArr('footerQuickLinks')

  return (
    <footer className="bg-gray-900 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shrink-0">
                <span className="text-white font-black text-xl">أ</span>
              </div>
              <div>
                <div className="font-black text-xl">{BRAND.nameEn}</div>
                <div className="text-[10px] text-brand font-bold">{t('brandTagline')}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{t('footerAbout')}</p>
            <div className="flex gap-2">
              {SOCIAL.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => toast.info(`${label} — ${t('footerSocialComing')}`)}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-brand flex items-center justify-center text-gray-400 hover:text-white transition"
                  aria-label={label}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="font-bold mb-4 text-white">{t('footerLinks')}</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link}>
                  <Link to="#" className="text-gray-400 hover:text-brand text-sm transition">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="font-bold mb-4 text-white">{t('footerContact')}</h3>
            <ul className="space-y-3">
              {CONTACT.map(({ Icon, title, detail }) => (
                <li key={title} className={`flex items-start gap-2.5 text-sm text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Icon size={14} className="text-brand mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-xs">{title}</p>
                    <p>{detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <p className="text-xs text-brand font-bold mb-2">{t('footerDeliveryZones')}</p>
              <div className="flex flex-wrap gap-1">
                {DELIVERY_ZONES.map((z) => (
                  <span key={z} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">{z}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="font-bold mb-4 text-white">{t('footerHours')}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {WORKING_HOURS.map(({ day, time }) => (
                <li key={day} className="flex flex-col gap-0.5">
                  <span className="text-white font-medium text-xs">{day}</span>
                  <span className="text-brand font-bold">{time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/40 rounded-xl px-3 py-2">
              <span className="text-xl">💵</span>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-xs text-emerald-400 font-bold">{t('footerCodTitle')}</p>
                <p className="text-[11px] text-gray-400">{t('footerCodDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <span>© 2025 {BRAND.nameEn} — {BRAND.name}. {t('footerCopyright')}</span>
          <span className="flex items-center gap-1">{t('footerMadeIn')} <span className="text-red-400">♥</span> {t('footerMadeInSuffix')}</span>
        </div>
      </div>
    </footer>
  )
}
