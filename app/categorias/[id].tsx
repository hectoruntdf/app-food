import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useProductsByCategory } from '@/src/hooks/useProductsByCategory';
import ProductListLayout from '@/src/components/ProductListLayout';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id; 

  // hook específico de categorías
  const { data: products, isLoading, error } = useProductsByCategory(categoryId);

  return (
    <ProductListLayout 
      products={products || []}
      isLoading={isLoading}
      error={error}
      title={categoryId}
      emptyMessage="No hay productos en esta categoría."
    />
  );
}