import { NAV_COLORS } from '@/src/constants/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1, // reintentar una vez en caso de error
    }
  }
});

const detailScreenOptions = {
  headerShown: true,
  title: '',
  headerBackTitle: '',
  headerTintColor: NAV_COLORS.HEADER_TINT,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: NAV_COLORS.HEADER_BACKGROUND },
} as const;

export default function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />

      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="modal" options={{ presentation: 'modal' }}/>
        
        <Stack.Screen name="categorias/[id]" options={detailScreenOptions}/>
        <Stack.Screen name="marcas/[id]" options={detailScreenOptions}/>
        <Stack.Screen name="producto/[id]" options={detailScreenOptions}/>
        <Stack.Screen name='sabores/[id]' options={detailScreenOptions}/>

      </Stack>
    </QueryClientProvider>
  );
}