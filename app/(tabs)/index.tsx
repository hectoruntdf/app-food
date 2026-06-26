import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { categories } from '@/src/data/categories';
import { brands } from '@/src/data/brands';
import { tasteTags } from '@/src/data/tasteTags';
import CategoryCard from '@/src/components/CategoryCard';
import TasteTag from '@/src/components/TasteTag';
import BrandCard from '@/src/components/BrandCard';
import CustomHeader from '@/src/components/CustomHeader';
import { categoryRoute, brandRoute, tasteRoute } from '@/src/navigation/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ---(HOME) ---
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    
    <View style={styles.mainContainer}>
      <CustomHeader 
        leftIcon="menu" 
        rightIcon="user" 
        paddingTop={insets.top}
        title="Digital Epicurean"
        onLeftPress={() => console.log('Abrir menú')}
        onRightPress={() => console.log('Perfil')}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCurated}>
          <Text style={styles.subtitleCurated}>CURATED FLAVORS</Text>
          <Text style={styles.titleCurated}>
            The art of{' '}
            <Text style={styles.titleCuratedItalic}>conscious</Text>
            {'\n'}discovery.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.viewLibraryLink}>View Library</Text>
        </View>
        <View style={styles.categoriesGrid}>
          {categories.map((item) => (
            <CategoryCard 
              key={item.id} 
              category={item} 
              onPress={() => router.push(categoryRoute(item.title))} 
            />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Refine by Taste</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tasteScrollView}>
          {tasteTags.map((tag, index) => (
            <TasteTag key={index} label={tag}/>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Global Brands</Text>
        </View>
        <Text style={styles.brandsSubtitle}>Explored through the lens of quality.</Text>
        <View style={styles.brandsGrid}>
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onPress={() => router.push(brandRoute(brand.id))}
            />
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <MaterialCommunityIcons name="barcode-scan" size={26} color="#fff" />
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // 1. Header Estático
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerIcon: {
    fontSize: 20,
    color: '#166534', 
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },

  // 2. Sección Curated Flavors
  sectionCurated: {
    marginTop: 25,
    marginBottom: 30,
  },
  subtitleCurated: {
    fontSize: 12,
    color: '#a0a0a0', 
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  titleCurated: {
    fontSize: 28,
    color: '#111',
    fontWeight: '800',
    lineHeight: 34,
  },
  titleCuratedItalic: {
    fontStyle: 'italic',
    fontWeight: '300', 
  },

  // 3. Sección "Categories"
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  viewLibraryLink: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  // 4. Sección "Refine by Taste"
  tasteScrollView: {
    paddingVertical: 5,
    flexDirection: 'row', 
  },
  
  // 5. Sección "Global Brands"
  brandsSubtitle: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 20,
    marginTop: -5, 
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  // 6. Botón Flotante (FAB)
  fab: {
    position: 'absolute', // flote
    bottom: 20,
    right: 20,
    backgroundColor: '#166534', 
    width: 60,
    height: 60,
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});