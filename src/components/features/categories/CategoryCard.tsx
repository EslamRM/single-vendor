import { useNavigate } from 'react-router-dom'
import type { Category } from '@/types'
import { useT } from '@/hooks/useT'

interface CategoryCardProps {
  category: Category
  variant?: 'compact' | 'full'
}

export function CategoryCard({ category, variant = 'compact' }: CategoryCardProps) {
  const navigate = useNavigate()
  const { isRTL } = useT()

  const displayName = isRTL ? category.name : category.nameEn
  const displayDesc = category.desc

  if (variant === 'full') {
    return (
      <article
        className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => navigate('/products')}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === 'Enter' && navigate('/products')}
        aria-label={`${isRTL ? 'تصفح' : 'Browse'} ${displayName}`}
      >
        <img src={category.image} alt={displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className={`absolute bottom-0 left-0 right-0 p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="text-white font-black text-xl mb-0.5">{displayName}</h3>
          <p className="text-white/70 text-xs font-medium">{isRTL ? category.nameEn : category.name} · {displayDesc}</p>
        </div>
      </article>
    )
  }

  return (
    <article
      className="flex flex-col items-center gap-2.5 cursor-pointer border-2 border-orange-100 hover:border-brand rounded-2xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white"
      onClick={() => navigate('/products')}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && navigate('/products')}
      aria-label={`${isRTL ? 'تصفح' : 'Browse'} ${displayName}`}
    >
      <img src={category.image} alt={displayName} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-brand-100" />
      <span className="font-black text-sm text-gray-800 text-center">{displayName}</span>
      <span className="text-[10px] text-gray-400">{isRTL ? category.nameEn : category.name}</span>
    </article>
  )
}
