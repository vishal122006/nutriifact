import { FoodItem } from '@/types/nutrition';

export const foodDatabase: FoodItem[] = [
  {
    id: '1', name: 'Grilled Chicken Breast', emoji: '🍗', category: 'Protein',
    calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, sugar: 0,
    vitamins: ['B6', 'B12', 'Niacin'], allergens: [],
    pricePerServing: 3.50, servingSize: '100g', servingGrams: 100,
  },
  {
    id: '2', name: 'Brown Rice', emoji: '🍚', category: 'Grains',
    calories: 216, protein: 5, carbs: 45, fats: 1.8, fiber: 3.5, sugar: 0.7,
    vitamins: ['B1', 'B6', 'Magnesium'], allergens: [],
    pricePerServing: 0.80, servingSize: '1 cup cooked', servingGrams: 195,
  },
  {
    id: '3', name: 'Greek Yogurt', emoji: '🥛', category: 'Dairy',
    calories: 100, protein: 17, carbs: 6, fats: 0.7, fiber: 0, sugar: 6,
    vitamins: ['B12', 'Calcium', 'Potassium'], allergens: ['Dairy'],
    pricePerServing: 1.50, servingSize: '170g', servingGrams: 170,
  },
  {
    id: '4', name: 'Banana', emoji: '🍌', category: 'Fruits',
    calories: 105, protein: 1.3, carbs: 27, fats: 0.4, fiber: 3.1, sugar: 14,
    vitamins: ['B6', 'C', 'Potassium'], allergens: [],
    pricePerServing: 0.30, servingSize: '1 medium', servingGrams: 118,
  },
  {
    id: '5', name: 'Almonds', emoji: '🥜', category: 'Nuts & Seeds',
    calories: 164, protein: 6, carbs: 6, fats: 14, fiber: 3.5, sugar: 1.2,
    vitamins: ['E', 'Magnesium', 'B2'], allergens: ['Nuts'],
    pricePerServing: 1.20, servingSize: '28g (1 oz)', servingGrams: 28,
  },
  {
    id: '6', name: 'Salmon Fillet', emoji: '🐟', category: 'Protein',
    calories: 208, protein: 20, carbs: 0, fats: 13, fiber: 0, sugar: 0,
    vitamins: ['D', 'B12', 'Omega-3'], allergens: ['Fish'],
    pricePerServing: 5.00, servingSize: '100g', servingGrams: 100,
  },
  {
    id: '7', name: 'Avocado', emoji: '🥑', category: 'Fruits',
    calories: 240, protein: 3, carbs: 12, fats: 22, fiber: 10, sugar: 1,
    vitamins: ['K', 'C', 'B6', 'Folate'], allergens: [],
    pricePerServing: 1.80, servingSize: '1 medium', servingGrams: 150,
  },
  {
    id: '8', name: 'Eggs (2 large)', emoji: '🥚', category: 'Protein',
    calories: 143, protein: 12.6, carbs: 0.7, fats: 9.5, fiber: 0, sugar: 0.4,
    vitamins: ['B12', 'D', 'A', 'Choline'], allergens: ['Eggs'],
    pricePerServing: 0.60, servingSize: '2 large eggs', servingGrams: 100,
  },
  {
    id: '9', name: 'Sweet Potato', emoji: '🍠', category: 'Vegetables',
    calories: 103, protein: 2.3, carbs: 24, fats: 0.1, fiber: 3.8, sugar: 7.4,
    vitamins: ['A', 'C', 'B6', 'Potassium'], allergens: [],
    pricePerServing: 0.90, servingSize: '1 medium', servingGrams: 130,
  },
  {
    id: '10', name: 'Quinoa', emoji: '🌾', category: 'Grains',
    calories: 222, protein: 8, carbs: 39, fats: 3.5, fiber: 5, sugar: 1.6,
    vitamins: ['Iron', 'Magnesium', 'B6'], allergens: [],
    pricePerServing: 1.40, servingSize: '1 cup cooked', servingGrams: 185,
  },
  {
    id: '11', name: 'Spinach Salad', emoji: '🥬', category: 'Vegetables',
    calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2, sugar: 0.4,
    vitamins: ['A', 'C', 'K', 'Iron', 'Folate'], allergens: [],
    pricePerServing: 1.00, servingSize: '100g', servingGrams: 100,
  },
  {
    id: '12', name: 'French Fruit Juice', emoji: '🧃', category: 'Beverages',
    calories: 112, protein: 0.5, carbs: 26, fats: 0.3, fiber: 0.2, sugar: 22,
    vitamins: ['C', 'Folate'], allergens: [],
    pricePerServing: 2.50, servingSize: '250ml', servingGrams: 250,
  },
  {
    id: '13', name: 'Whole Wheat Bread', emoji: '🍞', category: 'Grains',
    calories: 138, protein: 5, carbs: 23, fats: 2.5, fiber: 3, sugar: 4,
    vitamins: ['B1', 'B3', 'Iron'], allergens: ['Gluten'],
    pricePerServing: 0.50, servingSize: '2 slices', servingGrams: 56,
  },
  {
    id: '14', name: 'Cottage Cheese', emoji: '🧀', category: 'Dairy',
    calories: 98, protein: 11, carbs: 3.4, fats: 4.3, fiber: 0, sugar: 2.7,
    vitamins: ['B12', 'Calcium', 'Selenium'], allergens: ['Dairy'],
    pricePerServing: 1.30, servingSize: '100g', servingGrams: 100,
  },
  {
    id: '15', name: 'Oatmeal', emoji: '🥣', category: 'Grains',
    calories: 154, protein: 5.3, carbs: 27, fats: 2.6, fiber: 4, sugar: 0.6,
    vitamins: ['Iron', 'B1', 'Magnesium'], allergens: ['Gluten'],
    pricePerServing: 0.40, servingSize: '1 cup cooked', servingGrams: 234,
  },
  {
    id: '16', name: 'Tofu', emoji: '🫘', category: 'Protein',
    calories: 76, protein: 8, carbs: 1.9, fats: 4.8, fiber: 0.3, sugar: 0.6,
    vitamins: ['Calcium', 'Iron', 'Manganese'], allergens: ['Soy'],
    pricePerServing: 1.00, servingSize: '100g', servingGrams: 100,
  },
];

export const foodCategories = [...new Set(foodDatabase.map(f => f.category))];
