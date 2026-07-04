import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useProductsByBrand } from '@/src/hooks/useProductsByBrand'; 
import ProductListLayout from '@/src/components/ProductListLayout';

export default function BrandScreen() {
  const { id } = useLocalSearchParams();
  const brandId = Array.isArray(id) ? id[0] : id; 

  // hook específico de marcas
  const {
    data: products,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useProductsByBrand(brandId);

  return (
    <ProductListLayout 
      data = {products}
      onLoadMore={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      error={error}
      title={brandId}
      emptyMessage="No hay productos de esta marca."
    />
  );
}