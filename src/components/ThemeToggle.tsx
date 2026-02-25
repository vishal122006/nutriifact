import { motion } from 'framer-motion';
import { Leaf, Crown, Sun, Moon } from 'lucide-react';
import { ThemeName, ColorMode } from '@/hooks/useTheme';

interface Props {
  theme: ThemeName;
  colorMode: ColorMode;
  onToggleTheme: () => void;
  onToggleColorMode: () => void;
}

export default function ThemeToggle({ theme, colorMode, onToggleTheme, onToggleColorMode }: Props) {
  const isRoyal = theme === 'royal-blue';
  const isDark = colorMode === 'dark';

  return (
    <div className="flex items-center gap-1.5">
      {/* Color theme toggle */}
      <button
        onClick={onToggleTheme}
        className="relative flex items-center gap-1 rounded-full px-2 py-1.5 bg-muted/60 border border-border/50 hover:border-secondary/30 transition-all"
        title={`Switch to ${isRoyal ? 'Nutri Green' : 'Royal Blue'}`}
      >
        <motion.div
          layout
          className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full nutri-gradient opacity-20"
          animate={{ left: isRoyal ? 'calc(50% + 1px)' : '2px' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
        <div className={`relative z-10 flex items-center gap-0.5 px-1 py-0.5 rounded-full ${!isRoyal ? 'opacity-100' : 'opacity-40'}`}>
          <Leaf className="w-3 h-3" />
          <span className="text-[9px] font-bold hidden sm:inline">Green</span>
        </div>
        <div className={`relative z-10 flex items-center gap-0.5 px-1 py-0.5 rounded-full ${isRoyal ? 'opacity-100' : 'opacity-40'}`}>
          <Crown className="w-3 h-3" />
          <span className="text-[9px] font-bold hidden sm:inline">Royal</span>
        </div>
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={onToggleColorMode}
        className="relative w-9 h-9 rounded-full bg-muted/60 border border-border/50 hover:border-secondary/30 flex items-center justify-center transition-all overflow-hidden"
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : 180,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="absolute"
        >
          <Moon className="w-4 h-4 text-secondary" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? -180 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="absolute"
        >
          <Sun className="w-4 h-4 text-secondary" />
        </motion.div>
      </button>
    </div>
  );
}
