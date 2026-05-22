import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Category {
  id: string;
  title: string;
  colors: readonly [string, string]; 
  icon: any; 
}

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.gridWrapper}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[category.colors[1], category.colors[0]]} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }}   
        style={styles.gradientCard}
      >
        <MaterialCommunityIcons 
          name={category.icon} 
          size={42} 
          color="rgba(255, 255, 255, 0.25)" // Blanco semitransparente (marca de agua)
          style={styles.iconBackground}
        />
        
        <Text style={styles.title}>{category.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridWrapper: {
    width: '48%', 
    marginBottom: 15,
  },
  gradientCard: {
    height: 120,
    borderRadius: 12,
    padding: 15,

    justifyContent: 'flex-end',
    alignItems: 'flex-start',

    position: 'relative',
    overflow: 'hidden', 
  },
  iconBackground: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});