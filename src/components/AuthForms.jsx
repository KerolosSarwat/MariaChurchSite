'use client';

import React, { useState } from 'react';
import {
  loginWithCode,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  resetPassword,
} from '../lib/auth';
import { md5 } from '../lib/md5';
import { useToast } from './ToastProvider';

export default function AuthForms({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('code'); // 'code' | 'standard'
  const [tab, setTab] = useState('sign-in'); // 'sign-in' | 'sign-up' | 'forgot'
  
  // Code login state
  const [userCode, setUserCode] = useState('');
  
  // Standard email/password states
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up states
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');

  // Loading states
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const { showToast } = useToast();

  // Code Login Handler (User enters code -> code@theotokos.com, pass = md5(code))
  const handleCodeLogin = async (e) => {
    e.preventDefault();
    const cleanCode = userCode.trim();
    if (!cleanCode) {
      showToast('Validation Error', 'Please enter your user code to sign in.', 'error');
      return;
    }

    try {
      setLoading(true);
      setLoadingText('Authenticating code...');
      const user = await loginWithCode(cleanCode);
      showToast('Success', `Logged in successfully with code #${cleanCode}`, 'success');
      onAuthSuccess?.(user);
    } catch (err) {
      console.error('Code login error:', err);
      showToast('Authentication Failed', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Standard Email/Password Login
  const handleStandardSignIn = async (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Validation Error', 'Please fill in both email and password.', 'error');
      return;
    }

    try {
      setLoading(true);
      setLoadingText('Signing in...');
      const user = await loginWithEmail(signInEmail, signInPassword);
      showToast('Success', `Welcome back, ${user.displayName || user.email}!`, 'success');
      onAuthSuccess?.(user);
    } catch (err) {
      showToast('Authentication Failed', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Sign Up Handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpEmail || !signUpPassword) {
      showToast('Validation Error', 'Email and password are required.', 'error');
      return;
    }

    if (signUpPassword.length < 6) {
      showToast('Weak Password', 'Password must be at least 6 characters.', 'error');
      return;
    }

    try {
      setLoading(true);
      setLoadingText('Creating account...');
      const user = await registerWithEmail(signUpEmail, signUpPassword, signUpName);
      showToast('Account Created', `Welcome aboard, ${user.displayName || user.email}!`, 'success');
      onAuthSuccess?.(user);
    } catch (err) {
      showToast('Registration Failed', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Handler
  const handleForgot = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Validation Error', 'Please enter your account email address.', 'error');
      return;
    }

    try {
      setLoading(true);
      setLoadingText('Sending link...');
      await resetPassword(forgotEmail);
      showToast('Email Sent', `Password reset instructions sent to ${forgotEmail}`, 'success');
      setTimeout(() => setTab('sign-in'), 1800);
    } catch (err) {
      showToast('Reset Failed', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Login
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setLoadingText('Connecting Google...');
      const user = await loginWithGoogle();
      showToast('Google Sign-In', `Signed in as ${user.displayName || user.email}`, 'success');
      onAuthSuccess?.(user);
    } catch (err) {
      showToast('Google Sign-In Failed', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-card-forms">
      {/* Login Mode Switcher (Code Login vs Advanced Email Login) */}
      <div className="login-mode-selector">
        <button
          type="button"
          className={`login-mode-tab ${authMode === 'code' ? 'active' : ''}`}
          onClick={() => {
            setAuthMode('code');
            setTab('sign-in');
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>تسجيل بالرقم الكودي (User Code)</span>
        </button>

        <button
          type="button"
          className={`login-mode-tab ${authMode === 'standard' ? 'active' : ''}`}
          onClick={() => setAuthMode('standard')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Email &amp; Other</span>
        </button>
      </div>

      {/* ========================================================
          1. PRIMARY FLOW: USER CODE ONLY LOGIN
         ======================================================== */}
      {authMode === 'code' && (
        <form className="form-view active code-login-form" onSubmit={handleCodeLogin} noValidate>
          <div className="code-login-intro">
            <div className="code-login-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="code-login-title">تسجيل الدخول بالرقم الكودي</h3>
            <p className="code-login-desc">
              أدخل رقمك الكودي المسجل في خدمة التربية الكنسية للوصول إلى بياناتك ودرجاتك.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="user-code-input" className="form-label">
              User Code (الرقم الكودي)
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="user-code-input"
                name="userCode"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="13022500027"
                autoComplete="username"
                autoFocus
                required
              />
              <div className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`btn-submit ${loading ? 'loading' : ''}`}
            id="btn-submit-code-login"
            disabled={loading}
          >
            <span className="btn-spinner" aria-hidden="true"></span>
            <span className="btn-text">{loading ? loadingText : 'تسجيل الدخول (Sign In)'}</span>
          </button>
        </form>
      )}

      {/* ========================================================
          2. SECONDARY / ADVANCED: EMAIL / PASSWORD / GOOGLE
         ======================================================== */}
      {authMode === 'standard' && (
        <>
          {/* Switchable Tabs (Sign In / Sign Up) */}
          {tab !== 'forgot' && (
            <nav className="auth-tabs" id="auth-tabs-container" aria-label="Authentication views">
              <button
                type="button"
                className={`tab-btn ${tab === 'sign-in' ? 'active' : ''}`}
                id="tab-sign-in"
                onClick={() => setTab('sign-in')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`tab-btn ${tab === 'sign-up' ? 'active' : ''}`}
                id="tab-sign-up"
                onClick={() => setTab('sign-up')}
              >
                Create Account
              </button>
            </nav>
          )}

          {/* Social Authentication (Google) */}
          {tab !== 'forgot' && (
            <>
              <div className="social-auth" id="social-auth-container">
                <button
                  type="button"
                  className={`btn-social ${loading ? 'loading' : ''}`}
                  id="btn-google-login"
                  aria-label="Sign in with Google"
                  disabled={loading}
                  onClick={handleGoogleAuth}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"/>
                    <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"/>
                  </svg>
                  <span className="btn-text">Continue with Google</span>
                </button>
              </div>

              <div className="auth-divider" id="auth-divider-container">
                <span>or with email</span>
              </div>
            </>
          )}

          {/* Standard Sign In Form */}
          {tab === 'sign-in' && (
            <form className="form-view active" id="form-sign-in" onSubmit={handleStandardSignIn} noValidate>
              <div className="form-group">
                <label htmlFor="signin-email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="signin-email"
                    name="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signin-password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showSignInPassword ? 'text' : 'password'}
                    id="signin-password"
                    name="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="btn-toggle-pwd"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                  >
                    {showSignInPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="link-action"
                  id="link-go-to-forgot"
                  onClick={() => setTab('forgot')}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className={`btn-submit ${loading ? 'loading' : ''}`}
                id="btn-submit-signin"
                disabled={loading}
              >
                <span className="btn-spinner" aria-hidden="true"></span>
                <span className="btn-text">{loading ? loadingText : 'Sign In'}</span>
              </button>

              <div className="auth-switch-footer">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="link-action"
                  id="link-go-to-signup"
                  onClick={() => setTab('sign-up')}
                >
                  Sign up
                </button>
              </div>
            </form>
          )}

          {/* Standard Sign Up Form */}
          {tab === 'sign-up' && (
            <form className="form-view active" id="form-sign-up" onSubmit={handleSignUp} noValidate>
              <div className="form-group">
                <label htmlFor="signup-name" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="Alex Rivera"
                    autoComplete="name"
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    id="signup-password"
                    name="password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    required
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="btn-toggle-pwd"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  >
                    {showSignUpPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`btn-submit ${loading ? 'loading' : ''}`}
                id="btn-submit-signup"
                disabled={loading}
              >
                <span className="btn-spinner" aria-hidden="true"></span>
                <span className="btn-text">{loading ? loadingText : 'Create Account'}</span>
              </button>

              <div className="auth-switch-footer">
                Already have an account?{' '}
                <button
                  type="button"
                  className="link-action"
                  id="link-go-to-signin-from-up"
                  onClick={() => setTab('sign-in')}
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {/* Forgot Password Form */}
          {tab === 'forgot' && (
            <form className="form-view active" id="form-forgot" onSubmit={handleForgot} noValidate>
              <div className="form-group">
                <label htmlFor="forgot-email" className="form-label">
                  Account Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="forgot-email"
                    name="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                  />
                  <div className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`btn-submit ${loading ? 'loading' : ''}`}
                id="btn-submit-forgot"
                disabled={loading}
              >
                <span className="btn-spinner" aria-hidden="true"></span>
                <span className="btn-text">{loading ? loadingText : 'Send Reset Instructions'}</span>
              </button>

              <div className="auth-switch-footer">
                Remembered your credentials?{' '}
                <button
                  type="button"
                  className="link-action"
                  id="link-back-to-signin"
                  onClick={() => setTab('sign-in')}
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
