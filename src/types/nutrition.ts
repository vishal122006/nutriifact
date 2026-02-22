export type DietaryTag = 'vegan' | 'vegetarian' | 'keto' | 'high-protein' | 'low-carb' | 'gluten-free';

export type CuisineCategory =
  | 'Indian Cuisine'
  | 'Continental'
  | 'Asian'
  | 'Salads'
  | 'Protein Bowls'
  | 'Healthy Drinks'
  | 'Smoothies'
  | 'Desserts'
  | 'Pastries';

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: CuisineCategory;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  vitamins: string[];
  allergens: string[];
  dietaryTags: DietaryTag[];
  pricePerServing: number;
  servingSize: string;
  servingGrams: number;
  image?: string;
  description: string;
  isPopular?: boolean;
}

export interface CartItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
}

export interface MealEntry {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: Date;
}

export interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface UserProfile {
  name: string;
  goal: 'lean-bulk' | 'fat-loss' | 'maintain' | 'muscle-gain';
  dailyGoal: DailyGoal;
  allergies: string[];
  dietaryPreferences: DietaryTag[];
}

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

export const ALLERGY_LIST = [
  'Gluten', 'Dairy', 'Nuts', 'Peanuts', 'Soy', 'Eggs', 'Fish', 'Shellfish', 'Sesame', 'Sulfites'
];

export const DIETARY_FILTERS: { id: DietaryTag; label: string; emoji: string }[] = [
  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { id: 'keto', label: 'Keto', emoji: '🥑' },
  { id: 'high-protein', label: 'High Protein', emoji: '💪' },
  { id: 'low-carb', label: 'Low Carb', emoji: '🔥' },
  { id: 'gluten-free', label: 'Gluten Free', emoji: '🌾' },
];

export const CUISINE_CATEGORIES: { id: CuisineCategory; emoji: string }[] = [
  { id: 'Indian Cuisine', emoji: '🇮🇳' },
  { id: 'Continental', emoji: '🍽️' },
  { id: 'Asian', emoji: '🥢' },
  { id: 'Salads', emoji: '🥗' },
  { id: 'Protein Bowls', emoji: '🥣' },
  { id: 'Healthy Drinks', emoji: '🍵' },
  { id: 'Smoothies', emoji: '🥤' },
  { id: 'Desserts', emoji: '🍫' },
  { id: 'Pastries', emoji: '🥐' },
];

export const FITNESS_GOALS = [
  { id: 'lean-bulk', label: 'Lean Bulk', description: 'Build muscle with minimal fat gain', icon: '💪' },
  { id: 'fat-loss', label: 'Fat Loss', description: 'Lose fat while preserving muscle', icon: '🔥' },
  { id: 'maintain', label: 'Maintain', description: 'Keep current weight and composition', icon: '⚖️' },
  { id: 'muscle-gain', label: 'Muscle Gain', description: 'Maximize muscle growth', icon: '🏋️' },
] as const;

export const GOAL_DEFAULTS: Record<string, DailyGoal> = {
  'lean-bulk': { calories: 2800, protein: 180, carbs: 320, fats: 80 },
  'fat-loss': { calories: 1800, protein: 160, carbs: 150, fats: 60 },
  'maintain': { calories: 2200, protein: 140, carbs: 250, fats: 70 },
  'muscle-gain': { calories: 3200, protein: 200, carbs: 380, fats: 90 },
};
