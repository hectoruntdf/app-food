import { useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts } from '../services/productService';
import { transformProductList } from '../transformers/product.transformer';
import { PAGE_SIZE } from '../constants/api';

export const useSearchProducts = (query: string) => {
  return useInfiniteQuery({
    // El query incluye la palabra buscada, si cambia, TanStack hace una nueva búsqueda
    queryKey: ['search', query],
    staleTime: 60000, // 1 minuto de caché para evitar peticiones repetidas al cambiar de pestaña
    initialPageParam: 1,
    
    // Evita hacer la petición si el query está vacío o solo tiene espacios
    enabled: query.trim().length > 0,

    queryFn: async ({ pageParam }) => {
      const response = await searchProducts(query, pageParam);
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
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};