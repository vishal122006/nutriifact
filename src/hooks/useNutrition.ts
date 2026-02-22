import { useState, useCallback, useMemo } from 'react';
import { CartItem, FoodItem, UserProfile, DailyGoal, DietaryTag, GOAL_DEFAULTS } from '@/types/nutrition';

const DEFAULT_PROFILE: UserProfile = {
  name: 'User',
  goal: 'maintain',
  dailyGoal: GOAL_DEFAULTS['maintain'],
  allergies: [],
  dietaryPreferences: [],
};

export function useNutrition() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const addToCart = useCallback((foodItem: FoodItem, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.foodItem.id === foodItem.id);
      if (existing) {
        return prev.map(c => c.foodItem.id === foodItem.id ? { ...c, quantity: c.quantity + quantity } : c);
      }
      return [...prev, { id: crypto.randomUUID(), foodItem, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(c => c.id !== id));
    } else {
      setCart(prev => prev.map(c => c.id === id ? { ...c, quantity } : c));
    }
  }, []);

  const cartTotals = useMemo(() =>
    cart.reduce(
      (acc, c) => ({
        calories: acc.calories + c.foodItem.calories * c.quantity,
        protein: acc.protein + c.foodItem.protein * c.quantity,
        carbs: acc.carbs + c.foodItem.carbs * c.quantity,
        fats: acc.fats + c.foodItem.fats * c.quantity,
        cost: acc.cost + c.foodItem.pricePerServing * c.quantity,
        items: acc.items + c.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, cost: 0, items: 0 }
    ), [cart]);

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

  const updateDietaryPreferences = useCallback((dietaryPreferences: DietaryTag[]) => {
    setProfile(prev => ({ ...prev, dietaryPreferences }));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return {
    cart,
    cartTotals,
    profile,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    updateGoal,
    updateAllergies,
    updateDietaryPreferences,
  };
}
