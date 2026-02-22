import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { UserProfile } from '@/types/nutrition';

interface Props {
  profile: UserProfile;
  totals: { calories: number; protein: number; carbs: number; fats: number };
}

const tips: Record<string, string[]> = {
  'lean-bulk': [
    "Focus on protein-rich foods like chicken, eggs, and Greek yogurt to support muscle growth.",
    "Eat complex carbs like brown rice and sweet potatoes around your workouts.",
    "Stay in a 200-300 calorie surplus for clean gains.",
    "Aim for 1.6-2.2g protein per kg of bodyweight daily.",
  ],
  'fat-loss': [
    "Prioritize lean proteins to stay full longer — try chicken breast or tofu.",
    "Load up on fiber-rich vegetables like spinach to reduce hunger.",
    "Keep a moderate 300-500 calorie deficit for sustainable fat loss.",
    "Don't skip meals — spread your calories across the day.",
  ],
  'maintain': [
    "Balance your macros: aim for 30% protein, 40% carbs, 30% fats.",
    "Stay consistent with your meal timing for stable energy.",
    "Include a variety of colorful vegetables for micronutrients.",
    "Monitor your weight weekly and adjust portions as needed.",
  ],
  'muscle-gain': [
    "Eat a protein-rich meal within 2 hours after training.",
    "Don't fear carbs — they fuel your workouts and recovery.",
    "Consider adding calorie-dense foods like avocado, nuts, and salmon.",
    "Stay in a 400-600 calorie surplus for maximum growth.",
  ],
};

export default function AISuggestions({ profile, totals }: Props) {
  const goalTips = tips[profile.goal] || tips['maintain'];
  const caloriesLeft = profile.dailyGoal.calories - totals.calories;
  const proteinLeft = profile.dailyGoal.protein - totals.protein;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-xl nutri-gradient flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground text-sm">AI Suggestions</h3>
          <p className="text-[10px] text-muted-foreground">Based on your {profile.goal.replace('-', ' ')} goal</p>
        </div>
      </div>

      {/* Dynamic insight */}
      {totals.calories > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-nutri-amber-light rounded-xl p-4 border border-secondary/20"
        >
          <p className="text-sm text-secondary-foreground font-medium">
            {caloriesLeft > 0
              ? `You have ${Math.round(caloriesLeft)} cal left today.${proteinLeft > 20 ? ` Try adding protein — you need ${Math.round(proteinLeft)}g more.` : ' Looking good on protein! 💪'}`
              : "You've reached your calorie goal! Consider stopping here for optimal results. 🎯"}
          </p>
        </motion.div>
      )}

      {/* Tips */}
      {goalTips.map((tip, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-3 bg-card rounded-xl p-3 border border-border/50"
        >
          <span className="text-primary mt-0.5 text-sm">✦</span>
          <p className="text-sm text-foreground/80">{tip}</p>
        </motion.div>
      ))}
    </div>
  );
}
