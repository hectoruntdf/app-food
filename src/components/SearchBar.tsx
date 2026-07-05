import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPressScanner?: () => void;
}

export default function Search({
  placeholder = "Buscar...",
  value,
  onChangeText,
  onPressScanner,
}: SearchProps) {
  return (
    <View style={styles.searchBarContainer}>
      <Feather
        name="search"
        size={20}
        color="#9CA3AF"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCapitalize="none"
      />
      {onPressScanner && (
        <TouchableOpacity
          onPress={onPressScanner}
          style={styles.scannerButton}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="barcode-scan"
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "400",
  },
  scannerButton: {
    marginLeft: 8,
    padding: 6,
  },
});
