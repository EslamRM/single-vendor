import { CATEGORIES, PRODUCTS } from '@/data/constants'
import { CategoryCard } from '@/components/features/categories/CategoryCard'
import { ProductGrid } from '@/components/features/products/ProductGrid'
import { useT } from '@/hooks/useT'

export default function CategoriesPage() {
  const { t, isRTL } = useT()
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-3xl lg:text-4xl font-black mb-1">{t('categoriesPageTitle')}</h1>
        <p className="text-gray-500">{t('categoriesPageDesc')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {CATEGORIES.map((c) => <CategoryCard key={c.name} category={c} variant="full" />)}
      </div>
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h2 className="text-2xl font-black mb-6">{t('allProducts')}</h2>
        <ProductGrid products={PRODUCTS} />
      </div>
    </section>
  )
}