export interface Product {
  id: string
  name: string           // Arabic name
  nameEn: string         // English subtitle
  category: string
  price: number          // EGP
  originalPrice: number | null
  badge: string | null
  rating: string
  reviews: string
  orders: string         // e.g. "+5,200 طلب"
  description: string    // Arabic description
  image: string
  thumbs: string[]
  isNew?: boolean
  isBestseller?: boolean
}

export interface CartItem {
  id: string
  name: string
  category: string
  price: number
  image: string
  qty: number
}

export interface Category {
  name: string       // Arabic
  nameEn: string
  icon: string
  image: string
  desc: string       // Arabic
}

export interface Offer {
  id: string
  title: string      // Arabic
  desc: string       // Arabic
  image: string
  discount: number
  code: string
  color: string
  valid: string
  minOrder?: number  // minimum order in EGP
}

export interface HeroSlide {
  title1: string     // Arabic
  title2: string     // Arabic
  subtitle: string   // Arabic
  badge: string      // Arabic
  image: string
  cta: string        // Arabic CTA text
}

export interface NavLink {
  path: string
  label: string      // Arabic
}

// ─── Checkout ─────────────────────────────────────────────────────────────────
export type PaymentMethod = 'cod' | 'vodafone_cash'

export interface CheckoutForm {
  name: string
  phone: string
  address: string
  area: string
  notes: string
  paymentMethod: PaymentMethod
  vodafoneRef: string
}

export type CheckoutStep = 'form' | 'confirming' | 'done'
