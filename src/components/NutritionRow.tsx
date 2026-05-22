import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NutritionRowProps {
  label: string;
  value: string;
  isBold?: boolean;      // en negrita?
  isIndented?: boolean;  // sangría a la izquierda?
}

export default function NutritionRow({ label, value, isBold, isIndented }: NutritionRowProps) {
  return (
    <View style={styles.nutritionRow}>
      <Text style={[
        styles.nutritionLabel, 
        isIndented && styles.indentedText // Si isIndented es true, aplica este estilo extra
      ]}>
        {label}
      </Text>
      <Text style={[
        styles.nutritionValue, 
        isBold && styles.boldValue // Si isBold es true, aplica este estilo extra
      ]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  nutritionLabel: { 
    fontSize: 14, 
    color: '#4b5563' 
  },
  indentedText: { 
    fontStyle: 'italic', 
    paddingLeft: 15, 
    color: '#9ca3af' 
  },
  nutritionValue: { 
    fontSize: 14, 
    color: '#111' 
  },
  boldValue: { 
    fontWeight: '700' 
  },
});