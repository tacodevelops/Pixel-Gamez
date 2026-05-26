'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from './AuthContext';

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!showAuthModal) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await register(email, password, displayName);
      }
      if (result.error) {
        setError(result.error);
      } else {
        resetForm();
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={closeAuthModal} aria-label="Close">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="auth-modal__header">
          <h2>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
          <p>{mode === 'login' ? 'Sign in to your PixelGamez account' : 'Join PixelGamez to vote and submit games'}</p>
        </div>

        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Sign In
          </button>
          <button
            className={`auth-modal__tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal__form">
          {mode === 'register' && (
            <div className="auth-modal__field">
              <label htmlFor="auth-name">Display Name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="What should we call you?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-modal__field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-modal__field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder={mode === 'register' ? 'Min 6 characters' : 'Your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === 'register' ? 6 : undefined}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="auth-modal__error">{error}</div>}

          <button type="submit" className="auth-modal__submit" disabled={submitting}>
            {submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-modal__footer">
          {mode === 'login' ? (
            <p>No account? <button onClick={() => switchMode('register')}>Create one</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => switchMode('login')}>Sign in</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
