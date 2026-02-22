import { Home, Utensils, Target, Sparkles } from 'lucide-react';

type Tab = 'dashboard' | 'food' | 'goals' | 'ai';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'food', label: 'Food', icon: <Utensils className="w-5 h-5" /> },
  { id: 'goals', label: 'Goals', icon: <Target className="w-5 h-5" /> },
  { id: 'ai', label: 'AI Tips', icon: <Sparkles className="w-5 h-5" /> },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
              active === t.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.icon}
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
