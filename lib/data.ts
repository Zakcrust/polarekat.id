// ──── Types ────

export interface BlogPost {
  id: string
  title: string
  slug: string
  body: string
  category: string
  tags: string[]
  coverImage: string
  metaTitle: string
  metaDescription: string
  status: 'draft' | 'published'
  createdAt: string
  publishedAt: string
  excerpt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  features: string[]
  icon: string
  image: string
}

export interface PortfolioItem {
  id: string
  title: string
  location: string
  year: string
  category: string
  image: string
}

// ──── Client Names ────

export const clients: string[] = [
  'PT Telkom Indonesia',
  'Bank BCA',
  'Tokopedia',
  'Grab Indonesia',
  'Indomaret',
  'Alfamart',
  'Kopi Kenangan',
  'Janji Jiwa',
  'GoTo Group',
  'Astra International',
  'Pertamina',
  'Garuda Indonesia',
]

// ──── Products ────

export const products: Product[] = [
  {
    id: '1',
    name: 'Cutting Sticker',
    slug: 'cutting-sticker',
    tagline: 'PREMIUM QUALITY',
    description: 'Sticker presisi tinggi dengan mesin cutting profesional. Cocok untuk branding kendaraan, etalase toko, dan dekorasi interior bisnis Anda.',
    features: [
      'Presisi cutting hingga 0.1mm',
      'Tahan cuaca hingga 5+ tahun',
      'Material vinyl premium Oracal',
      'Tersedia 50+ pilihan warna',
    ],
    icon: '✂️',
    image: '/images/cutting-sticker.webp',
  },
  {
    id: '2',
    name: 'Print & Cut Sticker',
    slug: 'print-cut-sticker',
    tagline: 'FULL COLOR',
    description: 'Cetak sticker full color dengan desain kustom. Resolusi tinggi 1440dpi untuk hasil yang tajam dan warna yang hidup.',
    features: [
      'Cetak full color CMYK',
      'Resolusi 1440dpi',
      'Laminasi glossy / matte',
      'Custom shape & ukuran',
    ],
    icon: '🖨️',
    image: '/images/print-cut.webp',
  },
  {
    id: '3',
    name: 'Sarblast & Sandblast Cutting',
    slug: 'sarblast-sandblast',
    tagline: 'FROSTED GLASS',
    description: 'Efek kaca buram (frosted glass) untuk pintu, partisi, dan jendela. Memberikan privasi sekaligus estetika modern pada ruangan.',
    features: [
      'Efek frosted glass premium',
      'Cocok untuk pintu & partisi',
      'Custom pattern & desain',
      'Mudah dibersihkan',
    ],
    icon: '🪟',
    image: '/images/sandblast.webp',
  },
  {
    id: '4',
    name: 'Sticker Vinyl',
    slug: 'sticker-vinyl',
    tagline: 'VERSATILE',
    description: 'Vinyl sticker serbaguna untuk berbagai kebutuhan dekorasi dan branding. Dari wall sticker hingga vehicle wrap.',
    features: [
      'Indoor & outdoor use',
      'Removable tanpa residu',
      'UV resistant',
      'Berbagai tekstur tersedia',
    ],
    icon: '🎨',
    image: '/images/vinyl.webp',
  },
]

// ──── Portfolio Items ────

export const portfolioItems: PortfolioItem[] = [
  { id: '1', title: 'Branding Kendaraan Fleet', location: 'Bandung', year: '2024', category: 'Cutting Sticker', image: '/images/vehicle-branding.webp' },
  { id: '2', title: 'Dekorasi Cafe Interior', location: 'Jakarta', year: '2024', category: 'Print & Cut', image: '/images/vinyl.webp' },
  { id: '3', title: 'Frosted Glass Office Partisi', location: 'Bandung', year: '2024', category: 'Sandblast', image: '/images/sandblast.webp' },
  { id: '4', title: 'Wall Mural Restaurant', location: 'Surabaya', year: '2023', category: 'Vinyl', image: '/images/vinyl.webp' },
  { id: '5', title: 'Signage Toko Retail', location: 'Bandung', year: '2023', category: 'Cutting Sticker', image: '/images/storefront.webp' },
  { id: '6', title: 'Vehicle Wrap Full Body', location: 'Jakarta', year: '2023', category: 'Print & Cut', image: '/images/vehicle-branding.webp' },
  { id: '7', title: 'Etalase Kaca Butik', location: 'Bandung', year: '2023', category: 'Sandblast', image: '/images/sandblast.webp' },
  { id: '8', title: 'Label Produk Custom', location: 'Semarang', year: '2024', category: 'Print & Cut', image: '/images/print-cut.webp' },
  { id: '9', title: 'Dekorasi Event Stage', location: 'Bandung', year: '2024', category: 'Vinyl', image: '/images/cutting-sticker.webp' },
]

