import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Flame } from 'lucide-react';
import DailySummary from '@/components/DailySummary';
import MenuBrowser from '@/components/MenuBrowser';
import Cart from '@/components/Cart';
import GoalSelector from '@/components/GoalSelector';
import AISuggestions from '@/components/AISuggestions';
import BottomNav, { Tab } from '@/components/BottomNav';
import { useNutrition } from '@/hooks/useNutrition';
import { foodDatabase } from '@/data/foods';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const {
    cart, cartTotals, profile,
    addToCart, removeFromCart, updateCartQuantity, clearCart,
    updateGoal, updateAllergies, updateDietaryPreferences,
  } = useNutrition();

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
            <Flame className="w-3 h-3 text-nutri-amber" />
            <span className="text-xs font-bold text-foreground">{Math.round(cartTotals.calories)} kcal</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs font-bold text-primary">₹{cartTotals.cost.toFixed(0)}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6"
            >
              <DailySummary totals={cartTotals} goals={profile.dailyGoal} />
              <AISuggestions profile={profile} totals={cartTotals} />
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="font-display font-bold text-foreground mb-3">Our Menu</h2>
              <MenuBrowser
                onAddToCart={addToCart}
                userAllergies={profile.allergies}
                dietaryPreferences={profile.dietaryPreferences}
              />
            </motion.div>
          )}

          {activeTab === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="font-display font-bold text-foreground mb-3">Your Cart</h2>
              <Cart
                cart={cart}
                cartTotals={cartTotals}
                goalCalories={profile.dailyGoal.calories}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
              />
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
              <GoalSelector
                profile={profile}
                onUpdateGoal={updateGoal}
                onUpdateAllergies={updateAllergies}
                onUpdateDietaryPreferences={updateDietaryPreferences}
              />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <h2 className="font-display font-bold text-foreground mb-3">Profile</h2>
              <div className="bg-card rounded-2xl p-6 border border-border/50 nutri-shadow-card text-center">
                <div className="w-16 h-16 rounded-full nutri-gradient mx-auto flex items-center justify-center text-2xl text-primary-foreground mb-3">
                  {profile.name[0]}
                </div>
                <h3 className="font-display font-bold text-foreground">{profile.name}</h3>
                <p className="text-xs text-muted-foreground capitalize mt-1">{profile.goal.replace('-', ' ')} · {profile.dailyGoal.calories} kcal/day</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border/50 space-y-2">
                <p className="text-xs font-bold text-foreground">Daily Targets</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted rounded-xl p-2">
                    <p className="text-[10px] text-muted-foreground">Protein</p>
                    <p className="text-sm font-bold text-foreground">{profile.dailyGoal.protein}g</p>
                  </div>
                  <div className="bg-muted rounded-xl p-2">
                    <p className="text-[10px] text-muted-foreground">Carbs</p>
                    <p className="text-sm font-bold text-foreground">{profile.dailyGoal.carbs}g</p>
                  </div>
                  <div className="bg-muted rounded-xl p-2">
                    <p className="text-[10px] text-muted-foreground">Fats</p>
                    <p className="text-sm font-bold text-foreground">{profile.dailyGoal.fats}g</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} cartCount={cartTotals.items} />
    </div>
  );
};

export default Index;
