import { create } from 'zustand'

export type ModalType = 'cart' | 'login' | 'signup' | 'product' | null

export interface ModalStore {
  type: ModalType
  data: string | null
  open: (type: ModalType, data?: string) => void
  close: () => void
}

export const useModalStore = create<ModalStore>()((set) => ({
  type: null,
  data: null,
  open: (type: ModalType, data: string | null = null) => set({ type, data }),
  close: () => set({ type: null, data: null }),
}))
