
export const CATEGORY_COLORS: Record<string, readonly [string, string]> = {
  'beverages': ['#3182CE', '#63B3ED'],
  'dairies': ['#F6E05E', '#FAF089'],
  'snacks': ['#ED64A6', '#F687B3'],
  'breakfasts': ['#F6993F', '#FBD38D'],
  'desserts': ['#9F7AEA', '#B794F4'],
  'chocolates': ['#4A5568', '#718096'],
  'biscuits-and-cakes': ['#B7791F', '#D69E2E'],
  'cereals-and-potatoes': ['#38A169', '#68D391'],
  'meals': ['#E53E3E', '#FC8181'],
  'plant-based-foods': ['#48BB78', '#9AE6B4'],
};

export const DEFAULT_CATEGORY_COLOR = ['#CBD5E0', '#E2E8F0'] as const;

export const NUTRISCORE_COLORS: Record<string, string> = {
  'A': '#16A34A', 
  'B': '#22C55E', 
  'C': '#EAB308', 
  'D': '#F97316', 
  'E': '#EF4444', 
};

export const ECOSCORE_COLORS: Record<string, string> = {
  'A+': '#157347', 
  'A': '#16A34A',  
  'B+': '#65A30D', 
  'B': '#84CC16',  
  'C': '#EAB308',  
  'D': '#F97316',  
  'E': '#DC2626',  
};

export const NOVA_COLORS: Record<string, string> = {
  '1': '#00A651', 
  '2': '#FFC107', 
  '3': '#F58220', 
  '4': '#E63E11', 
};

export const NAV_COLORS = {
  HEADER_TINT: '#166534',
  HEADER_BACKGROUND: '#FAFAFA',
} as const;
