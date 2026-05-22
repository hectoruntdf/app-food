import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image';

type BrandCardProps = {
  brand: {
    name: string;
    logo: string; 
  };
};

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <View style={styles.brandCard}>
      <Image 
        source={{ uri: brand.logo }} 
        style={styles.brandLogoImage} 
        contentFit="contain"
        transition={200} // Animación suave al cargar
      />
      <Text style={styles.brandName}>{brand.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandCard: {
    width: '48%',
    backgroundColor: '#F3F4F6', 
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  brandLogoImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Mantiene el círculo
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  brandName: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
});