'use client';

import React, { useState, useEffect } from 'react';
import {
  getFirebaseConfig,
  saveFirebaseConfig,
  resetFirebaseConfig,
  DEFAULT_FIREBASE_CONFIG,
  isDemoModeExplicit,
  setDemoModeExplicit,
} from '../lib/firebase-config';
import { useToast } from './ToastProvider';

export default function ConfigModal({ isOpen, onClose, onConfigUpdated }) {
  const [configJson, setConfigJson] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const cfg = getFirebaseConfig();
      setConfigJson(JSON.stringify(cfg, null, 2));
      setIsDemo(isDemoModeExplicit());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      const parsed = JSON.parse(configJson);
      if (!parsed.apiKey || !parsed.projectId) {
        showToast('Configuration Warning', 'Config should contain at least apiKey and projectId.', 'error');
        return;
      }
      saveFirebaseConfig(parsed);
      showToast('Config Saved', 'Firebase configuration updated successfully!', 'success');
      onConfigUpdated();
      onClose();
    } catch (err) {
      showToast('JSON Syntax Error', 'Please check that the JSON is valid format.', 'error');
    }
  };

  const handleReset = () => {
    resetFirebaseConfig();
    setDemoModeExplicit(false);
    setConfigJson(JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2));
    setIsDemo(false);
    showToast('Reset Complete', 'Reverted to default configuration.', 'info');
    onConfigUpdated();
    onClose();
  };

  const handleToggleDemo = () => {
    const willEnableDemo = !isDemoModeExplicit();
    setDemoModeExplicit(willEnableDemo);
    setIsDemo(willEnableDemo);
    showToast(
      willEnableDemo ? 'Demo Mode Activated' : 'Live Firebase Activated',
      willEnableDemo
        ? 'Switched to simulated local authentication mode.'
        : 'Connecting to live Firebase...',
      'info'
    );
    onConfigUpdated();
    onClose();
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-config-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-config-title">
            <span>⚙️</span> Firebase Project Setup
          </h2>
          <button
            type="button"
            className="btn-close-modal"
            aria-label="Close dialog"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="modal-desc">
          Paste your Firebase configuration object below from your{' '}
          <strong>Firebase Console &rarr; Project Settings &rarr; General &rarr; Your apps</strong>.
          It will be stored securely in your browser&apos;s localStorage.
        </p>

        <textarea
          id="config-json-input"
          className="config-code-input"
          spellCheck="false"
          value={configJson}
          onChange={(e) => setConfigJson(e.target.value)}
          placeholder='{ "apiKey": "...", "authDomain": "...", "projectId": "..." }'
        />

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            id="btn-toggle-demo"
            onClick={handleToggleDemo}
          >
            {isDemo ? '🟢 Activate Live Firebase' : '⚡ Switch to Demo Mode'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            id="btn-reset-config"
            onClick={handleReset}
          >
            Reset Default
          </button>
          <button
            type="button"
            className="btn-primary"
            id="btn-save-config"
            onClick={handleSave}
          >
            Save &amp; Connect
          </button>
        </div>
      </div>
    </div>
  );
}
