import { Toaster } from 'sonner'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: 500,
          },
        }}
        richColors
      />
    </>
  )
}
