declare module 'react-router-dom' {
  import * as React from 'react'

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { to: string }
  export interface NavLinkProps extends LinkProps {
    end?: boolean
    className?: string | ((props: { isActive: boolean; isPending: boolean }) => string)
  }
  export interface OutletProps { context?: unknown }
  export interface RouterProviderProps { router: ReturnType<typeof createBrowserRouter> }

  export const Link: React.FC<LinkProps>
  export const NavLink: React.FC<NavLinkProps>
  export const Outlet: React.FC<OutletProps>
  export const RouterProvider: React.FC<RouterProviderProps>

  export function createBrowserRouter(routes: RouteObject[]): unknown
  export function useNavigate(): (to: string) => void
  export function useLocation(): { pathname: string; search: string; hash: string }

  export interface RouteObject {
    path?: string
    index?: boolean
    element?: React.ReactNode
    children?: RouteObject[]
  }
}
