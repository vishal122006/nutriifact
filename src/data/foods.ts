import { FoodItem, CuisineCategory } from '@/types/nutrition';
import { foodIngredients } from './ingredients';

// Image imports
import butterChickenImg from '@/assets/food/butter-chicken.jpg';
import pokeBowlImg from '@/assets/food/poke-bowl.jpg';
import smoothieBowlImg from '@/assets/food/smoothie-bowl.jpg';
import caesarSaladImg from '@/assets/food/caesar-salad.jpg';
import proteinBowlImg from '@/assets/food/protein-bowl.jpg';
import matchaLatteImg from '@/assets/food/matcha-latte.jpg';
import avocadoMousseImg from '@/assets/food/avocado-mousse.jpg';
import almondCroissantImg from '@/assets/food/almond-croissant.jpg';
import padThaiImg from '@/assets/food/pad-thai.jpg';
import grilledSalmonImg from '@/assets/food/grilled-salmon.jpg';

// Attach ingredients to food items
function withIngredients(food: FoodItem): FoodItem {
  return { ...food, ingredients: foodIngredients[food.id] || [] };
}

export const foodDatabase: FoodItem[] = ([
  // === INDIAN CUISINE ===
  {
    id: 'ind-1', name: 'Butter Chicken', emoji: '🍗', category: 'Indian Cuisine',
    calories: 438, protein: 32, carbs: 12, fats: 28, fiber: 2, sugar: 4,
    vitamins: ['B6', 'B12', 'Iron'], allergens: ['Dairy'],
    dietaryTags: ['high-protein'], pricePerServing: 280, servingSize: '1 plate', servingGrams: 300,
    image: butterChickenImg, description: 'Creamy tomato-based chicken curry with naan', isPopular: true,
  },
  {
    id: 'ind-2', name: 'Paneer Tikka', emoji: '🧀', category: 'Indian Cuisine',
    calories: 320, protein: 22, carbs: 8, fats: 22, fiber: 1, sugar: 3,
    vitamins: ['Calcium', 'B12'], allergens: ['Dairy'],
    dietaryTags: ['vegetarian', 'high-protein', 'low-carb', 'keto', 'gluten-free'], pricePerServing: 220, servingSize: '6 pieces', servingGrams: 200,
    description: 'Smoky tandoori-grilled cottage cheese cubes',
  },
  {
    id: 'ind-3', name: 'Dal Tadka', emoji: '🍲', category: 'Indian Cuisine',
    calories: 210, protein: 14, carbs: 30, fats: 5, fiber: 8, sugar: 2,
    vitamins: ['Iron', 'Folate', 'B6'], allergens: [],
    dietaryTags: ['vegan', 'high-protein', 'gluten-free'], pricePerServing: 160, servingSize: '1 bowl', servingGrams: 250,
    description: 'Tempered yellow lentils with cumin and garlic',
  },
  {
    id: 'ind-4', name: 'Chicken Biryani', emoji: '🍚', category: 'Indian Cuisine',
    calories: 520, protein: 28, carbs: 58, fats: 18, fiber: 3, sugar: 2,
    vitamins: ['B12', 'Iron', 'Zinc'], allergens: [],
    dietaryTags: ['high-protein'], pricePerServing: 250, servingSize: '1 plate', servingGrams: 350,
    description: 'Fragrant basmati rice layered with spiced chicken', isPopular: true,
  },

  // === CONTINENTAL ===
  {
    id: 'con-1', name: 'Grilled Salmon', emoji: '🐟', category: 'Continental',
    calories: 380, protein: 36, carbs: 8, fats: 22, fiber: 3, sugar: 2,
    vitamins: ['D', 'B12', 'Omega-3'], allergens: ['Fish'],
    dietaryTags: ['high-protein', 'low-carb', 'keto', 'gluten-free'], pricePerServing: 450, servingSize: '1 fillet + veggies', servingGrams: 250,
    image: grilledSalmonImg, description: 'Pan-seared salmon with asparagus & lemon butter', isPopular: true,
  },
  {
    id: 'con-2', name: 'Mushroom Risotto', emoji: '🍄', category: 'Continental',
    calories: 380, protein: 10, carbs: 52, fats: 14, fiber: 3, sugar: 2,
    vitamins: ['B2', 'D', 'Selenium'], allergens: ['Dairy'],
    dietaryTags: ['vegetarian', 'gluten-free'], pricePerServing: 320, servingSize: '1 bowl', servingGrams: 280,
    description: 'Creamy arborio rice with wild mushrooms & parmesan',
  },
  {
    id: 'con-3', name: 'Grilled Chicken Steak', emoji: '🥩', category: 'Continental',
    calories: 340, protein: 38, carbs: 5, fats: 18, fiber: 1, sugar: 1,
    vitamins: ['B6', 'B12', 'Niacin'], allergens: [],
    dietaryTags: ['high-protein', 'low-carb', 'keto', 'gluten-free'], pricePerServing: 380, servingSize: '200g steak', servingGrams: 200,
    description: 'Herb-marinated chicken breast with mashed potatoes',
  },

  // === ASIAN ===
  {
    id: 'asi-1', name: 'Pad Thai', emoji: '🍜', category: 'Asian',
    calories: 410, protein: 18, carbs: 52, fats: 14, fiber: 3, sugar: 8,
    vitamins: ['B1', 'Iron', 'Manganese'], allergens: ['Peanuts', 'Shellfish', 'Soy'],
    dietaryTags: ['gluten-free'], pricePerServing: 280, servingSize: '1 plate', servingGrams: 300,
    image: padThaiImg, description: 'Stir-fried rice noodles with shrimp, peanuts & lime',
  },
  {
    id: 'asi-2', name: 'Teriyaki Tofu Bowl', emoji: '🫘', category: 'Asian',
    calories: 320, protein: 18, carbs: 42, fats: 10, fiber: 5, sugar: 12,
    vitamins: ['Iron', 'Calcium', 'Manganese'], allergens: ['Soy', 'Gluten'],
    dietaryTags: ['vegan', 'high-protein'], pricePerServing: 240, servingSize: '1 bowl', servingGrams: 320,
    description: 'Glazed tofu over steamed rice with edamame & pickled ginger',
  },
  {
    id: 'asi-3', name: 'Salmon Poke Bowl', emoji: '🍣', category: 'Asian',
    calories: 420, protein: 28, carbs: 45, fats: 14, fiber: 4, sugar: 6,
    vitamins: ['Omega-3', 'D', 'B12'], allergens: ['Fish', 'Soy', 'Sesame'],
    dietaryTags: ['high-protein', 'gluten-free'], pricePerServing: 350, servingSize: '1 bowl', servingGrams: 350,
    image: pokeBowlImg, description: 'Fresh salmon, avocado, edamame on sushi rice', isPopular: true,
  },

  // === SALADS ===
  {
    id: 'sal-1', name: 'Caesar Salad', emoji: '🥗', category: 'Salads',
    calories: 280, protein: 24, carbs: 12, fats: 16, fiber: 3, sugar: 2,
    vitamins: ['A', 'C', 'K'], allergens: ['Dairy', 'Gluten', 'Eggs'],
    dietaryTags: ['high-protein'], pricePerServing: 220, servingSize: '1 bowl', servingGrams: 250,
    image: caesarSaladImg, description: 'Crispy romaine, grilled chicken, parmesan & croutons',
  },
  {
    id: 'sal-2', name: 'Quinoa Power Salad', emoji: '🌾', category: 'Salads',
    calories: 310, protein: 14, carbs: 38, fats: 12, fiber: 7, sugar: 4,
    vitamins: ['Iron', 'Magnesium', 'C'], allergens: [],
    dietaryTags: ['vegan', 'gluten-free', 'high-protein'], pricePerServing: 260, servingSize: '1 bowl', servingGrams: 280,
    description: 'Quinoa, roasted veggies, chickpeas, lemon-tahini dressing',
  },
  {
    id: 'sal-3', name: 'Greek Salad', emoji: '🫒', category: 'Salads',
    calories: 180, protein: 6, carbs: 10, fats: 14, fiber: 3, sugar: 5,
    vitamins: ['C', 'K', 'A'], allergens: ['Dairy'],
    dietaryTags: ['vegetarian', 'low-carb', 'keto', 'gluten-free'], pricePerServing: 200, servingSize: '1 bowl', servingGrams: 220,
    description: 'Cucumber, tomato, olives, feta cheese with olive oil',
  },

  // === PROTEIN BOWLS ===
  {
    id: 'pro-1', name: 'Chicken Quinoa Bowl', emoji: '🍗', category: 'Protein Bowls',
    calories: 480, protein: 42, carbs: 38, fats: 16, fiber: 6, sugar: 4,
    vitamins: ['B6', 'Iron', 'Magnesium'], allergens: [],
    dietaryTags: ['high-protein', 'gluten-free'], pricePerServing: 320, servingSize: '1 bowl', servingGrams: 380,
    image: proteinBowlImg, description: 'Grilled chicken, quinoa, chickpeas, veggies & tahini', isPopular: true,
  },
  {
    id: 'pro-2', name: 'Egg & Avocado Bowl', emoji: '🥑', category: 'Protein Bowls',
    calories: 390, protein: 22, carbs: 18, fats: 28, fiber: 8, sugar: 2,
    vitamins: ['D', 'K', 'B12', 'Folate'], allergens: ['Eggs'],
    dietaryTags: ['vegetarian', 'high-protein', 'low-carb', 'keto', 'gluten-free'], pricePerServing: 260, servingSize: '1 bowl', servingGrams: 300,
    description: 'Poached eggs, smashed avocado, cherry tomatoes & seeds',
  },
  {
    id: 'pro-3', name: 'Tofu Power Bowl', emoji: '🫘', category: 'Protein Bowls',
    calories: 360, protein: 24, carbs: 35, fats: 14, fiber: 7, sugar: 5,
    vitamins: ['Iron', 'Calcium', 'B6'], allergens: ['Soy'],
    dietaryTags: ['vegan', 'high-protein', 'gluten-free'], pricePerServing: 240, servingSize: '1 bowl', servingGrams: 340,
    description: 'Crispy tofu, brown rice, roasted broccoli & peanut sauce',
  },

  // === HEALTHY DRINKS ===
  {
    id: 'drk-1', name: 'Matcha Latte', emoji: '🍵', category: 'Healthy Drinks',
    calories: 120, protein: 4, carbs: 14, fats: 5, fiber: 1, sugar: 8,
    vitamins: ['C', 'L-Theanine', 'Antioxidants'], allergens: ['Dairy'],
    dietaryTags: ['vegetarian', 'gluten-free'], pricePerServing: 180, servingSize: '1 cup (300ml)', servingGrams: 300,
    image: matchaLatteImg, description: 'Ceremonial grade matcha with steamed oat milk',
  },
  {
    id: 'drk-2', name: 'Cold Press Green Juice', emoji: '🥬', category: 'Healthy Drinks',
    calories: 80, protein: 2, carbs: 18, fats: 0.5, fiber: 0, sugar: 14,
    vitamins: ['C', 'K', 'Iron', 'Folate'], allergens: [],
    dietaryTags: ['vegan', 'gluten-free', 'low-carb'], pricePerServing: 150, servingSize: '250ml', servingGrams: 250,
    description: 'Spinach, celery, apple, ginger & lemon cold-pressed',
  },
  {
    id: 'drk-3', name: 'Protein Shake', emoji: '🥛', category: 'Healthy Drinks',
    calories: 220, protein: 30, carbs: 15, fats: 5, fiber: 2, sugar: 8,
    vitamins: ['B12', 'D', 'Calcium'], allergens: ['Dairy'],
    dietaryTags: ['high-protein', 'gluten-free'], pricePerServing: 200, servingSize: '400ml', servingGrams: 400,
    description: 'Whey protein blended with banana, oats & almond milk',
  },

  // === SMOOTHIES ===
  {
    id: 'smo-1', name: 'Green Power Smoothie Bowl', emoji: '🥣', category: 'Smoothies',
    calories: 280, protein: 8, carbs: 42, fats: 10, fiber: 6, sugar: 22,
    vitamins: ['C', 'K', 'A', 'Potassium'], allergens: [],
    dietaryTags: ['vegan', 'gluten-free'], pricePerServing: 220, servingSize: '1 bowl', servingGrams: 300,
    image: smoothieBowlImg, description: 'Spinach-banana blend topped with granola, berries & chia', isPopular: true,
  },
  {
    id: 'smo-2', name: 'Berry Blast Smoothie', emoji: '🫐', category: 'Smoothies',
    calories: 180, protein: 4, carbs: 36, fats: 3, fiber: 5, sugar: 24,
    vitamins: ['C', 'Antioxidants', 'K'], allergens: [],
    dietaryTags: ['vegan', 'gluten-free'], pricePerServing: 180, servingSize: '400ml', servingGrams: 400,
    description: 'Mixed berries, banana, Greek yogurt & honey',
  },
  {
    id: 'smo-3', name: 'Mango Protein Smoothie', emoji: '🥭', category: 'Smoothies',
    calories: 260, protein: 22, carbs: 34, fats: 4, fiber: 3, sugar: 26,
    vitamins: ['C', 'A', 'B12'], allergens: ['Dairy'],
    dietaryTags: ['high-protein', 'gluten-free'], pricePerServing: 200, servingSize: '400ml', servingGrams: 400,
    description: 'Fresh mango, whey protein, yogurt & turmeric',
  },

  // === DESSERTS ===
  {
    id: 'des-1', name: 'Avocado Chocolate Mousse', emoji: '🍫', category: 'Desserts',
    calories: 220, protein: 4, carbs: 22, fats: 14, fiber: 5, sugar: 12,
    vitamins: ['E', 'K', 'Magnesium'], allergens: [],
    dietaryTags: ['vegan', 'gluten-free'], pricePerServing: 180, servingSize: '1 cup', servingGrams: 150,
    image: avocadoMousseImg, description: 'Rich dark chocolate mousse made with avocado & cacao',
  },
  {
    id: 'des-2', name: 'Greek Yogurt Parfait', emoji: '🍯', category: 'Desserts',
    calories: 240, protein: 18, carbs: 30, fats: 6, fiber: 3, sugar: 18,
    vitamins: ['B12', 'Calcium', 'Probiotics'], allergens: ['Dairy', 'Nuts'],
    dietaryTags: ['vegetarian', 'high-protein', 'gluten-free'], pricePerServing: 190, servingSize: '1 glass', servingGrams: 250,
    description: 'Layers of Greek yogurt, honey, granola & fresh fruits',
  },
  {
    id: 'des-3', name: 'Chia Pudding', emoji: '🫧', category: 'Desserts',
    calories: 180, protein: 6, carbs: 20, fats: 8, fiber: 10, sugar: 8,
    vitamins: ['Omega-3', 'Calcium', 'Iron'], allergens: [],
    dietaryTags: ['vegan', 'gluten-free', 'high-protein'], pricePerServing: 160, servingSize: '1 cup', servingGrams: 200,
    description: 'Chia seeds soaked in coconut milk with mango',
  },

  // === PASTRIES ===
  {
    id: 'pas-1', name: 'Almond Croissant', emoji: '🥐', category: 'Pastries',
    calories: 340, protein: 8, carbs: 36, fats: 18, fiber: 2, sugar: 12,
    vitamins: ['E', 'B1', 'Iron'], allergens: ['Gluten', 'Dairy', 'Nuts'],
    dietaryTags: ['vegetarian'], pricePerServing: 150, servingSize: '1 piece', servingGrams: 90,
    image: almondCroissantImg, description: 'Buttery flaky croissant filled with almond cream',
  },
  {
    id: 'pas-2', name: 'Protein Banana Bread', emoji: '🍞', category: 'Pastries',
    calories: 220, protein: 14, carbs: 28, fats: 6, fiber: 3, sugar: 10,
    vitamins: ['B6', 'Potassium', 'Iron'], allergens: ['Gluten', 'Eggs'],
    dietaryTags: ['vegetarian', 'high-protein'], pricePerServing: 120, servingSize: '1 slice', servingGrams: 80,
    description: 'Whey-enriched banana bread with walnuts',
  },
  {
    id: 'pas-3', name: 'Oat Cookie', emoji: '🍪', category: 'Pastries',
    calories: 160, protein: 4, carbs: 22, fats: 7, fiber: 2, sugar: 8,
    vitamins: ['Iron', 'B1'], allergens: ['Gluten'],
    dietaryTags: ['vegetarian'], pricePerServing: 80, servingSize: '1 cookie', servingGrams: 40,
    description: 'Chewy oat cookie with dark chocolate chips & raisins',
  },
] as FoodItem[]).map(withIngredients);

export const foodCategories: CuisineCategory[] = [
  'Indian Cuisine', 'Continental', 'Asian', 'Salads', 'Protein Bowls',
  'Healthy Drinks', 'Smoothies', 'Desserts', 'Pastries',
];
