import { motion } from 'framer-motion';
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { DailyGoal } from '@/types/nutrition';

interface Props {
  totals: { calories: number; protein: number; carbs: number; fats: number; cost: number };
  goals: DailyGoal;
}

export default function DailySummary({ totals, goals }: Props) {
  const calPercent = Math.min((totals.calories / goals.calories) * 100, 100);
  const remaining = goals.calories - totals.calories;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="nutri-gradient rounded-2xl p-6 text-primary-foreground nutri-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-primary-foreground/70 text-sm font-body">Today's Calories</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-display font-bold">{Math.round(totals.calories)}</span>
            <span className="text-primary-foreground/60 text-sm">/ {goals.calories}</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full border-4 border-primary-foreground/30 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary-foreground/20" />
            <circle
              cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4"
              className="text-primary-foreground"
              strokeDasharray={`${calPercent * 1.76} 176`}
              strokeLinecap="round"
            />
          </svg>
          <Flame className="w-6 h-6" />
        </div>
      </div>

      <p className="text-primary-foreground/70 text-sm mb-4">
        {remaining > 0 ? `${Math.round(remaining)} cal remaining` : 'Goal reached! 🎉'}
      </p>

      <div className="grid grid-cols-3 gap-3">
        <MacroChip icon={<Beef className="w-4 h-4" />} label="Protein" value={totals.protein} goal={goals.protein} unit="g" />
        <MacroChip icon={<Wheat className="w-4 h-4" />} label="Carbs" value={totals.carbs} goal={goals.carbs} unit="g" />
        <MacroChip icon={<Droplets className="w-4 h-4" />} label="Fats" value={totals.fats} goal={goals.fats} unit="g" />
      </div>
    </motion.div>
  );
}

function MacroChip({ icon, label, value, goal, unit }: { icon: React.ReactNode; label: string; value: number; goal: number; unit: string }) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className="bg-primary-foreground/10 rounded-xl p-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-sm font-bold">{Math.round(value)}{unit}</p>
      <div className="w-full h-1.5 bg-primary-foreground/20 rounded-full mt-1.5">
        <div className="h-full bg-primary-foreground rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
