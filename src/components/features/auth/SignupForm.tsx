import { toast } from 'sonner'
import { useModalStore } from '@/stores/useModalStore'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useT } from '@/hooks/useT'

export function SignupForm() {
  const { type, close, open } = useModalStore()
  const { t, isRTL } = useT()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const pass = data.get('pass') as string
    const pass2 = data.get('pass2') as string
    if (pass !== pass2) { toast.error(t('signupPassMismatch')); return }
    if (pass.length < 8) { toast.error(t('signupPassShort')); return }
    toast.success(t('signupSuccess'))
    close()
  }

  return (
    <Modal isOpen={type === 'signup'} onClose={close}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      <div className={`p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand/20">
            <span className="text-white font-black text-2xl">أ</span>
          </div>
          <h2 className="text-2xl font-black">{t('signupTitle')}</h2>
          <p className="text-sm text-gray-500 mt-1">{t('signupSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {[
            { id: 'su-name',  name: 'name',  type: 'text',     label: t('signupName'),  ph: t('signupNamePh'),  ac: 'name'         },
            { id: 'su-phone', name: 'phone', type: 'tel',      label: t('signupPhone'), ph: t('signupPhonePh'), ac: 'tel'          },
            { id: 'su-email', name: 'email', type: 'email',    label: t('signupEmail'), ph: t('signupEmailPh'), ac: 'email'        },
            { id: 'su-pass',  name: 'pass',  type: 'password', label: t('signupPass'),  ph: t('signupPassPh'),  ac: 'new-password' },
            { id: 'su-pass2', name: 'pass2', type: 'password', label: t('signupPass2'), ph: t('signupPass2Ph'), ac: 'new-password' },
          ].map(({ id, name, type, label, ph, ac }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-bold mb-1.5 text-gray-700">{label}</label>
              <Input id={id} name={name} type={type} required={name !== 'email'} placeholder={ph} autoComplete={ac} className={isRTL ? 'text-right' : 'text-left'} />
            </div>
          ))}
          <Button type="submit" fullWidth size="lg">{t('signupBtn')}</Button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-3">
          {t('signupTerms')}{' '}
          <button className="text-brand font-bold hover:underline">{t('signupTermsLink')}</button>
        </p>
        <p className="text-sm text-center text-gray-500 mt-4">
          {t('signupHasAccount')}{' '}
          <button onClick={() => open('login')} className="text-brand font-black hover:underline">{t('signupLoginLink')}</button>
        </p>
      </div>
    </Modal>
  )
}