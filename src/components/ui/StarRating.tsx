import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: string | number
  showValue?: boolean
  reviews?: string
  size?: 'sm' | 'md'
}

export function StarRating({ rating, showValue = false, reviews, size = 'sm' }: StarRatingProps) {
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating
  const filled = Math.round(numRating)
  const iconSize = size === 'sm' ? 10 : 14

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={i < filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
            aria-hidden="true"
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-500">
          {numRating}
          {reviews && ` (${reviews} reviews)`}
        </span>
      )}
      {!showValue && reviews && (
        <span className="text-[11px] text-gray-400">({reviews})</span>
      )}
    </div>
  )
}
