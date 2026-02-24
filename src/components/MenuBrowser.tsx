import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { foodDatabase, foodCategories } from '@/data/foods';
import { FoodItem, DietaryTag, DIETARY_FILTERS, CUISINE_CATEGORIES, CuisineCategory } from '@/types/nutrition';
import MenuCard from './MenuCard';
import FoodCustomizer from './FoodCustomizer';

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
    return matchSearch && matchCat && matchDietary;
  });

  const hasAllergyRisk = (food: FoodItem) =>
    food.allergens.some(a => userAllergies.includes(a));

  const popular = filtered.filter(f => f.isPopular);

  const handleAddFromCustomizer = (food: FoodItem, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(food);
    }
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search dishes, cuisines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-card rounded-2xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/25 border border-border/40 transition-all nutri-shadow-card"
        />
      </div>

      {/* Dietary Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {DIETARY_FILTERS.map(df => (
          <button
            key={df.id}
            onClick={() => toggleDietaryFilter(df.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeDietaryFilters.includes(df.id)
                ? 'nutri-gradient text-primary-foreground nutri-shadow-gold'
                : 'bg-card text-muted-foreground border border-border/40 hover:border-secondary/20'
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
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            !selectedCategory
              ? 'nutri-gradient-gold text-secondary-foreground nutri-shadow'
              : 'bg-card text-muted-foreground border border-border/40 hover:border-secondary/20'
          }`}
        >
          🍽️ All
        </button>
        {CUISINE_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'nutri-gradient-gold text-secondary-foreground nutri-shadow'
                : 'bg-card text-muted-foreground border border-border/40 hover:border-secondary/20'
            }`}
          >
            {cat.emoji} {cat.id}
          </button>
        ))}
      </div>

      {/* Popular Section */}
      {!search && !selectedCategory && popular.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-foreground text-sm mb-3">🔥 Popular Dishes</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {popular.map(food => (
              <MenuCard key={food.id} food={food} hasAllergyRisk={hasAllergyRisk(food)} onSelect={() => setSelectedFood(food)} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
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
              <h3 className="font-display font-bold text-foreground text-sm mb-3">
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

      {/* Customizer Sheet */}
      {selectedFood && (
        <FoodCustomizer
          food={selectedFood}
          open={!!selectedFood}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddFromCustomizer}
          hasAllergyRisk={hasAllergyRisk(selectedFood)}
          userAllergies={userAllergies}
        />
      )}
    </div>
  );
}