export type Product = {
  id: string;
  name: string;
  brand: string;
  nutriScore: string;
  ecoScore: string;
  imageUrl: string;
};

export type NutritionalValue = {
  id: string;
  label: string;
  value: string;
  isBold?: boolean;
  isIndented?: boolean;
};

export type ProductDetail = {
  brand: string;
  name: string;
  imageUrl: string;
  nutriScore: string;
  novaGroup: string | number;
  ecoScore: string;
  ingredients: string;
  allergen: string;
  nutritionalValues: NutritionalValue[];
};