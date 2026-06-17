import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import ProductCard from '@/src/components/ProductCard';
import Search from '@/src/components/SearchBar';
import CustomHeader from '@/src/components/CustomHeader';
import { productDetailRoute } from '@/src/navigation/routes';

import { useCategories } from '@/src/hooks/useCategories';

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  const { data: products, isLoading, error } = useCategories(id as string);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  } 
  if (error || !products || products.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>No hay productos en esta categoría.</Text>;
  }

  const currentCategory = id && typeof id === 'string' ? id.toLowerCase() : '';
  const txtTitulo = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomHeader 
        leftIcon="menu" 
        rightIcon="user" 
        paddingTop={insets.top}
        onLeftPress={() => console.log('Abrir menú')}
        onRightPress={() => console.log('Perfil')}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        
        ListHeaderComponent={
          <View style={styles.headerComponentContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>{txtTitulo}</Text>
              <Text style={styles.subTitle}>{products.length} ITEMS FOUND</Text>
            </View>

            <Search placeholder={`Search ${txtTitulo}...`} />
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
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  listContent: { 
    paddingHorizontal: 20,
    paddingBottom: 40, 
  },
  headerComponentContainer: {
    marginBottom: 5,
  },
  titleSection: { 
    marginTop: 10, 
    marginBottom: 20 
  },
  mainTitle: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#111', 
    marginBottom: 5 
  },
  subTitle: { 
    fontSize: 12, 
    color: '#6b7280', 
    fontWeight: '600', 
    letterSpacing: 1 
  },
});