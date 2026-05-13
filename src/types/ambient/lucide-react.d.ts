declare module 'lucide-react' {
  import * as React from 'react'
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string
    strokeWidth?: number | string
    absoluteStrokeWidth?: boolean
  }
  type Icon = React.FC<IconProps>
  export const ShoppingBag: Icon; export const Search: Icon; export const User: Icon
  export const Menu: Icon; export const X: Icon; export const Heart: Icon
  export const Plus: Icon; export const Minus: Icon; export const ShoppingCart: Icon
  export const Star: Icon; export const Clock: Icon; export const Truck: Icon
  export const ChevronLeft: Icon; export const ChevronRight: Icon
  export const Trash2: Icon; export const SlidersHorizontal: Icon
  export const MapPin: Icon; export const Phone: Icon; export const Mail: Icon
  export const Facebook: Icon; export const Twitter: Icon; export const Instagram: Icon
  export const Linkedin: Icon; export const Apple: Icon; export const ArrowLeft: Icon
  export const MessageCircle: Icon; export const Check: Icon; export const CheckCircle: Icon
  export const AlertCircle: Icon; export const ChevronDown: Icon; export const Loader2: Icon
  export const Send: Icon; export const Wallet: Icon; export const CreditCard: Icon
  export const Edit3: Icon; export const Package: Icon; export const Smartphone: Icon; export const FileText: Icon;
}
