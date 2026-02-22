import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';
import { FITNESS_GOALS, ALLERGY_LIST, UserProfile } from '@/types/nutrition';

interface Props {
  profile: UserProfile;
  onUpdateGoal: (goal: UserProfile['goal']) => void;
  onUpdateAllergies: (allergies: string[]) => void;
}

export default function GoalSelector({ profile, onUpdateGoal, onUpdateAllergies }: Props) {
  const toggleAllergy = (allergy: string) => {
    const next = profile.allergies.includes(allergy)
      ? profile.allergies.filter(a => a !== allergy)
      : [...profile.allergies, allergy];
    onUpdateAllergies(next);
  };

  return (
    <div className="space-y-6">
      {/* Fitness Goal */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="font-display font-bold text-foreground text-sm">Fitness Goal</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FITNESS_GOALS.map(g => (
            <motion.button
              key={g.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onUpdateGoal(g.id)}
              className={`rounded-xl p-3 text-left transition-all border ${
                profile.goal === g.id
                  ? 'border-primary bg-accent nutri-shadow'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <span className="text-xl">{g.icon}</span>
              <p className="text-sm font-bold mt-1 text-foreground">{g.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{g.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-secondary" />
          <h3 className="font-display font-bold text-foreground text-sm">Allergies & Restrictions</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALLERGY_LIST.map(a => (
            <button
              key={a}
              onClick={() => toggleAllergy(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                profile.allergies.includes(a)
                  ? 'bg-nutri-red text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
