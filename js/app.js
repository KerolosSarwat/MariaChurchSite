/**
 * Main Application Controller
 * Handles user interactions, form validation, auth flows, and state management.
 */

import { 
  initFirebase, 
  loginWithEmail, 
  registerWithEmail, 
  loginWithGoogle, 
  resetPassword, 
  logoutUser, 
  subscribeToAuth,
  checkIsDemoMode,
  getUserProfile
} from "./auth.js";

import { 
  getFirebaseConfig, 
  saveFirebaseConfig, 
  resetFirebaseConfig, 
  isFirebaseConfigured, 
  DEFAULT_FIREBASE_CONFIG,
  isDemoModeExplicit,
  setDemoModeExplicit
} from "./firebase-config.js";

import { 
  showToast, 
  setupPasswordToggles, 
  evaluatePasswordStrength, 
  setButtonLoading,
  escapeHTML
} from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const tabSignIn = document.getElementById('tab-sign-in');
  const tabSignUp = document.getElementById('tab-sign-up');
  const viewSignIn = document.getElementById('form-sign-in');
  const viewSignUp = document.getElementById('form-sign-up');
  const viewForgot = document.getElementById('form-forgot');
  const authCardForms = document.getElementById('auth-card-forms');
  const viewProfile = document.getElementById('view-profile');
  const authTabsContainer = document.getElementById('auth-tabs-container');
  const socialAuthContainer = document.getElementById('social-auth-container');
  const authDividerContainer = document.getElementById('auth-divider-container');
  const cardTitle = document.getElementById('card-title');
  const cardSubtitle = document.getElementById('card-subtitle');

  // Form Elements
  const formSignIn = document.getElementById('form-sign-in');
  const formSignUp = document.getElementById('form-sign-up');
  const formForgot = document.getElementById('form-forgot');

  // Realtime Database Profile Elements
  const mainAuthCard = document.getElementById('main-auth-card');
  const profileDbPathText = document.getElementById('profile-db-path-text');
  const profileDbStatus = document.getElementById('profile-db-status');
  const rtdbCode = document.getElementById('rtdb-code');
  const rtdbLevel = document.getElementById('rtdb-level');
  const rtdbActiveChip = document.getElementById('rtdb-active-chip');
  const rtdbFullName = document.getElementById('rtdb-fullname');
  const rtdbChurch = document.getElementById('rtdb-church');
  const rtdbPhone = document.getElementById('rtdb-phone');
  const rtdbBirthdate = document.getElementById('rtdb-birthdate');
  const rtdbGender = document.getElementById('rtdb-gender');
  const rtdbAddress = document.getElementById('rtdb-address');
  const rtdbDegreesGrid = document.getElementById('rtdb-degrees-grid');
  const rawJsonContainer = document.getElementById('raw-json-container');
  const rawJsonPre = document.getElementById('raw-json-pre');
  const btnCopyJson = document.getElementById('btn-copy-json');
  const btnToggleJson = document.getElementById('btn-toggle-json');
  const btnRefreshProfile = document.getElementById('btn-refresh-profile');

  let currentActiveAccountCode = "13022500027";

  // Social Buttons
  const btnGoogleLogin = document.getElementById('btn-google-login');
  const btnGoogleSignUp = document.getElementById('btn-google-signup');

  // Switch Links
  const linkGoToForgot = document.getElementById('link-go-to-forgot');
  const linkBackToSignIn = document.getElementById('link-back-to-signin');
  const linkGoToSignUp = document.getElementById('link-go-to-signup');
  const linkGoToSignInFromUp = document.getElementById('link-go-to-signin-from-up');

  // Sign out button
  const btnSignOut = document.getElementById('btn-sign-out');

  // Firebase Config Modal Elements
  const btnOpenConfig = document.getElementById('btn-open-config');
  const bannerConfigLink = document.getElementById('banner-config-link');
  const modalConfig = document.getElementById('modal-config');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnSaveConfig = document.getElementById('btn-save-config');
  const btnResetConfig = document.getElementById('btn-reset-config');
  const configTextarea = document.getElementById('config-json-input');

  // Status Elements
  const navStatusIndicator = document.getElementById('nav-status-dot');
  const navStatusText = document.getElementById('nav-status-text');
  const bannerStatus = document.getElementById('banner-status');
  const bannerStatusText = document.getElementById('banner-status-text');

  // Initialize UI features
  setupPasswordToggles();
  setupPasswordStrengthMeter();

  // Initialize Firebase
  initializeFirebaseState();

  // Listen to Auth State changes
  subscribeToAuth(user => {
    handleAuthStateChange(user);
  });

  /* ----------------------------------------------------
     Navigation & Tab Switching Logic
     ---------------------------------------------------- */

  function switchTab(target) {
    if (target === 'sign-in') {
      tabSignIn.classList.add('active');
      tabSignUp.classList.remove('active');
      viewSignIn.classList.add('active');
      viewSignUp.classList.remove('active');
      viewForgot.classList.remove('active');
      authTabsContainer.style.display = 'flex';
      if (socialAuthContainer) socialAuthContainer.style.display = 'block';
      if (authDividerContainer) authDividerContainer.style.display = 'flex';
      cardTitle.textContent = 'Welcome back';
      cardSubtitle.textContent = 'Enter your credentials to access your account';
    } else if (target === 'sign-up') {
      tabSignUp.classList.add('active');
      tabSignIn.classList.remove('active');
      viewSignUp.classList.add('active');
      viewSignIn.classList.remove('active');
      viewForgot.classList.remove('active');
      authTabsContainer.style.display = 'flex';
      if (socialAuthContainer) socialAuthContainer.style.display = 'block';
      if (authDividerContainer) authDividerContainer.style.display = 'flex';
      cardTitle.textContent = 'Create an account';
      cardSubtitle.textContent = 'Start your journey with Firebase Authentication';
    } else if (target === 'forgot') {
      tabSignIn.classList.remove('active');
      tabSignUp.classList.remove('active');
      authTabsContainer.style.display = 'none';
      if (socialAuthContainer) socialAuthContainer.style.display = 'none';
      if (authDividerContainer) authDividerContainer.style.display = 'none';
      viewSignIn.classList.remove('active');
      viewSignUp.classList.remove('active');
      viewForgot.classList.add('active');
      cardTitle.textContent = 'Reset Password';
      cardSubtitle.textContent = 'We will send a recovery link to your email';
    }
  }

  tabSignIn.addEventListener('click', () => switchTab('sign-in'));
  tabSignUp.addEventListener('click', () => switchTab('sign-up'));
  if (linkGoToForgot) linkGoToForgot.addEventListener('click', () => switchTab('forgot'));
  if (linkBackToSignIn) linkBackToSignIn.addEventListener('click', () => switchTab('sign-in'));
  if (linkGoToSignUp) linkGoToSignUp.addEventListener('click', () => switchTab('sign-up'));
  if (linkGoToSignInFromUp) linkGoToSignInFromUp.addEventListener('click', () => switchTab('sign-in'));

  /* ----------------------------------------------------
     Form Submit Handlers
     ---------------------------------------------------- */

  // Sign In with Email & Password
  formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const submitBtn = formSignIn.querySelector('.btn-submit');

    if (!email || !password) {
      showToast('Validation Error', 'Please fill in both email and password.', 'error');
      return;
    }

    try {
      setButtonLoading(submitBtn, true, 'Signing in...');
      const user = await loginWithEmail(email, password);
      showToast('Success', `Welcome back, ${user.displayName || user.email}!`, 'success');
      formSignIn.reset();
    } catch (error) {
      console.error("Login error:", error);
      showToast('Authentication Failed', error.message, 'error');
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });

  // Sign Up with Email, Password & Name
  formSignUp.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const submitBtn = formSignUp.querySelector('.btn-submit');

    if (!email || !password) {
      showToast('Validation Error', 'Email and password are required.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Weak Password', 'Password must be at least 6 characters.', 'error');
      return;
    }

    try {
      setButtonLoading(submitBtn, true, 'Creating account...');
      const user = await registerWithEmail(email, password, name);
      showToast('Account Created', `Welcome aboard, ${user.displayName || user.email}!`, 'success');
      formSignUp.reset();
    } catch (error) {
      console.error("Registration error:", error);
      showToast('Registration Failed', error.message, 'error');
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });

  // Forgot Password
  formForgot.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();
    const submitBtn = formForgot.querySelector('.btn-submit');

    if (!email) {
      showToast('Validation Error', 'Please enter your account email address.', 'error');
      return;
    }

    try {
      setButtonLoading(submitBtn, true, 'Sending link...');
      await resetPassword(email);
      showToast('Email Sent', `Password reset instructions sent to ${email}`, 'success');
      formForgot.reset();
      setTimeout(() => switchTab('sign-in'), 1800);
    } catch (error) {
      console.error("Password reset error:", error);
      showToast('Reset Failed', error.message, 'error');
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });

  // Google Login
  const handleGoogleAuth = async (btn) => {
    try {
      setButtonLoading(btn, true, 'Connecting Google...');
      const user = await loginWithGoogle();
      showToast('Google Sign-In', `Signed in as ${user.displayName || user.email}`, 'success');
    } catch (error) {
      console.error("Google Auth error:", error);
      showToast('Google Sign-In Failed', error.message, 'error');
    } finally {
      setButtonLoading(btn, false);
    }
  };

  if (btnGoogleLogin) btnGoogleLogin.addEventListener('click', () => handleGoogleAuth(btnGoogleLogin));
  if (btnGoogleSignUp) btnGoogleSignUp.addEventListener('click', () => handleGoogleAuth(btnGoogleSignUp));

  // Sign Out
  if (btnSignOut) {
    btnSignOut.addEventListener('click', async () => {
      try {
        await logoutUser();
        showToast('Signed Out', 'You have been successfully signed out.', 'info');
      } catch (error) {
        showToast('Sign Out Error', error.message, 'error');
      }
    });
  }

  /* ----------------------------------------------------
     Auth State View Switcher
     ---------------------------------------------------- */

  function handleAuthStateChange(user) {
    if (user) {
      // Show User Profile Dashboard
      authCardForms.style.display = 'none';
      viewProfile.classList.add('active');
      if (mainAuthCard) mainAuthCard.classList.add('profile-mode');
      cardTitle.textContent = 'Account Dashboard';
      cardSubtitle.textContent = 'You are currently authenticated';

      // Populate user info
      const avatarEl = document.getElementById('profile-avatar');
      const nameEl = document.getElementById('profile-name');
      const emailEl = document.getElementById('profile-email');
      const uidEl = document.getElementById('profile-uid');
      const providerEl = document.getElementById('profile-provider');
      const verifiedEl = document.getElementById('profile-verified');

      const displayName = user.displayName || user.email?.split('@')[0] || 'User';
      nameEl.textContent = displayName;
      emailEl.textContent = user.email || 'No email provided';
      uidEl.textContent = user.uid || 'N/A';
      providerEl.textContent = (user.providerId || user.providerData?.[0]?.providerId || 'password').replace('.com', '');
      verifiedEl.textContent = user.emailVerified ? 'Verified ✅' : 'Unverified ⚠️';

      if (user.photoURL) {
        avatarEl.innerHTML = `<img src="${user.photoURL}" alt="Profile avatar" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
      } else {
        avatarEl.innerHTML = displayName.charAt(0).toUpperCase();
      }

      // Extract account code (e.g. 13022500027)
      let accountCode = "13022500027";
      if (user.email && user.email.includes('@')) {
        accountCode = user.email.split('@')[0];
      } else if (user.displayName && /^\d+$/.test(user.displayName)) {
        accountCode = user.displayName;
      }
      currentActiveAccountCode = accountCode;

      // Automatically retrieve profile data from /users/{accountCode}
      loadProfileForAccount(accountCode, nameEl);
    } else {
      // Show Login/Register forms
      if (mainAuthCard) mainAuthCard.classList.remove('profile-mode');
      viewProfile.classList.remove('active');
      authCardForms.style.display = 'block';
      switchTab('sign-in');
    }
  }

  async function loadProfileForAccount(accountCode, nameEl) {
    if (profileDbPathText) {
      profileDbPathText.textContent = `Path: /users/${accountCode}`;
    }
    if (profileDbStatus) {
      profileDbStatus.textContent = 'Retrieving...';
      profileDbStatus.className = 'db-status-chip loading';
    }

    try {
      const profile = await getUserProfile(accountCode);

      if (profile) {
        if (profileDbStatus) {
          profileDbStatus.textContent = 'Active (200 OK)';
          profileDbStatus.className = 'db-status-chip';
        }

        // Update card header if name exists
        if (profile.fullName) {
          cardTitle.textContent = profile.fullName;
          cardSubtitle.textContent = `Database Path: /users/${accountCode}`;
          if (nameEl) nameEl.textContent = profile.fullName;
          const avatarEl = document.getElementById('profile-avatar');
          if (avatarEl && !avatarEl.querySelector('img')) {
            avatarEl.innerHTML = profile.fullName.trim().charAt(0);
          }
        }

        // Header Chips
        if (rtdbCode) rtdbCode.textContent = `#${profile.code || accountCode}`;
        if (rtdbLevel) rtdbLevel.textContent = `Level: ${profile.level || 'KG2'}`;
        if (rtdbActiveChip) {
          const isActive = profile.active === true;
          rtdbActiveChip.textContent = isActive ? 'Active' : 'Inactive';
          rtdbActiveChip.className = `rtdb-status-chip ${isActive ? 'active' : ''}`;
        }

        // Details Grid
        if (rtdbFullName) rtdbFullName.textContent = profile.fullName || '-';
        if (rtdbChurch) rtdbChurch.textContent = profile.church || '-';
        if (rtdbPhone) {
          rtdbPhone.textContent = profile.phoneNumber || '-';
          rtdbPhone.href = profile.phoneNumber ? `tel:${profile.phoneNumber}` : '#';
        }
        if (rtdbBirthdate) rtdbBirthdate.textContent = profile.birthdate || '-';
        if (rtdbGender) rtdbGender.textContent = profile.gender || '-';
        if (rtdbAddress) rtdbAddress.textContent = profile.address || 'None';

        // Render Degrees & Attendance
        if (rtdbDegreesGrid) {
          rtdbDegreesGrid.innerHTML = '';
          if (profile.degree && typeof profile.degree === 'object') {
            Object.entries(profile.degree).forEach(([termKey, termData]) => {
              const termCard = document.createElement('div');
              termCard.className = 'degree-card';
              
              const termTitle = termKey.replace(/([A-Z])/g, ' $1').toLowerCase();
              let statsHtml = `<div class="degree-term-name">${escapeHTML(termTitle)}</div>`;
              
              if (typeof termData === 'object' && termData !== null) {
                Object.entries(termData).forEach(([statKey, statVal]) => {
                  statsHtml += `
                    <div class="degree-stat">
                      <span>${escapeHTML(statKey)}:</span>
                      <span class="degree-stat-val">${escapeHTML(String(statVal))}</span>
                    </div>
                  `;
                });
              }
              termCard.innerHTML = statsHtml;
              rtdbDegreesGrid.appendChild(termCard);
            });
          } else {
            rtdbDegreesGrid.innerHTML = '<div style="font-size:0.75rem; color:var(--text-dim);">No degree records found.</div>';
          }
        }

        // Raw JSON Viewer
        if (rawJsonPre) {
          rawJsonPre.textContent = JSON.stringify(profile, null, 2);
        }

        showToast('Profile Loaded', `Retrieved data from /users/${accountCode}`, 'success');
      } else {
        if (profileDbStatus) {
          profileDbStatus.textContent = 'Not Found (404)';
          profileDbStatus.className = 'db-status-chip error';
        }
        showToast('Profile Notice', `No record exists at path /users/${accountCode}`, 'info');
      }
    } catch (err) {
      console.error("Error retrieving user profile from RTDB:", err);
      if (profileDbStatus) {
        profileDbStatus.textContent = 'Fetch Error';
        profileDbStatus.className = 'db-status-chip error';
      }
      showToast('Profile Error', err.message, 'error');
    }
  }

  // Profile Action Buttons
  if (btnRefreshProfile) {
    btnRefreshProfile.addEventListener('click', () => {
      showToast('Refreshing', `Re-fetching /users/${currentActiveAccountCode}...`, 'info');
      loadProfileForAccount(currentActiveAccountCode);
    });
  }

  if (btnToggleJson) {
    btnToggleJson.addEventListener('click', () => {
      if (!rawJsonContainer) return;
      const isHidden = rawJsonContainer.style.display === 'none' || !rawJsonContainer.style.display;
      rawJsonContainer.style.display = isHidden ? 'block' : 'none';
      btnToggleJson.classList.toggle('active', isHidden);
    });
  }

  if (btnCopyJson) {
    btnCopyJson.addEventListener('click', async () => {
      if (!rawJsonPre) return;
      try {
        await navigator.clipboard.writeText(rawJsonPre.textContent);
        showToast('Copied', 'JSON payload copied to clipboard!', 'success');
      } catch (e) {
        showToast('Copy Failed', 'Could not copy to clipboard.', 'error');
      }
    });
  }

  /* ----------------------------------------------------
     Password Strength Meter
     ---------------------------------------------------- */

  function setupPasswordStrengthMeter() {
    const pwdInput = document.getElementById('signup-password');
    const bars = [
      document.getElementById('pwd-bar-1'),
      document.getElementById('pwd-bar-2'),
      document.getElementById('pwd-bar-3'),
      document.getElementById('pwd-bar-4')
    ];
    const strengthLabel = document.getElementById('pwd-strength-text');

    if (!pwdInput) return;

    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      const { score, label, className } = evaluatePasswordStrength(val);

      bars.forEach((bar, index) => {
        bar.className = 'pwd-bar';
        if (index < score) {
          bar.classList.add(className);
        }
      });

      strengthLabel.textContent = val ? label : 'None';
    });
  }

  /* ----------------------------------------------------
     Firebase Status & Configuration Modal Handlers
     ---------------------------------------------------- */

  function initializeFirebaseState() {
    const status = initFirebase();
    updateStatusIndicators(status.isDemo, status.config);
  }

  function updateStatusIndicators(isDemo, config) {
    if (!isDemo && isFirebaseConfigured(config)) {
      navStatusIndicator.classList.add('connected');
      navStatusText.textContent = `Connected: ${config.projectId}`;
      bannerStatus.classList.add('connected');
      bannerStatusText.innerHTML = `🟢 Live Firebase: Connected to <strong>${config.projectId}</strong>`;
      if (bannerConfigLink) bannerConfigLink.textContent = 'Edit Config';
    } else {
      navStatusIndicator.classList.remove('connected');
      navStatusText.textContent = 'Demo Mode (Local)';
      bannerStatus.classList.remove('connected');
      bannerStatusText.innerHTML = `⚡ Demo Mode Active. Real Firebase CDN ready.`;
      if (bannerConfigLink) bannerConfigLink.textContent = 'Connect Firebase';
    }
  }

  function openConfigModal() {
    const config = getFirebaseConfig();
    configTextarea.value = JSON.stringify(config, null, 2);
    modalConfig.classList.add('open');
  }

  function closeConfigModal() {
    modalConfig.classList.remove('open');
  }

  btnOpenConfig.addEventListener('click', openConfigModal);
  if (bannerConfigLink) bannerConfigLink.addEventListener('click', openConfigModal);
  btnCloseModal.addEventListener('click', closeConfigModal);

  modalConfig.addEventListener('click', (e) => {
    if (e.target === modalConfig) closeConfigModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalConfig.classList.contains('open')) {
      closeConfigModal();
    }
  });

  btnSaveConfig.addEventListener('click', () => {
    try {
      const parsed = JSON.parse(configTextarea.value);
      if (!parsed.apiKey || !parsed.projectId) {
        showToast('Configuration Warning', 'Config should contain at least apiKey and projectId.', 'error');
        return;
      }
      saveFirebaseConfig(parsed);
      showToast('Config Saved', 'Firebase configuration updated successfully! Reloading session...', 'success');
      closeConfigModal();
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (err) {
      showToast('JSON Syntax Error', 'Please check that the JSON is valid format.', 'error');
    }
  });

  btnResetConfig.addEventListener('click', () => {
    resetFirebaseConfig();
    setDemoModeExplicit(false);
    configTextarea.value = JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
    showToast('Reset Complete', 'Reverted to default configuration. Reloading...', 'info');
    closeConfigModal();
    setTimeout(() => {
      window.location.reload();
    }, 700);
  });

  const btnToggleDemo = document.getElementById('btn-toggle-demo');
  if (btnToggleDemo) {
    const isExplicitDemo = isDemoModeExplicit();
    btnToggleDemo.textContent = isExplicitDemo ? '🟢 Activate Live Firebase' : '⚡ Switch to Demo Mode';

    btnToggleDemo.addEventListener('click', () => {
      const willEnableDemo = !isDemoModeExplicit();
      setDemoModeExplicit(willEnableDemo);
      showToast(
        willEnableDemo ? 'Demo Mode Activated' : 'Live Firebase Activated',
        willEnableDemo ? 'Switched to simulated local authentication mode.' : 'Connecting to live Firebase...',
        'info'
      );
      closeConfigModal();
      setTimeout(() => window.location.reload(), 600);
    });
  }
});
