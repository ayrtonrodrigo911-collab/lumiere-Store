export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  meta?: string;
  description?: string;
  details?: string[];
  sizes?: string[];
  images?: string[];
  origin?: string;
  sustainability?: string;
  care?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  total: number;
  status: 'IN PROGRESS' | 'DELIVERED' | 'CANCELLED';
  product: Product;
}

export const PRODUCTS: Product[] = [
  {
    id: 'fluid-silk-slip-dress',
    name: 'Fluid Silk Slip Dress',
    price: 890,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/02.jpg',
    meta: '100% Mulberry Silk',
    description: 'A masterclass in minimalist draping. This bias-cut silhouette is crafted from 32mm heavy-weight mulberry silk, designed to trace the contours of the body with a liquid-like finish. Featuring delicate adjustable straps and a raw-edge hem.',
    origin: 'Milan, Italy',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      '/images/lumiere/raw/02.jpg',
      '/images/lumiere/raw/09.jpg',
      '/images/lumiere/raw/10.jpg'
    ],
    sustainability: 'Our silk is OEKO-TEX® certified, ensuring no harmful chemicals are used in the production process. We partner with family-owned mills in Lake Como.',
    care: 'Dry clean only. Store on a padded hanger to maintain the bias-cut structure. Do not steam at high temperatures.'
  },
  {
    id: 'anthology-linen-jumpsuit',
    name: 'Anthology Linen Jumpsuit',
    price: 950,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/01.jpg',
    meta: '100% Belgian Linen',
    description: 'An highlight of the Winter Anthology edition. This exquisite v-neck piece is artisan-crafted in premium, ecological Belgian flax linen. Features soft short sleeves, a gracefully relaxed waist with a self-tie belt, and an effortless wide-leg fluid drape designed for timeless movement.',
    origin: 'Athens, Greece',
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      '/images/lumiere/raw/01.jpg'
    ],
    sustainability: 'Grown without artificial irrigation or genetic modification. Spun and dyed in certified zero-footprint facilities.',
    care: 'Hand wash cool with gentle eco-friendly detergent. Dry flat in shade. Light steam to restore natural linen texture.'
  },
  {
    id: 'the-archival-trench',
    name: 'The Archival Trench',
    price: 1240,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/03.jpg',
    meta: '100% Virgin Wool',
    description: 'A structural, double-breasted trench coat designed to drape elegantly. Made from premium virgin wool woven in northern Italy, it presents a rich volumetric profile for the modern wanderer.',
    origin: 'Biella, Italy',
    sizes: ['XS', 'S', 'M', 'L'],
    sustainability: 'Crafted from ethically sourced wool certified by the Responsible Wool Standard (RWS). Code-traceable mill roots.',
    care: 'Professional dry clean only. Store in a garment protector bag away from direct sunlight.'
  },
  {
    id: 'structure-top',
    name: 'Structure Top',
    price: 480,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/04.jpg',
    meta: 'Sculpted Canvas',
    description: 'An architectural top featuring custom-woven stiff canvas that gently shapes a clean silhouette. Designed with rigid graphic lines and seamless hem structures.',
    origin: 'Florence, Italy',
    sizes: ['XS', 'S', 'M', 'L'],
    sustainability: 'Grown and woven using 100% organic long-staple cotton fibers, retaining pure texture strength.',
    care: 'Hand wash cold or dry clean. Do not tumble dry. Hot iron if needed.'
  },
  {
    id: 'silk-narrative',
    name: 'Silk Narrative',
    price: 390,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/05.jpg',
    meta: 'Mulberry Silk',
    description: 'A lightweight silk piece focused on fluid movement. Perfectly styled for layering, with beautiful raw sleeve endings and an organic fluid fall.',
    origin: 'Lake Como, Italy',
    sizes: ['XS', 'S', 'M', 'L'],
    sustainability: 'OEKO-TEX® certified silk processed with low impact natural dye extracts.',
    care: 'Dry clean recommended. Delicate hand wash with silk soap if necessary.'
  },
  {
    id: 'the-void-trousers',
    name: 'The Void Trousers',
    price: 550,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/06.jpg',
    meta: 'Relaxed Fit Cotton',
    description: 'Relaxed-fit trousers offering clean structured volumes. Cut from heavy-grade Egyptian cotton with deep front pleats and invisible seam-side pockets.',
    origin: 'Cairo, Egypt',
    sizes: ['XS', 'S', 'M', 'L'],
    sustainability: 'Locally spun fibers supporting local family farms with water-saving irrigation layouts.',
    care: 'Machine wash cool, inside out. Hang dry to maintain the deep pleated lines intact.'
  },
  {
    id: 'leather-obscura',
    name: 'Leather Obscura',
    price: 210,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/07.jpg',
    meta: 'Calfskin Accessories',
    description: 'Stark, highly durable leather sleeves for tech or journal containment. Cut from a single smooth slice of full-grain vegetable-tanned leather.',
    origin: 'Tuscany, Italy',
    sizes: ['One Size'],
    sustainability: 'Vegetable tanned using organic chestnut and oak tannins. Zero heavy metals utilized.',
    care: 'Buff occasionally with organic leather wax. Keep dry and avoid direct, prolonged heat.'
  },
  {
    id: 'linear-layering',
    name: 'Linear Layering Set',
    price: 890,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/08.jpg',
    meta: 'Seasonal Set',
    description: 'A complete monochromatic layered uniform consisting of a raw linen crop vest and matching wide-leg trousers.',
    origin: 'Athens, Greece',
    sizes: ['XS', 'S', 'M', 'L'],
    sustainability: 'Spun from European flax which requires zero artificial irrigation and leaves minimal carbon impact.',
    care: 'Gentle hand wash. Iron damp for a perfectly structured, crisp editorial linen drape.'
  },

  // Others
  {
    id: 'sculpted-silk-gown',
    name: 'Sculpted Silk Gown',
    price: 2450,
    category: 'Collection № 04',
    image: '/images/lumiere/raw/11.jpg',
    meta: "Autumn / Winter '24",
    description: 'Pure aesthetic fluid silhouette flowing elegantly to the ankles. Absolute premium silk feeling with a structural, refined neckline.'
  },
  {
    id: 'archive-clutch',
    name: 'Archive Clutch',
    price: 890,
    category: 'Accessories',
    image: '/images/lumiere/raw/12.jpg'
  },
  {
    id: 'structured-blazer',
    name: 'Structured Blazer',
    price: 1200,
    category: 'Apparel',
    image: '/images/lumiere/raw/13.jpg'
  },
  {
    id: 'lumiere-trench',
    name: 'Lumière Trench',
    price: 3100,
    category: 'Apparel',
    image: '/images/lumiere/raw/14.jpg',
    meta: 'Limited Edition'
  },

  // complete the look
  {
    id: 'strappy-heel',
    name: 'Strappy Heel',
    price: 420,
    category: 'Accessories',
    image: '/images/lumiere/raw/15.jpg'
  },
  {
    id: 'vault-clutch',
    name: 'Vault Clutch',
    price: 1250,
    category: 'Accessories',
    image: '/images/lumiere/raw/16.jpg'
  },
  {
    id: 'helix-earrings',
    name: 'Helix Earrings',
    price: 310,
    category: 'Accessories',
    image: '/images/lumiere/raw/17.jpg'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'LM-99214',
    placedDate: 'Oct 12, 2023',
    total: 1250,
    status: 'IN PROGRESS',
    product: {
      id: 'architectural-tote',
      name: 'The Architectural Tote',
      price: 1250,
      category: 'Accessories',
      image: '/images/lumiere/raw/18.jpg'
    }
  },
  {
    id: 'order-2',
    orderNumber: 'LM-88320',
    placedDate: 'Sep 05, 2023',
    total: 890,
    status: 'DELIVERED',
    product: {
      id: 'structural-wool-blazer',
      name: 'Structural Wool Blazer',
      price: 890,
      category: 'Apparel',
      image: '/images/lumiere/raw/19.jpg'
    }
  },
  {
    id: 'order-3',
    orderNumber: 'LM-77105',
    placedDate: 'Aug 22, 2023',
    total: 450,
    status: 'DELIVERED',
    product: {
      id: 'heavy-silk-slip',
      name: 'Heavy Silk Slip',
      price: 450,
      category: 'Apparel',
      image: '/images/lumiere/raw/20.jpg'
    }
  }
];

export const INITIAL_WISHLIST: Product[] = [
  {
    id: 'sculpted-silk-gown',
    name: 'Sculpted Silk Gown',
    price: 2450,
    category: 'Collection № 04',
    meta: "Autumn / Winter '24",
    image: '/images/lumiere/raw/11.jpg'
  },
  {
    id: 'archive-clutch',
    name: 'Archive Clutch',
    price: 890,
    category: 'Accessories',
    image: '/images/lumiere/raw/12.jpg'
  },
  {
    id: 'structured-blazer',
    name: 'Structured Blazer',
    price: 1200,
    category: 'Apparel',
    image: '/images/lumiere/raw/13.jpg'
  },
  {
    id: 'lumiere-trench',
    name: 'Lumière Trench',
    price: 3100,
    category: 'Apparel',
    meta: 'Limited Edition',
    image: '/images/lumiere/raw/14.jpg'
  }
];
