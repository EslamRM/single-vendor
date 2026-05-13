import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { PRODUCTS } from '@/data/constants'
import { ProductGrid } from '@/components/features/products/ProductGrid'
import { Input } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')
  const { t, isRTL } = useT()

  const categories = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.category))), [])

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = filter === 'ALL' || p.category === filter
      const q = search.trim().toLowerCase()
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [search, filter])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl lg:text-4xl font-black mb-1">{t('productsTitle')}</h1>
        <p className="text-gray-500">{t('productsDesc')}</p>
      </div>

      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className="relative flex-1 max-w-md">
          <Search size={14} className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400`} aria-hidden="true" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={isRTL ? 'pr-4 pl-10 text-right' : 'pl-4 pr-10 text-left'}
            aria-label={t('searchLabel')}
          />
        </div>
        <button onClick={() => toast.info(t('filterAdvanced'))} className="h-11 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition">
          <SlidersHorizontal size={14} />
          {t('filterLabel')}
        </button>
      </div>

      <div className={`flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`} role="tablist" aria-label={isRTL ? 'تصفية حسب التصنيف' : 'Filter by category'}>
        <button role="tab" aria-selected={filter === 'ALL'} onClick={() => setFilter('ALL')}
          className={`shrink-0 h-9 px-5 rounded-full text-sm font-bold transition ${filter === 'ALL' ? 'bg-brand text-white shadow-md shadow-brand/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          {t('filterAll')}
        </button>
        {categories.map((cat) => (
          <button key={cat} role="tab" aria-selected={filter === cat} onClick={() => setFilter(cat)}
            className={`shrink-0 h-9 px-5 rounded-full text-sm font-bold transition ${filter === cat ? 'bg-brand text-white shadow-md shadow-brand/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      <p className={`text-sm text-gray-400 mb-5 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
        {filtered.length} {t('resultsCount')}
      </p>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="font-black text-gray-700 mb-1 text-lg">{t('noResults')}</p>
          <p className="text-sm text-gray-400">{t('noResultsHint')}</p>
        </div>
      )}
    </section>
  )
}