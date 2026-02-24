import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Flame, Crown } from 'lucide-react';
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
    <div className="min-h-screen bg-background pb-24">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-2xl border-b border-secondary/8">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl nutri-gradient flex items-center justify-center nutri-shadow-gold">
            <Leaf className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-display font-bold text-base text-foreground leading-tight">NutriFact</h1>
              <Crown className="w-3 h-3 text-secondary" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">Premium Healthy Ordering</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 glass-card-premium rounded-full px-3.5 py-1.5">
            <Flame className="w-3 h-3 text-secondary" />
            <span className="text-xs font-bold text-foreground">{Math.round(cartTotals.calories)} kcal</span>
            <span className="text-[10px] text-muted-foreground/50">|</span>
            <span className="text-xs font-bold text-secondary">₹{cartTotals.cost.toFixed(0)}</span>
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
              <div className="bg-card rounded-2xl p-6 border border-secondary/10 nutri-shadow-card text-center">
                <div className="w-16 h-16 rounded-full nutri-gradient mx-auto flex items-center justify-center text-2xl text-primary-foreground mb-3 nutri-shadow-gold">
                  {profile.name[0]}
                </div>
                <h3 className="font-display font-bold text-foreground">{profile.name}</h3>
                <p className="text-xs text-muted-foreground capitalize mt-1">{profile.goal.replace('-', ' ')} · {profile.dailyGoal.calories} kcal/day</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border/40 space-y-2">
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