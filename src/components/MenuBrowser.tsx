import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, ShoppingCart, Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { foodDatabase, foodCategories } from '@/data/foods';
import { FoodItem, DietaryTag, DIETARY_FILTERS, CUISINE_CATEGORIES, CuisineCategory } from '@/types/nutrition';
import MenuCard from './MenuCard';

interface Props {
  onAddToCart: (food: FoodItem) => void;
  userAllergies: string[];
  dietaryPreferences: DietaryTag[];
}

export default function MenuBrowser({ onAddToCart, userAllergies, dietaryPreferences }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CuisineCategory | null>(null);
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<DietaryTag[]>(dietaryPreferences);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const toggleDietaryFilter = (tag: DietaryTag) => {
    setActiveDietaryFilters(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = foodDatabase.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || f.category === selectedCategory;
    const matchDietary = activeDietaryFilters.length === 0 || activeDietaryFilters.every(tag => f.dietaryTags.includes(tag));
    // Filter out allergen-containing items if user has allergies
    const noAllergenConflict = userAllergies.length === 0 || !f.allergens.some(a => userAllergies.includes(a));
    return matchSearch && matchCat && matchDietary;
  });

  const hasAllergyRisk = (food: FoodItem) =>
    food.allergens.some(a => userAllergies.includes(a));

  const popular = filtered.filter(f => f.isPopular);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search dishes, cuisines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Dietary Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {DIETARY_FILTERS.map(df => (
          <button
            key={df.id}
            onClick={() => toggleDietaryFilter(df.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              activeDietaryFilters.includes(df.id)
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            <span>{df.emoji}</span>
            {df.label}
          </button>
        ))}
      </div>

      {/* Cuisine Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            !selectedCategory ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
          }`}
        >
          🍽️ All
        </button>
        {CUISINE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {cat.emoji} {cat.id}
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
            className="bg-card rounded-2xl border border-border nutri-shadow-card overflow-hidden"
          >
            {selectedFood.image && (
              <div className="w-full h-48 overflow-hidden">
                <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg">{selectedFood.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedFood.description}</p>
                  <p className="text-sm font-bold text-primary mt-1">₹{selectedFood.pricePerServing}</p>
                </div>
                <button onClick={() => setSelectedFood(null)} className="text-muted-foreground hover:text-foreground text-xl leading-none">&times;</button>
              </div>

              {hasAllergyRisk(selectedFood) && (
                <div className="flex items-center gap-2 bg-nutri-red-light text-nutri-red rounded-xl px-4 py-2.5 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Allergy alert: {selectedFood.allergens.filter(a => userAllergies.includes(a)).join(', ')}</span>
                </div>
              )}

              {/* Dietary tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedFood.dietaryTags.map(tag => (
                  <span key={tag} className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-medium capitalize">
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>

              {/* Nutrition grid */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Calories', value: `${selectedFood.calories}`, icon: <Flame className="w-3 h-3" />, color: 'bg-nutri-amber-light text-nutri-amber' },
                  { label: 'Protein', value: `${selectedFood.protein}g`, icon: <Beef className="w-3 h-3" />, color: 'bg-nutri-red-light text-nutri-red' },
                  { label: 'Carbs', value: `${selectedFood.carbs}g`, icon: <Wheat className="w-3 h-3" />, color: 'bg-nutri-blue-light text-nutri-blue' },
                  { label: 'Fats', value: `${selectedFood.fats}g`, icon: <Droplets className="w-3 h-3" />, color: 'bg-nutri-purple-light text-nutri-purple' },
                ].map(m => (
                  <div key={m.label} className={`${m.color} rounded-xl p-2.5 text-center`}>
                    <div className="flex items-center justify-center gap-1 mb-0.5">{m.icon}<span className="text-[10px] font-medium">{m.label}</span></div>
                    <p className="text-sm font-bold">{m.value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { onAddToCart(selectedFood); setSelectedFood(null); }}
                className="w-full nutri-gradient text-primary-foreground rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart — ₹{selectedFood.pricePerServing}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popular Section */}
      {!selectedFood && !search && !selectedCategory && popular.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-foreground text-sm mb-2">🔥 Popular Dishes</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {popular.map(food => (
              <MenuCard key={food.id} food={food} hasAllergyRisk={hasAllergyRisk(food)} onSelect={() => setSelectedFood(food)} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      {!selectedFood && (
        <div className="space-y-6">
          {selectedCategory ? (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((food, i) => (
                <MenuCard key={food.id} food={food} hasAllergyRisk={hasAllergyRisk(food)} onSelect={() => setSelectedFood(food)} index={i} />
              ))}
            </div>
          ) : (
            foodCategories.filter(cat => filtered.some(f => f.category === cat)).map(cat => (
              <div key={cat}>
                <h3 className="font-display font-bold text-foreground text-sm mb-2">
                  {CUISINE_CATEGORIES.find(c => c.id === cat)?.emoji} {cat}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {filtered.filter(f => f.category === cat).map((food, i) => (
                    <MenuCard key={food.id} food={food} hasAllergyRisk={hasAllergyRisk(food)} onSelect={() => setSelectedFood(food)} index={i} />
                  ))}
                </div>
              </div>
            ))
          )}
          {filtered.length === 0 && (
            <div className="text-center py-10">
              <p className="text-3xl mb-2">😢</p>
              <p className="text-muted-foreground text-sm">No dishes match your filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
