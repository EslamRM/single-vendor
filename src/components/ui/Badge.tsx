import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'brand' | 'emerald' | 'amber'
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  brand: 'bg-brand text-white',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
}

export function Badge({ children, className, variant = 'brand' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
