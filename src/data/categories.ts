export type Categoria = {
    id: string;
    title: string;
    icon: string;
};

export const categories: Categoria[] = [
  { id: '1', title: 'beverages', icon: 'glass-cocktail' }, 
  { id: '2', title: 'dairies', icon: 'egg' },    
  { id: '3', title: 'snacks', icon: 'cookie' },     
  { id: '4', title: 'breakfasts', icon: 'food-croissant' }, 
  { id: '5', title: 'desserts', icon: 'cupcake' },   
  { id: '6', title: 'chocolates', icon: 'peanut' }, 
  { id: '7', title: 'biscuits-and-cakes', icon: 'baguette' }, 
  { id: '8', title: 'cereals-and-potatoes', icon: 'leaf' }, 
  { id: '9', title: 'meals', icon: 'silverware-fork-knife' },      
  { id: '10', title: 'plant-based-foods', icon: 'food-apple' }, 
];