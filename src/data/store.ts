export type StoreCategory =
  | 'perfumes'
  | 'clothing'
  | 'shoes'
  | 'gadgets'
  | 'phones_accessories'
  | 'books_stationery'
  | 'beauty_care'
  | 'essentials'
  | 'thrift_preowned'
  | 'food_snacks'
  | 'other';

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: StoreCategory;
  condition: 'new' | 'pre-owned';
  pickupLocation: string;
  pickup_location?: string;
  storeName: string;
  store_name?: string;
  store_id?: string;
  vendorUniversityId: string;
  vendorUniversityName: string;
  university_name?: string;
  vendorPhone: string;
  vendorWhatsapp: string;
  contact_url?: string;
  isAvailable: boolean;
  createdAt: string;
  created_at?: string;
}

export const INITIAL_PRODUCTS: StoreProduct[] = [
  {
    id: 'prod-1',
    name: 'Khamrah & Amber Oud Eau De Parfum (30ml Decants)',
    description: 'Long-lasting evening and chapel fragrance decanted for private university students. 12+ hours projection on collegiate formal shirts.',
    price: 9500,
    currency: '₦',
    category: 'perfumes',
    condition: 'new',
    pickupLocation: 'Hebron Cafeteria Quadrangle / CST Building',
    storeName: 'Covenant Scent Studio',
    vendorUniversityId: 'covenant',
    vendorUniversityName: 'Covenant University',
    vendorPhone: '+2348012345678',
    vendorWhatsapp: 'https://wa.me/2348012345678',
    isAvailable: true,
    createdAt: '2026-10-15T09:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Baseus 65W GaN Laptop & Phone Fast Charger',
    description: 'Powers MacBook, Dell XPS, HP laptops and smartphones simultaneously during library study sessions. Compact and surge-protected.',
    price: 26000,
    currency: '₦',
    category: 'gadgets',
    condition: 'new',
    pickupLocation: 'Babcock Student Union Building / Platinum Hostel Gate',
    storeName: 'Ilishan Tech Vault',
    vendorUniversityId: 'babcock',
    vendorUniversityName: 'Babcock University',
    vendorPhone: '+2348023456789',
    vendorWhatsapp: 'https://wa.me/2348023456789',
    isAvailable: true,
    createdAt: '2026-10-14T15:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Nigerian Constitutional Law (Prof. B.O. Nwabueze, Hardcover)',
    description: 'Pristine study textbook with case law index, judicial review citations, and moot court notes. Essential for 200L/300L law undergraduates.',
    price: 12500,
    currency: '₦',
    category: 'books_stationery',
    condition: 'pre-owned',
    pickupLocation: 'ABUAD Law Faculty Complex, Ado-Ekiti',
    storeName: 'ABUAD Jurist Books',
    vendorUniversityId: 'abuad',
    vendorUniversityName: 'Afe Babalola University (ABUAD)',
    vendorPhone: '+2348034567890',
    vendorWhatsapp: 'https://wa.me/2348034567890',
    isAvailable: true,
    createdAt: '2026-10-13T12:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Waterproof Anti-Theft Student Laptop Backpack (15.6 Inch)',
    description: 'Features hidden back zipper, USB charging port, internal shockproof velvet lining, and padded ergonomic shoulder straps.',
    price: 18500,
    currency: '₦',
    category: 'essentials',
    condition: 'new',
    pickupLocation: 'Pan-Atlantic University Student Center, Ibeju-Lekki',
    storeName: 'PAU Campus Essentials',
    vendorUniversityId: 'pau',
    vendorUniversityName: 'Pan-Atlantic University',
    vendorPhone: '+2348045678901',
    vendorWhatsapp: 'https://wa.me/2348045678901',
    isAvailable: true,
    createdAt: '2026-10-15T18:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Oversized Heavyweight Fleece Hoodie (Charcoal Gray, M-XL)',
    description: 'Premium 420gsm brushed cotton fleece in flawless 9.5/10 condition. Dropped shoulders, reinforced stitching for library study wear.',
    price: 11000,
    currency: '₦',
    category: 'clothing',
    condition: 'pre-owned',
    pickupLocation: 'Baze University Main Campus Mall, Jabi Abuja',
    storeName: 'Abuja Student Thrift',
    vendorUniversityId: 'baze',
    vendorUniversityName: 'Baze University',
    vendorPhone: '+2348056789012',
    vendorWhatsapp: 'https://wa.me/2348056789012',
    isAvailable: true,
    createdAt: '2026-10-16T08:00:00Z'
  }
];
