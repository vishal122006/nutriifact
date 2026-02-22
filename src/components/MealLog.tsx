import { motion } from 'framer-motion';
import { Trash2, Coffee, Sun, Moon, Cookie } from 'lucide-react';
import { MealEntry } from '@/types/nutrition';

const mealIcons = {
  breakfast: <Coffee className="w-4 h-4" />,
  lunch: <Sun className="w-4 h-4" />,
  dinner: <Moon className="w-4 h-4" />,
  snack: <Cookie className="w-4 h-4" />,
};

const mealLabels = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' };

interface Props {
  meals: MealEntry[];
  onRemove: (id: string) => void;
}

export default function MealLog({ meals, onRemove }: Props) {
  const grouped = meals.reduce((acc, m) => {
    (acc[m.mealType] = acc[m.mealType] || []).push(m);
    return acc;
  }, {} as Record<string, MealEntry[]>);

  if (meals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-4xl mb-3">🍽️</p>
        <p className="text-muted-foreground text-sm">No meals logged today</p>
        <p className="text-muted-foreground text-xs mt-1">Add food from the menu above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => {
        const entries = grouped[type];
        if (!entries?.length) return null;
        const totalCal = entries.reduce((s, m) => s + m.foodItem.calories * m.quantity, 0);

        return (
          <div key={type}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary">{mealIcons[type]}</span>
              <h4 className="text-sm font-display font-bold text-foreground">{mealLabels[type]}</h4>
              <span className="text-xs text-muted-foreground ml-auto">{Math.round(totalCal)} cal</span>
            </div>
            <div className="space-y-1.5">
              {entries.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
                >
                  <span className="text-lg">{m.foodItem.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{m.foodItem.name}</p>
                    <p className="text-xs text-muted-foreground">{m.quantity} × {m.foodItem.servingSize}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{Math.round(m.foodItem.calories * m.quantity)}</span>
                  <button onClick={() => onRemove(m.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
