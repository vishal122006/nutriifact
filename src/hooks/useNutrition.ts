import { useState, useCallback } from 'react';
import { MealEntry, FoodItem, UserProfile, DailyGoal, GOAL_DEFAULTS } from '@/types/nutrition';

const DEFAULT_PROFILE: UserProfile = {
  name: 'User',
  goal: 'maintain',
  dailyGoal: GOAL_DEFAULTS['maintain'],
  allergies: [],
};

export function useNutrition() {
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const addMeal = useCallback((foodItem: FoodItem, quantity: number, mealType: MealEntry['mealType']) => {
    const entry: MealEntry = {
      id: crypto.randomUUID(),
      foodItem,
      quantity,
      mealType,
      timestamp: new Date(),
    };
    setMeals(prev => [...prev, entry]);
  }, []);

  const removeMeal = useCallback((id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  }, []);

  const todaysMeals = meals.filter(m => {
    const today = new Date();
    return m.timestamp.toDateString() === today.toDateString();
  });

  const dailyTotals = todaysMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.foodItem.calories * m.quantity,
      protein: acc.protein + m.foodItem.protein * m.quantity,
      carbs: acc.carbs + m.foodItem.carbs * m.quantity,
      fats: acc.fats + m.foodItem.fats * m.quantity,
      cost: acc.cost + m.foodItem.pricePerServing * m.quantity,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0, cost: 0 }
  );

  const updateGoal = useCallback((goal: UserProfile['goal']) => {
    setProfile(prev => ({
      ...prev,
      goal,
      dailyGoal: GOAL_DEFAULTS[goal],
    }));
  }, []);

  const updateAllergies = useCallback((allergies: string[]) => {
    setProfile(prev => ({ ...prev, allergies }));
  }, []);

  return {
    meals: todaysMeals,
    allMeals: meals,
    dailyTotals,
    profile,
    addMeal,
    removeMeal,
    updateGoal,
    updateAllergies,
  };
}
