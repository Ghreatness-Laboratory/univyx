import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { adminLogin, isAdminAuthenticated, setActiveTab } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Add noindex, nofollow meta tag dynamically
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    if (isAdminAuthenticated) {
      setActiveTab('admin_panel');
    }
  }, [isAdminAuthenticated, setActiveTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }
    const success = adminLogin(email, password);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-slate-900 dark:text-white space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-display">Univyx System Console</h1>
          <p className="text-xs text-slate-500">
            Protected administrative interface for platform moderation and collegiate governance.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Please enter valid administrator credentials.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300">Admin Email</label>
            <input
              type="email"
              required
              placeholder="admin@univyx.internal"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              className="w-full text-xs p-3 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300">Security Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full text-xs p-3 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Authorize Admin Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-400">
          Direct URL access only · No public links
        </div>
      </div>
    </div>
  );
};
