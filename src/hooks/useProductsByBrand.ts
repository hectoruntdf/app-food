import { useQuery } from '@tanstack/react-query';
import { fetchProductsByBrand } from '../services/productService';
import { transformProductList } from '../transformers/product.transformer';

export const useProductsByBrand = (brand: string) => {
  return useQuery({
    queryKey: ['brand', brand],
    queryFn: async () => {
      const response = await fetchProductsByBrand(brand);
      return transformProductList(response);
    },
  });
};