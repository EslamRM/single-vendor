import { toast } from 'sonner'
import { useModalStore } from '@/stores/useModalStore'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useT } from '@/hooks/useT'

export function LoginForm() {
  const { type, close, open } = useModalStore()
  const { t, isRTL } = useT()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success(t('loginSuccess'))
    close()
  }

  return (
    <Modal isOpen={type === 'login'} onClose={close}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      <div className={`p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand/20">
            <span className="text-white font-black text-2xl">أ</span>
          </div>
          <h2 className="text-2xl font-black">{t('loginTitle')}</h2>
          <p className="text-sm text-gray-500 mt-1">{t('loginSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-user" className="block text-sm font-bold mb-1.5 text-gray-700">{t('loginUserLabel')}</label>
            <Input id="login-user" type="text" required placeholder={t('loginUserPh')} autoComplete="username" className={isRTL ? 'text-right' : 'text-left'} />
          </div>
          <div>
            <label htmlFor="login-pass" className="block text-sm font-bold mb-1.5 text-gray-700">{t('loginPassLabel')}</label>
            <Input id="login-pass" type="password" required placeholder={t('loginPassPh')} autoComplete="current-password" className={isRTL ? 'text-right' : 'text-left'} />
          </div>

          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-brand w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">{t('loginRemember')}</span>
            </label>
            <button type="button" onClick={() => toast.info(t('loginForgotSent'))} className="text-sm text-brand font-bold hover:underline">
              {t('loginForgot')}
            </button>
          </div>

          <Button type="submit" fullWidth size="lg">{t('loginBtn2')}</Button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">{t('loginDivider')}</span></div>
        </div>

        <button onClick={() => { toast.info('🛵'); close() }} className="w-full h-11 border-2 border-gray-200 hover:border-brand text-gray-700 hover:text-brand font-bold rounded-full transition text-sm">
          {t('loginGuest')}
        </button>

        <p className="text-sm text-center text-gray-500 mt-5">
          {t('loginNoAccount')}{' '}
          <button onClick={() => open('signup')} className="text-brand font-black hover:underline">{t('loginSignup')}</button>
        </p>
      </div>
    </Modal>
  )
}