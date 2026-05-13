import type { CartItem, CheckoutForm } from '@/types'
import { BRAND } from '@/data/constants'

/** Emoji map for known food categories */
const CATEGORY_EMOJI: Record<string, string> = {
  'برجر':    '🍔',
  'بيتزا':   '🍕',
  'فراخ':    '🍗',
  'باستا':   '🍝',
  'كومبو':   '🎁',
  'سلطات':   '🥗',
  'جانبيات': '🍟',
  'Burgers': '🍔',
  'Pizza':   '🍕',
  'Chicken': '🍗',
  'Pasta':   '🍝',
  'Combos':  '🎁',
  'Salads':  '🥗',
}

function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? '🍽️'
}

function fmtPrice(n: number): string {
  return `${n.toLocaleString('ar-EG')} جنيه`
}

/**
 * Builds the WhatsApp message body from cart items + checkout form.
 * Returns a URL-encoded `wa.me` link ready for window.open().
 */
export function buildWhatsAppUrl(
  items: CartItem[],
  form: CheckoutForm,
  deliveryFee: number
): string {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const total    = subtotal + deliveryFee

  // ── Item lines ──────────────────────────────────────────────────────────
  const itemLines = items
    .map((item) => {
      const emoji   = getCategoryEmoji(item.category)
      const lineTotal = item.price * item.qty
      return `${emoji} ${item.name} × ${item.qty} — ${fmtPrice(lineTotal)}`
    })
    .join('\n')

  // ── Payment block ────────────────────────────────────────────────────────
  const paymentLine =
    form.paymentMethod === 'cod'
      ? '💵 الدفع عند الاستلام (كاش)'
      : `📱 فودافون كاش — رقم: ${BRAND.vodafoneCashNumber}${
          form.vodafoneRef ? `\n🔖 رقم المرجع: ${form.vodafoneRef}` : ''
        }`

  // ── Notes block ──────────────────────────────────────────────────────────
  const notesBlock = form.notes.trim()
    ? `📝 ملاحظات:\n${form.notes.trim()}\n\n`
    : ''

  // ── Full message ─────────────────────────────────────────────────────────
  const message = [
    `مرحبًا 👋`,
    `أريد طلب:`,
    ``,
    itemLines,
    ``,
    `━━━━━━━━━━━`,
    `📍 بيانات العميل:`,
    ``,
    `الاسم: ${form.name}`,
    `الهاتف: ${form.phone}`,
    `العنوان: ${form.address}${form.area ? ` - ${form.area}` : ''}`,
    ``,
    notesBlock.trim() ? notesBlock.trim() : null,
    `━━━━━━━━━━━`,
    `💰 الحساب:`,
    ``,
    `المجموع: ${fmtPrice(subtotal)}`,
    `🚚 التوصيل: ${deliveryFee === 0 ? 'مجاني 🎉' : fmtPrice(deliveryFee)}`,
    ``,
    `💵 الإجمالي النهائي: ${fmtPrice(total)}`,
    ``,
    `━━━━━━━━━━━`,
    paymentLine,
    ``,
    `شكراً ❤️`,
  ]
    .filter((line) => line !== null)
    .join('\n')

  const encoded = encodeURIComponent(message)
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encoded}`
}

/** Returns true when the form is complete enough to submit */
export function isFormValid(form: CheckoutForm): boolean {
  const phoneRegex = /^01[0-9]{9}$/
  return (
    form.name.trim().length >= 2 &&
    phoneRegex.test(form.phone.trim()) &&
    form.address.trim().length >= 5 &&
    form.area.trim().length > 0 &&
    (form.paymentMethod !== 'vodafone_cash' || form.vodafoneRef.trim().length > 0)
  )
}
