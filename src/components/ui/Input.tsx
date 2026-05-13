import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white',
          'focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand',
          'placeholder:text-gray-400 transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
