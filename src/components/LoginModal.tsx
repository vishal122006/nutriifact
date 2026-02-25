import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, LogIn } from 'lucide-react';
import { AuthUser } from '@/hooks/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

export default function LoginModal({ open, onClose, onLogin }: Props) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return setError('Please enter your name');
    if (!/^\d{10}$/.test(mobile.trim())) return setError('Enter a valid 10-digit mobile number');
    setError('');
    onLogin({ name: name.trim(), mobile: mobile.trim() });
    setName('');
    setMobile('');
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
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm bg-card rounded-3xl p-6 border border-secondary/15 nutri-shadow-elevated"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-muted hover:bg-accent transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl nutri-gradient mx-auto flex items-center justify-center mb-3 nutri-shadow-gold">
                <LogIn className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">Login to Continue</h3>
              <p className="text-xs text-muted-foreground mt-1">Sign in to place your order</p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-muted rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 border border-border/40 focus:border-secondary/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full bg-muted rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 border border-border/40 focus:border-secondary/40 focus:outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-destructive font-medium text-center">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                className="w-full nutri-gradient text-primary-foreground rounded-xl py-3.5 text-sm font-bold hover:opacity-90 transition-opacity nutri-shadow-gold"
              >
                Login & Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
