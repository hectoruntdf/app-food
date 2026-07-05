import { PAGE_SIZE } from "../constants/api";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const CONTACTO = process.env.USER_AGENT_CONTACT || "https://my-app-food.com";

const HEADERS = {
  "User-Agent": `my-app-food/1.0.0 (${CONTACTO})`,
};

export const fetchProductByBarcode = async (barcode: string) => {
  try {
    const url = `${BASE_URL}/v3/product/${barcode}.json`;
    const response = await fetch(url, { headers: HEADERS, });

    if (response.status === 404) {
      throw new Error('Producto no encontrado en la base de datos de Open Food Facts');
    }

    if (!response.ok) {
      throw new Error(`Error de conexión HTTP: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error en fetchProductByBarcode:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categorySlug: string, page: number = 1) => {
  try {
    const params = new URLSearchParams({
      categories_tags: categorySlug,
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: String(PAGE_SIZE),
      page: String(page),
    });

    const url = `${BASE_URL}/v2/search?${params.toString()}`;
    const response = await fetch(url, { headers: HEADERS, });

    if (!response.ok) {
      throw new Error(`Error al cargar la categoría: ${response.status}`);
    }
         
    return await response.json();

  } catch (error) {
    console.error('Error en fetchProductsByCategory:', error);
    throw error;
  }
};

export const fetchProductsByBrand = async (brandSlug: string, page: number = 1) => {
  try {
    const params = new URLSearchParams({
      brands_tags: brandSlug,
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: String(PAGE_SIZE),
      page: String(page),
    });

    const url = `${BASE_URL}/v2/search?${params.toString()}`;
    const response = await fetch(url, { headers: HEADERS, });

    if (!response.ok) {
      throw new Error(`Error al cargar la marca: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error en fetchProductsByBrand:', error);
    throw error;
  }
};

export const fetchProductsByTaste = async (tasteSlug: string, page: number = 1) => {
  try {
    const params = new URLSearchParams({
      // OpenFoodFacts usa labels_tags
      labels_tags: tasteSlug, 
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: String(PAGE_SIZE),
      page: String(page),
    });

    const url = `${BASE_URL}/v2/search?${params.toString()}`;
    const response = await fetch(url, { headers: HEADERS });

    if (!response.ok) {
      throw new Error(`Error al cargar la etiqueta de sabor: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en fetchProductsByTaste:', error);
    throw error;
  }
};

export const searchProducts = async (query: string, page: number = 1) => {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return { count: 0, page: 1, page_count: 0, page_size: PAGE_SIZE, products: [] };
  }

  try {
    // Detectamos si el query es un código de barras (solo dígitos, entre 8 y 14 caracteres)
    const isBarcode = /^\d{8,14}$/.test(cleanQuery);

    if (isBarcode) {
      try {
        const responseData = await fetchProductByBarcode(cleanQuery);

        const rawProduct = responseData?.product ? responseData.product : responseData;
        // Formateamos el producto para que tenga la misma estructura que los productos de búsqueda
        let formattedProduct = null;
        if (rawProduct) {
          formattedProduct = {
            id: rawProduct.id || rawProduct._id || rawProduct.code || cleanQuery,
            code: rawProduct.code || cleanQuery,
            product_name: rawProduct.product_name || rawProduct.product_name_es || rawProduct.generic_name || 'Producto sin nombre',
            brands: rawProduct.brands || 'Marca desconocida',
            image_url: rawProduct.image_url || rawProduct.image_front_url || rawProduct.image_front_small_url,
            nutriscore_grade: rawProduct.nutriscore_grade,
            ecoscore_grade: rawProduct.ecoscore_grade,
          };
        }
        // Retornamos un objeto que simula la estructura de la respuesta de búsqueda, con un solo producto
        return {
          count: formattedProduct ? 1 : 0,
          page: 1,
          page_count: formattedProduct ? 1 : 0,
          page_size: PAGE_SIZE,
          products: formattedProduct ? [formattedProduct] : [],
        };
      } catch (error: any) {
        if (error.message && error.message.includes('no encontrado')) {
          return { count: 0, page: 1, page_count: 0, page_size: PAGE_SIZE, products: [] };
        }
        throw error;
      }
    }
    
    // Si no es un código de barras, hacemos una búsqueda normal por texto
    const params = new URLSearchParams({
      search_terms: cleanQuery,
      search_simple: "1", 
      action: "process",
      json: "1", 
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: String(PAGE_SIZE),
      page: String(page),
    });

    const url = `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`;
    
    console.log(`Buscando página ${page} con URL:`, url);

    const response = await fetch(url, { headers: HEADERS });

    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en searchProducts:', error);
    throw error;
  }
};