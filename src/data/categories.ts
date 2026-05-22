export type Categoria = {
    id: string;
    title: string;
    colors: readonly [string, string]; 
    icon: any; 
};

export const categories: Categoria[] = [
  { id: '1', title: 'beverages', colors: ['#3182CE', '#63B3ED'], icon: 'glass-cocktail' }, 
  { id: '2', title: 'dairies', colors: ['#F6E05E', '#FAF089'], icon: 'egg' },    
  { id: '3', title: 'snacks', colors: ['#ED64A6', '#F687B3'], icon: 'cookie' },     
  { id: '4', title: 'breakfasts', colors: ['#F6993F', '#FBD38D'], icon: 'food-croissant' }, 
  { id: '5', title: 'desserts', colors: ['#9F7AEA', '#B794F4'], icon: 'cupcake' },   
  { id: '6', title: 'chocolates', colors: ['#4A5568', '#718096'], icon: 'peanut' }, 
  { id: '7', title: 'biscuits-and-cakes', colors: ['#B7791F', '#D69E2E'], icon: 'baguette' }, 
  { id: '8', title: 'cereals-and-potatoes', colors: ['#38A169', '#68D391'], icon: 'leaf' }, 
  { id: '9', title: 'meals', colors: ['#E53E3E', '#FC8181'], icon: 'silverware-fork-knife' },      
  { id: '10', title: 'plant-based-foods', colors: ['#48BB78', '#9AE6B4'], icon: 'food-apple' }, 
];