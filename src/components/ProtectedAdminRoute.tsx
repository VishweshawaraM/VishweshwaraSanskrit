import React, { useState, useEffect } from 'react';
import { LogIn, Loader2, ArrowLeft, Info } from 'lucide-react';
import { Button } from './Button';
import { DecorativeBorder } from './Motif';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth, logAdminActivity } from '../lib/firebase';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  // Real session check — Firebase verifies this against its own servers,
  // not a string sitting in localStorage.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingSession(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      logAdminActivity({ action: 'login', status: 'success', details: 'Admin authenticated' });
    } catch (err: any) {
      setError('Incorrect email or password.');
      logAdminActivity({ action: 'login', status: 'failure', details: err?.code || 'unknown error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingSession) return null;

  if (user) return <>{children}</>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-24 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-surface-2 border border-gold-dim p-8 rounded-2xl shadow-2xl space-y-6 text-center overflow-hidden">
          <DecorativeBorder className="opacity-50" />
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-text-primary">Admin Access</h2>
            <p className="text-text-secondary text-sm">Sign in with your Acharya account</p>
          </div>
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">{error}</p>
          )}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-mono tracking-wider text-text-secondary uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-1 border border-gold-dim rounded p-3 text-text-primary focus:border-gold-base focus:outline-none transition-colors"
                placeholder="you@example.com"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono tracking-wider text-text-secondary uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-1 border border-gold-dim rounded p-3 text-text-primary focus:border-gold-base focus:outline-none transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="w-4 h-4 mr-2" /> Sign in
                </span>
              )}
            </Button>
          </form>

          <div className="text-left text-xs text-text-tertiary pt-2 border-t border-gold-dim/10">
            <button
              onClick={() => setShowGuidance(!showGuidance)}
              className="text-gold-base hover:text-gold-highlight flex items-center transition-colors"
              type="button"
            >
              <Info className="w-3 h-3 mr-1" />
              Forgot your password?
            </button>
            <AnimatePresence>
              {showGuidance && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-surface-1 p-3 rounded-lg border border-gold-dim/30 text-text-secondary space-y-2">
                    <p>
                      Reset it in the Firebase Console: Authentication → Users → your email →
                      Reset password.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-gold-dim/20">
            <Link
              to="/"
              className="text-xs font-mono tracking-wider text-text-tertiary uppercase hover:text-text-primary flex items-center justify-center"
            >
              <ArrowLeft className="w-3 h-3 mr-2" /> Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
