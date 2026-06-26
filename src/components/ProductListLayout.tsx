import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import ProductCard from '@/src/components/ProductCard';
import Search from '@/src/components/SearchBar';
import { productDetailRoute } from '@/src/navigation/routes';
import { Product } from '../types/product';
import { NAV_COLORS } from '../constants/theme';

type ProductListLayoutProps = {
  products: Product[];
  isLoading: boolean;
  error: any;
  title: string;
  emptyMessage?: string; // personalizar el mensaje de "no hay productos"
};

export default function ProductListLayout({ 
  products, 
  isLoading, 
  error, 
  title, 
  emptyMessage = "No hay productos disponibles." 
}: ProductListLayoutProps) {
  
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  } 
  
  if (error || !products || products.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>{emptyMessage}</Text>;
  }

  // Formateamos el título para que la primera letra sea mayúscula
  const displayTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : '';

  return (
    <View style={styles.mainContainer}>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        
        ListHeaderComponent={
          <View style={styles.headerComponentContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>{displayTitle}</Text>
              <Text style={styles.subTitle}>{products.length} ITEMS FOUND</Text>
            </View>

            <Search placeholder={`Search ${displayTitle}...`} />
          </View>
        }

        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(productDetailRoute(item.id.toString()))}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: NAV_COLORS.HEADER_BACKGROUND },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  headerComponentContainer: { marginBottom: 5 },
  titleSection: { marginTop: 10, marginBottom: 20 },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#111', marginBottom: 5 },
  subTitle: { fontSize: 12, color: '#6b7280', fontWeight: '600', letterSpacing: 1 },
});