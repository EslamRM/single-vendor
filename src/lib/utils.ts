/**
 * Formats a number as Egyptian Pounds: 189 → "189 ج.م"
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('ar-EG')} ج.م`
}

/**
 * Clamps a number between min and max (inclusive).
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Returns a percentage discount value given original and sale price.
 */
export function discountPercent(original: number, sale: number): number {
  return Math.round((1 - sale / original) * 100)
}

/**
 * Joins class name strings, filtering out falsy values.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
