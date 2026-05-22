export type Product = {
  id: string;
  name: string;
  brand: string;
  nutriScore: string;
  nutriColor: string;
  ecoScore: string;
  ecoColor: string;
  imageUrl: string; 
};

const DEFAULT_PRODUCT_IMAGE = 'https://placehold.co/150x200/png';

export const productosPorCategoria: Record<string, Product[]> = {
  beverages: [
    { id: '1', name: 'Organic Cold Pressed\nKale & Ginger', brand: 'GREEN GARDEN CO.', nutriScore: 'A', nutriColor: '#16A34A', ecoScore: 'A+', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '2', name: 'Artisan Sparkling\nBotanical Mist', brand: 'MIST & FLORA', nutriScore: 'C', nutriColor: '#EAB308', ecoScore: 'B', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '3', name: 'Wild Berry Raw\nKombucha', brand: 'THE FERMENTARY', nutriScore: 'B', nutriColor: '#22C55E', ecoScore: 'A', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '4', name: 'Pure Philippine\nCoconut Water', brand: 'ISLA VIDA', nutriScore: 'A', nutriColor: '#16A34A', ecoScore: 'B+', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: '5', name: 'High-Mineral Volcanic\nSeltzer', brand: 'SUMMIT SPRINGS', nutriScore: 'A', nutriColor: '#16A34A', ecoScore: 'A', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
  ],
  default: [
    { id: 'd1', name: 'Product Example 1', brand: 'GENERIC BRAND', nutriScore: 'A', nutriColor: '#16A34A', ecoScore: 'A', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
    { id: 'd2', name: 'Product Example 2', brand: 'GENERIC BRAND', nutriScore: 'B', nutriColor: '#22C55E', ecoScore: 'B', ecoColor: '#bbf7d0', imageUrl: DEFAULT_PRODUCT_IMAGE },
  ]
};