import type { Product, Category, Offer, HeroSlide, NavLink } from '@/types'

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'أكلني',
  nameEn: 'Akolni',
  tagline: 'اطلب. استمتع. اتبسط.',
  taglineEn: 'Order. Enjoy. Repeat.',
  phone: '19XXX',
  // WhatsApp number in international format WITHOUT + (required by wa.me)
  // Change this to your real number e.g. '201012345678'
  whatsappNumber: '201012345678',
  vodafoneCashNumber: '01012345678',
  deliveryMin: 25,          // EGP
  freeDeliveryAt: 300,      // EGP
  estimatedTime: '25–40 دقيقة',
  cities: 'مدينة نصر، التجمع، المعادي، مصر الجديدة، الزمالك',
  instagram: '@akolni.eg',
  facebook: 'Akolni.Egypt',
}

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'دبل تشيز برجر',
    nameEn: 'Double Cheeseburger',
    category: 'برجر',
    price: 189,
    originalPrice: 229,
    badge: 'الأكثر مبيعًا',
    rating: '4.9',
    reviews: '2,841',
    orders: '+18,500 طلب',
    isBestseller: true,
    description:
      'باتيان لحمة بقري طازجة 180 جرام، جبنة شيدر مزدوجة، خس، طماطم، بصل مكرمل، مخلل، وصوص البيت السري على خبز بريوش محمص. اللي هو نفسك فيه!',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p2',
    name: 'بيتزا رانش تشيكن',
    nameEn: 'Ranch Chicken Pizza',
    category: 'بيتزا',
    price: 219,
    originalPrice: 269,
    badge: 'عرض اليوم',
    rating: '4.8',
    reviews: '1,654',
    orders: '+9,200 طلب',
    isBestseller: false,
    description:
      'عجينة إيطالية مقرمشة، صوص رانش كريمي، فراخ مشوية متبلة، فلفل ملون، بصل، وجبنة موزاريلا بتمتد. بيتزا بتاخدك في رحلة!',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p3',
    name: 'باستا وايت صوص بالفراخ',
    nameEn: 'Chicken White Sauce Pasta',
    category: 'باستا',
    price: 149,
    originalPrice: null,
    badge: 'جديد',
    rating: '4.7',
    reviews: '893',
    orders: '+3,100 طلب',
    isNew: true,
    description:
      'فيتوتشيني مسلوق على الدرجة، صوص بيشاميل كريمي، قطع فراخ مشوية، مشروم، وجبنة بارميزان مبشورة. طبق الراحة اللي بتدور عليه!',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p4',
    name: 'بروستد حار كريسبي',
    nameEn: 'Crispy Hot Broasted',
    category: 'فراخ',
    price: 165,
    originalPrice: null,
    badge: 'لفترة محدودة',
    rating: '4.9',
    reviews: '3,210',
    orders: '+22,000 طلب',
    isBestseller: true,
    description:
      'قطعتين فراخ بروستد حار مقرمشين بتبيلة البيت السرية، مع صوص الشطة الحارة والمايونيز، وجانب من البطاطس الجامبو. البروستد اللي بيجنن!',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585325701956-60dd9c8399b6?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p5',
    name: 'كومبو العيلة',
    nameEn: 'Family Combo',
    category: 'كومبو',
    price: 449,
    originalPrice: 599,
    badge: 'وفر 25%',
    rating: '4.8',
    reviews: '1,102',
    orders: '+7,800 طلب',
    isBestseller: false,
    description:
      'بيتزا لارج + 4 قطع بروستد + بطاطس جامبو كبير + 4 عصاير. الوجبة المثالية للعيلة بسعر يناسب الجيب!',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p6',
    name: 'برجر مشروم وبيكون',
    nameEn: 'Mushroom & Bacon Burger',
    category: 'برجر',
    price: 209,
    originalPrice: null,
    badge: null,
    rating: '4.7',
    reviews: '1,430',
    orders: '+6,400 طلب',
    description:
      'باتي لحمة بقري ممتاز، مشروم مقلي بالزبدة، بيكون مقرمش، جبنة سويسرية، وصوص الثوم الأسمر. تجربة مختلفة!',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p7',
    name: 'سلطة سيزر بالفراخ',
    nameEn: 'Chicken Caesar Salad',
    category: 'سلطات',
    price: 129,
    originalPrice: null,
    badge: 'اختيار صحي',
    rating: '4.6',
    reviews: '714',
    orders: '+2,900 طلب',
    description:
      'خس روماني طازج، فراخ مشوية متبلة، كروتون مقرمش، جبنة بارميزان، وصوص سيزر الأصلي. خفيف وشبعان في نفس الوقت!',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&h=600&fit=crop',
    ],
  },
  {
    id: 'p8',
    name: 'بطاطس جامبو + صوصين',
    nameEn: 'Jumbo Fries + 2 Dips',
    category: 'جانبيات',
    price: 69,
    originalPrice: null,
    badge: null,
    rating: '4.5',
    reviews: '4,102',
    orders: '+35,000 طلب',
    isBestseller: false,
    description:
      'بطاطس مقلية ذهبية مقرمشة متبلة بتبيلة البيت، مع اختيار صوصين من: كاتشب، مايونيز، شطة حارة، ثوم، أو باربيكيو.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=600&fit=crop',
    thumbs: [
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&h=600&fit=crop',
    ],
  },
]

