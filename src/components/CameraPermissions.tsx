import React from 'react';
import { View, Text, Pressable, ActivityIndicator, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PermissionResponse } from 'expo-camera';
import { APP_COLORS } from '../constants/theme';

interface CameraPermissionsProps {
  permission: PermissionResponse | null;
  onRequestPermission: () => void;
  onCancel: () => void;
}

const PRIMARY_COLOR = APP_COLORS.PRIMARY;

export default function CameraPermissions({ permission, onRequestPermission, onCancel }: CameraPermissionsProps) {
  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

  const canAskAgain = permission.canAskAgain;

  return (
    <View style={styles.permissionContainer}>
      <Ionicons name={canAskAgain ? "camera-outline" : "settings-outline"} size={64} color="#d4d4d8" />
      
      <Text style={styles.permissionText}>
        {canAskAgain 
          ? "Necesitamos permiso para usar la cámara y escanear productos."
          : "El permiso de cámara fue denegado.\nHabilítalo desde los Ajustes de tu celular."}
      </Text>
      
      <Pressable 
        style={styles.permissionButton} 
        onPress={canAskAgain ? onRequestPermission : Linking.openSettings}
      >
        <Text style={styles.permissionButtonText}>
          {canAskAgain ? "Solicitar permiso" : "Ir a Ajustes"}
        </Text>
      </Pressable>

      <Pressable style={[styles.permissionButton, styles.cancelButton]} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 40,
    backgroundColor: '#f8f9fa'
  },
  permissionText: {
    fontSize: 16,
    color: "#71717a",
    textAlign: "center",
    lineHeight: 24,
  },
  permissionButton: {
    marginTop: 8,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center'
  },
  permissionButtonText: { color: "#ffffff", fontWeight: "700", fontSize: 15 },
  cancelButton: { backgroundColor: '#e4e4e7', marginTop: 10 },
  cancelButtonText: { color: "#52525b", fontWeight: "700", fontSize: 15 }
});