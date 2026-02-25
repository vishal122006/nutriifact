import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, LogIn, ShieldCheck, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthUser } from '@/hooks/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

type Step = 'details' | 'otp' | 'success';

export default function LoginModal({ open, onClose, onLogin }: Props) {
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  // Auto-focus first OTP input
  useEffect(() => {
    if (step === 'otp') inputRefs.current[0]?.focus();
  }, [step]);

  const resetState = useCallback(() => {
    setStep('details');
    setName('');
    setMobile('');
    setOtp(['', '', '', '', '', '']);
    setGeneratedOtp('');
    setError('');
    setTimer(0);
  }, []);

  const handleSendOtp = () => {
    if (!name.trim()) return setError('Please enter your name');
    if (!/^\d{10}$/.test(mobile.trim())) return setError('Enter a valid 10-digit mobile number');
    setError('');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setTimer(30);
    setStep('otp');
    // Mock: show OTP in console for testing
    console.log(`[Mock OTP] Your OTP is: ${code}`);
  };

  const handleResendOtp = () => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setTimer(30);
    console.log(`[Mock OTP] Your new OTP is: ${code}`);
    inputRefs.current[0]?.focus();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all filled
    const fullOtp = newOtp.join('');
    if (fullOtp.length === 6) {
      if (fullOtp === generatedOtp) {
        setStep('success');
        setTimeout(() => {
          onLogin({ name: name.trim(), mobile: mobile.trim() });
          resetState();
        }, 1500);
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetState, 300);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="relative w-full max-w-sm glass-card-premium rounded-3xl p-6 border border-secondary/20 nutri-shadow-elevated overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

            {/* Header controls */}
            <div className="relative flex items-center justify-between mb-5">
              {step === 'otp' ? (
                <button onClick={() => { setStep('details'); setError(''); setOtp(['','','','','','']); }} className="p-1.5 rounded-full bg-muted/60 hover:bg-accent transition-colors">
                  <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </button>
              ) : <div />}
              <button onClick={handleClose} className="p-1.5 rounded-full bg-muted/60 hover:bg-accent transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {/* === STEP 1: Details === */}
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl nutri-gradient mx-auto flex items-center justify-center mb-3 nutri-shadow-gold">
                      <LogIn className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground">Welcome Back</h3>
                    <p className="text-xs text-muted-foreground mt-1">Enter your details to continue</p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => { setName(e.target.value); setError(''); }}
                        className="w-full bg-muted/50 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 border border-border/40 focus:border-secondary/50 focus:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
                      />
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                      <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60 font-medium">+91</span>
                      <input
                        type="tel"
                        placeholder="Mobile number"
                        value={mobile}
                        onChange={e => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                        className="w-full bg-muted/50 rounded-2xl pl-[4.5rem] pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 border border-border/40 focus:border-secondary/50 focus:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-secondary/10 transition-all"
                      />
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive font-medium text-center">
                        {error}
                      </motion.p>
                    )}

                    <button
                      onClick={handleSendOtp}
                      className="w-full nutri-gradient text-primary-foreground rounded-2xl py-3.5 text-sm font-bold hover:opacity-90 transition-opacity nutri-shadow-gold flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4" />
                      Send OTP
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-muted-foreground/50 text-[10px] pt-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Your data is safe & encrypted</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* === STEP 2: OTP === */}
              {step === 'otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent mx-auto flex items-center justify-center mb-3 border border-secondary/15">
                      <KeyRound className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground">Verify OTP</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sent to <span className="font-semibold text-foreground">+91 {mobile}</span>
                    </p>
                  </div>

                  {/* OTP Inputs */}
                  <div className="flex justify-center gap-2.5 mb-4">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                        className={`w-11 h-13 rounded-xl text-center text-lg font-bold border-2 bg-muted/50 text-foreground focus:outline-none transition-all ${
                          digit
                            ? 'border-secondary/50 bg-accent/50 ring-2 ring-secondary/10'
                            : 'border-border/50 focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10'
                        }`}
                      />
                    ))}
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive font-medium text-center mb-3">
                      {error}
                    </motion.p>
                  )}

                  {/* Resend */}
                  <div className="text-center mb-4">
                    {timer > 0 ? (
                      <p className="text-xs text-muted-foreground">
                        Resend OTP in <span className="font-bold text-secondary">{timer}s</span>
                      </p>
                    ) : (
                      <button onClick={handleResendOtp} className="text-xs font-semibold text-secondary hover:underline transition-all">
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Mock hint */}
                  <div className="bg-accent/50 rounded-xl p-3 border border-secondary/10">
                    <p className="text-[10px] text-muted-foreground text-center">
                      💡 <span className="font-semibold">Demo mode</span> — Check browser console for mock OTP
                    </p>
                  </div>
                </motion.div>
              )}

              {/* === STEP 3: Success === */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.15, damping: 15 }}
                    className="w-20 h-20 rounded-full nutri-gradient mx-auto flex items-center justify-center mb-4 nutri-shadow-gold"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-foreground">Welcome, {name}!</h3>
                  <p className="text-xs text-muted-foreground mt-1">You're all set to order 🎉</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
