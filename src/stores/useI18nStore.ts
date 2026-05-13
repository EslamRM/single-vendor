import { create } from 'zustand'

export type Lang = 'ar' | 'en'

export interface I18nStore {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  isRTL: () => boolean
}

export const useI18nStore = create<I18nStore>()((set, get) => ({
  lang: 'ar',
  setLang: (lang: Lang) => set({ lang }),
  toggle: () => set((s) => ({ lang: s.lang === 'ar' ? 'en' : 'ar' })),
  isRTL: () => get().lang === 'ar',
}))
