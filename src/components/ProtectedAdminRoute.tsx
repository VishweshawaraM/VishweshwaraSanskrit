import React, { useState, useEffect } from 'react';
import { LogIn, Loader2, ArrowLeft, KeyRound, Info } from 'lucide-react';
import { Button } from './Button';
import { DecorativeBorder } from './Motif';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { logAdminActivity } from '../lib/firebase';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingInitial, setIsCheckingInitial] = useState(true);
  const [showForgotGuidance, setShowForgotGuidance] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_auth_token');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    setIsCheckingInitial(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        throw new Error(`Server returned invalid response (Status: ${res.status})`);
      }

      if (res.ok && data.success) {
        localStorage.setItem('admin_auth_token', 'true');
        setIsAuthenticated(true);
        logAdminActivity({
          action: 'login',
          status: 'success',
          details: 'Admin authenticated successfully'
        });
      } else {
        setError(data.error || 'Invalid password');
        logAdminActivity({
          action: 'login',
          status: 'failure',
          details: `Failed attempt: ${data.error || 'Invalid password'}`
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(`Error: ${err.message || 'Failed to verify password'}`);
      logAdminActivity({
        action: 'login',
        status: 'failure',
        details: `System error during authentication`
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingInitial) return null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-24 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-surface-2 border border-gold-dim p-8 rounded-2xl shadow-2xl space-y-6 text-center overflow-hidden">
          <DecorativeBorder className="opacity-50" />
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-text-primary">Admin Access</h2>
            <p className="text-text-secondary text-sm">Please enter the admin password</p>
          </div>
          {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-mono tracking-wider text-text-secondary uppercase">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-1 border border-gold-dim rounded p-3 text-text-primary focus:border-gold-base focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : (
                <span className="flex items-center justify-center">
                  <LogIn className="w-4 h-4 mr-2" /> Verify
                </span>
              )}
            </Button>
          </form>
          
          <div className="text-left text-xs text-text-tertiary pt-2 border-t border-gold-dim/10">
            <button 
              onClick={() => setShowForgotGuidance(!showForgotGuidance)}
              className="text-gold-base hover:text-gold-highlight flex items-center transition-colors"
              type="button"
            >
              <KeyRound className="w-3 h-3 mr-1" />
              Forgot password?
            </button>
            
            <AnimatePresence>
              {showForgotGuidance && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-surface-1 p-3 rounded-lg border border-gold-dim/30 text-text-secondary space-y-2">
                    <p className="flex items-start">
                      <Info className="w-4 h-4 mr-2 text-gold-base shrink-0 mt-0.5" />
                      <span>
                        Admin access is controlled via environment variables. To reset or recover your password:
                      </span>
                    </p>
                    <ul className="list-disc pl-8 space-y-1 mt-2">
                      <li>Check your project's <code className="bg-surface-2 px-1 py-0.5 rounded text-gold-base font-mono">.env</code> file or deployment settings.</li>
                      <li>Look for the <code className="bg-surface-2 px-1 py-0.5 rounded text-gold-base font-mono">ADMIN_PASSWORD</code> variable.</li>
                      <li>Update the value and restart the server to apply changes.</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-gold-dim/20">
            <Link to="/" className="text-xs font-mono tracking-wider text-text-tertiary uppercase hover:text-text-primary flex items-center justify-center">
              <ArrowLeft className="w-3 h-3 mr-2" /> Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
