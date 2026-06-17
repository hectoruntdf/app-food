
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://world.openfoodfacts.org/api';

const HEADERS = {
  "User-Agent": "UNTDF TNT 2026",
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

export const fetchProductsByCategory = async (categorySlug: string) => {
  try {
    const params = new URLSearchParams({
      categories_tags: categorySlug,
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: "20",
    });

    //const url = `https://world.openfoodfacts.org/api/v2/search?${params.toString()}`;

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