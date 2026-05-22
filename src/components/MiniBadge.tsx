import React from "react";
import { View, Text, StyleSheet } from "react-native";

type MiniBadgeProps = {
  label: string;
  value: string;
};

export default function MiniBadge({ label, value }: MiniBadgeProps) {
  return (
    <View style={styles.miniBadge}>
      <Text style={styles.miniBadgeText}>
        {label}
        {"\n"}
        {value}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  miniBadge: { 
    backgroundColor: '#DCFCE7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  miniBadgeText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16
  },
}); 

