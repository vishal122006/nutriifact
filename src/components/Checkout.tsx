import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CreditCard, Smartphone, Building2, Wallet, Banknote, UtensilsCrossed,
  ChevronRight, ShieldCheck, CheckCircle2, Flame, Beef, Wheat, Droplets, ArrowLeft
} from 'lucide-react';
import { CartItem } from '@/types/nutrition';

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod' | 'pay-at-restaurant';

interface Props {
  cart: CartItem[];
  cartTotals: { calories: number; protein: number; carbs: number; fats: number; cost: number; items: number };
  goalCalories: number;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PAYMENT_METHODS: { id: PaymentMethod; label: string; sublabel: string; icon: React.ReactNode; popular?: boolean }[] = [
  { id: 'upi', label: 'UPI', sublabel: 'GPay, PhonePe, Paytm', icon: <Smartphone className="w-5 h-5" />, popular: true },
  { id: 'card', label: 'Credit / Debit Card', sublabel: 'Visa, Mastercard, RuPay', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'netbanking', label: 'Net Banking', sublabel: 'All major banks', icon: <Building2 className="w-5 h-5" /> },
  { id: 'wallet', label: 'Wallet', sublabel: 'Paytm, Amazon Pay', icon: <Wallet className="w-5 h-5" /> },
  { id: 'cod', label: 'Cash on Delivery', sublabel: 'Pay when you receive', icon: <Banknote className="w-5 h-5" /> },
  { id: 'pay-at-restaurant', label: 'Pay at Restaurant', sublabel: 'Pay when you dine', icon: <UtensilsCrossed className="w-5 h-5" /> },
];

export default function Checkout({ cart, cartTotals, goalCalories, open, onClose, onConfirm }: Props) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [step, setStep] = useState<'summary' | 'payment' | 'success'>('summary');

  const handleConfirm = () => {
    setStep('success');
    setTimeout(() => {
      onConfirm();
      setStep('summary');
    }, 3000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card rounded-t-3xl max-h-[92vh] overflow-y-auto border-t border-secondary/15"
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl z-10 pt-3 pb-2 px-6 rounded-t-3xl">
              <div className="w-10 h-1 bg-secondary/30 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                {step !== 'summary' && step !== 'success' ? (
                  <button onClick={() => setStep('summary')} className="p-1.5 rounded-full bg-muted hover:bg-accent transition-colors">
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                ) : <div />}
                <h3 className="font-display font-bold text-foreground text-lg">
                  {step === 'summary' ? 'Order Summary' : step === 'payment' ? 'Payment' : 'Order Placed!'}
                </h3>
                <button onClick={onClose} className="p-1.5 rounded-full bg-muted hover:bg-accent transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="px-6 pb-8 space-y-5">
              <AnimatePresence mode="wait">
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 rounded-full nutri-gradient mx-auto flex items-center justify-center nutri-shadow-gold"
                    >
                      <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-foreground">Order Confirmed!</h3>
                    <p className="text-sm text-muted-foreground">Your healthy meal is being prepared 🥗</p>
                    <div className="nutri-gradient-gold rounded-2xl p-4 text-secondary-foreground inline-block">
                      <p className="text-xs font-medium">Calorie Summary</p>
                      <p className="text-xl font-display font-bold">🔥 {Math.round(cartTotals.calories)} kcal</p>
                      <p className="text-[10px] mt-1">
                        {cartTotals.calories <= goalCalories
                          ? '✅ Within your daily goal!'
                          : `⚠️ ${Math.round(cartTotals.calories - goalCalories)} kcal over your goal`}
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 'summary' && (
                  <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                    {/* Items */}
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                            {item.foodItem.image ? (
                              <img src={item.foodItem.image} alt={item.foodItem.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center text-lg">{item.foodItem.emoji}</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.foodItem.name}</p>
                            <p className="text-[10px] text-muted-foreground">×{item.quantity} · {Math.round(item.foodItem.calories * item.quantity)} cal</p>
                          </div>
                          <span className="text-sm font-bold text-foreground">₹{(item.foodItem.pricePerServing * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Nutrition Summary */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Calories', value: Math.round(cartTotals.calories), unit: '', icon: <Flame className="w-3 h-3" />, cls: 'bg-nutri-gold-light text-nutri-gold' },
                        { label: 'Protein', value: Math.round(cartTotals.protein), unit: 'g', icon: <Beef className="w-3 h-3" />, cls: 'bg-nutri-red-light text-nutri-red' },
                        { label: 'Carbs', value: Math.round(cartTotals.carbs), unit: 'g', icon: <Wheat className="w-3 h-3" />, cls: 'bg-nutri-blue-light text-nutri-blue' },
                        { label: 'Fats', value: Math.round(cartTotals.fats), unit: 'g', icon: <Droplets className="w-3 h-3" />, cls: 'bg-nutri-purple-light text-nutri-purple' },
                      ].map(m => (
                        <div key={m.label} className={`${m.cls} rounded-xl p-2 text-center`}>
                          <div className="flex items-center justify-center gap-0.5 mb-0.5">{m.icon}</div>
                          <p className="text-xs font-bold">{m.value}{m.unit}</p>
                          <p className="text-[8px] font-medium opacity-70">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground font-medium">₹{cartTotals.cost.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-primary font-medium">FREE</span>
                      </div>
                      <div className="border-t border-border/50 pt-2 flex justify-between text-base">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="font-display font-bold text-secondary">₹{cartTotals.cost.toFixed(0)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('payment')}
                      className="w-full nutri-gradient text-primary-foreground rounded-2xl py-4 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity nutri-shadow-gold"
                    >
                      Choose Payment Method
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 'payment' && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                    {/* Payment Methods */}
                    <div className="space-y-2">
                      {PAYMENT_METHODS.map(pm => (
                        <button
                          key={pm.id}
                          onClick={() => setSelectedPayment(pm.id)}
                          className={`w-full flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all text-left ${
                            selectedPayment === pm.id
                              ? 'bg-accent border-2 border-secondary/40 nutri-shadow'
                              : 'bg-card border border-border/50 hover:border-secondary/20'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            selectedPayment === pm.id
                              ? 'nutri-gradient-gold text-secondary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {pm.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-foreground">{pm.label}</span>
                              {pm.popular && (
                                <span className="text-[8px] font-bold bg-secondary/15 text-secondary px-1.5 py-0.5 rounded-full">POPULAR</span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground">{pm.sublabel}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPayment === pm.id
                              ? 'border-secondary bg-secondary'
                              : 'border-muted-foreground/30'
                          }`}>
                            {selectedPayment === pm.id && <div className="w-2 h-2 rounded-full bg-secondary-foreground" />}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Secure Badge */}
                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span>Secure & encrypted payment</span>
                    </div>

                    {/* Confirm Button */}
                    <button
                      onClick={handleConfirm}
                      className="w-full nutri-gradient text-primary-foreground rounded-2xl py-4 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity nutri-shadow-gold"
                    >
                      Pay ₹{cartTotals.cost.toFixed(0)}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}