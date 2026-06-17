import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../services/productService';
import { transformProductList } from '../transformers/product.transformer';

export const useCategories = (categorySlug: string) => {
  return useQuery({
    queryKey: ['category', categorySlug],
    queryFn: async () => {
      const rawData = await fetchProductsByCategory(categorySlug);
      return transformProductList(rawData);
    },
  });
};