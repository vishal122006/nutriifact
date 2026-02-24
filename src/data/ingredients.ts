import { Ingredient } from '@/types/nutrition';

// Reusable ingredient library keyed by food ID
export const foodIngredients: Record<string, Ingredient[]> = {
  'ind-1': [ // Butter Chicken
    { id: 'bc-chicken', name: 'Chicken Breast', emoji: '🍗', calories: 220, protein: 26, carbs: 0, fats: 8, price: 0, isDefault: true, isRemovable: false },
    { id: 'bc-butter', name: 'Butter Sauce', emoji: '🧈', calories: 120, protein: 1, carbs: 6, fats: 10, price: 0, isDefault: true, isRemovable: true },
    { id: 'bc-cream', name: 'Fresh Cream', emoji: '🥛', calories: 60, protein: 1, carbs: 2, fats: 6, price: 0, isDefault: true, isRemovable: true },
    { id: 'bc-naan', name: 'Whole Wheat Naan', emoji: '🫓', calories: 80, protein: 3, carbs: 14, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'bc-xnaan', name: 'Extra Naan', emoji: '🫓', calories: 80, protein: 3, carbs: 14, fats: 2, price: 30, isDefault: false, isRemovable: false },
    { id: 'bc-rice', name: 'Steamed Rice', emoji: '🍚', calories: 130, protein: 3, carbs: 28, fats: 0.5, price: 40, isDefault: false, isRemovable: false },
    { id: 'bc-raita', name: 'Cucumber Raita', emoji: '🥒', calories: 45, protein: 2, carbs: 4, fats: 2, price: 25, isDefault: false, isRemovable: false },
  ],
  'ind-4': [ // Chicken Biryani
    { id: 'bi-chicken', name: 'Spiced Chicken', emoji: '🍗', calories: 240, protein: 24, carbs: 2, fats: 14, price: 0, isDefault: true, isRemovable: false },
    { id: 'bi-rice', name: 'Basmati Rice', emoji: '🍚', calories: 200, protein: 4, carbs: 44, fats: 1, price: 0, isDefault: true, isRemovable: false },
    { id: 'bi-saffron', name: 'Saffron & Spices', emoji: '🧡', calories: 15, protein: 0, carbs: 3, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'bi-raita', name: 'Raita', emoji: '🥒', calories: 45, protein: 2, carbs: 4, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'bi-egg', name: 'Boiled Egg', emoji: '🥚', calories: 70, protein: 6, carbs: 0.5, fats: 5, price: 20, isDefault: false, isRemovable: false },
    { id: 'bi-mirchi', name: 'Green Chilli Salna', emoji: '🌶️', calories: 30, protein: 1, carbs: 5, fats: 1, price: 15, isDefault: false, isRemovable: false },
  ],
  'con-1': [ // Grilled Salmon
    { id: 'gs-salmon', name: 'Atlantic Salmon', emoji: '🐟', calories: 230, protein: 30, carbs: 0, fats: 14, price: 0, isDefault: true, isRemovable: false },
    { id: 'gs-asparagus', name: 'Grilled Asparagus', emoji: '🌿', calories: 40, protein: 3, carbs: 4, fats: 1, price: 0, isDefault: true, isRemovable: true },
    { id: 'gs-lemonbutter', name: 'Lemon Butter', emoji: '🍋', calories: 80, protein: 0, carbs: 1, fats: 9, price: 0, isDefault: true, isRemovable: true },
    { id: 'gs-quinoa', name: 'Quinoa Side', emoji: '🌾', calories: 120, protein: 4, carbs: 21, fats: 2, price: 40, isDefault: false, isRemovable: false },
    { id: 'gs-avocado', name: 'Avocado Slices', emoji: '🥑', calories: 80, protein: 1, carbs: 4, fats: 7, price: 50, isDefault: false, isRemovable: false },
    { id: 'gs-xsalmon', name: 'Extra Salmon 50g', emoji: '🐟', calories: 100, protein: 13, carbs: 0, fats: 6, price: 120, isDefault: false, isRemovable: false },
  ],
  'asi-3': [ // Salmon Poke Bowl
    { id: 'pk-salmon', name: 'Raw Salmon', emoji: '🍣', calories: 150, protein: 20, carbs: 0, fats: 7, price: 0, isDefault: true, isRemovable: false },
    { id: 'pk-rice', name: 'Sushi Rice', emoji: '🍚', calories: 150, protein: 3, carbs: 33, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'pk-avocado', name: 'Avocado', emoji: '🥑', calories: 60, protein: 1, carbs: 3, fats: 5, price: 0, isDefault: true, isRemovable: true },
    { id: 'pk-edamame', name: 'Edamame', emoji: '🫛', calories: 50, protein: 5, carbs: 4, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'pk-mango', name: 'Fresh Mango', emoji: '🥭', calories: 40, protein: 0.5, carbs: 10, fats: 0, price: 30, isDefault: false, isRemovable: false },
    { id: 'pk-tofu', name: 'Crispy Tofu', emoji: '🫘', calories: 90, protein: 8, carbs: 4, fats: 5, price: 40, isDefault: false, isRemovable: false },
    { id: 'pk-spicymayo', name: 'Spicy Mayo Drizzle', emoji: '🌶️', calories: 70, protein: 0, carbs: 1, fats: 7, price: 20, isDefault: false, isRemovable: false },
  ],
  'sal-1': [ // Caesar Salad
    { id: 'cs-romaine', name: 'Romaine Lettuce', emoji: '🥬', calories: 20, protein: 1, carbs: 3, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'cs-chicken', name: 'Grilled Chicken', emoji: '🍗', calories: 140, protein: 20, carbs: 0, fats: 6, price: 0, isDefault: true, isRemovable: true },
    { id: 'cs-parmesan', name: 'Parmesan Cheese', emoji: '🧀', calories: 50, protein: 4, carbs: 0.5, fats: 3.5, price: 0, isDefault: true, isRemovable: true },
    { id: 'cs-croutons', name: 'Croutons', emoji: '🍞', calories: 50, protein: 1, carbs: 8, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'cs-egg', name: 'Boiled Egg', emoji: '🥚', calories: 70, protein: 6, carbs: 0.5, fats: 5, price: 25, isDefault: false, isRemovable: false },
    { id: 'cs-bacon', name: 'Turkey Bacon', emoji: '🥓', calories: 60, protein: 5, carbs: 1, fats: 4, price: 40, isDefault: false, isRemovable: false },
  ],
  'pro-1': [ // Chicken Quinoa Bowl
    { id: 'cq-chicken', name: 'Grilled Chicken', emoji: '🍗', calories: 180, protein: 28, carbs: 0, fats: 6, price: 0, isDefault: true, isRemovable: false },
    { id: 'cq-quinoa', name: 'Quinoa', emoji: '🌾', calories: 140, protein: 5, carbs: 24, fats: 2, price: 0, isDefault: true, isRemovable: false },
    { id: 'cq-chickpeas', name: 'Chickpeas', emoji: '🫘', calories: 80, protein: 5, carbs: 13, fats: 1, price: 0, isDefault: true, isRemovable: true },
    { id: 'cq-veggies', name: 'Roasted Veggies', emoji: '🥦', calories: 50, protein: 2, carbs: 8, fats: 1.5, price: 0, isDefault: true, isRemovable: true },
    { id: 'cq-tahini', name: 'Tahini Dressing', emoji: '🥄', calories: 60, protein: 2, carbs: 3, fats: 5, price: 0, isDefault: true, isRemovable: true },
    { id: 'cq-avocado', name: 'Avocado', emoji: '🥑', calories: 80, protein: 1, carbs: 4, fats: 7, price: 50, isDefault: false, isRemovable: false },
    { id: 'cq-feta', name: 'Crumbled Feta', emoji: '🧀', calories: 50, protein: 3, carbs: 1, fats: 4, price: 35, isDefault: false, isRemovable: false },
  ],
  'smo-1': [ // Smoothie Bowl
    { id: 'sb-spinach', name: 'Spinach Base', emoji: '🥬', calories: 30, protein: 3, carbs: 4, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'sb-banana', name: 'Banana', emoji: '🍌', calories: 90, protein: 1, carbs: 22, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'sb-granola', name: 'Granola', emoji: '🥣', calories: 80, protein: 2, carbs: 14, fats: 3, price: 0, isDefault: true, isRemovable: true },
    { id: 'sb-berries', name: 'Mixed Berries', emoji: '🫐', calories: 40, protein: 1, carbs: 9, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'sb-chia', name: 'Chia Seeds', emoji: '🫧', calories: 30, protein: 2, carbs: 3, fats: 2, price: 15, isDefault: false, isRemovable: false },
    { id: 'sb-peanutbutter', name: 'Peanut Butter', emoji: '🥜', calories: 95, protein: 4, carbs: 3, fats: 8, price: 25, isDefault: false, isRemovable: false },
    { id: 'sb-protein', name: 'Whey Protein Scoop', emoji: '💪', calories: 120, protein: 25, carbs: 2, fats: 1, price: 40, isDefault: false, isRemovable: false },
  ],

  // === PANEER TIKKA ===
  'ind-2': [
    { id: 'pt-paneer', name: 'Paneer Cubes', emoji: '🧀', calories: 180, protein: 14, carbs: 2, fats: 13, price: 0, isDefault: true, isRemovable: false },
    { id: 'pt-marinade', name: 'Tandoori Marinade', emoji: '🌶️', calories: 40, protein: 1, carbs: 3, fats: 2, price: 0, isDefault: true, isRemovable: false },
    { id: 'pt-peppers', name: 'Bell Peppers', emoji: '🫑', calories: 25, protein: 1, carbs: 5, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'pt-onion', name: 'Grilled Onion', emoji: '🧅', calories: 20, protein: 0.5, carbs: 4, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'pt-chutney', name: 'Mint Chutney', emoji: '🌿', calories: 15, protein: 0.5, carbs: 2, fats: 0.5, price: 15, isDefault: false, isRemovable: false },
    { id: 'pt-rumali', name: 'Rumali Roti', emoji: '🫓', calories: 90, protein: 3, carbs: 16, fats: 2, price: 30, isDefault: false, isRemovable: false },
  ],

  // === DAL TADKA ===
  'ind-3': [
    { id: 'dt-dal', name: 'Yellow Lentils', emoji: '🍲', calories: 120, protein: 10, carbs: 18, fats: 1, price: 0, isDefault: true, isRemovable: false },
    { id: 'dt-tadka', name: 'Cumin-Garlic Tadka', emoji: '🧄', calories: 40, protein: 1, carbs: 2, fats: 3, price: 0, isDefault: true, isRemovable: false },
    { id: 'dt-roti', name: 'Wheat Roti', emoji: '🫓', calories: 70, protein: 3, carbs: 12, fats: 1.5, price: 0, isDefault: true, isRemovable: true },
    { id: 'dt-rice', name: 'Steamed Rice', emoji: '🍚', calories: 130, protein: 3, carbs: 28, fats: 0.5, price: 30, isDefault: false, isRemovable: false },
    { id: 'dt-ghee', name: 'Ghee Drizzle', emoji: '🧈', calories: 45, protein: 0, carbs: 0, fats: 5, price: 15, isDefault: false, isRemovable: false },
    { id: 'dt-pickle', name: 'Mango Pickle', emoji: '🥭', calories: 15, protein: 0, carbs: 3, fats: 0.5, price: 10, isDefault: false, isRemovable: false },
  ],

  // === MUSHROOM RISOTTO ===
  'con-2': [
    { id: 'mr-rice', name: 'Arborio Rice', emoji: '🍚', calories: 200, protein: 4, carbs: 40, fats: 2, price: 0, isDefault: true, isRemovable: false },
    { id: 'mr-mushroom', name: 'Wild Mushrooms', emoji: '🍄', calories: 30, protein: 2, carbs: 4, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'mr-parmesan', name: 'Parmesan', emoji: '🧀', calories: 60, protein: 4, carbs: 0.5, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'mr-butter', name: 'Butter Finish', emoji: '🧈', calories: 50, protein: 0, carbs: 0, fats: 6, price: 0, isDefault: true, isRemovable: true },
    { id: 'mr-truffle', name: 'Truffle Oil', emoji: '🫒', calories: 40, protein: 0, carbs: 0, fats: 4.5, price: 60, isDefault: false, isRemovable: false },
    { id: 'mr-asparagus', name: 'Grilled Asparagus', emoji: '🌿', calories: 25, protein: 2, carbs: 3, fats: 0.5, price: 35, isDefault: false, isRemovable: false },
  ],

  // === GRILLED CHICKEN STEAK ===
  'con-3': [
    { id: 'gcs-chicken', name: 'Chicken Breast', emoji: '🥩', calories: 200, protein: 32, carbs: 0, fats: 8, price: 0, isDefault: true, isRemovable: false },
    { id: 'gcs-herbs', name: 'Herb Marinade', emoji: '🌿', calories: 30, protein: 0, carbs: 2, fats: 2.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'gcs-mash', name: 'Mashed Potatoes', emoji: '🥔', calories: 110, protein: 2, carbs: 18, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'gcs-gravy', name: 'Pepper Gravy', emoji: '🫗', calories: 35, protein: 1, carbs: 3, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'gcs-cheese', name: 'Cheese Melt', emoji: '🧀', calories: 80, protein: 5, carbs: 1, fats: 6, price: 40, isDefault: false, isRemovable: false },
    { id: 'gcs-veggies', name: 'Sautéed Veggies', emoji: '🥦', calories: 45, protein: 2, carbs: 6, fats: 1.5, price: 30, isDefault: false, isRemovable: false },
  ],

  // === PAD THAI ===
  'asi-1': [
    { id: 'pdt-noodles', name: 'Rice Noodles', emoji: '🍜', calories: 180, protein: 3, carbs: 40, fats: 1, price: 0, isDefault: true, isRemovable: false },
    { id: 'pdt-shrimp', name: 'Shrimp', emoji: '🦐', calories: 90, protein: 12, carbs: 1, fats: 1.5, price: 0, isDefault: true, isRemovable: true },
    { id: 'pdt-peanuts', name: 'Crushed Peanuts', emoji: '🥜', calories: 50, protein: 2, carbs: 2, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'pdt-tamarind', name: 'Tamarind Sauce', emoji: '🫙', calories: 40, protein: 0, carbs: 9, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'pdt-egg', name: 'Fried Egg', emoji: '🥚', calories: 70, protein: 6, carbs: 0.5, fats: 5, price: 20, isDefault: false, isRemovable: false },
    { id: 'pdt-tofu', name: 'Crispy Tofu', emoji: '🫘', calories: 80, protein: 7, carbs: 3, fats: 4, price: 30, isDefault: false, isRemovable: false },
  ],

  // === TERIYAKI TOFU BOWL ===
  'asi-2': [
    { id: 'tt-tofu', name: 'Glazed Tofu', emoji: '🫘', calories: 130, protein: 12, carbs: 8, fats: 5, price: 0, isDefault: true, isRemovable: false },
    { id: 'tt-rice', name: 'Steamed Rice', emoji: '🍚', calories: 130, protein: 3, carbs: 28, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'tt-edamame', name: 'Edamame', emoji: '🫛', calories: 50, protein: 5, carbs: 4, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'tt-ginger', name: 'Pickled Ginger', emoji: '🫚', calories: 10, protein: 0, carbs: 2, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'tt-avocado', name: 'Avocado Slices', emoji: '🥑', calories: 60, protein: 1, carbs: 3, fats: 5, price: 40, isDefault: false, isRemovable: false },
    { id: 'tt-seaweed', name: 'Seaweed Salad', emoji: '🥬', calories: 30, protein: 1, carbs: 4, fats: 1, price: 25, isDefault: false, isRemovable: false },
  ],

  // === QUINOA POWER SALAD ===
  'sal-2': [
    { id: 'qs-quinoa', name: 'Quinoa', emoji: '🌾', calories: 120, protein: 5, carbs: 20, fats: 2, price: 0, isDefault: true, isRemovable: false },
    { id: 'qs-veggies', name: 'Roasted Veggies', emoji: '🥦', calories: 60, protein: 2, carbs: 8, fats: 2, price: 0, isDefault: true, isRemovable: false },
    { id: 'qs-chickpeas', name: 'Chickpeas', emoji: '🫘', calories: 70, protein: 4, carbs: 11, fats: 1.5, price: 0, isDefault: true, isRemovable: true },
    { id: 'qs-tahini', name: 'Lemon-Tahini Dressing', emoji: '🍋', calories: 60, protein: 2, carbs: 3, fats: 5, price: 0, isDefault: true, isRemovable: true },
    { id: 'qs-feta', name: 'Feta Cheese', emoji: '🧀', calories: 50, protein: 3, carbs: 1, fats: 4, price: 35, isDefault: false, isRemovable: false },
    { id: 'qs-seeds', name: 'Pumpkin Seeds', emoji: '🎃', calories: 40, protein: 2, carbs: 1, fats: 3.5, price: 20, isDefault: false, isRemovable: false },
  ],

  // === GREEK SALAD ===
  'sal-3': [
    { id: 'gk-cucumber', name: 'Cucumber', emoji: '🥒', calories: 15, protein: 0.5, carbs: 3, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'gk-tomato', name: 'Tomatoes', emoji: '🍅', calories: 20, protein: 1, carbs: 4, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'gk-olives', name: 'Kalamata Olives', emoji: '🫒', calories: 40, protein: 0.5, carbs: 1, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'gk-feta', name: 'Feta Cheese', emoji: '🧀', calories: 60, protein: 4, carbs: 1, fats: 5, price: 0, isDefault: true, isRemovable: true },
    { id: 'gk-oliveoil', name: 'Extra Virgin Olive Oil', emoji: '🫒', calories: 45, protein: 0, carbs: 0, fats: 5, price: 0, isDefault: true, isRemovable: true },
    { id: 'gk-avocado', name: 'Avocado', emoji: '🥑', calories: 60, protein: 1, carbs: 3, fats: 5, price: 40, isDefault: false, isRemovable: false },
  ],

  // === EGG & AVOCADO BOWL ===
  'pro-2': [
    { id: 'ea-eggs', name: 'Poached Eggs', emoji: '🥚', calories: 140, protein: 12, carbs: 1, fats: 10, price: 0, isDefault: true, isRemovable: false },
    { id: 'ea-avocado', name: 'Smashed Avocado', emoji: '🥑', calories: 120, protein: 1.5, carbs: 6, fats: 11, price: 0, isDefault: true, isRemovable: false },
    { id: 'ea-tomatoes', name: 'Cherry Tomatoes', emoji: '🍅', calories: 20, protein: 1, carbs: 4, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'ea-seeds', name: 'Mixed Seeds', emoji: '🌻', calories: 50, protein: 2, carbs: 2, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'ea-bacon', name: 'Turkey Bacon', emoji: '🥓', calories: 60, protein: 5, carbs: 1, fats: 4, price: 40, isDefault: false, isRemovable: false },
    { id: 'ea-sourdough', name: 'Sourdough Toast', emoji: '🍞', calories: 80, protein: 3, carbs: 14, fats: 1, price: 25, isDefault: false, isRemovable: false },
  ],

  // === TOFU POWER BOWL ===
  'pro-3': [
    { id: 'tp-tofu', name: 'Crispy Tofu', emoji: '🫘', calories: 130, protein: 12, carbs: 5, fats: 7, price: 0, isDefault: true, isRemovable: false },
    { id: 'tp-rice', name: 'Brown Rice', emoji: '🍚', calories: 130, protein: 3, carbs: 26, fats: 1, price: 0, isDefault: true, isRemovable: false },
    { id: 'tp-broccoli', name: 'Roasted Broccoli', emoji: '🥦', calories: 40, protein: 3, carbs: 5, fats: 1, price: 0, isDefault: true, isRemovable: true },
    { id: 'tp-peanut', name: 'Peanut Sauce', emoji: '🥜', calories: 60, protein: 2, carbs: 4, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'tp-kimchi', name: 'Kimchi', emoji: '🌶️', calories: 15, protein: 1, carbs: 2, fats: 0.5, price: 20, isDefault: false, isRemovable: false },
    { id: 'tp-egg', name: 'Soft Boiled Egg', emoji: '🥚', calories: 70, protein: 6, carbs: 0.5, fats: 5, price: 25, isDefault: false, isRemovable: false },
  ],

  // === MATCHA LATTE ===
  'drk-1': [
    { id: 'ml-matcha', name: 'Ceremonial Matcha', emoji: '🍵', calories: 10, protein: 1, carbs: 1, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'ml-oatmilk', name: 'Oat Milk', emoji: '🥛', calories: 60, protein: 2, carbs: 9, fats: 2.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'ml-honey', name: 'Honey', emoji: '🍯', calories: 30, protein: 0, carbs: 8, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'ml-vanilla', name: 'Vanilla Shot', emoji: '🌸', calories: 20, protein: 0, carbs: 4, fats: 0, price: 15, isDefault: false, isRemovable: false },
    { id: 'ml-collagen', name: 'Collagen Powder', emoji: '💪', calories: 35, protein: 8, carbs: 0, fats: 0, price: 30, isDefault: false, isRemovable: false },
  ],

  // === COLD PRESS GREEN JUICE ===
  'drk-2': [
    { id: 'gj-spinach', name: 'Spinach', emoji: '🥬', calories: 10, protein: 1, carbs: 1, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'gj-celery', name: 'Celery', emoji: '🥒', calories: 10, protein: 0.5, carbs: 2, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'gj-apple', name: 'Green Apple', emoji: '🍏', calories: 40, protein: 0, carbs: 10, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'gj-ginger', name: 'Ginger', emoji: '🫚', calories: 5, protein: 0, carbs: 1, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'gj-lemon', name: 'Lemon', emoji: '🍋', calories: 5, protein: 0, carbs: 1, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'gj-turmeric', name: 'Turmeric Shot', emoji: '🧡', calories: 10, protein: 0.5, carbs: 2, fats: 0, price: 20, isDefault: false, isRemovable: false },
  ],

  // === PROTEIN SHAKE ===
  'drk-3': [
    { id: 'ps-whey', name: 'Whey Protein', emoji: '💪', calories: 120, protein: 25, carbs: 3, fats: 1.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'ps-banana', name: 'Banana', emoji: '🍌', calories: 50, protein: 0.5, carbs: 12, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'ps-oats', name: 'Oats', emoji: '🥣', calories: 40, protein: 2, carbs: 7, fats: 1, price: 0, isDefault: true, isRemovable: true },
    { id: 'ps-almondmilk', name: 'Almond Milk', emoji: '🥛', calories: 30, protein: 1, carbs: 1, fats: 2.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'ps-peanutbutter', name: 'Peanut Butter', emoji: '🥜', calories: 95, protein: 4, carbs: 3, fats: 8, price: 25, isDefault: false, isRemovable: false },
    { id: 'ps-creatine', name: 'Creatine Scoop', emoji: '⚡', calories: 0, protein: 0, carbs: 0, fats: 0, price: 20, isDefault: false, isRemovable: false },
  ],

  // === BERRY BLAST SMOOTHIE ===
  'smo-2': [
    { id: 'bb-berries', name: 'Mixed Berries', emoji: '🫐', calories: 60, protein: 1, carbs: 14, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'bb-banana', name: 'Banana', emoji: '🍌', calories: 50, protein: 0.5, carbs: 12, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'bb-yogurt', name: 'Greek Yogurt', emoji: '🥛', calories: 50, protein: 5, carbs: 3, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'bb-honey', name: 'Honey', emoji: '🍯', calories: 30, protein: 0, carbs: 8, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'bb-chia', name: 'Chia Seeds', emoji: '🫧', calories: 25, protein: 1.5, carbs: 2, fats: 1.5, price: 15, isDefault: false, isRemovable: false },
    { id: 'bb-protein', name: 'Protein Boost', emoji: '💪', calories: 60, protein: 12, carbs: 2, fats: 0.5, price: 30, isDefault: false, isRemovable: false },
  ],

  // === MANGO PROTEIN SMOOTHIE ===
  'smo-3': [
    { id: 'mp-mango', name: 'Fresh Mango', emoji: '🥭', calories: 80, protein: 1, carbs: 20, fats: 0, price: 0, isDefault: true, isRemovable: false },
    { id: 'mp-whey', name: 'Whey Protein', emoji: '💪', calories: 100, protein: 20, carbs: 3, fats: 1, price: 0, isDefault: true, isRemovable: false },
    { id: 'mp-yogurt', name: 'Yogurt', emoji: '🥛', calories: 50, protein: 3, carbs: 4, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'mp-turmeric', name: 'Turmeric', emoji: '🧡', calories: 5, protein: 0, carbs: 1, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'mp-collagen', name: 'Collagen Powder', emoji: '✨', calories: 35, protein: 8, carbs: 0, fats: 0, price: 30, isDefault: false, isRemovable: false },
    { id: 'mp-spirulina', name: 'Spirulina', emoji: '🌿', calories: 10, protein: 2, carbs: 1, fats: 0, price: 20, isDefault: false, isRemovable: false },
  ],

  // === AVOCADO CHOCOLATE MOUSSE ===
  'des-1': [
    { id: 'am-avocado', name: 'Avocado Base', emoji: '🥑', calories: 80, protein: 1, carbs: 4, fats: 7, price: 0, isDefault: true, isRemovable: false },
    { id: 'am-cacao', name: 'Raw Cacao', emoji: '🍫', calories: 60, protein: 2, carbs: 8, fats: 3, price: 0, isDefault: true, isRemovable: false },
    { id: 'am-maple', name: 'Maple Syrup', emoji: '🍁', calories: 40, protein: 0, carbs: 10, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'am-coconut', name: 'Coconut Cream', emoji: '🥥', calories: 40, protein: 0.5, carbs: 1, fats: 4, price: 0, isDefault: true, isRemovable: true },
    { id: 'am-berries', name: 'Fresh Berries', emoji: '🍓', calories: 25, protein: 0.5, carbs: 5, fats: 0, price: 25, isDefault: false, isRemovable: false },
    { id: 'am-nuts', name: 'Crushed Almonds', emoji: '🌰', calories: 40, protein: 1.5, carbs: 1, fats: 3.5, price: 20, isDefault: false, isRemovable: false },
  ],

  // === GREEK YOGURT PARFAIT ===
  'des-2': [
    { id: 'yp-yogurt', name: 'Greek Yogurt', emoji: '🥛', calories: 100, protein: 12, carbs: 6, fats: 3, price: 0, isDefault: true, isRemovable: false },
    { id: 'yp-honey', name: 'Honey Drizzle', emoji: '🍯', calories: 40, protein: 0, carbs: 10, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'yp-granola', name: 'Granola', emoji: '🥣', calories: 60, protein: 2, carbs: 10, fats: 2, price: 0, isDefault: true, isRemovable: true },
    { id: 'yp-fruits', name: 'Fresh Fruits', emoji: '🍇', calories: 40, protein: 0.5, carbs: 9, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'yp-nuts', name: 'Mixed Nuts', emoji: '🥜', calories: 50, protein: 2, carbs: 2, fats: 4, price: 25, isDefault: false, isRemovable: false },
    { id: 'yp-protein', name: 'Protein Powder', emoji: '💪', calories: 60, protein: 12, carbs: 1, fats: 0.5, price: 30, isDefault: false, isRemovable: false },
  ],

  // === CHIA PUDDING ===
  'des-3': [
    { id: 'cp-chia', name: 'Chia Seeds', emoji: '🫧', calories: 70, protein: 3, carbs: 6, fats: 4, price: 0, isDefault: true, isRemovable: false },
    { id: 'cp-coconutmilk', name: 'Coconut Milk', emoji: '🥥', calories: 60, protein: 1, carbs: 3, fats: 5, price: 0, isDefault: true, isRemovable: false },
    { id: 'cp-mango', name: 'Fresh Mango', emoji: '🥭', calories: 40, protein: 0.5, carbs: 10, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'cp-honey', name: 'Agave Nectar', emoji: '🍯', calories: 25, protein: 0, carbs: 6, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'cp-granola', name: 'Crunchy Granola', emoji: '🥣', calories: 50, protein: 1, carbs: 8, fats: 2, price: 20, isDefault: false, isRemovable: false },
    { id: 'cp-berries', name: 'Mixed Berries', emoji: '🫐', calories: 30, protein: 0.5, carbs: 6, fats: 0, price: 20, isDefault: false, isRemovable: false },
  ],

  // === ALMOND CROISSANT ===
  'pas-1': [
    { id: 'ac-pastry', name: 'Butter Croissant', emoji: '🥐', calories: 200, protein: 4, carbs: 22, fats: 11, price: 0, isDefault: true, isRemovable: false },
    { id: 'ac-almond', name: 'Almond Cream Fill', emoji: '🌰', calories: 100, protein: 3, carbs: 8, fats: 7, price: 0, isDefault: true, isRemovable: false },
    { id: 'ac-almondflake', name: 'Almond Flakes', emoji: '🥜', calories: 30, protein: 1, carbs: 1, fats: 2.5, price: 0, isDefault: true, isRemovable: true },
    { id: 'ac-powdersugar', name: 'Powdered Sugar', emoji: '✨', calories: 20, protein: 0, carbs: 5, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'ac-chocolate', name: 'Chocolate Drizzle', emoji: '🍫', calories: 40, protein: 0.5, carbs: 5, fats: 2, price: 20, isDefault: false, isRemovable: false },
    { id: 'ac-icecream', name: 'Vanilla Ice Cream', emoji: '🍦', calories: 80, protein: 1, carbs: 10, fats: 4, price: 40, isDefault: false, isRemovable: false },
  ],

  // === PROTEIN BANANA BREAD ===
  'pas-2': [
    { id: 'pb-bread', name: 'Banana Bread Base', emoji: '🍞', calories: 140, protein: 6, carbs: 20, fats: 4, price: 0, isDefault: true, isRemovable: false },
    { id: 'pb-whey', name: 'Whey Protein', emoji: '💪', calories: 50, protein: 10, carbs: 1, fats: 0.5, price: 0, isDefault: true, isRemovable: false },
    { id: 'pb-walnuts', name: 'Walnuts', emoji: '🥜', calories: 35, protein: 1, carbs: 1, fats: 3, price: 0, isDefault: true, isRemovable: true },
    { id: 'pb-butter', name: 'Butter Spread', emoji: '🧈', calories: 40, protein: 0, carbs: 0, fats: 4.5, price: 15, isDefault: false, isRemovable: false },
    { id: 'pb-honey', name: 'Honey Drizzle', emoji: '🍯', calories: 30, protein: 0, carbs: 8, fats: 0, price: 10, isDefault: false, isRemovable: false },
  ],

  // === OAT COOKIE ===
  'pas-3': [
    { id: 'oc-oats', name: 'Rolled Oats Base', emoji: '🍪', calories: 80, protein: 2, carbs: 14, fats: 2, price: 0, isDefault: true, isRemovable: false },
    { id: 'oc-chocolate', name: 'Dark Chocolate Chips', emoji: '🍫', calories: 45, protein: 1, carbs: 5, fats: 3, price: 0, isDefault: true, isRemovable: true },
    { id: 'oc-raisins', name: 'Raisins', emoji: '🍇', calories: 30, protein: 0.5, carbs: 7, fats: 0, price: 0, isDefault: true, isRemovable: true },
    { id: 'oc-xchoc', name: 'Extra Chocolate Chips', emoji: '🍫', calories: 45, protein: 1, carbs: 5, fats: 3, price: 15, isDefault: false, isRemovable: false },
    { id: 'oc-nuts', name: 'Cashew Pieces', emoji: '🥜', calories: 40, protein: 1, carbs: 2, fats: 3, price: 20, isDefault: false, isRemovable: false },
  ],
};
