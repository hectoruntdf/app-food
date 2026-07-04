import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import ScoreBadge from './ScoreBadge';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    brand: string;
    nutriScore: string;
    ecoScore: string;
    imageUrl: string; 
  };
  onPressItem?: (id: string) => void; 
};

function ProductCard({ product, onPressItem }: ProductCardProps) {
  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => onPressItem?.(product.id)} 
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.productImage} 
        contentFit="cover"
        transition={200}
      />
      
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <View style={styles.badgesRow}>
          <ScoreBadge type="nutri" score={product.nutriScore} />
          <ScoreBadge type="eco" score={product.ecoScore} />
        </View>
      </View>
      <View style={styles.cardArrow}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );
}

// React.memo para evitar re-renderizados innecesarios si las props no cambian
export default React.memo(ProductCard, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});

const styles = StyleSheet.create({
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
  productImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 12, 
    marginRight: 15,
    backgroundColor: '#F3F4F6' 
  },
  cardContent: { flex: 1, justifyContent: 'center' },
  productName: { fontSize: 16, fontWeight: '700', color: '#111', lineHeight: 20, marginBottom: 4 },
  productBrand: { fontSize: 11, color: '#6b7280', fontWeight: '600', marginBottom: 10 },
  badgesRow: { flexDirection: 'row', gap: 8 },
  cardArrow: { paddingLeft: 10 },
  arrowText: { fontSize: 20, color: '#d1d5db', fontWeight: '300' }
});