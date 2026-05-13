import { useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Plus, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useSearchStore } from '@/stores/useSearchStore'
import { useCartStore } from '@/stores/useCartStore'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useT } from '@/hooks/useT'
import { PRODUCTS } from '@/data/constants'
import { formatPrice } from '@/lib/utils'
import { StarRating } from '@/components/ui/StarRating'
import type { Product } from '@/types'

const POPULAR_IDS = ['p1', 'p4', 'p5', 'p2']

export function SearchPanel() {
  const { isOpen, query, close, setQuery } = useSearchStore()
  const addItem = useCartStore((s) => s.addItem)
  const { t, isRTL } = useT()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useScrollLock(isOpen)

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, close])

  const results = useMemo<Product[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }, [query])

  const popularProducts = PRODUCTS.filter((p) => POPULAR_IDS.includes(p.id))

  function handleAdd(e: React.MouseEvent, product: Product) {
    e.stopPropagation()
    addItem(product, 1)
    toast.success(`${t('addedToCart')} "${product.name}" ${t('addedToCartSuffix')}`)
  }

  function handleGoProduct(product: Product) {
    close()
    navigate('/products')
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-product', { detail: product.id }))
    }, 120)
  }

  function handleBrowseAll() { close(); navigate('/products') }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-4 sm:pt-16 px-3"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={t('searchHeading')}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-up"
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className={`flex items-center gap-3 px-4 py-4 border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Search size={18} className="text-brand shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchHint')}
            className={`flex-1 text-base bg-transparent outline-none text-gray-900 placeholder-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
            aria-label={t('searchLabel')}
            autoComplete="off"
          />
          {query && (
            <button onClick={() => setQuery('')} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition shrink-0" aria-label="Clear">
              <X size={14} className="text-gray-500" />
            </button>
          )}
          <button onClick={close} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition shrink-0 text-gray-400 hover:text-gray-700" aria-label={t('searchClose')}>
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>

          {/* With results */}
          {query && results.length > 0 && (
            <div>
              <p className={`px-4 pt-3 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('searchResultsFor')} &ldquo;{query}&rdquo; — {results.length} {isRTL ? 'نتيجة' : 'results'}
              </p>
              <ul>
                {results.map((product) => (
                  <SearchResultRow key={product.id} product={product} onOpen={handleGoProduct} onAdd={handleAdd} addLabel={t('searchAddToCart')} isRTL={isRTL} />
                ))}
              </ul>
            </div>
          )}

          {/* No results */}
          {query && results.length === 0 && (
            <div className="py-14 text-center px-6">
              <div className="text-5xl mb-3">😕</div>
              <p className="font-black text-gray-700 text-lg mb-1">{t('searchNoResults')} &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-gray-400 mb-6">{t('searchTryAgain')}</p>
              <button onClick={handleBrowseAll} className="h-10 px-6 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition text-sm">
                {t('searchBrowseAll')}
              </button>
            </div>
          )}

          {/* Empty query: suggestions */}
          {!query && (
            <div>
              <p className={`px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('searchPopular')}
              </p>
              <ul>
                {popularProducts.map((product) => (
                  <SearchResultRow key={product.id} product={product} onOpen={handleGoProduct} onAdd={handleAdd} addLabel={t('searchAddToCart')} isRTL={isRTL} />
                ))}
              </ul>
              <div className="px-4 py-4 border-t border-gray-50">
                <button onClick={handleBrowseAll} className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border-2 border-gray-100 hover:border-brand text-gray-600 hover:text-brand font-bold text-sm transition">
                  {t('searchBrowseAll')} <ArrowLeft size={14} className={isRTL ? '' : 'rotate-180'} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface RowProps {
  product: Product
  onOpen: (p: Product) => void
  onAdd: (e: React.MouseEvent, p: Product) => void
  addLabel: string
  isRTL: boolean
}

function SearchResultRow({ product, onOpen, onAdd, addLabel, isRTL }: RowProps) {
  const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price
  return (
    <li>
      <button
        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition group ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
        onClick={() => onOpen(product)}
      >
        <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-gray-900 truncate">{product.name}</p>
          <p className="text-xs text-gray-400 truncate">{product.nameEn}</p>
          <div className={`flex items-center gap-2 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="font-black text-brand text-sm">{formatPrice(product.price)}</span>
            {hasDiscount && <span className="text-[11px] text-gray-400 line-through">{formatPrice(product.originalPrice!)}</span>}
            <div className="flex-1" />
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
        </div>
        <button
          onClick={(e) => onAdd(e, product)}
          className="shrink-0 w-9 h-9 bg-brand hover:bg-brand-dark text-white rounded-full flex items-center justify-center shadow-md shadow-brand/20 transition opacity-0 group-hover:opacity-100"
          aria-label={`${addLabel} ${product.name}`}
        >
          <Plus size={14} />
        </button>
      </button>
    </li>
  )
}
