import { create } from 'zustand'
import type { CheckoutForm, CheckoutStep, PaymentMethod } from '@/types'

export interface CheckoutStore {
  isOpen: boolean
  step: CheckoutStep
  form: CheckoutForm
  open: () => void
  close: () => void
  setStep: (step: CheckoutStep) => void
  setField: <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => void
  setPayment: (method: PaymentMethod) => void
  reset: () => void
}

const DEFAULT_FORM: CheckoutForm = {
  name: '',
  phone: '',
  address: '',
  area: '',
  notes: '',
  paymentMethod: 'cod',
  vodafoneRef: '',
}

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  isOpen: false,
  step: 'form',
  form: { ...DEFAULT_FORM },

  open: () => set({ isOpen: true, step: 'form' }),
  close: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  setField: (key, value) =>
    set((state) => ({ form: { ...state.form, [key]: value } })),
  setPayment: (method) =>
    set((state) => ({ form: { ...state.form, paymentMethod: method } })),
  reset: () => set({ form: { ...DEFAULT_FORM }, step: 'form' }),
}))
