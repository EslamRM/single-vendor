import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const OffersPage = lazy(() => import('@/pages/OffersPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading" />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: 'products', element: <Suspense fallback={<PageLoader />}><ProductsPage /></Suspense> },
      { path: 'categories', element: <Suspense fallback={<PageLoader />}><CategoriesPage /></Suspense> },
      { path: 'offers', element: <Suspense fallback={<PageLoader />}><OffersPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
