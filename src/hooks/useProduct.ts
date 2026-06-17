import { useQuery } from '@tanstack/react-query';
import { fetchProductByBarcode } from '../services/productService';
import { transformProductData } from '../transformers/product.transformer';

export const useProduct = (barcode: string) => {
  return useQuery({
    queryKey: ['product', barcode],
    queryFn: async () => {
      const response = await fetchProductByBarcode(barcode);
      return transformProductData(response);
    },
    retry: false,
  });
};