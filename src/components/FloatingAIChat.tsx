import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User as UserIcon } from 'lucide-react';
import { UserProfile } from '@/types/nutrition';

interface Props {
  profile: UserProfile;
  totals: { calories: number; protein: number; carbs: number; fats: number };
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
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

const smartReplies: Record<string, string> = {
  'protein': "Great question! For your goal, I recommend chicken breast (31g protein/serving), Greek yogurt parfait (18g), or our Protein Shake (30g). All available on the menu! 💪",
  'calories': "Tracking calories is key! Check your Daily Summary on the home tab for real-time tracking against your goal. Would you like tips on low-calorie meals?",
  'snack': "For smart snacking, try our Oat Cookie (160 cal), Chia Pudding (180 cal), or a Green Juice (80 cal). All nutrient-dense and won't derail your goals! 🥤",
  'breakfast': "Start strong! I suggest the Egg & Avocado Bowl (390 cal, 22g protein) or Smoothie Bowl (280 cal). Both give sustained energy through the morning.",
  'lunch': "For lunch, the Chicken Quinoa Bowl (480 cal, 42g protein) is a powerhouse! Or try the Caesar Salad for a lighter option at 280 cal.",
  'dinner': "For dinner, Grilled Salmon (380 cal, 36g protein) or Butter Chicken (438 cal, 32g protein) are excellent choices for recovery and satisfaction.",
  'vegan': "We have great vegan options! Try the Tofu Power Bowl, Dal Tadka, Teriyaki Tofu Bowl, or our Green Power Smoothie. All plant-powered! 🌱",
  'keto': "For keto, check out Greek Salad, Egg & Avocado Bowl, Grilled Salmon, or Paneer Tikka. All low-carb and high in healthy fats! 🥑",
  'weight': "Weight management is a marathon, not a sprint. Stick to your calorie goal, prioritize protein, and stay hydrated. You've got this! 🎯",
  'water': "Aim for 3-4 liters of water daily. Try our Matcha Latte or Green Juice for hydration with added benefits! 💧",
};

function getAIResponse(input: string, profile: UserProfile, totals: { calories: number; protein: number; carbs: number; fats: number }): string {
  const lower = input.toLowerCase();

  // Check keyword matches
  for (const [key, response] of Object.entries(smartReplies)) {
    if (lower.includes(key)) return response;
  }

  // Context-aware responses
  const caloriesLeft = profile.dailyGoal.calories - totals.calories;
  const proteinLeft = profile.dailyGoal.protein - totals.protein;

  if (lower.includes('suggest') || lower.includes('recommend') || lower.includes('what should')) {
    if (caloriesLeft > 400) {
      return `You have ${Math.round(caloriesLeft)} calories left today. I'd recommend a hearty meal like Chicken Quinoa Bowl or Butter Chicken to hit your ${profile.goal.replace('-', ' ')} goal! 🍽️`;
    }
    return `You only have ${Math.round(caloriesLeft)} calories remaining. Go for something light like a Greek Salad (180 cal) or Cold Press Green Juice (80 cal). Smart choices! 🥗`;
  }

  if (lower.includes('how') || lower.includes('help')) {
    return `I'm your AI nutrition assistant! I can help with meal suggestions, macro tracking, dietary tips, and food recommendations based on your ${profile.goal.replace('-', ' ')} goal. Just ask! 🤖`;
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    return `Hey there! 👋 Ready to fuel your ${profile.goal.replace('-', ' ')} journey? You've consumed ${Math.round(totals.calories)} cal so far today. How can I help?`;
  }

  // Default: return a random goal-specific tip
  const goalTips = tips[profile.goal] || tips['maintain'];
  return goalTips[Math.floor(Math.random() * goalTips.length)] + " 💡";
}

export default function FloatingAIChat({ profile, totals }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: crypto.randomUUID(),
          role: 'ai',
          text: `Hi! 👋 I'm your NutriFact AI assistant. I see you're on a **${profile.goal.replace('-', ' ')}** plan. You've logged ${Math.round(totals.calories)} cal today out of ${profile.dailyGoal.calories}. Ask me anything about nutrition, meals, or your goals!`,
          timestamp: new Date(),
        }]);
        setIsTyping(false);
      }, 1200);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 400);
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = getAIResponse(trimmed, profile, totals);
      const aiMsg: ChatMessage = { id: crypto.randomUUID(), role: 'ai', text: aiText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1000);
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', damping: 15 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-28 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${isOpen ? 'pointer-events-none opacity-0' : ''}`}
        style={{ boxShadow: '0 4px 24px -4px rgba(139, 92, 246, 0.5), 0 0 40px -8px rgba(139, 92, 246, 0.3)' }}
      >
        {/* Animated gradient bg */}
        <div className="absolute inset-0 rounded-full ai-gradient-animated" />
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full ai-gradient-animated animate-[ai-pulse_3s_ease-in-out_infinite]" />
        <Sparkles className="w-6 h-6 text-white relative z-10 drop-shadow-md" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-lg h-[75vh] flex flex-col glass-card-premium rounded-t-3xl border-t border-secondary/15 overflow-hidden"
            >
              {/* Header */}
              <div className="shrink-0 px-5 pt-3 pb-3 border-b border-border/30">
                <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-3" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl ai-gradient-animated flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-foreground text-sm">NutriFact AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] text-muted-foreground">Online · Your nutrition coach</span>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-muted/60 hover:bg-accent transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                        msg.role === 'ai'
                          ? 'ai-gradient-animated text-white'
                          : 'nutri-gradient text-primary-foreground'
                      }`}>
                        {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                      </div>
                      {/* Bubble */}
                      <div className={`rounded-2xl px-3.5 py-2.5 ${
                        msg.role === 'user'
                          ? 'nutri-gradient text-primary-foreground rounded-br-md'
                          : 'bg-muted/70 text-foreground border border-border/30 rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <p className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-primary-foreground/50' : 'text-muted-foreground/50'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-7 h-7 rounded-full ai-gradient-animated flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-muted/70 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-[ai-typing_1.4s_ease-in-out_infinite]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-[ai-typing_1.4s_ease-in-out_0.2s_infinite]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-[ai-typing_1.4s_ease-in-out_0.4s_infinite]" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick suggestions */}
              {messages.length <= 1 && !isTyping && (
                <div className="shrink-0 px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
                  {['What should I eat?', 'High protein meals', 'Low calorie snacks', 'Vegan options'].map(q => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); setTimeout(handleSend, 0); }}
                      className="shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full border border-secondary/20 text-secondary bg-accent/50 hover:bg-accent transition-colors whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="shrink-0 px-4 pb-4 pt-2 border-t border-border/20">
                <div className="flex items-center gap-2 bg-muted/60 rounded-2xl pl-4 pr-1.5 py-1.5 border border-border/40 focus-within:border-secondary/30 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask about nutrition..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-9 h-9 rounded-xl nutri-gradient flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-opacity nutri-shadow-gold"
                  >
                    <Send className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
