import { useQuery } from '@tanstack/react-query';
import { fetchProductsByTaste } from '../services/productService';
import { transformProductList } from '../transformers/product.transformer';

export const useProductsByTaste = (tasteSlug: string) => {
  return useQuery({
    queryKey: ['taste', tasteSlug],
    staleTime: 60000, // 1 minuto
    queryFn: async () => {
      const response = await fetchProductsByTaste(tasteSlug);
      return transformProductList(response);
    },
  });
};