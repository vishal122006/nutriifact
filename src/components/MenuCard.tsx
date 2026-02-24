import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { FoodItem } from '@/types/nutrition';

interface Props {
  food: FoodItem;
  hasAllergyRisk: boolean;
  onSelect: () => void;
  variant?: 'vertical' | 'horizontal';
  index?: number;
}

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  'high-protein': { label: 'High Protein', className: 'bg-nutri-red-light text-nutri-red' },
  'low-carb': { label: 'Low Carb', className: 'bg-nutri-blue-light text-nutri-blue' },
  'keto': { label: 'Keto', className: 'bg-nutri-purple-light text-nutri-purple' },
  'vegan': { label: 'Vegan', className: 'bg-nutri-green-light text-nutri-green' },
  'vegetarian': { label: 'Veg', className: 'bg-nutri-green-light text-nutri-green' },
};

export default function MenuCard({ food, hasAllergyRisk, onSelect, variant = 'vertical', index = 0 }: Props) {
  const topBadge = food.dietaryTags.find(t => BADGE_MAP[t]);

  if (variant === 'horizontal') {
    return (
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onSelect}
        className="shrink-0 w-44 bg-card rounded-2xl border border-border/40 nutri-shadow-card overflow-hidden text-left hover:border-secondary/25 transition-all"
      >
        <div className="h-28 overflow-hidden relative">
          {food.image ? (
            <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-3xl">{food.emoji}</div>
          )}
          {topBadge && (
            <span className={`absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${BADGE_MAP[topBadge].className}`}>
              {BADGE_MAP[topBadge].label}
            </span>
          )}
        </div>
        <div className="p-2.5">
          <p className="text-xs font-bold text-foreground truncate">{food.name}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-secondary">₹{food.pricePerServing}</span>
            <span className="text-[10px] text-muted-foreground">{food.calories} cal</span>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onSelect}
      className="bg-card rounded-2xl border border-border/40 nutri-shadow-card overflow-hidden text-left hover:border-secondary/25 hover:nutri-shadow-elevated transition-all group"
    >
      <div className="h-36 overflow-hidden relative">
        {food.image ? (
          <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">{food.emoji}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent" />
        {hasAllergyRisk && (
          <span className="absolute top-2 right-2 bg-destructive text-primary-foreground p-1 rounded-full">
            <AlertTriangle className="w-3 h-3" />
          </span>
        )}
        {topBadge && (
          <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm ${BADGE_MAP[topBadge].className}`}>
            {BADGE_MAP[topBadge].label}
          </span>
        )}
        {food.ingredients && food.ingredients.length > 0 && (
          <span className="absolute bottom-2 right-2 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-card/80 backdrop-blur-sm text-secondary border border-secondary/15">
            ✨ Customizable
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-bold text-foreground truncate">{food.name}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{food.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-secondary">₹{food.pricePerServing}</span>
          <span className="text-[10px] text-muted-foreground font-medium">{food.calories} cal · {food.protein}g P</span>
        </div>
      </div>
    </motion.button>
  );
}