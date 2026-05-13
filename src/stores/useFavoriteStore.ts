import { create } from 'zustand'

export interface FavoriteStore {
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const useFavoriteStore = create<FavoriteStore>()((set, get) => ({
  favorites: new Set<string>(),

  toggleFavorite(id: string) {
    set((state) => {
      const next = new Set(state.favorites)
      next.has(id) ? next.delete(id) : next.add(id)
      return { favorites: next }
    })
  },

  isFavorite: (id: string) => get().favorites.has(id),
}))
