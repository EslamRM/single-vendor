import { useEffect } from 'react'
import { AppRouter } from './Router'
import { Providers } from './Providers'
import { ProductDetailModal } from '@/components/features/products/ProductDetailModal'
import { CartSidebar } from '@/components/features/cart/CartSidebar'
import { LoginForm } from '@/components/features/auth/LoginForm'
import { SignupForm } from '@/components/features/auth/SignupForm'
import { CheckoutModal } from '@/components/features/checkout/CheckoutModal'
import { useModalStore } from '@/stores/useModalStore'
import { useI18nStore } from '@/stores/useI18nStore'

function DirectionSyncer() {
  const lang = useI18nStore((s) => s.lang)
  useEffect(() => {
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])
  return null
}

function ProductEventListener() {
  const openModal = useModalStore((s) => s.open)
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (id) openModal('product', id)
    }
    window.addEventListener('open-product', handler)
    return () => window.removeEventListener('open-product', handler)
  }, [openModal])
  return null
}

export function App() {
  return (
    <Providers>
      <DirectionSyncer />
      <ProductEventListener />
      <AppRouter />
      {/* Global overlays — z-index order matters */}
      <ProductDetailModal />
      <CartSidebar />
      <CheckoutModal />
      <LoginForm />
      <SignupForm />
    </Providers>
  )
}