// ──── Blog Posts ────

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Tips Memilih Material Sticker yang Tahan Lama',
    slug: '5-tips-material-sticker',
    body: '',
    category: 'Tips & Trik',
    tags: ['material', 'vinyl', 'tips'],
    coverImage: '',
    metaTitle: '5 Tips Memilih Material Sticker yang Tahan Lama',
    metaDescription: 'Panduan lengkap memilih material sticker untuk outdoor dan indoor.',
    status: 'published',
    createdAt: '2024-12-15',
    publishedAt: '2024-12-15',
    excerpt: 'Panduan lengkap memilih material sticker yang tepat untuk kebutuhan outdoor maupun indoor bisnis Anda.',
  },
  {
    id: '2',
    title: 'Tutorial: Cara Pasang Cutting Sticker di Kendaraan',
    slug: 'tutorial-pasang-cutting-sticker',
    body: '',
    category: 'Tutorial',
    tags: ['tutorial', 'cutting sticker', 'kendaraan'],
    coverImage: '',
    metaTitle: 'Tutorial Pasang Cutting Sticker di Kendaraan',
    metaDescription: 'Langkah demi langkah memasang cutting sticker di mobil atau motor.',
    status: 'published',
    createdAt: '2024-12-10',
    publishedAt: '2024-12-10',
    excerpt: 'Langkah demi langkah memasang cutting sticker di mobil atau motor dengan hasil profesional.',
  },
  {
    id: '3',
    title: 'Inspirasi Desain Etalase Toko Modern 2024',
    slug: 'inspirasi-desain-etalase',
    body: '',
    category: 'Inspirasi',
    tags: ['desain', 'etalase', 'inspirasi'],
    coverImage: '',
    metaTitle: 'Inspirasi Desain Etalase Toko Modern',
    metaDescription: 'Kumpulan inspirasi desain etalase toko yang menarik dan modern.',
    status: 'published',
    createdAt: '2024-12-05',
    publishedAt: '2024-12-05',
    excerpt: 'Kumpulan inspirasi desain etalase toko yang eye-catching untuk menarik lebih banyak pelanggan.',
  },
  {
    id: '4',
    title: 'DIY: Membuat Sticker Label Produk Sendiri',
    slug: 'diy-sticker-label-produk',
    body: '',
    category: 'DIY',
    tags: ['diy', 'label', 'produk'],
    coverImage: '',
    metaTitle: 'DIY Membuat Sticker Label Produk',
    metaDescription: 'Cara membuat sticker label produk sendiri untuk bisnis kecil.',
    status: 'published',
    createdAt: '2024-11-28',
    publishedAt: '2024-11-28',
    excerpt: 'Cara membuat sticker label produk yang profesional untuk bisnis kecil dan UMKM Anda.',
  },
  {
    id: '5',
    title: 'Mengapa Bisnis Anda Butuh Vehicle Branding',
    slug: 'bisnis-vehicle-branding',
    body: '',
    category: 'Bisnis',
    tags: ['bisnis', 'branding', 'vehicle wrap'],
    coverImage: '',
    metaTitle: 'Mengapa Bisnis Butuh Vehicle Branding',
    metaDescription: 'Alasan mengapa vehicle branding penting untuk strategi marketing.',
    status: 'published',
    createdAt: '2024-11-20',
    publishedAt: '2024-11-20',
    excerpt: 'Alasan mengapa vehicle branding adalah investasi marketing paling efektif untuk bisnis Anda.',
  },
  {
    id: '6',
    title: 'Perbedaan Sandblast vs Sticker Frosted Glass',
    slug: 'sandblast-vs-frosted-glass',
    body: '',
    category: 'Tips & Trik',
    tags: ['sandblast', 'frosted glass', 'perbandingan'],
    coverImage: '',
    metaTitle: 'Sandblast vs Sticker Frosted Glass',
    metaDescription: 'Perbandingan lengkap antara sandblast asli dan sticker frosted glass.',
    status: 'draft',
    createdAt: '2024-11-15',
    publishedAt: '',
    excerpt: 'Perbandingan detail antara sandblast asli dan sticker frosted glass untuk kebutuhan kantor.',
  },
]

// ──── Blog Categories ────

export const blogCategories = [
  { name: 'Tutorial', count: 1 },
  { name: 'Tips & Trik', count: 2 },
  { name: 'DIY', count: 1 },
  { name: 'Inspirasi', count: 1 },
  { name: 'Bisnis', count: 1 },
]

// ──── Portfolio Categories ────

export const portfolioCategories = [
  'Semua',
  'Cutting Sticker',
  'Print & Cut',
  'Sandblast',
  'Vinyl',
]
