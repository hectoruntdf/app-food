import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SearchProps {
    placeholder: string; 
}

export default function Search({ placeholder }: SearchProps) {
    
    return (
        <View style={styles.searchBarContainer}>
            <Feather name="search" size={20} color="#a0a0a0" style={styles.searchIcon} />
            <TextInput 
                style={styles.searchInput}
                placeholder={placeholder}
                placeholderTextColor="#a0a0a0"
            />
        </View>
    );
    }       

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 25,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#111' },
  
  
});