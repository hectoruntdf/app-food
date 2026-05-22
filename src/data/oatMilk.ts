type NutritionalValue = {
  id: string;
  label: string;
  value: string;
  isBold?: boolean;
  isIndented?: boolean;
};

export const oatMilk = {
  brand: 'OATLY',
  name: 'The Original\nOatly Oat Milk',
  ingredients: 'Water, Oats (10%), Rapeseed oil, Minerals (Calcium carbonate, Dibasic calcium phosphate, Potassium iodide), Salt, Vitamins (D2, Riboflavin, B12).',
  allergen: 'Contains gluten (oats). Dairy-free and soy-free.',
  nutritionalValues: [
    { id: '1', label: 'Energy', value: '46 kcal / 193 kJ', isBold: true },
    { id: '2', label: 'Fat', value: '1.5g', isBold: true },
    { id: '3', label: '— of which saturates', value: '0.2g', isIndented: true },
    { id: '4', label: 'Carbohydrate', value: '6.7g', isBold: true },
    { id: '5', label: '— of which sugars', value: '4.1g', isIndented: true },
    { id: '6', label: 'Fibre', value: '0.8g', isBold: true },
    { id: '7', label: 'Protein', value: '1.0g', isBold: true },
    { id: '8', label: 'Salt', value: '0.10g', isBold: true },
  ]
};

