declare module 'sonner' {
  import * as React from 'react'

  interface ToasterProps {
    position?: string
    richColors?: boolean
    toastOptions?: { style?: React.CSSProperties }
  }
  export const Toaster: React.FC<ToasterProps>

  interface ToastFn {
    (message: string, options?: { icon?: string }): void
    success(message: string, options?: object): void
    error(message: string, options?: object): void
    info(message: string, options?: object): void
    warning(message: string, options?: object): void
  }
  export const toast: ToastFn
}
