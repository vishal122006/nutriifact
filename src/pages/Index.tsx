import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';
import DailySummary from '@/components/DailySummary';
import FoodSelector from '@/components/FoodSelector';
import MealLog from '@/components/MealLog';
import GoalSelector from '@/components/GoalSelector';
import AISuggestions from '@/components/AISuggestions';
import BottomNav from '@/components/BottomNav';
import { useNutrition } from '@/hooks/useNutrition';

type Tab = 'dashboard' | 'food' | 'goals' | 'ai';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { meals, dailyTotals, profile, addMeal, removeMeal, updateGoal, updateAllergies } = useNutrition();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl nutri-gradient flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-lg text-foreground">NutriFact</h1>
          <div className="ml-auto flex items-center gap-1.5 bg-muted rounded-full px-3 py-1">
            <span className="text-xs text-muted-foreground">Today</span>
            <span className="text-xs font-bold text-foreground">${dailyTotals.cost.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <DailySummary totals={dailyTotals} goals={profile.dailyGoal} />
              <div>
                <h2 className="font-display font-bold text-foreground mb-3">Today's Meals</h2>
                <MealLog meals={meals} onRemove={removeMeal} />
              </div>
            </motion.div>
          )}

          {activeTab === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="font-display font-bold text-foreground mb-3">Add Food</h2>
              <FoodSelector onAddFood={addMeal} userAllergies={profile.allergies} />
            </motion.div>
          )}

          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="font-display font-bold text-foreground mb-3">Your Goals</h2>
              <GoalSelector profile={profile} onUpdateGoal={updateGoal} onUpdateAllergies={updateAllergies} />
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <AISuggestions profile={profile} totals={dailyTotals} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default Index;
