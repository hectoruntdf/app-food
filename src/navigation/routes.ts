import { Href } from "expo-router";

export const ROUTES = {
  HOME: "/", // app/(tabs)/index.tsx
  SEARCH: "/search", // app/(tabs)/search.tsx
  FAVORITES: "/favorites", // app/(tabs)/favorites.tsx
  CATEGORIA: "/categorias/[id]", // app/(tabs)/categorias/[id].tsx
  PRODUCTO: "/producto/[id]", // app/producto/[id].tsx
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
type RouteParams = Record<string, string | number | boolean | undefined>;

export const buildRoute = (route: AppRoute, params?: RouteParams): Href => {
  if (!params) {
    return route as Href;
  }

  return {
    pathname: route,
    params,
  } as Href;
};

export function productDetailRoute(id: string) {
  return buildRoute(ROUTES.PRODUCTO, { id });
}

export function categoryRoute(id: string) {
  return buildRoute(ROUTES.CATEGORIA, { id });
}