// ─── Categories ───────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    name: 'برجر',
    nameEn: 'Burgers',
    icon: 'burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    desc: 'باتي طازج، نكهات جامدة',
  },
  {
    name: 'بيتزا',
    nameEn: 'Pizza',
    icon: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    desc: 'عجينة مقرمشة وجبنة بتمتد',
  },
  {
    name: 'فراخ',
    nameEn: 'Chicken',
    icon: 'chicken',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop',
    desc: 'بروستد وشيش ومشوي',
  },
  {
    name: 'باستا',
    nameEn: 'Pasta',
    icon: 'pasta',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&h=400&fit=crop',
    desc: 'طواجن ومكرونة بالصوص',
  },
  {
    name: 'كومبو',
    nameEn: 'Combos',
    icon: 'combo',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
    desc: 'وجبات عائلية بأقل سعر',
  },
  {
    name: 'سلطات',
    nameEn: 'Salads',
    icon: 'salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    desc: 'طازج وصحي وشبعان',
  },
]

// ─── Offers ───────────────────────────────────────────────────────────────────
export const OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'خصم 50% على أول أوردر',
    desc: 'سجّل دلوقتي واحصل على خصم 50% على أول طلب. الكود شغّال لأول 500 عميل بس!',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    discount: 50,
    code: 'AKOLNI50',
    color: 'bg-brand',
    valid: '31 ديسمبر 2025',
    minOrder: 150,
  },
  {
    id: 'o2',
    title: 'اطلب 2 بيتزا والثالثة مجانًا',
    desc: 'اطلب أي بيتزتين بسعرهم وهنزودك بيتزا تالتة مجانًا. العرض محدود!',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    discount: 33,
    code: 'PIZZA3X',
    color: 'bg-red-500',
    valid: '15 يناير 2026',
    minOrder: 300,
  },
  {
    id: 'o3',
    title: 'توصيل مجاني فوق 300 جنيه',
    desc: 'أي أوردر فوق 300 جنيه بيوصلك ببلاش — في مدينة نصر والتجمع والمعادي.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop',
    discount: 100,
    code: 'FREEDEL',
    color: 'bg-emerald-600',
    valid: 'سارٍ دائمًا',
    minOrder: 300,
  },
  {
    id: 'o4',
    title: 'كومبو العيلة بـ 449 جنيه',
    desc: 'بيتزا + 4 بروستد + بطاطس جامبو + 4 عصاير — وفر أكتر من 150 جنيه!',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
    discount: 25,
    code: 'FAMILY25',
    color: 'bg-violet-600',
    valid: '28 فبراير 2026',
    minOrder: 0,
  },
]

