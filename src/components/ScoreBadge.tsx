import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ScoreBadgeProps {
    label: string;
    value: string;
    color: string;
    isDarkText?: boolean; // opcional
}

export default function ScoreBadge({ label, value, color, isDarkText }: ScoreBadgeProps) {
    return (
        <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>{label}</Text>
            <View style={[styles.scoreSquare, { backgroundColor: color }]}>
                <Text style={isDarkText ? styles.scoreLetterDark : styles.scoreLetter}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  scoreBox: { backgroundColor: '#F3F4F6', padding: 10, borderRadius: 12, flex: 1, alignItems: 'center' },
  scoreLabel: { fontSize: 9, fontWeight: '600', color: '#6b7280', marginBottom: 5, textAlign: 'center' },
  scoreSquare: { width: 35, height: 35, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  scoreLetter: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  scoreLetterDark: { color: '#111', fontSize: 18, fontWeight: 'bold' },
});