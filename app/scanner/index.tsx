import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { fetchProductByBarcode } from '@/src/services/productService'; 
import CameraPermissions from '@/src/components/CameraPermissions';
import ScanResultCard from '@/src/components/ScanResultCard';
import { productDetailRoute } from '@/src/navigation/routes';

type ScanState = "idle" | "loading" | "found" | "not_found";

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scannedProductId, setScannedProductId] = useState<string | null>(null);

  const handleBarcodeScan = async (result: BarcodeScanningResult) => {
    if (scanState !== "idle") return; 

    setScanState("loading");
    setScannedProductId(result.data);

    try {
      const product = await fetchProductByBarcode(result.data);
      setScanState(product ? "found" : "not_found");
    } catch (error) {
      setScanState("not_found");
    }
  };

  const handleGoToProduct = () => {
    if (!scannedProductId) return;
    router.back();
    router.push(productDetailRoute(scannedProductId)); 
  };

  // Delegamos la vista de permisos
  if (!permission || !permission.granted) {
    return (
      <CameraPermissions 
        permission={permission} 
        onRequestPermission={requestPermission} 
        onCancel={() => router.back()} 
      />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.cameraWrapper}>
        
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanState === "idle" ? handleBarcodeScan : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"], 
          }}
        />

        <View style={styles.maskContainer}>
          <View style={styles.maskTopRow} />
          
          <View style={styles.maskMiddleRow}>
            <View style={styles.maskSidePanel} />
            
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            
            <View style={styles.maskSidePanel} />
          </View>
          
          <View style={styles.maskBottomRow}>
            <Text style={styles.scanHint}>Alinea el código de barras aquí</Text>
          </View>
        </View>

        {/* Botón de cerrar */}
        <View style={styles.headerControls}>
          <Pressable onPress={() => router.back()} style={styles.closeButton}>
            <Ionicons name="close-outline" size={26} color="white" />
          </Pressable>
        </View>

      </View>

      <ScanResultCard 
        scanState={scanState}
        productId={scannedProductId}
        onGoToProduct={handleGoToProduct}
        onRetry={() => {
          setScanState("idle");
          setScannedProductId(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  cameraWrapper: { flex: 1, position: "relative" },
  camera: { flex: 1 },
  
  // Estilos de la Máscara
  maskContainer: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },
  maskTopRow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  maskMiddleRow: {
    flexDirection: 'row',
    height: 160, // Altura de la ventana de escaneo
  },
  maskSidePanel: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  maskBottomRow: {
    flex: 1.5, 
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    paddingTop: 20,
  },
  
  // Ventana de escaneo limpia
  scanFrame: {
    width: 280,
    height: 160,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  
  // Diseño de las esquinas
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#ffffff',
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 12 },
  topRight: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 12 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 12 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 12 },
  
  scanHint: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  headerControls: {
    position: 'absolute',
    top: 50,
    right: 20, 
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 8,
  },
});