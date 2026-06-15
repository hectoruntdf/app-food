import { Product } from '@/src/types/product';

const DEFAULT_PRODUCT_IMAGE = 'https://placehold.co/150x200/png';

export const productosPorCategoria: Record<string, Product[]> = {
  beverages: [
    { id: '1', name: 'Organic Cold Pressed\nKale & Ginger', brand: 'GREEN GARDEN CO.', nutriScore: 'A', ecoScore: 'A+', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '2', name: 'Artisan Sparkling\nBotanical Mist', brand: 'MIST & FLORA', nutriScore: 'C', ecoScore: 'B', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '3', name: 'Wild Berry Raw\nKombucha', brand: 'THE FERMENTARY', nutriScore: 'B', ecoScore: 'A', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '4', name: 'Pure Philippine\nCoconut Water', brand: 'ISLA VIDA', nutriScore: 'A', ecoScore: 'B+', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '5', name: 'High-Mineral Volcanic\nSeltzer', brand: 'SUMMIT SPRINGS', nutriScore: 'A', ecoScore: 'A', imageUrl: DEFAULT_PRODUCT_IMAGE },
  ],
  default: [
    { id: 'd1', name: 'Product Example 1', brand: 'GENERIC BRAND', nutriScore: 'A', ecoScore: 'A', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: 'd2', name: 'Product Example 2', brand: 'GENERIC BRAND', nutriScore: 'B', ecoScore: 'B', imageUrl: DEFAULT_PRODUCT_IMAGE },
  ]
};  