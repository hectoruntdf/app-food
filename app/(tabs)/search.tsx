import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import ProductListLayout from '@/src/components/ProductListLayout';
import SearchBar from '@/src/components/SearchBar';
import { useSearchProducts } from '@/src/hooks/useSearchProducts';
import { useDebounce } from '@/src/hooks/useDebounce';
import { NAV_COLORS } from '@/src/constants/theme';
import { Feather } from '@expo/vector-icons';
import { scannerRoute } from '@/src/navigation/routes';

export default function SearchScreen() {
  const router = useRouter();
  
  // Calculo el margen superior
  const insets = useSafeAreaInsets();
  
  // Estado local para lo que el usuario tipea instantáneamente
  const [inputValue, setInputValue] = useState('');
  
  // Retraso que usaremos para consultar la API (espera 500ms)
  const debouncedQuery = useDebounce(inputValue, 500);

  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useSearchProducts(debouncedQuery);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} // Hace el área de toque más grande
        >
          <Feather name="arrow-left" size={24} color="#166534" />
        </TouchableOpacity>
      </View>


      <ProductListLayout
        data={data}
        // Spinner inicial si realmente hay un texto que estamos buscando
        isLoading={isLoading && debouncedQuery.trim().length > 0} 
        error={error}
        
        // Título dinámico
        title={debouncedQuery ? "Resultados" : "Búsqueda"}
        
        // Mensaje dinámico para cuando la lista está vacía
        emptyMessage={
          debouncedQuery 
            ? `No encontramos productos para "${debouncedQuery}".` 
            : "Escribe el código, categoría, marca o etiqueta."
        }
        
        onLoadMore={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
        
        searchComponent={
          <SearchBar 
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Buscar..."
            onPressScanner={() => router.push(scannerRoute())}
          />
        }
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: NAV_COLORS.HEADER_BACKGROUND 
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backButton: {
    width: 40, // Limitamos el ancho para que el usuario no presione sin querer en el centro
    height: 40, // Idem altura
    justifyContent: 'center',
  }
});