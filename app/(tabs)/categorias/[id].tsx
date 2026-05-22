import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { productosPorCategoria } from '@/src/data/productosPorCategoria';
import ProductCard from '@/src/components/ProductCard';
import Search from '@/src/components/SearchBar';
import CustomHeader from '@/src/components/CustomHeader';
import { productDetailRoute } from '@/src/navigation/routes';


export default function CategoryScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  const currentCategory = id && typeof id === 'string' ? id.toLowerCase() : '';
  const listaProductos = productosPorCategoria[currentCategory] || productosPorCategoria.default;

  const txtTitulo = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
  return (
    
    
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader 
        leftIcon="menu" 
        rightIcon="user" 
        onLeftPress={() => console.log('Abrir menú')}
        onRightPress={() => console.log('Perfil')}
      />
      

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>{txtTitulo}</Text>
          <Text style={styles.subTitle}>{listaProductos.length} ITEMS FOUND</Text>
        </View>

        <Search placeholder={`Search  ${currentCategory}...`} />

        <View style={styles.listContainer}>
          {listaProductos.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onPress={() => router.push(productDetailRoute(item.id.toString()))}
            />
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1, paddingHorizontal: 20 },
  
  backButton: { padding: 5 },
  headerIcon: { fontSize: 22, color: '#166534', fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#166534' },
  titleSection: { marginTop: 20, marginBottom: 20 },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#111', marginBottom: 5 },
  subTitle: { fontSize: 12, color: '#6b7280', fontWeight: '600', letterSpacing: 1 },
  
  listContainer: { gap: 15 },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  
});