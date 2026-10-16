import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Building2, Search, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const WelcomeAuthModal: React.FC = () => {
  const {
    showWelcomeModal,
    setShowWelcomeModal,
    authModalType,
    setAuthModalType,
    universities,
    onboardUser
  } = useApp();

  const [mode, setMode] = useState<'welcome' | 'signup' | 'login'>(
    authModalType ? authModalType : 'welcome'
  );

  // Form states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [universityId, setUniversityId] = useState('covenant');
  const [department, setDepartment] = useState('');
  const [academicLevel, setAcademicLevel] = useState<'100L' | '200L' | '300L' | '400L' | '500L'>('200L');
  const [uniSearch, setUniSearch] = useState('');
  const [interests, setInterests] = useState<string[]>(['Academics', 'Campus Life']);

  if (!showWelcomeModal && !authModalType) return null;

  const currentMode = authModalType ? authModalType : mode;

  const filteredUnis = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.shortName.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.state.toLowerCase().includes(uniSearch.toLowerCase())
  );

  const interestOptions = [
    'Academics & Study',
    'Campus Gist & Banter',
    'CIVYN Tech Internships',
    'Univyx Arena Gaming',
    'Store & Campus Vendors',
    'Events & Galas'
  ];

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleClose = () => {
    setShowWelcomeModal(false);
    setAuthModalType(null);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !username || !universityId) return;

    onboardUser({
      fullName,
      username: username.replace('@', ''),
      email,
      universityId,
      department: department || 'General Studies',
      academicLevel,
      interests
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    onboardUser({
      fullName: email.split('@')[0].replace('.', ' '),
      username: email.split('@')[0].replace('.', '_'),
      email,
      universityId
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-white my-8">
        
        {/* Top Header / Wordmark */}
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Logo Emblem */}
            <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-1.5 shadow-sm">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-white dark:fill-black stroke-white dark:stroke-black stroke-[30] stroke-linecap-round stroke-linejoin-round">
                <rect x="186" y="112" width="34" height="52" rx="17" transform="rotate(-22 203 138)" stroke="none"/>
                <rect x="178" y="348" width="52" height="34" rx="17" transform="rotate(-30 204 365)" stroke="none"/>
                <path d="M 235,260 L 98,228" strokeWidth="50"/>
                <path d="M 235,260 L 420,180" strokeWidth="50"/>
                <path d="M 235,260 L 210,195" strokeWidth="50"/>
                <path d="M 235,260 L 338,416" strokeWidth="52"/>
                <circle cx="235" cy="260" r="30" stroke="none"/>
              </svg>
            </div>
            <div>
              <span className="wordmark text-xl tracking-tight leading-none block">
                Univyx
              </span>
              <span className="text-[10px] text-[#1D9BF0] font-semibold tracking-wide">
                Exclusively Private Universities
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* WELCOME / LANDING VIEW */}
        {/* ======================================================== */}
        {currentMode === 'welcome' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#1D9BF0] text-xs font-semibold border border-blue-200 dark:border-blue-900/50">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusively for private university students</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Revolutionizing the student experience.
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                One platform. Every private campus. Every conversation. Every opportunity. Join verified scholars from Babcock, Covenant, ABUAD, Bowen, PAU, Nile, Baze and 22+ top institutions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121417] border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Only students from verified private universities</span>
              </div>
              <p className="text-slate-500 leading-normal">
                Text-first collegiate discussions, CIVYN student career discovery, verified campus vendors, and Univyx Arena power rankings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setAuthModalType('signup');
                  setMode('signup');
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold text-sm transition-all shadow-md shadow-[#1D9BF0]/20 flex items-center justify-center gap-2"
              >
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setAuthModalType('login');
                  setMode('login');
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-sm transition-colors"
              >
                Sign In
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={handleClose}
                className="text-xs text-slate-500 hover:text-[#1D9BF0] underline"
              >
                Continue exploring as verified guest
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SIGN UP / ONBOARDING VIEW */}
        {/* ======================================================== */}
        {currentMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <span className="text-xs font-bold text-[#1D9BF0] uppercase tracking-wider block">
                Step into Univyx
              </span>
              <h2 className="text-xl font-bold font-display mt-0.5">
                Join Your Private Campus Community
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Only students from verified private universities can participate.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fola Ladipo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Username (@handle) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. folayemi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Private University Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. scholar@babcock.edu.ng or cu.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
              />
            </div>

            {/* Searchable University Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select Private University ({universities.length} Verified Institutions) *
                </label>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search university name (e.g. Babcock, Covenant, ABUAD, Bowen)..."
                  value={uniSearch}
                  onChange={(e) => setUniSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
                />
              </div>

              <div className="max-h-32 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0A0A0A]/50 p-1 space-y-1">
                {filteredUnis.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => setUniversityId(u.id)}
                    className={`p-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      universityId === u.id
                        ? 'bg-[#1D9BF0] text-white font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{u.name}</span>
                    <span className="text-[10px] opacity-75">{u.city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Department / Major</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, Law"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Academic Level</label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value as any)}
                  className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="100L">100L (Freshman)</option>
                  <option value="200L">200L (Sophomore)</option>
                  <option value="300L">300L (Penultimate)</option>
                  <option value="400L">400L (Final Year)</option>
                  <option value="500L">500L (Final Year Eng/Law)</option>
                </select>
              </div>
            </div>

            {/* Interest Tags */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Collegiate Interests
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((opt) => {
                  const isSelected = interests.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#1D9BF0] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAuthModalType('login')}
                className="text-xs text-[#1D9BF0] hover:underline"
              >
                Already have an account? Sign In
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Complete Onboarding
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* SIGN IN VIEW */}
        {/* ======================================================== */}
        {currentMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#1D9BF0] uppercase tracking-wider block">
                Welcome Back
              </span>
              <h2 className="text-xl font-bold font-display mt-0.5">
                Sign in to Univyx
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Revolutionizing the student experience.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">University Email or Username *</label>
              <input
                type="text"
                required
                placeholder="scholar@covenant.edu.ng or chidi_cu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs p-3 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Sign In to Campus Feed
            </button>

            <div className="pt-2 text-center text-xs">
              <button
                type="button"
                onClick={() => setAuthModalType('signup')}
                className="text-[#1D9BF0] hover:underline"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
