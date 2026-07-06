import React from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { APP_COLORS } from '../constants/theme';

type ScanState = "idle" | "loading" | "found" | "not_found";

interface ScanResultCardProps {
  scanState: ScanState;
  productId: string | null;
  onGoToProduct: () => void;
  onRetry: () => void;
}

const PRIMARY_COLOR = APP_COLORS.PRIMARY;

export default function ScanResultCard({ scanState, productId, onGoToProduct, onRetry }: ScanResultCardProps) {
  if (scanState === "idle") return null;

  return (
    <View style={styles.resultOverlay}>
      <View style={[styles.resultCard, scanState === "not_found" && styles.resultCardError]}>
        
        {scanState === "loading" && (
          <>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ marginBottom: 10 }} />
            <Text style={styles.resultTitle}>Buscando producto...</Text>
            <Text style={styles.resultName}>{productId}</Text>
          </>
        )}

        {scanState === "found" && (
          <>
            <Ionicons name="checkmark-circle" size={48} color={PRIMARY_COLOR} />
            <Text style={styles.resultTitle}>¡Producto encontrado!</Text>
            <Text style={styles.resultName}>{productId}</Text>
            <View style={styles.resultActions}>
              <Pressable style={styles.verProductoButton} onPress={onGoToProduct}>
                <Text style={styles.verProductoButtonText}>Ver detalles</Text>
                <Ionicons name="arrow-forward" size={18} color="#ffffff" />
              </Pressable>
              <Pressable style={styles.retryButton} onPress={onRetry}>
                <Text style={styles.retryButtonText}>Escanear otro</Text>
              </Pressable>
            </View>
          </>
        )}

        {scanState === "not_found" && (
          <>
            <Ionicons name="warning-outline" size={48} color="#ef4444" />
            <Text style={[styles.resultTitle, { color: "#ef4444" }]}>No encontrado</Text>
            <Text style={styles.resultName}>{productId}</Text>
            <Text style={styles.resultSubtitle}>Este producto no está en la base de datos de Open Food Facts.</Text>
            <Pressable style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "flex-end", // Empuja el panel abajo de todo
    alignItems: "center",
  },
  resultCard: {
    width: '100%', 
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 45,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    gap: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 }, // Sombra hacia arriba
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  resultCardError: {
    borderTopWidth: 3,
    borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, 
    borderColor: "#ef4444", 
  },
  resultTitle: { 
    fontSize: 22,
    fontWeight: "800", 
    color: "#111111", 
    textAlign: 'center' 
  },
  resultName: { 
    fontSize: 15, 
    color: "#6b7280", 
    textAlign: "center", 
    backgroundColor: '#f3f4f6', 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  resultSubtitle: { 
    fontSize: 14, 
    color: "#4b5563", 
    textAlign: "center", 
    lineHeight: 20 
  },
  resultActions: { width: "100%", gap: 10, marginTop: 5 },
  verProductoButton: {
    backgroundColor: APP_COLORS.PRIMARY, 
    borderRadius: 16, 
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  verProductoButtonText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  retryButton: { 
    borderRadius: 16, 
    paddingVertical: 14, 
    alignItems: "center",
    backgroundColor: '#f3f4f6'
  },
  retryButtonText: { color: '#4b5563', fontWeight: "600", fontSize: 15 },
});