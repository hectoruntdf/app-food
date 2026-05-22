import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

interface CustomHeaderProps {
  leftIcon: keyof typeof Feather.glyphMap; 
  rightIcon?: keyof typeof Feather.glyphMap; 
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export default function CustomHeader({ leftIcon, rightIcon, onLeftPress, onRightPress }: CustomHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
        <Feather name={leftIcon} size={24} color="#166534" />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Digital Epicurean</Text>
      
      <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
        {rightIcon && <Feather name={rightIcon} size={24} color="#166534" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60, 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconButton: {
    width: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },
});