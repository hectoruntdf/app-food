import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NUTRISCORE_COLORS, ECOSCORE_COLORS, NOVA_COLORS } from "../constants/theme";

interface DetailScoreBadgeProps {
    type : 'nutri' | 'eco' | 'nova';
    value: string | number;
}

export default function DetailScoreBadge({ type, value }: DetailScoreBadgeProps) {
    const validValue = value ? value.toString().trim().toUpperCase() : '?';
    const badgeConfig = {
        nutri: {
            dict: NUTRISCORE_COLORS,
            label: 'NUTRI-SCORE',
            isDarkText: false
        },
        eco: {
            dict: ECOSCORE_COLORS,
            label: 'ECO-SCORE',
            isDarkText: false
        },
        nova: {
            dict: NOVA_COLORS,
            label: 'NOVA GROUP',
            isDarkText: true
        }
    };
    
    const { dict, label, isDarkText } = badgeConfig[type];
    const backgroundColor = dict[validValue] || '#E5E7EB';
    
    return (
        <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>{label}</Text>
            <View style={[styles.scoreSquare, { backgroundColor }]}>
                <Text style={isDarkText ? styles.scoreLetterDark : styles.scoreLetter}>
                    {validValue}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  scoreBox: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    //marginHorizontal: 4,
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 5,
    textAlign: 'center'
  },
  scoreSquare: { 
    width: 35,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLetter: { 
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  scoreLetterDark: { 
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold'
  },
});