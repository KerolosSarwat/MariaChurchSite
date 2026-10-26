'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initFirebase,
  subscribeToAuth,
  getUserProfile,
  logoutUser,
} from '../lib/auth';
import { useToast } from './ToastProvider';
import AuthModal from './AuthModal';

const AuthContext = createContext({
  user: null,
  profileData: null,
  accountCode: '*************',
  dbStatus: 'loading',
  displayName: 'User',
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  refreshProfile: () => {},
  handleSignOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [accountCode, setAccountCode] = useState('*************');
  const [dbStatus, setDbStatus] = useState('loading');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { showToast } = useToast();

  const loadUserProfile = useCallback(async (code) => {
    setDbStatus('loading');
    try {
      const data = await getUserProfile(code);
      if (data) {
        setProfileData(data);
        setDbStatus('success');
      } else {
        setProfileData(null);
        setDbStatus('error');
      }
    } catch (err) {
      console.error('Error fetching RTDB user profile:', err);
      setDbStatus('error');
    }
  }, []);

  useEffect(() => {
    initFirebase();

    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        let code = '***********';
        if (currentUser.email && currentUser.email.includes('@')) {
          code = currentUser.email.split('@')[0];
        } else if (currentUser.displayName && /^\d+$/.test(currentUser.displayName)) {
          code = currentUser.displayName;
        }
        setAccountCode(code);
        loadUserProfile(code);
      } else {
        setProfileData(null);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [loadUserProfile]);

  const handleSignOut = async () => {
    try {
      await logoutUser();
      showToast('Signed Out', 'تم تسجيل الخروج بنجاح.', 'info');
    } catch (err) {
      showToast('Sign Out Error', err?.message || 'فشل تسجيل الخروج', 'error');
    }
  };

  const displayName = profileData?.fullName || user?.displayName || user?.email?.split('@')[0] || 'User';

  const value = {
    user,
    profileData,
    accountCode,
    dbStatus,
    displayName,
    isAuthModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
    refreshProfile: () => loadUserProfile(accountCode),
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        profileData={profileData}
        accountCode={accountCode}
        dbStatus={dbStatus}
        onRefreshProfile={() => loadUserProfile(accountCode)}
        onSignOut={handleSignOut}
        onAuthSuccess={(u) => setUser(u)}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
