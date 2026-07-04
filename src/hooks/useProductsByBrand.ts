import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsByBrand } from '../services/productService';
import { transformProductList } from '../transformers/product.transformer';
import { PAGE_SIZE } from '../constants/api';

export const useProductsByBrand = (brand: string) => {
  return useInfiniteQuery({
    queryKey: ['brand', brand],
    staleTime: 60000, // 1 minuto
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await fetchProductsByBrand(brand, pageParam);
      return {
        products: transformProductList(response),
        page: pageParam,
        totalCount: response.count,
      };
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page * PAGE_SIZE;
      return nextPage < lastPage.totalCount ? lastPage.page + 1 : undefined;
    },
    // Configuración de reintentos en caso de error
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};