// ─── Hero Slides ──────────────────────────────────────────────────────────────
export const HERO_SLIDES: HeroSlide[] = [
  {
    title1: 'أكل جامد',
    title2: 'بيوصلك على بابك',
    subtitle: 'من مطبخنا لبيتك — طازج، سريع، ولذيذ. التوصيل خلال 30 دقيقة أو أقل.',
    badge: 'عرض اليوم',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=700&fit=crop',
    cta: 'اطلب دلوقتي',
  },
  {
    title1: 'نكهات بتجنن',
    title2: 'وجودة مضمونة',
    subtitle: 'كل أكلة بتتعمل بأحسن الخامات وأيدي شيفات محترفين. جودة ما تهاونش.',
    badge: 'اختيار الشيف',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=700&fit=crop',
    cta: 'شوف المنيو',
  },
  {
    title1: 'كومبو العيلة',
    title2: 'بسعر ما تتخيلوش',
    subtitle: 'وجبات عائلية كاملة تبدأ من 449 جنيه. فرحّ عيلتك من غير ما تكسر جيبك!',
    badge: 'عرض العيلة',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&h=700&fit=crop',
    cta: 'شوف الكومبوز',
  },
]

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'الرئيسية' },
  { path: '/products', label: 'المنيو' },
  { path: '/categories', label: 'التصنيفات' },
  { path: '/offers', label: 'العروض' },
  { path: '/contact', label: 'تواصل معنا' },
]

// ─── Misc content ─────────────────────────────────────────────────────────────
export const NUTRITION_INFO = [
  { label: 'سعرات', value: '520 ك' },
  { label: 'بروتين', value: '28 ج' },
  { label: 'كارب', value: '44 ج' },
  { label: 'دهون', value: '22 ج' },
]

export const PRODUCT_HIGHLIGHTS = [
  'خامات طازجة يومية من موردين معتمدين',
  'محضّر بأيدي شيفات محترفين',
  'جاهز للتوصيل في أقل من 40 دقيقة',
  'مضمون الجودة — راجعنا لو مش راضي',
]

export const CONTACT_INFO = [
  { icon: 'MapPin', title: 'العنوان', detail: 'مدينة نصر، القاهرة — أمام سيتي ستارز' },
  { icon: 'Phone', title: 'اتصل بنا', detail: '01X-XXXX-XXXX' },
  { icon: 'Mail', title: 'البريد الإلكتروني', detail: 'hello@akolni.eg' },
  { icon: 'Clock', title: 'مواعيد العمل', detail: 'يومياً: 11 ص – 2 ص' },
]

export const WORKING_HOURS = [
  { day: 'السبت – الخميس', time: '11:00 ص – 2:00 ص' },
  { day: 'الجمعة', time: '1:00 م – 2:00 ص' },
  { day: 'التوصيل', time: 'طوال ساعات العمل' },
]

export const FOOTER_LINKS = [
  'عن أكلني',
  'سياسة الخصوصية',
  'الشروط والأحكام',
  'الأسئلة الشائعة',
  'انضم لفريقنا',
]

export const SOCIAL_ICONS = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'whatsapp', label: 'WhatsApp' },
]

export const STATS = [
  { value: '+50,000', label: 'طلب تم توصيله' },
  { value: '4.9 ⭐', label: 'متوسط التقييم' },
  { value: '+120', label: 'صنف في المنيو' },
  { value: '30 دقيقة', label: 'متوسط وقت التوصيل' },
]

export const DELIVERY_ZONES = [
  'مدينة نصر',
  'التجمع الأول والخامس',
  'المعادي',
  'مصر الجديدة',
  'الزمالك',
  'المهندسين',
]
