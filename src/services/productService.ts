
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

export const fetchProductsByCategory = async (categorySlug: string) => {
  try {
    const params = new URLSearchParams({
      categories_tags: categorySlug,
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: "20",
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

export const fetchProductsByBrand = async (brandSlug: string) => {
  try {
    const params = new URLSearchParams({
      brands_tags: brandSlug,
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: "20",
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

export const fetchProductsByTaste = async (tasteSlug: string) => {
  try {
    const params = new URLSearchParams({
      // OpenFoodFacts usa labels_tags
      labels_tags: tasteSlug, 
      fields: "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
      page_size: "20",
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