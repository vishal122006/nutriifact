import { Home, Utensils, ShoppingCart, Target, User } from 'lucide-react';

export type Tab = 'home' | 'menu' | 'cart' | 'goals' | 'profile';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  cartCount: number;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'menu', label: 'Menu', icon: <Utensils className="w-5 h-5" /> },
  { id: 'cart', label: 'Cart', icon: <ShoppingCart className="w-5 h-5" /> },
  { id: 'goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
];

export default function BottomNav({ active, onChange, cartCount }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all ${
              active === t.id
                ? 'text-primary bg-primary/8'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.icon}
            <span className="text-[10px] font-semibold">{t.label}</span>
            {t.id === 'cart' && cartCount > 0 && (
              <span className="absolute -top-0.5 right-1 nutri-gradient text-primary-foreground text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
