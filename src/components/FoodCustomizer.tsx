import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, Flame, Beef, Wheat, Droplets, AlertTriangle, Check } from 'lucide-react';
import { FoodItem, Ingredient } from '@/types/nutrition';

interface Props {
  food: FoodItem;
  open: boolean;
  onClose: () => void;
  onAddToCart: (food: FoodItem, quantity: number, customization: { added: string[]; removed: string[]; portionMultiplier: number }) => void;
  hasAllergyRisk: boolean;
  userAllergies: string[];
}

export default function FoodCustomizer({ food, open, onClose, onAddToCart, hasAllergyRisk, userAllergies }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [portionMultiplier, setPortionMultiplier] = useState(1);

  const portions = [
    { label: 'Small', value: 0.75, emoji: 'S' },
    { label: 'Regular', value: 1, emoji: 'M' },
    { label: 'Large', value: 1.25, emoji: 'L' },
  ];

  const ingredients = food.ingredients || [];
  const defaultIngredients = ingredients.filter(i => i.isDefault);
  const extraIngredients = ingredients.filter(i => !i.isDefault);

  const toggleRemove = (id: string) => {
    setRemovedIngredients(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAdd = (id: string) => {
    setAddedIngredients(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const totals = useMemo(() => {
    let cal = food.calories;
    let pro = food.protein;
    let carb = food.carbs;
    let fat = food.fats;
    let price = food.pricePerServing;

    for (const ing of defaultIngredients.filter(i => removedIngredients.includes(i.id))) {
      cal -= ing.calories; pro -= ing.protein; carb -= ing.carbs; fat -= ing.fats; price -= ing.price;
    }

    for (const ing of extraIngredients.filter(i => addedIngredients.includes(i.id))) {
      cal += ing.calories; pro += ing.protein; carb += ing.carbs; fat += ing.fats; price += ing.price;
    }

    cal *= portionMultiplier; pro *= portionMultiplier; carb *= portionMultiplier; fat *= portionMultiplier; price *= portionMultiplier;

    return {
      calories: Math.round(cal * quantity),
      protein: Math.round(pro * quantity),
      carbs: Math.round(carb * quantity),
      fats: Math.round(fat * quantity),
      price: Math.round(price * quantity),
    };
  }, [food, removedIngredients, addedIngredients, portionMultiplier, quantity, defaultIngredients, extraIngredients]);

  const handleAdd = () => {
    onAddToCart(food, quantity, { added: addedIngredients, removed: removedIngredients, portionMultiplier });
    onClose();
    setQuantity(1); setRemovedIngredients([]); setAddedIngredients([]); setPortionMultiplier(1);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-end justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card rounded-t-3xl max-h-[90vh] overflow-y-auto border-t border-secondary/15"
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl z-10 pt-3 pb-2 px-6 rounded-t-3xl">
              <div className="w-10 h-1 bg-secondary/25 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-foreground text-lg">Customize</h3>
                <button onClick={onClose} className="p-1.5 rounded-full bg-muted hover:bg-accent transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-5">
              {/* Food Header */}
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 ring-2 ring-secondary/15">
                  {food.image ? (
                    <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-3xl">{food.emoji}</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-foreground">{food.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{food.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {food.dietaryTags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-accent text-accent-foreground text-[9px] px-2 py-0.5 rounded-full font-semibold capitalize">
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Allergy Warning */}
              {hasAllergyRisk && (
                <div className="flex items-center gap-2 bg-nutri-red-light text-destructive rounded-xl px-4 py-2.5 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Contains: {food.allergens.filter(a => userAllergies.includes(a)).join(', ')}</span>
                </div>
              )}

              {/* Nutrition Grid */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Calories', value: totals.calories, unit: '', icon: <Flame className="w-3.5 h-3.5" />, cls: 'bg-nutri-gold-light text-nutri-gold' },
                  { label: 'Protein', value: totals.protein, unit: 'g', icon: <Beef className="w-3.5 h-3.5" />, cls: 'bg-nutri-red-light text-nutri-red' },
                  { label: 'Carbs', value: totals.carbs, unit: 'g', icon: <Wheat className="w-3.5 h-3.5" />, cls: 'bg-nutri-blue-light text-nutri-blue' },
                  { label: 'Fats', value: totals.fats, unit: 'g', icon: <Droplets className="w-3.5 h-3.5" />, cls: 'bg-nutri-purple-light text-nutri-purple' },
                ].map(m => (
                  <motion.div key={m.label} layout className={`${m.cls} rounded-xl p-2.5 text-center`}>
                    <div className="flex items-center justify-center gap-1 mb-0.5">{m.icon}</div>
                    <motion.p key={m.value} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="text-sm font-bold">{m.value}{m.unit}</motion.p>
                    <p className="text-[9px] font-medium opacity-70">{m.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Portion Size */}
              <div>
                <p className="text-xs font-bold text-foreground mb-2">Portion Size</p>
                <div className="flex gap-2">
                  {portions.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setPortionMultiplier(p.value)}
                      className={`flex-1 rounded-xl py-2.5 text-center transition-all ${
                        portionMultiplier === p.value
                          ? 'nutri-gradient text-primary-foreground nutri-shadow-gold'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      <span className="text-sm font-bold">{p.emoji}</span>
                      <p className="text-[10px] font-medium mt-0.5">{p.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Included Ingredients */}
              {defaultIngredients.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-foreground mb-2">Included Ingredients</p>
                  <div className="space-y-1.5">
                    {defaultIngredients.map(ing => {
                      const isRemoved = removedIngredients.includes(ing.id);
                      return (
                        <button
                          key={ing.id}
                          onClick={() => ing.isRemovable && toggleRemove(ing.id)}
                          disabled={!ing.isRemovable}
                          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left ${
                            isRemoved ? 'bg-muted/50 opacity-50' : 'bg-card border border-border/40'
                          } ${ing.isRemovable ? 'hover:bg-accent cursor-pointer' : 'cursor-default'}`}
                        >
                          <span className="text-base">{ing.emoji}</span>
                          <span className={`flex-1 text-xs font-medium ${isRemoved ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{ing.name}</span>
                          <span className="text-[10px] text-muted-foreground">{ing.calories} cal</span>
                          {ing.isRemovable && (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isRemoved ? 'bg-muted' : 'bg-primary/10 text-primary'}`}>
                              {!isRemoved && <Check className="w-3 h-3" />}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Extra Add-ons */}
              {extraIngredients.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-foreground mb-2">Add Extras</p>
                  <div className="space-y-1.5">
                    {extraIngredients.map(ing => {
                      const isAdded = addedIngredients.includes(ing.id);
                      return (
                        <button
                          key={ing.id}
                          onClick={() => toggleAdd(ing.id)}
                          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left ${
                            isAdded ? 'bg-accent border border-secondary/25' : 'bg-card border border-border/40 hover:bg-accent'
                          }`}
                        >
                          <span className="text-base">{ing.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium text-foreground">{ing.name}</span>
                            <span className="text-[10px] text-muted-foreground ml-2">+{ing.calories} cal · +₹{ing.price}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isAdded ? 'bg-secondary text-secondary-foreground' : 'bg-muted'}`}>
                            {isAdded && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-foreground">Quantity</p>
                <div className="flex items-center gap-3 bg-muted rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-accent transition-colors">
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="text-sm font-bold text-foreground w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-accent transition-colors">
                    <Plus className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="w-full nutri-gradient text-primary-foreground rounded-2xl py-4 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity nutri-shadow-gold"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart — ₹{totals.price}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}