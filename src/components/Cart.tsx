import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, Flame, Beef, Wheat, Droplets, AlertTriangle, ShoppingBag } from 'lucide-react';
import { CartItem, UserProfile } from '@/types/nutrition';

interface Props {
  cart: CartItem[];
  cartTotals: { calories: number; protein: number; carbs: number; fats: number; cost: number; items: number };
  goalCalories: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function Cart({ cart, cartTotals, goalCalories, onUpdateQuantity, onRemove, onClear }: Props) {
  const overLimit = cartTotals.calories > goalCalories;

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm font-medium">Your cart is empty</p>
        <p className="text-muted-foreground text-xs mt-1">Browse the menu and add dishes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Calorie Header */}
      <div className={`rounded-2xl p-4 ${overLimit ? 'bg-nutri-red-light border border-nutri-red/20' : 'nutri-gradient text-primary-foreground'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-xs font-medium ${overLimit ? 'text-nutri-red' : 'text-primary-foreground/70'}`}>Order Total</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-display font-bold ${overLimit ? 'text-nutri-red' : ''}`}>
                🔥 {Math.round(cartTotals.calories)} kcal
              </span>
              <span className={`text-sm ${overLimit ? 'text-nutri-red/70' : 'text-primary-foreground/60'}`}>
                | ₹{cartTotals.cost.toFixed(0)}
              </span>
            </div>
          </div>
          <div className={`text-right ${overLimit ? 'text-nutri-red' : ''}`}>
            <span className="text-lg font-bold">₹{cartTotals.cost.toFixed(0)}</span>
          </div>
        </div>
        {overLimit && (
          <div className="flex items-center gap-2 mt-2 text-nutri-red text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Exceeds your {goalCalories} kcal goal by {Math.round(cartTotals.calories - goalCalories)} kcal</span>
          </div>
        )}
      </div>

      {/* Macro Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-nutri-red-light text-nutri-red rounded-xl p-2.5 text-center">
          <Beef className="w-3.5 h-3.5 mx-auto mb-0.5" />
          <p className="text-[10px] font-medium">Protein</p>
          <p className="text-sm font-bold">{Math.round(cartTotals.protein)}g</p>
        </div>
        <div className="bg-nutri-blue-light text-nutri-blue rounded-xl p-2.5 text-center">
          <Wheat className="w-3.5 h-3.5 mx-auto mb-0.5" />
          <p className="text-[10px] font-medium">Carbs</p>
          <p className="text-sm font-bold">{Math.round(cartTotals.carbs)}g</p>
        </div>
        <div className="bg-nutri-purple-light text-nutri-purple rounded-xl p-2.5 text-center">
          <Droplets className="w-3.5 h-3.5 mx-auto mb-0.5" />
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
            className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
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
                <span className="text-xs font-bold text-primary">₹{(item.foodItem.pricePerServing * item.quantity).toFixed(0)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-muted rounded-lg overflow-hidden">
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
      <button className="w-full nutri-gradient text-primary-foreground rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        Place Order — ₹{cartTotals.cost.toFixed(0)}
      </button>

      <button onClick={onClear} className="w-full text-muted-foreground text-xs hover:text-destructive transition-colors py-1">
        Clear Cart
      </button>
    </div>
  );
}
