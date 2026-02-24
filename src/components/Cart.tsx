import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, Flame, Beef, Wheat, Droplets, AlertTriangle, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types/nutrition';
import Checkout from './Checkout';

interface Props {
  cart: CartItem[];
  cartTotals: { calories: number; protein: number; carbs: number; fats: number; cost: number; items: number };
  goalCalories: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function Cart({ cart, cartTotals, goalCalories, onUpdateQuantity, onRemove, onClear }: Props) {
  const [showCheckout, setShowCheckout] = useState(false);
  const overLimit = cartTotals.calories > goalCalories;

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
          <ShoppingBag className="w-7 h-7 text-muted-foreground/40" />
        </div>
        <p className="text-muted-foreground text-sm font-medium">Your cart is empty</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Browse the menu and add dishes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Calorie Header */}
      <div className={`rounded-2xl p-5 ${overLimit ? 'bg-nutri-red-light border border-destructive/20' : 'nutri-gradient text-primary-foreground nutri-shadow-gold'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-xs font-medium ${overLimit ? 'text-destructive' : 'text-primary-foreground/70'}`}>Order Total</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-display font-bold ${overLimit ? 'text-destructive' : ''}`}>
                🔥 {Math.round(cartTotals.calories)} kcal
              </span>
            </div>
          </div>
          <div className={`text-right ${overLimit ? 'text-destructive' : ''}`}>
            <p className="text-[10px] opacity-70">Total Price</p>
            <span className="text-xl font-display font-bold">₹{cartTotals.cost.toFixed(0)}</span>
          </div>
        </div>
        {overLimit && (
          <div className="flex items-center gap-2 mt-2 text-destructive text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Exceeds your {goalCalories} kcal goal by {Math.round(cartTotals.calories - goalCalories)} kcal</span>
          </div>
        )}
      </div>

      {/* Macro Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-nutri-red-light text-nutri-red rounded-2xl p-3 text-center">
          <Beef className="w-4 h-4 mx-auto mb-0.5" />
          <p className="text-[10px] font-medium">Protein</p>
          <p className="text-sm font-bold">{Math.round(cartTotals.protein)}g</p>
        </div>
        <div className="bg-nutri-blue-light text-nutri-blue rounded-2xl p-3 text-center">
          <Wheat className="w-4 h-4 mx-auto mb-0.5" />
          <p className="text-[10px] font-medium">Carbs</p>
          <p className="text-sm font-bold">{Math.round(cartTotals.carbs)}g</p>
        </div>
        <div className="bg-nutri-purple-light text-nutri-purple rounded-2xl p-3 text-center">
          <Droplets className="w-4 h-4 mx-auto mb-0.5" />
          <p className="text-[10px] font-medium">Fats</p>
          <p className="text-sm font-bold">{Math.round(cartTotals.fats)}g</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-2">
        {cart.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 bg-card rounded-2xl p-3 border border-border/40 nutri-shadow-card"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-1 ring-border/30">
              {item.foodItem.image ? (
                <img src={item.foodItem.image} alt={item.foodItem.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-xl">{item.foodItem.emoji}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.foodItem.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{Math.round(item.foodItem.calories * item.quantity)} cal</span>
                <span className="text-xs font-bold text-secondary">₹{(item.foodItem.pricePerServing * item.quantity).toFixed(0)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-xl overflow-hidden">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-accent transition-colors">
                <Minus className="w-3 h-3 text-foreground" />
              </button>
              <span className="text-xs font-bold text-foreground w-5 text-center">{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-accent transition-colors">
                <Plus className="w-3 h-3 text-foreground" />
              </button>
            </div>
            <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => setShowCheckout(true)}
        className="w-full nutri-gradient text-primary-foreground rounded-2xl py-4 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity nutri-shadow-gold"
      >
        Proceed to Checkout — ₹{cartTotals.cost.toFixed(0)}
      </button>

      <button onClick={onClear} className="w-full text-muted-foreground text-xs hover:text-destructive transition-colors py-1">
        Clear Cart
      </button>

      {/* Checkout Sheet */}
      <Checkout
        cart={cart}
        cartTotals={cartTotals}
        goalCalories={goalCalories}
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        onConfirm={() => {
          setShowCheckout(false);
          onClear();
        }}
      />
    </div>
  );
}