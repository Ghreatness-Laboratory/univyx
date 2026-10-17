import React, { useState, useEffect, useRef } from 'react';
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
  AlertCircle,
  GraduationCap,
  Loader2,
  RotateCcw,
  Camera
} from 'lucide-react';
import { PrivateUniversity } from '../data/universities';
import { UserAvatar } from './UserAvatar';
import { AvatarEditorModal } from './AvatarEditorModal';

// Google SVG Multi-color Logo
const GoogleLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const WelcomeAuthModal: React.FC = () => {
  const {
    showWelcomeModal,
    setShowWelcomeModal,
    authModalType,
    setAuthModalType,
    universities,
    currentUser,
    setCurrentUser,
    showToast,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendStudentEmailCode,
    verifyStudentEmailCode,
    completeOnboarding,
    sendPasswordResetEmail,
    updatePassword
  } = useApp();

  // Active view mode
  const [mode, setMode] = useState<
    'welcome' | 'signup' | 'login' | 'student_email' | 'student_otp' | 'onboarding' | 'forgot_password' | 'reset_password' | 'verify_email'
  >('welcome');

  // Loading states
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Form states - Signup
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<PrivateUniversity | null>(null);
  const [academicLevel, setAcademicLevel] = useState<'100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate'>('200L');
  const [department, setDepartment] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Student Email Verification Flow
  const [studentEmail, setStudentEmail] = useState('');
  const [studentOtpCode, setStudentOtpCode] = useState(['', '', '', '', '', '']);
  const [matchedUniversityInfo, setMatchedUniversityInfo] = useState<{ id: string; name: string } | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Forgot / Reset Password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // University selector search
  const [uniSearch, setUniSearch] = useState('');
  const [isUniDropdownOpen, setIsUniDropdownOpen] = useState(false);

  // Inline errors & feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync mode with authModalType
  useEffect(() => {
    if (authModalType) {
      setMode(authModalType as any);
      setErrors({});
      setServerError(null);
    }
  }, [authModalType]);

  // If user needs onboarding upon sign-in
  useEffect(() => {
    if (currentUser?.needsOnboarding) {
      setMode('onboarding');
      if (currentUser.fullName) setFullName(currentUser.fullName);
      if (currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  // OTP Countdown timer
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Live Username Check with debounce
  useEffect(() => {
    if (!username.trim() || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        const res = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username.trim())}`);
        const data = await res.json();
        setUsernameAvailable(data.available);
        if (!data.available) {
          setErrors((prev) => ({ ...prev, username: data.message || 'Username is already taken.' }));
        } else {
          setErrors((prev) => {
            const next = { ...prev };
            delete next.username;
            return next;
          });
        }
      } catch {
        setUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [username]);

  // Search filter for universities
  const filteredUnis = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.shortName.toLowerCase().includes(uniSearch.toLowerCase()) ||
      u.state.toLowerCase().includes(uniSearch.toLowerCase())
  );

  const handleClose = () => {
    // If user has not signed in, route protection prevents closing if user is required to authenticate
    if (!currentUser) {
      setMode('welcome');
      return;
    }
    setShowWelcomeModal(false);
    setAuthModalType(null);
  };

  // Password strength helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-border' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-sky-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  };

  // 1. Google OAuth Sign-in
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setServerError(null);
    try {
      const res = await signInWithGoogle();
      if (res?.error) {
        setServerError(res.error);
      }
    } catch (err: any) {
      setServerError(err.message || 'Unable to connect to Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // 2. Student Email Verification Submit
  const handleStudentEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const cleanEmail = studentEmail.toLowerCase().trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrors({ studentEmail: 'Please enter a valid school email address' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Server-side domain check & OTP sending
      const res = await sendStudentEmailCode(cleanEmail);
      if (!res.success) {
        setServerError(res.error || "This email isn't from a supported private university. Use your school email or sign in another way.");
        return;
      }

      setOtpCountdown(60);
      setMode('student_otp');
      showToast(`Verification code sent to ${cleanEmail}`);
    } catch (err: any) {
      setServerError(err.message || 'Failed to verify school email domain.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. OTP Code Input Handling
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Paste handling
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...studentOtpCode];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setStudentOtpCode(newOtp);
      const focusIndex = Math.min(5, digits.length);
      otpInputRefs.current[focusIndex]?.focus();
      return;
    }

    const newOtp = [...studentOtpCode];
    newOtp[index] = value.replace(/\D/g, '');
    setStudentOtpCode(newOtp);

    // Auto advance focus
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !studentOtpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = studentOtpCode.join('');
    if (code.length < 6) {
      setErrors({ otp: 'Please enter the complete 6-digit verification code.' });
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await verifyStudentEmailCode(studentEmail.trim(), code);
      if (!res.success) {
        setServerError(res.error || 'Invalid or expired verification code. Please check your code or request a new one.');
        return;
      }

      showToast('Student email verified successfully!');
      // If user profile needs username/department, route to onboarding, else close
      if (!currentUser?.username) {
        setMode('onboarding');
      } else {
        handleClose();
      }
    } catch (err: any) {
      setServerError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Normal Email & Password Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const errs: Record<string, string> = {};
    if (!loginEmail.trim()) errs.loginEmail = 'Email or username is required';
    if (!loginPassword) errs.loginPassword = 'Password is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signInWithEmail(loginEmail.trim(), loginPassword);
      if (!res.success) {
        // Generic error that does not leak account existence
        setServerError(res.error || 'Invalid email or password. Please verify your credentials and try again.');
        return;
      }

      showToast('Welcome back to Univyx!');
      handleClose();
    } catch {
      setServerError('Invalid email or password. Please verify your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Normal Email & Password Signup
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!username.trim() || username.length < 3) errs.username = 'Username must be at least 3 characters';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email is required';
    if (!password || password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (confirmPassword !== password) errs.confirmPassword = 'Passwords do not match';
    if (!selectedUniversity) errs.university = 'Please select your private university';
    if (!department.trim()) errs.department = 'Department is required';
    if (!agreeTerms) errs.agreeTerms = 'You must agree to the Terms & Community Guidelines';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signUpWithEmail({
        fullName: fullName.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
        universityId: selectedUniversity!.id,
        universityName: selectedUniversity!.name,
        department: department.trim(),
        academicLevel
      });

      if (!res.success) {
        setServerError(res.error || 'Unable to complete sign up. Please try again.');
        return;
      }

      setMode('verify_email');
      showToast('Account created! Please verify your email.');
    } catch (err: any) {
      setServerError(err.message || 'An error occurred during sign up.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Complete Onboarding
  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const errs: Record<string, string> = {};
    if (!username.trim() || username.length < 3) errs.username = 'Username must be at least 3 characters';
    if (!selectedUniversity) errs.university = 'Please select your private university';
    if (!department.trim()) errs.department = 'Department is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await completeOnboarding({
        username: username.trim().toLowerCase(),
        universityId: selectedUniversity!.id,
        universityName: selectedUniversity!.name,
        department: department.trim(),
        academicLevel
      });

      if (!res.success) {
        setServerError(res.error || 'Failed to complete onboarding.');
        return;
      }

      showToast('Onboarding complete! Welcome to Univyx.');
      handleClose();
    } catch (err: any) {
      setServerError(err.message || 'Failed to complete profile onboarding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7. Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setErrors({ forgotEmail: 'Email is required' });
      return;
    }

    setIsSubmitting(true);
    setServerError(null);
    try {
      await sendPasswordResetEmail(forgotEmail.trim());
      // Always show generic message to prevent email enumeration
      setServerSuccess('If an account exists with this email, you will receive password reset instructions shortly.');
    } catch {
      setServerSuccess('If an account exists with this email, you will receive password reset instructions shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no modal is open and user is signed in, return null
  if (!showWelcomeModal && !authModalType && currentUser && !currentUser.needsOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md card-theme shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] btn-primary-gradient flex items-center justify-center p-1 shadow-xs">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-white stroke-white stroke-[28] stroke-linecap-round stroke-linejoin-round">
                <rect x="186" y="112" width="34" height="52" rx="17" transform="rotate(-22 203 138)" stroke="none"/>
                <rect x="178" y="348" width="52" height="34" rx="17" transform="rotate(-30 204 365)" stroke="none"/>
                <path d="M 235,260 L 98,228" strokeWidth="50"/>
                <path d="M 235,260 L 420,180" strokeWidth="50"/>
                <path d="M 235,260 L 210,195" strokeWidth="50"/>
                <path d="M 235,260 L 338,416" strokeWidth="52"/>
                <circle cx="235" cy="260" r="30" stroke="none"/>
              </svg>
            </div>
            <span className="page-title text-text text-base font-extrabold select-none">
              Univyx
            </span>
          </div>

          {/* Close button only visible if user is signed in and not forced to onboarding */}
          {currentUser && !currentUser.needsOnboarding && (
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-text-muted hover:text-text rounded-full hover:bg-accent-soft/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
            </button>
          )}
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-6">
          {/* Global Server Error Banner */}
          {serverError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-snug">{serverError}</span>
            </div>
          )}

          {/* Global Server Success Banner */}
          {serverSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-snug">{serverSuccess}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: WELCOME SCREEN */}
          {/* ======================================================== */}
          {mode === 'welcome' && (
            <div className="space-y-5">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exclusively for private university scholars</span>
                </div>
                <h1 className="page-title text-2xl font-extrabold tracking-tight mt-1">
                  Revolutionizing the student experience.
                </h1>
                <p className="text-xs text-text-muted leading-relaxed">
                  One platform. Every private campus. Connect with verified students from Covenant, Babcock, ABUAD, PAU, Nile, and 20+ top institutions.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-bg/80 border border-border text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-text">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Private University Network</span>
                </div>
                <p className="text-text-muted leading-normal text-[11px]">
                  Text-first discussions, Gist Rooms audio spaces, CIVYN verified internships, and Univyx Arena rankings.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setServerError(null);
                    setMode('signup');
                  }}
                  className="btn-pill btn-primary-gradient w-full py-3 px-4 font-bold text-[15px] shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Create Student Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setServerError(null);
                    setMode('login');
                  }}
                  className="btn-pill w-full py-3 px-4 rounded-full border border-border bg-surface hover:bg-accent-soft/30 text-text font-bold text-[15px] transition-colors cursor-pointer active:scale-[0.98]"
                >
                  Log In
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: SIGN IN (Three Ways to Sign In) */}
          {/* ======================================================== */}
          {mode === 'login' && (
            <div className="space-y-4">
              <div>
                <h2 className="page-title text-xl font-bold">Log in to Univyx</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Choose your preferred sign-in method to enter your campus feed.
                </p>
              </div>

              {/* Requirement 1: Method 1 - Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full min-h-[44px] flex items-center justify-center gap-3 py-2.5 px-4 rounded-full border border-border bg-surface hover:bg-accent-soft/30 text-text font-bold text-[15px] shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                ) : (
                  <GoogleLogo />
                )}
                <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
              </button>

              {/* Requirement 1: Method 2 - Continue with student email */}
              <button
                type="button"
                onClick={() => {
                  setServerError(null);
                  setErrors({});
                  setMode('student_email');
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full border border-border bg-surface hover:bg-accent-soft/30 text-text font-bold text-[15px] shadow-xs transition-all duration-150 cursor-pointer active:scale-[0.98]"
              >
                <GraduationCap className="w-5 h-5 text-accent" strokeWidth={1.8} />
                <span>Continue with student email</span>
              </button>

              {/* Requirement 1: Divider reading "or" */}
              <div className="relative my-3 select-none">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-surface px-3 text-text-muted font-semibold tracking-wider">
                    or
                  </span>
                </div>
              </div>

              {/* Requirement 1: Normal email and password form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-text">
                    Email or Username *
                  </label>
                  <div className="relative mt-1">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-text-muted" strokeWidth={1.8} />
                    <input
                      type="text"
                      placeholder="e.g. scholar@gmail.com or chidi_cu"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (errors.loginEmail) setErrors((prev) => ({ ...prev, loginEmail: '' }));
                      }}
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-bg border ${
                        errors.loginEmail ? 'border-rose-500 ring-1 ring-rose-500' : 'border-border'
                      } text-text focus:outline-none focus:border-accent`}
                    />
                  </div>
                  {errors.loginEmail && (
                    <span className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.loginEmail}</span>
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-text">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setServerError(null);
                        setServerSuccess(null);
                        setMode('forgot_password');
                      }}
                      className="text-xs text-accent hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-text-muted" strokeWidth={1.8} />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (errors.loginPassword) setErrors((prev) => ({ ...prev, loginPassword: '' }));
                      }}
                      className={`w-full text-xs pl-9 pr-9 py-2.5 rounded-xl bg-bg border ${
                        errors.loginPassword ? 'border-rose-500 ring-1 ring-rose-500' : 'border-border'
                      } text-text focus:outline-none focus:border-accent`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 text-text-muted hover:text-text cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.loginPassword && (
                    <span className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.loginPassword}</span>
                    </span>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pill btn-primary-gradient w-full min-h-[44px] py-2.5 px-4 font-bold text-[15px] shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                    <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setServerError(null);
                      setErrors({});
                      setMode('signup');
                    }}
                    className="text-xs text-text-muted hover:text-accent cursor-pointer"
                  >
                    Don't have an account? <span className="font-bold underline text-text">Sign up</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: SIGN UP (Three Ways to Sign Up) */}
          {/* ======================================================== */}
          {mode === 'signup' && (
            <div className="space-y-4">
              <div>
                <h2 className="page-title text-xl font-bold">Join Univyx</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Exclusively for scholars of accredited private universities.
                </p>
              </div>

              {/* Requirement 1: Method 1 - Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full min-h-[44px] flex items-center justify-center gap-3 py-2.5 px-4 rounded-full border border-border bg-surface hover:bg-accent-soft/30 text-text font-bold text-[15px] shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                ) : (
                  <GoogleLogo />
                )}
                <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
              </button>

              {/* Requirement 1: Method 2 - Continue with student email */}
              <button
                type="button"
                onClick={() => {
                  setServerError(null);
                  setErrors({});
                  setMode('student_email');
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full border border-border bg-surface hover:bg-accent-soft/30 text-text font-bold text-[15px] shadow-xs transition-all duration-150 cursor-pointer active:scale-[0.98]"
              >
                <GraduationCap className="w-5 h-5 text-accent" strokeWidth={1.8} />
                <span>Continue with student email</span>
              </button>

              {/* Requirement 1: Divider reading "or" */}
              <div className="relative my-3 select-none">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-surface px-3 text-text-muted font-semibold tracking-wider">
                    or
                  </span>
                </div>
              </div>

              {/* Requirement 1: Normal email and password form */}
              <form onSubmit={handleSignUpSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-text">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Fola Ladipo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text flex items-center justify-between">
                      <span>Username *</span>
                      {isCheckingUsername && <Loader2 className="w-3 h-3 animate-spin text-accent" />}
                      {!isCheckingUsername && usernameAvailable === true && (
                        <span className="text-[10px] text-emerald-500 font-bold">Available</span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. fola_cu"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                    />
                    {errors.username && <p className="text-[11px] text-rose-500 mt-0.5">{errors.username}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-text">Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-text">Password *</label>
                    <div className="relative mt-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 chars"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs pl-3 pr-8 py-2.5 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-text-muted hover:text-text cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-[11px] text-rose-500 mt-0.5">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text">Confirm Password *</label>
                    <div className="relative mt-1">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full text-xs pl-3 pr-8 py-2.5 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-2.5 text-text-muted hover:text-text cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-[11px] text-rose-500 mt-0.5">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((step) => {
                        const str = getPasswordStrength(password);
                        return (
                          <div
                            key={step}
                            className={`flex-1 rounded-full ${step <= str.score ? str.color : 'bg-border'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Searchable Private University Selector */}
                <div>
                  <label className="text-xs font-semibold text-text">Private University *</label>
                  <div className="relative mt-1">
                    <div
                      onClick={() => setIsUniDropdownOpen(!isUniDropdownOpen)}
                      className="w-full text-xs p-2.5 rounded-xl bg-bg border border-border text-text flex items-center justify-between cursor-pointer"
                    >
                      <span>{selectedUniversity ? selectedUniversity.name : 'Select your private university'}</span>
                      <Building2 className="w-4 h-4 text-accent" />
                    </div>

                    {isUniDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 z-30 card-theme shadow-xl p-2 max-h-56 overflow-y-auto">
                        <div className="p-1.5 mb-1 relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-text-muted" />
                          <input
                            type="text"
                            placeholder="Search private universities..."
                            value={uniSearch}
                            onChange={(e) => setUniSearch(e.target.value)}
                            className="w-full text-xs pl-8 pr-2 py-1.5 rounded-lg bg-surface border border-border text-text focus:outline-none"
                            autoFocus
                          />
                        </div>
                        <div className="space-y-0.5">
                          {filteredUnis.map((u) => (
                            <button
                              type="button"
                              key={u.id}
                              onClick={() => {
                                setSelectedUniversity(u);
                                setIsUniDropdownOpen(false);
                              }}
                              className="w-full text-left p-2 rounded-lg hover:bg-accent-soft/40 text-xs text-text flex items-center justify-between cursor-pointer"
                            >
                              <div>
                                <div className="font-semibold">{u.name}</div>
                                <div className="text-[10px] text-text-muted">{u.city}, {u.state}</div>
                              </div>
                              <span className="text-[10px] font-mono text-accent">{u.shortName}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.university && <p className="text-[11px] text-rose-500 mt-0.5">{errors.university}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-text">Level *</label>
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value as any)}
                      className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none cursor-pointer"
                    >
                      <option value="100L">100L (Freshman)</option>
                      <option value="200L">200L (Sophomore)</option>
                      <option value="300L">300L (Junior)</option>
                      <option value="400L">400L (Senior)</option>
                      <option value="500L">500L (Finalist)</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text">Department *</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                    />
                    {errors.department && <p className="text-[11px] text-rose-500 mt-0.5">{errors.department}</p>}
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-accent cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-text-muted leading-tight">
                      I agree to the Terms of Service and community guidelines for private university scholars.
                    </span>
                  </label>
                  {errors.agreeTerms && <p className="text-[11px] text-rose-500 mt-0.5">{errors.agreeTerms}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill btn-primary-gradient w-full min-h-[44px] py-2.5 px-4 font-bold text-[15px] shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{isSubmitting ? 'Creating Scholar Account...' : 'Create Account'}</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setServerError(null);
                      setErrors({});
                      setMode('login');
                    }}
                    className="text-xs text-text-muted hover:text-accent cursor-pointer"
                  >
                    Already have an account? <span className="font-bold underline text-text">Sign in</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: STUDENT EMAIL INPUT (Step 4) */}
          {/* ======================================================== */}
          {mode === 'student_email' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign-in options</span>
              </button>

              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center mb-2">
                  <GraduationCap className="w-5 h-5 text-accent" strokeWidth={1.8} />
                </div>
                <h2 className="page-title text-xl font-bold">Continue with student email</h2>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Enter your official school email address. We'll verify your private university domain and send you a secure 6-digit confirmation code.
                </p>
              </div>

              <form onSubmit={handleStudentEmailSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-semibold text-text">
                    Official Student Email *
                  </label>
                  <div className="relative mt-1">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-text-muted" strokeWidth={1.8} />
                    <input
                      type="email"
                      placeholder="e.g. chidi@student.placeholder-cu.edu"
                      value={studentEmail}
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                        if (errors.studentEmail) setErrors((prev) => ({ ...prev, studentEmail: '' }));
                      }}
                      className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-bg border ${
                        errors.studentEmail ? 'border-rose-500 ring-1 ring-rose-500' : 'border-border'
                      } text-text focus:outline-none focus:border-accent`}
                      autoFocus
                    />
                  </div>
                  {errors.studentEmail && (
                    <span className="text-[11px] text-rose-500 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.studentEmail}</span>
                    </span>
                  )}
                  <p className="text-[11px] text-text-muted mt-1 leading-tight">
                    Must be from an approved private university domain. Instant verification automatically grants the Student Verified badge.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pill btn-primary-gradient w-full min-h-[44px] py-2.5 px-4 font-bold text-[15px] shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                    <span>{isSubmitting ? 'Checking University Domain...' : 'Send Verification Code'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: STUDENT OTP 6-DIGIT CODE ENTRY (Step 4) */}
          {/* ======================================================== */}
          {mode === 'student_otp' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setMode('student_email')}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change email address</span>
              </button>

              <div className="text-center">
                <div className="w-11 h-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5 text-accent" strokeWidth={1.8} />
                </div>
                <h2 className="page-title text-xl font-bold">Enter 6-digit code</h2>
                <p className="text-xs text-text-muted mt-1">
                  We sent a code to <strong className="text-text">{studentEmail}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
                {/* 6 Digit Input Boxes */}
                <div className="flex justify-center gap-2 sm:gap-2.5">
                  {studentOtpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-10 h-12 text-center text-lg font-bold rounded-xl bg-bg border border-border focus:border-accent text-text focus:outline-none focus:ring-1 focus:ring-accent"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                {errors.otp && (
                  <p className="text-[11px] text-rose-500 text-center font-medium">{errors.otp}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || studentOtpCode.join('').length < 6}
                  className="btn-pill btn-primary-gradient w-full min-h-[44px] py-2.5 px-4 font-bold text-[15px] shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{isSubmitting ? 'Verifying Code...' : 'Verify & Continue'}</span>
                </button>

                <div className="text-center pt-1 text-xs text-text-muted">
                  {otpCountdown > 0 ? (
                    <span>Resend code in {otpCountdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStudentEmailSubmit}
                      disabled={isSubmitting}
                      className="text-accent hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Resend 6-digit code</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: ONBOARDING AFTER FIRST LOGIN (Step 3) */}
          {/* ======================================================== */}
          {mode === 'onboarding' && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                  Scholar Setup
                </span>
                <h2 className="page-title text-xl font-bold mt-0.5">
                  Complete Your Scholar Profile
                </h2>
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                  Required before entering Univyx. Pick your unique username and verified private university.
                </p>
              </div>

              <form onSubmit={handleOnboardingSubmit} className="space-y-3">
                {/* Username */}
                <div>
                  <label className="text-xs font-semibold text-text flex items-center justify-between">
                    <span>Choose Username *</span>
                    {isCheckingUsername && <Loader2 className="w-3 h-3 animate-spin text-accent" />}
                    {!isCheckingUsername && usernameAvailable === true && (
                      <span className="text-[10px] text-emerald-500 font-bold">Available</span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. tobi_babcock"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                    autoFocus
                  />
                  {errors.username && <p className="text-[11px] text-rose-500 mt-0.5 font-medium">{errors.username}</p>}
                </div>

                {/* Searchable Private University Selector */}
                <div>
                  <label className="text-xs font-semibold text-text">Your Private University *</label>
                  <div className="relative mt-1">
                    <div
                      onClick={() => setIsUniDropdownOpen(!isUniDropdownOpen)}
                      className="w-full text-xs p-2.5 rounded-xl bg-bg border border-border text-text flex items-center justify-between cursor-pointer"
                    >
                      <span>{selectedUniversity ? selectedUniversity.name : 'Select your private university'}</span>
                      <Building2 className="w-4 h-4 text-accent" />
                    </div>

                    {isUniDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 z-30 card-theme shadow-xl p-2 max-h-56 overflow-y-auto">
                        <div className="p-1.5 mb-1 relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-text-muted" />
                          <input
                            type="text"
                            placeholder="Search private universities..."
                            value={uniSearch}
                            onChange={(e) => setUniSearch(e.target.value)}
                            className="w-full text-xs pl-8 pr-2 py-1.5 rounded-lg bg-surface border border-border text-text focus:outline-none"
                            autoFocus
                          />
                        </div>
                        <div className="space-y-0.5">
                          {filteredUnis.map((u) => (
                            <button
                              type="button"
                              key={u.id}
                              onClick={() => {
                                setSelectedUniversity(u);
                                setIsUniDropdownOpen(false);
                              }}
                              className="w-full text-left p-2 rounded-lg hover:bg-accent-soft/40 text-xs text-text flex items-center justify-between cursor-pointer"
                            >
                              <div>
                                <div className="font-semibold">{u.name}</div>
                                <div className="text-[10px] text-text-muted">{u.city}, {u.state}</div>
                              </div>
                              <span className="text-[10px] font-mono text-accent">{u.shortName}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.university && <p className="text-[11px] text-rose-500 mt-0.5 font-medium">{errors.university}</p>}
                </div>

                {/* Level & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-text">Academic Level *</label>
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value as any)}
                      className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none cursor-pointer"
                    >
                      <option value="100L">100L (Freshman)</option>
                      <option value="200L">200L (Sophomore)</option>
                      <option value="300L">300L (Junior)</option>
                      <option value="400L">400L (Senior)</option>
                      <option value="500L">500L (Finalist)</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text">Department *</label>
                    <input
                      type="text"
                      placeholder="e.g. Economics"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                    />
                    {errors.department && <p className="text-[11px] text-rose-500 mt-0.5 font-medium">{errors.department}</p>}
                  </div>
                </div>

                {/* Profile Picture Option during Onboarding */}
                <div className="p-3 rounded-xl bg-bg border border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar
                      src={currentUser?.avatarUrl || currentUser?.avatar_url}
                      name={username || currentUser?.fullName || 'Scholar'}
                      size="md"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-xs text-text truncate">Profile Picture (Optional)</div>
                      <p className="text-[10.5px] text-text-muted">
                        {(currentUser?.avatarUrl || currentUser?.avatar_url) ? 'Custom photo uploaded' : 'Default initials avatar'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAvatarEditor(true)}
                    className="px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-text hover:bg-accent-soft/40 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Camera className="w-3.5 h-3.5 text-accent" />
                    <span>{(currentUser?.avatarUrl || currentUser?.avatar_url) ? 'Change' : 'Upload'}</span>
                  </button>
                </div>

                <AvatarEditorModal
                  isOpen={showAvatarEditor}
                  onClose={() => setShowAvatarEditor(false)}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pill btn-primary-gradient w-full min-h-[44px] py-2.5 px-4 font-bold text-[15px] shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                    <span>{isSubmitting ? 'Saving Scholar Profile...' : 'Complete & Enter Univyx'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: FORGOT PASSWORD */}
          {/* ======================================================== */}
          {mode === 'forgot_password' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </button>

              <div>
                <h2 className="page-title text-xl font-bold">Reset Password</h2>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Enter your registered account email. If an account exists, you will receive a secure password reset link.
                </p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-semibold text-text">Account Email *</label>
                  <input
                    type="email"
                    placeholder="Enter your account email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full text-xs p-2.5 mt-1 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent"
                    autoFocus
                  />
                  {errors.forgotEmail && <p className="text-[11px] text-rose-500 mt-0.5">{errors.forgotEmail}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill btn-primary-gradient w-full min-h-[44px] py-2.5 px-4 font-bold text-[15px] shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  <span>{isSubmitting ? 'Sending Reset Instructions...' : 'Send Reset Link'}</span>
                </button>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: VERIFY EMAIL NOTICE */}
          {/* ======================================================== */}
          {mode === 'verify_email' && (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-2xl bg-accent-soft text-accent flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-accent" strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="page-title text-xl font-bold">Verify your email</h2>
                <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto leading-relaxed">
                  We've sent a verification email to your address. Please click the link inside to confirm your scholar account before posting.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Verification email resent.');
                  }}
                  className="btn-pill btn-primary-gradient py-2.5 px-4 font-bold text-[15px] shadow-sm cursor-pointer"
                >
                  Resend Verification Email
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-text-muted hover:text-accent font-medium py-1 cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeAuthModal;
