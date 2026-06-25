export type Score = 'A' | 'B' | 'C' | 'D' | 'E' | '?' | '-';

export interface Product {
  id: string;
  name: string;
  brand: string;
  nutriScore: string;
  ecoScore: string;
  imageUrl: string;
};

export interface NutritionalValue {
  id: string;
  label: string;
  value: string;
  isBold?: boolean;
  isIndented?: boolean;
  isSubItem?: boolean;
};

export interface ProductDetail extends Omit<Product, 'id'> {
  id: string;
  novaGroup: number | null;
  ingredients: string;
  allergens: string;
  nutritionalValues: NutritionalValue[];
  nutritionBase?: '100g' | '100ml';
};