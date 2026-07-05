import { useCallback, useMemo, useRef} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import ProductCard from '@/src/components/ProductCard';
import { productDetailRoute } from '@/src/navigation/routes';
import { Product } from '../types/product';
import { NAV_COLORS } from '../constants/theme';

type ProductListLayoutProps = {
  data: { pages: { products: Product[] }[] } | undefined;
  isLoading: boolean;
  error: any;
  title: string;
  emptyMessage?: string; // personalizar el mensaje de "no hay productos"
  onLoadMore: () => void; 
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  searchComponent?: React.ReactNode;
};

export default function ProductListLayout({ 
  data, 
  isLoading, 
  error, 
  title, 
  emptyMessage = "No hay productos disponibles.",
  onLoadMore,
  isFetchingNextPage,
  hasNextPage,
  searchComponent,
}: ProductListLayoutProps) {
  
  const router = useRouter();

  const momentumGuard = useRef(false); // Referencia para almacenar el tiempo del último scroll

  // useMemo para memorizar la lista de productos y evitar recalcularla en cada renderizado
  const products = useMemo(
    () => data?.pages.flatMap(page => page.products) ?? [], [data]);

  // useCallback para memorizar la función de manejo de clic en un producto y evitar recrearla en cada renderizado
  const handlePressProduct = useCallback((id: string) => {
    router.push(productDetailRoute(id));
  }, [router]);

  // useCallback para memorizar la función de renderizado de cada producto y evitar recrearla en cada renderizado
  const renderItem = useCallback(({ item }: { item: Product }) => (
    <ProductCard product={item} onPressItem={handlePressProduct} />
  ), [handlePressProduct]);

  // useCallback para memorizar la función de renderizado del separador entre productos y evitar recrearla en cada renderizado
  const renderSeparator = useCallback(() => <View style={{ height: 15 }} />, []);

  // Formateamos el título para que la primera letra sea mayúscula
  const displayTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : '';

  return (
    <View style={styles.mainContainer}>

      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}

        // Gestión de memoria y rendimiento para listas largas
        initialNumToRender={10}       
        maxToRenderPerBatch={5}       
        windowSize={5}                
        removeClippedSubviews={true}
        //

        onMomentumScrollBegin={() => { momentumGuard.current = true; }}

        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && momentumGuard.current) {
            onLoadMore();
            momentumGuard.current = false; // Resetear el guardián de momentum después de cargar más
          }
        }}
        onEndReachedThreshold={0.3}

        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: 20 }} />
          ) : error? (
            <Text style={{ textAlign: 'center', marginVertical: 20, color: 'red' }}>
              Error al cargar más productos. Intenta nuevamente.
            </Text>
          ) : null
        }


        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 50, color: '#6b7280' }}>
              {emptyMessage}
            </Text>
          )
        }

        ListHeaderComponent={
          <View style={styles.headerComponentContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>{displayTitle}</Text>
              <Text style={styles.subTitle}>{products.length} ITEMS FOUND</Text>
            </View>
            {searchComponent}
          </View>
        }
        renderItem = { renderItem }
        ItemSeparatorComponent={ renderSeparator }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: NAV_COLORS.HEADER_BACKGROUND },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  headerComponentContainer: { marginBottom: 5 },
  titleSection: { marginTop: 10, marginBottom: 20 },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#111', marginBottom: 5 },
  subTitle: { fontSize: 12, color: '#6b7280', fontWeight: '600', letterSpacing: 1 },
});