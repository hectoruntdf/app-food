import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Product } from '@/src/data/product';
import NutritionRow from '@/src/components/NutritionRow';
import MiniBadge from '@/src/components/MiniBadge';
import CustomHeader from '@/src/components/CustomHeader';
import FloatingHeart from '@/src/components/FloatingHeart';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import DetailScoreBadge from '@/src/components/DetailScoreBadge';

export default function ProductDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Digital Epicurean"
        leftIcon="chevron-left" 
        rightIcon="share-2" 
        paddingTop={insets.top}
        onLeftPress={() => router.back()}
        onRightPress={() => console.log('Compartir')}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        <View style={styles.topHalf}>
          <View style={styles.bottleShadow} />

          <Image
            source={ Product.imageUrl ? { uri: Product.imageUrl } : require('../../assets/images/oatmilk2.png') }
            style={styles.bottleImage}
            contentFit="contain" 
            transition={300} 
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.cardPrimary}>
            <FloatingHeart isFavorite={true} onPress={() => {}} />
            
            <Text style={styles.brandText}>{Product.brand}</Text>
            <Text style={styles.productName}>{Product.name}</Text>

            <View style={styles.scoresRow}>
              <DetailScoreBadge type="nutri" value={Product.nutriScore} />             
              <DetailScoreBadge type="nova" value={Product.novaGroup} />  

              <DetailScoreBadge type="eco" value={Product.ecoScore} />
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.miniBadgesContainer}>
              <MiniBadge label="ENERGY" value="193 kJ" />
              <MiniBadge label="FAT" value="1.5g" />
              <MiniBadge label="PROTEIN" value="1.0g" />
              <MiniBadge label="CARBS" value="6.7g" />
            </ScrollView>
          </View>

          <View style={styles.cardSecondary}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="beaker-outline" size={22} color="#111" />
              <Text style={styles.sectionTitle}>Ingredients</Text>
            </View>

            <Text style={styles.ingredientsText}>{Product.ingredients}</Text>
            
            <View style={styles.allergenAlert}>
              <View style={styles.allergenHeader}>
                <Feather name="alert-triangle" size={16} color="#B91C1C" />
                <Text style={styles.allergenTitle}>ALLERGEN INFORMATION</Text>
              </View>
              
              <Text style={styles.allergenText}>{Product.allergen}</Text>
            </View>
          </View>
          <View style={styles.cardTertiary}>
            <Text style={styles.sectionTitle}>Nutritional Values (per 100ml)</Text>
            {Product.nutritionalValues.map((item) => (
              <NutritionRow 
                key={item.id}
                label={item.label}
                value={item.value}
                isBold={item.isBold}
                isIndented={item.isIndented}
              />
            ))}
          </View>

          <View style={{ height: 40 }} />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerIcon: { fontSize: 24, color: '#166534', fontWeight: 'bold' },
  topHalf: {
    backgroundColor: '#F2786D',
    height: 420, 
    alignItems: 'center',
    justifyContent: 'flex-end', 
    position: 'relative',
    paddingTop: 20, 
  },
  bottleShadow: {
    position: 'absolute',
    bottom: 30, 
    width: 150, 
    height: 15, 
    //backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3, 
    transform: [{ translateX: 25 }], 
  },
  bottleImage: {
    width: '100%', 
    height: '100%',
  },
  contentContainer: {
    marginTop: -40, 
    paddingHorizontal: 20,
    gap: 15,
    //backgroundColor:'blue'
  },
  cardPrimary: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 35, 
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardSecondary: {
    backgroundColor: '#F4F4F5', 
    borderRadius: 25,
    padding: 25,
  },
  cardTertiary: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  brandText: { fontSize: 12, color: '#166534', fontWeight: '800', letterSpacing: 1, marginBottom: 5 },
  productName: { fontSize: 32, fontWeight: '800', color: '#111', lineHeight: 36, marginBottom: 25 },
  scoresRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 10  },
  miniBadgesContainer: { gap: 12, paddingRight: 20},
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  ingredientsText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 20 },
  allergenAlert: { backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12 },
  allergenHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap: 6 },
  allergenTitle: { fontSize: 11, fontWeight: '700', color: '#B91C1C' },
  allergenText: { fontSize: 13, color: '#B91C1C', lineHeight: 18 },
});