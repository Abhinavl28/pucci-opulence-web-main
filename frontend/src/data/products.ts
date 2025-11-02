export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'TOPS' | 'TROUSERS';
  sizes: string;
  description: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'White PUCCI Tee',
    price: 799.99,
    category: 'TOPS',
    sizes: 'Oversized S,M,L,XL',
    description: 'A premium oversized tee featuring the iconic PUCCI branding. Crafted from the finest cotton for ultimate comfort and style.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ]
  },
  {
    id: 2,
    name: 'Black Gradient Graffiti',
    price: 1299.99,
    category: 'TOPS',
    sizes: 'Oversized S,M,L,XL',
    description: 'An exclusive oversized piece featuring bold gradient graffiti design. A statement piece for the fashion-forward.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80',
    ]
  },
  {
    id: 3,
    name: 'Flared Black Comforts',
    price: 1499.99,
    category: 'TROUSERS',
    sizes: '28,30,32,34',
    description: 'Luxurious flared trousers in deep black. Tailored to perfection with a comfortable fit that exudes elegance.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    ]
  },
  {
    id: 4,
    name: 'Pleated Ivory',
    price: 1599.99,
    category: 'TROUSERS',
    sizes: '28,30,32,34',
    description: 'Sophisticated pleated trousers in pristine ivory. A timeless piece that combines classic elegance with modern sophistication.',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80',
    ]
  },
];
