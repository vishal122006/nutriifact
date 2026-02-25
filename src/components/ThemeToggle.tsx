import { motion } from 'framer-motion';
import { Leaf, Crown } from 'lucide-react';
import { ThemeName } from '@/hooks/useTheme';

interface Props {
  theme: ThemeName;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  const isRoyal = theme === 'royal-blue';

  return (
    <button
      onClick={onToggle}
      className="relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 bg-muted/60 border border-border/50 hover:border-secondary/30 transition-all group"
      title={`Switch to ${isRoyal ? 'Nutri Green' : 'Royal Blue'} theme`}
    >
      {/* Track bg indicator */}
      <motion.div
        layout
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full nutri-gradient opacity-20"
        animate={{ left: isRoyal ? 'calc(50% + 1px)' : '2px' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      <div className={`relative z-10 flex items-center gap-1 px-1 py-0.5 rounded-full transition-opacity ${!isRoyal ? 'opacity-100' : 'opacity-40'}`}>
        <Leaf className="w-3 h-3" />
        <span className="text-[9px] font-bold">Green</span>
      </div>

      <div className={`relative z-10 flex items-center gap-1 px-1 py-0.5 rounded-full transition-opacity ${isRoyal ? 'opacity-100' : 'opacity-40'}`}>
        <Crown className="w-3 h-3" />
        <span className="text-[9px] font-bold">Royal</span>
      </div>
    </button>
  );
}
