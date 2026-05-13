import { create } from 'zustand'
import type { CartItem, Product } from '@/types'

export interface CartStore {
  items: CartItem[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  getCount: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],

  addItem(product: Product, qty = 1) {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        return { items: state.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i) }
      }
      const newItem: CartItem = {
        id: product.id, name: product.name, category: product.category,
        price: product.price, image: product.image, qty,
      }
      return { items: [...state.items, newItem] }
    })
  },

  removeItem(id: string) {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
  },

  updateQuantity(id: string, delta: number) {
    set((state) => {
      const item = state.items.find((i) => i.id === id)
      if (!item) return state
      if (item.qty + delta <= 0) return { items: state.items.filter((i) => i.id !== id) }
      return { items: state.items.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i) }
    })
  },

  clearCart: () => set({ items: [] }),
  getCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}))
