import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type TasteTagProps = {
  label: string;
  onPress?: () => void;
};


export default function TasteTag({ label, onPress }: TasteTagProps) {
  return (
    <TouchableOpacity style={styles.tag} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  text: { color: '#166534', fontWeight: '600', fontSize: 13 },
});