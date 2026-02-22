import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, Plus, DollarSign, Info } from 'lucide-react';
import { foodDatabase, foodCategories } from '@/data/foods';
import { FoodItem, MealEntry } from '@/types/nutrition';

interface Props {
  onAddFood: (food: FoodItem, qty: number, meal: MealEntry['mealType']) => void;
  userAllergies: string[];
}

export default function FoodSelector({ onAddFood, userAllergies }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<MealEntry['mealType']>('lunch');

  const filtered = foodDatabase.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || f.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const hasAllergyRisk = (food: FoodItem) =>
    food.allergens.some(a => userAllergies.includes(a));

  const handleAdd = () => {
    if (selectedFood) {
      onAddFood(selectedFood, quantity, mealType);
      setSelectedFood(null);
      setQuantity(1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search foods..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            !selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
        >
          All
        </button>
        {foodCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Detail Modal */}
      <AnimatePresence>
        {selectedFood && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-2xl p-5 border border-border nutri-shadow-card space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedFood.emoji}</span>
                <div>
                  <h3 className="font-display font-bold text-foreground">{selectedFood.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedFood.servingSize}</p>
                </div>
              </div>
              <button onClick={() => setSelectedFood(null)} className="text-muted-foreground hover:text-foreground text-xl">&times;</button>
            </div>

            {hasAllergyRisk(selectedFood) && (
              <div className="flex items-center gap-2 bg-nutri-red-light text-nutri-red rounded-xl px-4 py-2.5 text-sm font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Allergy alert: {selectedFood.allergens.filter(a => userAllergies.includes(a)).join(', ')}</span>
              </div>
            )}

            {/* Nutrition grid */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Calories', value: `${Math.round(selectedFood.calories * quantity)}`, color: 'bg-nutri-amber-light text-nutri-amber' },
                { label: 'Protein', value: `${(selectedFood.protein * quantity).toFixed(1)}g`, color: 'bg-nutri-red-light text-nutri-red' },
                { label: 'Carbs', value: `${(selectedFood.carbs * quantity).toFixed(1)}g`, color: 'bg-nutri-blue-light text-nutri-blue' },
                { label: 'Fats', value: `${(selectedFood.fats * quantity).toFixed(1)}g`, color: 'bg-nutri-purple-light text-nutri-purple' },
              ].map(m => (
                <div key={m.label} className={`${m.color} rounded-xl p-2.5 text-center`}>
                  <p className="text-[10px] font-medium opacity-80">{m.label}</p>
                  <p className="text-sm font-bold">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Vitamins */}
            <div className="flex items-center gap-2 flex-wrap">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
              {selectedFood.vitamins.map(v => (
                <span key={v} className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">{v}</span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="w-3.5 h-3.5" />
              <span>${(selectedFood.pricePerServing * quantity).toFixed(2)} for {quantity} serving{quantity > 1 ? 's' : ''}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-muted rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))} className="px-3 py-2 text-foreground hover:bg-accent transition-colors font-bold">−</button>
                <span className="px-3 text-sm font-bold text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 0.5)} className="px-3 py-2 text-foreground hover:bg-accent transition-colors font-bold">+</button>
              </div>

              <select
                value={mealType}
                onChange={e => setMealType(e.target.value as MealEntry['mealType'])}
                className="bg-muted text-foreground rounded-xl px-3 py-2 text-sm font-body focus:outline-none"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>

              <button
                onClick={handleAdd}
                className="flex-1 nutri-gradient text-primary-foreground rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food List */}
      {!selectedFood && (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filtered.map((food, i) => (
            <motion.button
              key={food.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => { setSelectedFood(food); setQuantity(1); }}
              className="w-full flex items-center gap-3 bg-card hover:bg-accent/50 rounded-xl p-3 text-left transition-colors border border-border/50 nutri-shadow-card"
            >
              <span className="text-2xl">{food.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-foreground truncate">{food.name}</p>
                  {hasAllergyRisk(food) && (
                    <AlertTriangle className="w-3.5 h-3.5 text-nutri-red shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{food.servingSize} · {food.category}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-foreground">{food.calories}</p>
                <p className="text-[10px] text-muted-foreground">cal</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
