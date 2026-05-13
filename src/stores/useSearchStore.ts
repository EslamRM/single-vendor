import { create } from 'zustand'

export interface SearchStore {
  isOpen: boolean
  query: string
  open: () => void
  close: () => void
  setQuery: (q: string) => void
  reset: () => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  isOpen: false,
  query: '',
  open:  () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: '' }),
  setQuery: (q: string) => set({ query: q }),
  reset: () => set({ query: '' }),
}))
