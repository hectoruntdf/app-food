// src/components/ScoreBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NUTRISCORE_COLORS, ECOSCORE_COLORS, NOVA_COLORS } from '../constants/theme';

interface ScoreBadgeProps {
  type: 'nutri' | 'eco' | 'nova';
  score: string;
}

export default function ScoreBadge({ type, score }: ScoreBadgeProps) {
  const validScore = score ? score.toString().trim().toUpperCase() : '?';
  
  const badgeConfig = {
    nutri: { dict: NUTRISCORE_COLORS, label: 'NUTRI-SCORE', darkText: false },
    eco: { dict: ECOSCORE_COLORS, label: 'ECO-SCORE', darkText: false },
    nova: { dict: NOVA_COLORS, label: 'NOVA GROUP', darkText: true },
  };

  const { dict, label, darkText } = badgeConfig[type];
  const backgroundColor = dict[validScore] || '#E5E7EB';
  const textColor = darkText ? '#111' : '#FFF';

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>
        {label} {validScore}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start', 
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
});