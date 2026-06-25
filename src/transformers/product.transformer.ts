import { ProductDetail, Product, NutritionalValue } from '../types/product';
import { OFFProduct } from '../types/openFoodFacts';
import { NUTRIENT_DICTIONARY } from '../constants/nutrients';


// Función para limpiar y validar las calificaciones (NutriScore y EcoScore)
const sanitizeScore = (score: string | undefined | null) => {
  if (!score) return '?';  
  const cleanScore = score.trim().toUpperCase();
  if (['A', 'B', 'C', 'D', 'E'].includes(cleanScore)) {
    return cleanScore;
  }  
  return '-'; 
};
// Transforma los datos crudos de la API de OpenFoodFacts a nuestro formato interno para detalles de producto
export const transformProductData = (apiData: { product: OFFProduct; status: number; code: string }): ProductDetail => {
  const p = apiData.product;
  // Determinamos si el producto es líquido basándonos en sus categorías para mostrar la base de nutrición correcta (100g vs 100ml)
  const isLiquid = p.categories_tags?.some((tag: string) => 
    tag.toLowerCase().includes('beverage') || tag.toLowerCase().includes('drink')
  );

  return {
    id: p.code,
    brand: p.brands || 'Marca desconocida',
    name: p.product_name || 'Producto sin nombre',
    imageUrl: p.image_url || 'https://placehold.co/150x200/png',

    nutritionBase: isLiquid ? '100ml' : '100g',
    
    nutriScore: sanitizeScore(p.nutriscore_grade),
    novaGroup: p.nova_group != null ? p.nova_group : null,
    ecoScore: sanitizeScore(p.ecoscore_grade),
    ingredients: p.ingredients_text || 'Lista de ingredientes no disponible.',
    allergens: p.allergens ? p.allergens.replace(/en:/g, '') : 'No especificados',
    
    // Extraemos los nutrientes disponibles usando el diccionario para mapearlos a etiquetas legibles
    nutritionalValues: (() => {
      if (!p.nutriments) return [];

      const availableNutrients: NutritionalValue[] = [];

      // Queremos combinar kcal y kJ
      if (p.nutriments['energy-kcal_100g'] !== undefined) {
        const kcal = p.nutriments['energy-kcal_100g'];
        // Si no viene kJ, lo calculamos aproximado (1 kcal = 4.184 kJ)
        const kj = p.nutriments['energy_100g'] || (kcal * 4.184).toFixed(0);
        
        availableNutrients.push({
          id: 'energy',
          label: 'Energy',
          value: `${kcal} kcal / ${kj} kJ`,
          isBold: true,
        });
      }

      // Si el nutriente existe en la API, lo agregamos a la pantalla
      NUTRIENT_DICTIONARY.forEach((nut) => {
        const valueKey = `${nut.api_key}_100g` as keyof typeof p.nutriments;
        const unitKey = `${nut.api_key}_unit` as keyof typeof p.nutriments;
        const value100g = p.nutriments[valueKey];
        
        if (value100g !== undefined && value100g !== null) {
          // La unidad correcta en api_key_unit (ej. 'g', 'mg').
          // Si no la manda, asumimos gramos ('g') por defecto.
          const unit = p.nutriments[unitKey] || 'g';
          availableNutrients.push({
            id: nut.id,
            label: nut.label,
            value: `${value100g}${unit}`,
            isSubItem: nut.isSubItem || false,
          });
        }
      });

      return availableNutrients;
    })(),
  };
};


export const transformProductList = (apiData: { products: OFFProduct[] }): Product[] => {
  if (!apiData.products) return [];
  return apiData.products.map((p: OFFProduct) => ({
    id: p.code,
    name: p.product_name || 'Sin nombre',
    brand: p.brands ? p.brands.split(',')[0] : 'Desconocida', 
    imageUrl: p.image_url || 'https://placehold.co/150x200/png',
    nutriScore: sanitizeScore(p.nutriscore_grade),
    ecoScore: sanitizeScore(p.ecoscore_grade),
  }));
};