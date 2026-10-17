import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AuthCallbackView: React.FC = () => {
  const { setActiveTab, setAuthModalType, showToast, setCurrentUser } = useApp();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (!supabase) {
          // Simulation / Dev mode when Supabase is not yet configured
          setTimeout(() => {
            setStatus('success');
            showToast('Google session confirmed');
            window.history.replaceState(null, '', '/');
            setActiveTab('home');
          }, 1000);
          return;
        }

        // Exchange code/tokens for session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        const session = sessionData.session;
        if (!session?.user) {
          throw new Error('No user session found in callback.');
        }

        const user = session.user;
        const email = user.email || '';

        // Check if user's email domain matches an approved private university domain
        let isStudentVerified = false;
        let uniId = user.user_metadata?.university_id;
        let uniName = user.user_metadata?.university_name;

        try {
          const res = await fetch('/api/auth/check-domain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          const domainRes = await res.json();
          if (domainRes.approved) {
            isStudentVerified = true;
            uniId = uniId || domainRes.universityId;
            uniName = uniName || domainRes.universityName;
          }
        } catch {
          // Non-blocking
        }

        // Query user profile in Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile && profile.university_id) {
          // Returning user with university -> Go to Home
          const userObj = {
            id: profile.id,
            fullName: profile.full_name || user.user_metadata?.full_name || 'Scholar',
            username: profile.username,
            email: user.email || '',
            universityId: profile.university_id,
            universityName: profile.university_name || uniName || 'Campus Scholar',
            department: profile.department || 'General',
            academicLevel: profile.academic_level || '200L',
            role: profile.role || 'user',
            isVerified: profile.is_verified || false,
            verificationTier: profile.verification_tier || 'none',
            studentVerified: profile.student_verified || isStudentVerified,
            studentEmail: profile.student_email || (isStudentVerified ? email : undefined),
            createdAt: profile.created_at || new Date().toISOString()
          };

          setCurrentUser(userObj as any);
          localStorage.setItem('univyx_user', JSON.stringify(userObj));
          localStorage.removeItem('univyx_logged_out');

          setStatus('success');
          showToast(`Welcome back, ${userObj.fullName}!`);
          window.history.replaceState(null, '', '/');
          setActiveTab('home');
        } else {
          // New user without a university -> Go to Onboarding (Step 3)
          const newScholar = {
            id: user.id,
            fullName: user.user_metadata?.full_name || user.user_metadata?.name || 'Scholar',
            username: '',
            email: user.email || '',
            universityId: uniId || '',
            universityName: uniName || '',
            department: '',
            academicLevel: '200L',
            role: 'user',
            studentVerified: isStudentVerified,
            studentEmail: isStudentVerified ? email : undefined,
            needsOnboarding: true,
            createdAt: new Date().toISOString()
          };

          setCurrentUser(newScholar as any);
          localStorage.setItem('univyx_user', JSON.stringify(newScholar));
          localStorage.removeItem('univyx_logged_out');

          setStatus('success');
          setAuthModalType('onboarding' as any);
          window.history.replaceState(null, '', '/');
          setActiveTab('home');
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Authentication failed. Please try signing in again.');
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center p-4">
      <div className="card-theme max-w-md w-full p-8 text-center space-y-4">
        {status === 'loading' && (
          <>
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
            <h2 className="page-title text-text">Connecting to Univyx</h2>
            <p className="text-xs text-text-muted">
              Confirming your scholar credentials and securing your session...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="page-title text-text">Authenticated!</h2>
            <p className="text-xs text-text-muted">
              Redirecting you to the verified campus experience...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="page-title text-text">Authentication Error</h2>
            <p className="text-xs text-text-muted">{errorMessage}</p>
            <button
              onClick={() => {
                window.history.replaceState(null, '', '/');
                setActiveTab('home');
              }}
              className="btn-pill btn-primary-gradient px-6 py-2.5 text-xs font-bold cursor-pointer"
            >
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackView;
