/**
 * Firebase Project Configuration
 * 
 * Replace the placeholder values below with your Firebase project credentials
 * from the Firebase Console (Project Settings > General > Your apps > Web app).
 * 
 * You can also paste your configuration directly in the app via the "⚙️ Firebase Config" button!
 */

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDXSrRWFlVQvsAgrMTifWQ9FJp34nA4yUk",
  authDomain: "theotokosmobileapp.firebaseapp.com",
  databaseURL: "https://theotokosmobileapp-default-rtdb.firebaseio.com",
  projectId: "theotokosmobileapp",
  storageBucket: "theotokosmobileapp.appspot.com",
  messagingSenderId: "773452189288",
  appId: "1:773452189288:web:327cdcc2f8c71d72ebf5dd",
  measurementId: "G-2W0JE8SSQG"
};

const STORAGE_KEY = 'firebase_web_app_config';

/**
 * Retrieves the active Firebase configuration.
 * Checks localStorage first, then falls back to default.
 */
export function getFirebaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.apiKey) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read saved Firebase config from localStorage", err);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

/**
 * Saves a new Firebase configuration to localStorage.
 */
export function saveFirebaseConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Invalid Firebase configuration object.');
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config, null, 2));
}

/**
 * Resets configuration to default.
 */
export function resetFirebaseConfig() {
  localStorage.removeItem(STORAGE_KEY);
}

const DEMO_MODE_KEY = 'firebase_use_demo_mode';

/**
 * Checks whether user has explicitly toggled demo mode
 */
export function isDemoModeExplicit() {
  return localStorage.getItem(DEMO_MODE_KEY) === 'true';
}

/**
 * Sets explicit demo mode state
 */
export function setDemoModeExplicit(enable) {
  if (enable) {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
  } else {
    localStorage.removeItem(DEMO_MODE_KEY);
  }
}

/**
 * Checks if the current configuration contains real credentials or default placeholders.
 */
export function isFirebaseConfigured(config = getFirebaseConfig()) {
  if (isDemoModeExplicit()) return false;
  if (!config || !config.apiKey || !config.projectId) return false;

  // Check if still placeholder
  const isPlaceholder =
    config.apiKey.includes('YOUR_API_KEY') ||
    config.projectId.includes('YOUR_PROJECT_ID') ||
    config.apiKey.length < 10;

  return !isPlaceholder;
}
