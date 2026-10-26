'use client';

import React from 'react';
import ProfileView from './ProfileView';
import AuthForms from './AuthForms';

export default function AuthModal({
  isOpen,
  onClose,
  user,
  profileData,
  accountCode,
  dbStatus,
  onRefreshProfile,
  onSignOut,
  onAuthSuccess,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog auth-portal-dialog">
        <div className="modal-header">
          <div className="portal-dialog-title">
            <span className="portal-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <span>{user ? 'User Profile & Dashboard' : 'Account Login & Registration'}</span>
          </div>
          <button
            type="button"
            className="btn-close-modal"
            aria-label="Close dialog"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="auth-portal-dialog-body">
          {user ? (
            <ProfileView
              user={user}
              profileData={profileData}
              accountCode={accountCode}
              dbStatus={dbStatus}
              onRefresh={onRefreshProfile}
              onSignOut={() => {
                onSignOut();
                onClose();
              }}
            />
          ) : (
            <AuthForms
              onAuthSuccess={(u) => {
                onAuthSuccess(u);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
