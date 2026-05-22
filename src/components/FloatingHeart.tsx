import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type FloatingHeartProps = {
  isFavorite?: boolean;
  onPress: () => void;
};

export default function FloatingHeart({ isFavorite = false, onPress }: FloatingHeartProps) {
  return (
    <TouchableOpacity style={[styles.heartButton, isFavorite && styles.heartButton]} onPress={onPress}>
      <Text style={[
        styles.heartIcon,
        isFavorite && styles.heartIconActive
      ]}>
        ♥
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heartButton: {
    position: 'absolute',
    right: 30,
    top: -25, // flota
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  heartIcon: { 
    fontSize: 24, 
    color: '#166534' // Color por defecto (verde oscuro)
  },
  heartIconActive: {
    color: '#DC2626' // Color activo (rojo)
  }
});