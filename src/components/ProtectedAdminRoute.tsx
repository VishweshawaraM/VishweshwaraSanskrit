import React, { useState, useEffect } from 'react';
import { LogIn, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { DecorativeBorder } from './Motif';
import { Link } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingInitial, setIsCheckingInitial] = useState(true);

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
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_auth_token', 'true');
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to verify password.');
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
        <div className="bg-surface-2 border border-gold-dim p-8 rounded-2xl shadow-2xl space-y-6 text-center">
          <DecorativeBorder className="opacity-50" />
          <div className="space-y-2">
            <h2 className="font-serif text-2xl text-text-primary">Admin Access</h2>
            <p className="text-text-secondary text-sm">Please enter the admin password</p>
          </div>
          {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded">{error}</p>}
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
