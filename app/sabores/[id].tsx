import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ProductListLayout from '@/src/components/ProductListLayout';
import { useProductsByTaste } from '../../src/hooks/useProductsByTaste'; 

export default function TasteScreen() {
  const { id } = useLocalSearchParams();
  
  const tasteId = Array.isArray(id) ? id[0] : id;

  const { data: products, isLoading, error } = useProductsByTaste(tasteId);

  const formattedTitle = tasteId 
    ? tasteId.charAt(0).toUpperCase() + tasteId.slice(1) 
    : 'Sabores';

  return (
    <ProductListLayout
      products={products || []}
      isLoading={isLoading}
      error={error}
      title={formattedTitle}
      emptyMessage={`No encontramos productos para la etiqueta "${tasteId}".`}
    />
  );
}