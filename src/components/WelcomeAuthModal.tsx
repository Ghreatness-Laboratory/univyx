import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Building2,
  Search,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export const WelcomeAuthModal: React.FC = () => {
  const {
    showWelcomeModal,
    setShowWelcomeModal,
    authModalType,
    setAuthModalType,
    universities,
    onboardUser
  } = useApp();

  const [mode, setMode] = useState<
    'welcome' | 'signup' | 'login' | 'forgot_password' | 'verify_email'
  >(authModalType ? authModalType : 'welcome');

  // Form states - Signup
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [universityId, setUniversityId] = useState('covenant');
  const [academicLevel, setAcademicLevel] = useState<
    '100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate'
  >('200L');
  const [department, setDepartment] = useState('');
  const [interests, setInterests] = useState<string[]>([
    'Academics & Study',
    'Campus Gist & Banter'
  ]);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form states - Login & Forgot Password
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  // Search in University Selector
  const [uniSearch, setUniSearch] = useState('');

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleClose = () => {
    setShowWelcomeModal(false);
    setAuthModalType(null);
  };

  const validateSignup = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!username.trim()) {
      errs.username = 'Username is required';
    } else if (username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!universityId) {
      errs.universityId = 'Please select your private university';
    }

    if (!agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms & Community Guidelines';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    // Transition to verification email screen as requested
    setMode('verify_email');
    if (authModalType) setAuthModalType(null);
  };

  const handleCompleteVerification = () => {
    const selectedUni = universities.find((u) => u.id === universityId);
    onboardUser({
      fullName: fullName.trim(),
      username: username.trim().replace('@', ''),
      email: email.trim(),
      universityId,
      universityName: selectedUni?.name || 'Private University',
      department: department.trim() || 'General Studies',
      academicLevel,
      interests
    });
    handleClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!loginEmail.trim()) {
      errs.loginEmail = 'Email or username is required';
    }
    if (!loginPassword) {
      errs.loginPassword = 'Password is required';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const emailVal = loginEmail.trim();
    onboardUser({
      fullName: emailVal.split('@')[0].replace('.', ' '),
      username: emailVal.split('@')[0].replace('.', '_'),
      email: emailVal.includes('@') ? emailVal : `${emailVal}@univyx.edu.ng`,
      universityId: 'covenant'
    });
    handleClose();
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setErrors({ forgotEmail: 'Please enter a valid email address' });
      return;
    }
    setErrors({});
    setForgotSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-white my-8">
        
        {/* Top Header / Wordmark */}
        <div className="p-5 pb-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
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
              <span className="text-xl font-extrabold tracking-tight leading-none block">
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
        {/* 1. WELCOME / LANDING VIEW */}
        {/* ======================================================== */}
        {currentMode === 'welcome' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#1D9BF0] text-xs font-semibold border border-blue-200 dark:border-blue-900/50">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusively for private university students</span>
              </div>
              <h1 className="page-title text-2xl sm:text-3xl font-extrabold tracking-tight">
                Revolutionalizing the student experience.
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                One platform. Every private campus. Every conversation. Join verified scholars from Babcock, Covenant, ABUAD, Bowen, PAU, Nile, Baze, Redeemer's and 20+ top institutions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121417] border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Strictly private universities & student organisations</span>
              </div>
              <p className="text-slate-500 leading-normal">
                Text-first collegiate discussions, Gist Rooms live voice spaces, CIVYN student internships, and Univyx Arena rankings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setErrors({});
                  setMode('signup');
                  if (authModalType) setAuthModalType(null);
                }}
                className="btn-pill flex-1 py-3 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setErrors({});
                  setMode('login');
                  if (authModalType) setAuthModalType(null);
                }}
                className="btn-pill flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={handleClose}
                className="text-xs text-slate-500 hover:text-[#1D9BF0] underline cursor-pointer"
              >
                Continue exploring as verified guest
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. SIGN UP VIEW (Normal email accepted) */}
        {/* ======================================================== */}
        {currentMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="p-5 sm:p-7 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
            <div>
              <span className="text-xs font-bold text-[#1D9BF0] uppercase tracking-wider block">
                Create Account
              </span>
              <h2 className="page-title text-xl font-bold mt-0.5">
                Join Your Private Varsity Community
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Any regular email is accepted (Gmail, Yahoo, iCloud, or university email).
              </p>
            </div>

            {/* Full Name & Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fola Ladipo"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  className={`w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                    errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                />
                {errors.fullName && (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Username (@handle) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. folayemi"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                  }}
                  className={`w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                    errors.username ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                />
                {errors.username && (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.username}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Email (Normal email) */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Email Address *</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-normal">
                  School email NOT required
                </span>
              </label>
              <div className="relative mt-1">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g. yourname@gmail.com or scholar@cu.edu.ng"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                    errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                />
              </div>
              {errors.email && (
                <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </span>
              )}
            </div>

            {/* Password & Confirm Password with Show/Hide & Strength */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password *
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    className={`w-full text-xs pr-8 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                      errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password}</span>
                  </span>
                )}
                {/* Live Password Strength Indicator */}
                {password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Strength:</span>
                      <span className="font-bold">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Confirm Password *
                </label>
                <div className="relative mt-1">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    }}
                    className={`w-full text-xs pr-8 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                      errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.confirmPassword}</span>
                  </span>
                )}
              </div>
            </div>

            {/* University Selector (Strictly Private list) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Select Private University *
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter university name..."
                  value={uniSearch}
                  onChange={(e) => setUniSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto no-scrollbar border border-slate-200 dark:border-slate-800 rounded-xl p-1.5">
                {filteredUnis.map((u) => {
                  const isSelected = universityId === u.id;
                  return (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => {
                        setUniversityId(u.id);
                        if (errors.universityId) setErrors((prev) => ({ ...prev, universityId: '' }));
                      }}
                      className={`text-left p-2 rounded-lg text-[11px] transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#1D9BF0] text-white font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate">{u.shortName}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Academic Level & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Academic Level
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value as any)}
                  className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="100L">100L (Freshman)</option>
                  <option value="200L">200L (Sophomore)</option>
                  <option value="300L">300L (Penultimate)</option>
                  <option value="400L">400L (Final Year)</option>
                  <option value="500L">500L (Final Year Eng/Law)</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science / Law"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Interests Chips */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Campus Interests
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((item) => {
                  const isChecked = interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0] font-semibold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: '' }));
                  }}
                  className="w-4 h-4 mt-0.5 accent-[#1D9BF0] cursor-pointer shrink-0"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                  I agree to the <span className="text-[#1D9BF0] underline">Terms of Service</span> and verified private campus community guidelines.
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.agreeTerms}</span>
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn-pill w-full py-3 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Create Account
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setMode('login');
                }}
                className="text-xs text-slate-500 hover:text-[#1D9BF0] cursor-pointer"
              >
                Already have an account? <span className="font-bold underline">Sign in</span>
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* 3. SIGN IN VIEW */}
        {/* ======================================================== */}
        {currentMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#1D9BF0] uppercase tracking-wider block">
                Welcome Back
              </span>
              <h2 className="page-title text-xl font-bold mt-0.5">
                Sign in to Univyx
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Revolutionalizing the student experience.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email or Username *
              </label>
              <div className="relative mt-1">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. scholar@gmail.com or chidi_cu"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    if (errors.loginEmail) setErrors((prev) => ({ ...prev, loginEmail: '' }));
                  }}
                  className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                    errors.loginEmail ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                />
              </div>
              {errors.loginEmail && (
                <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.loginEmail}</span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                    setMode('forgot_password');
                  }}
                  className="text-xs text-[#1D9BF0] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-1">
                <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    if (errors.loginPassword) setErrors((prev) => ({ ...prev, loginPassword: '' }));
                  }}
                  className={`w-full text-xs pl-8 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                    errors.loginPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showLoginPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.loginPassword && (
                <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.loginPassword}</span>
                </span>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-pill w-full py-3 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setMode('signup');
                }}
                className="text-slate-500 hover:text-[#1D9BF0] cursor-pointer"
              >
                Don't have an account? <span className="font-bold underline">Sign up</span>
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* 4. FORGOT PASSWORD VIEW (UI only) */}
        {/* ======================================================== */}
        {currentMode === 'forgot_password' && (
          <div className="p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setMode('login')}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#1D9BF0] cursor-pointer mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>

            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#1D9BF0]/10 text-[#1D9BF0] flex items-center justify-center mb-2">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="page-title text-xl font-bold">
                Reset Password
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your account email and we'll send password reset instructions.
              </p>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    Instructions Sent!
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                    We've emailed a password recovery link to <span className="font-bold">{forgotEmail}</span>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setForgotSent(false);
                    setMode('login');
                  }}
                  className="btn-pill px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Account Email *
                  </label>
                  <div className="relative mt-1">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. yourname@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        if (errors.forgotEmail) setErrors({});
                      }}
                      className={`w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border ${
                        errors.forgotEmail ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                      } text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]`}
                    />
                  </div>
                  {errors.forgotEmail && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.forgotEmail}</span>
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-pill w-full py-3 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  Send Reset Instructions
                </button>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. CHECK YOUR EMAIL TO VERIFY VIEW */}
        {/* ======================================================== */}
        {currentMode === 'verify_email' && (
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 text-[#1D9BF0] mx-auto flex items-center justify-center border border-blue-500/20">
              <Mail className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#1D9BF0] uppercase tracking-wider block mb-1">
                Account Verification
              </span>
              <h2 className="page-title text-xl font-bold">
                Check Your Email
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                We've sent a 6-digit verification code to <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
              </p>
            </div>

            {/* 6 Digit Input Mock */}
            <div className="flex justify-center gap-2 py-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={verificationCode[idx]}
                  onChange={(e) => {
                    const newArr = [...verificationCode];
                    newArr[idx] = e.target.value;
                    setVerificationCode(newArr);
                  }}
                  placeholder="•"
                  className="w-10 h-12 text-center text-lg font-bold rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
                />
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121417] border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              <p>For this preview test, click below to immediately verify your student profile and enter your campus feed.</p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleCompleteVerification}
                className="btn-pill w-full py-3 px-4 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Continue to Univyx
              </button>

              <button
                type="button"
                onClick={() => {
                  setVerificationCode(['4', '8', '2', '9', '1', '6']);
                }}
                className="text-xs text-[#1D9BF0] hover:underline block mx-auto cursor-pointer"
              >
                Auto-fill mock code (482916)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
