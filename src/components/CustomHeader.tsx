import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';

interface CustomHeaderProps {
  title?: string;
  leftIcon: keyof typeof Feather.glyphMap; 
  rightIcon: keyof typeof Feather.glyphMap; 
  paddingTop: number;
  onLeftPress: () => void;
  onRightPress: () => void;
}

export default function CustomHeader({
  title = "Digital Epicurean",
  leftIcon,
  rightIcon,
  paddingTop,
  onLeftPress,
  onRightPress,
}: CustomHeaderProps) {
  return (
    <View style={[styles.headerContainer, { paddingTop }]}>
      <StatusBar style="dark" />

      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onLeftPress} style={styles.leftColumn}>
          <Feather
            name={leftIcon}
            size={24}
            color="#166534"
            style={leftIcon === 'chevron-left' ? {marginLeft: -6} : {}}
          />
        </TouchableOpacity>
        
        <View style={styles.centerColumn}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <TouchableOpacity onPress={onRightPress} style={styles.rightColumn}>
          <Feather name={rightIcon} size={24} color="#166534" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    //paddingBottom: 15,
    backgroundColor: '#ffffff',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:15,
    paddingBottom: 15,
    //backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  
  leftColumn: {
    flex: 1, 
    alignItems: 'flex-start',
  },

  centerColumn: {
    flex: 2, 
    alignItems: 'center',
  },

  rightColumn: {
    flex: 1, 
    alignItems: 'flex-end',
  },
  
  iconButton: {
    width: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
    //backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
});