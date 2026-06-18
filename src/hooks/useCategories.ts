import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../services/productService';
import { transformProductList } from '../transformers/product.transformer';

export const useCategories = (categorySlug: string) => {
  return useQuery({
    queryKey: ['category', categorySlug],
    staleTime: 60000, // 1 minuto
    queryFn: async () => {
      const rawData = await fetchProductsByCategory(categorySlug);
      return transformProductList(rawData);
    },
  });
};