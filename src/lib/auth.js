import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { getFirebaseConfig, isFirebaseConfigured } from "./firebase-config";
import { md5 } from "./md5";

let app = null;
let auth = null;
let db = null;
let googleProvider = null;
let isDemoMode = false;

// Mock session state for demo mode
let demoCurrentUser = null;
const authStateCallbacks = [];

/**
 * Sign in using user code:
 * Appends "@theotokos.com" domain and hashes the code with MD5 as the password.
 * If user does not exist in Firebase Auth (not found), automatically registers/authorizes them.
 * @param {string} rawCode - User code (e.g. "13022500027")
 */
export async function loginWithCode(rawCode) {
  const code = (rawCode || '').trim();
  if (!code) {
    throw new Error('Please enter your user code.');
  }

  const email = code.includes('@') ? code : `${code}@theotokos.com`;
  const plainCode = code.split('@')[0];
  const password = md5(plainCode);

  try {
    return await loginWithEmail(email, password);
  } catch (err) {
    const errorCode = err.code || err.originalError?.code;

    // Check if user is not found or not yet registered in Firebase Auth
    const isUserNotFound =
      errorCode === 'auth/user-not-found' ||
      errorCode === 'auth/invalid-credential';

    if (isUserNotFound) {
      console.log(`[Auth] User not found for ${email}. Auto-creating authorized user account...`);
      try {
        const newUser = await registerWithEmail(email, password, plainCode);
        return newUser;
      } catch (regErr) {
        // If email was already in use and password simply failed, throw original error
        if (regErr.code === 'auth/email-already-in-use') {
          throw err;
        }
        throw regErr;
      }
    }

    throw err;
  }
}

export function initFirebase() {
  if (typeof window === "undefined") {
    return { initialized: false, isDemo: true, config: getFirebaseConfig() };
  }

  const config = getFirebaseConfig();
  const configured = isFirebaseConfigured(config);

  if (configured) {
    try {
      if (!getApps().length) {
        app = initializeApp(config);
      } else {
        app = getApp();
      }
      auth = getAuth(app);
      try {
        db = getDatabase(app);
      } catch (dbErr) {
        console.warn("Could not initialize Realtime Database SDK:", dbErr);
      }
      googleProvider = new GoogleAuthProvider();
      isDemoMode = false;
      return { initialized: true, isDemo: false, config };
    } catch (error) {
      console.error("Firebase initialization failed, falling back to demo mode:", error);
      isDemoMode = true;
      return { initialized: false, isDemo: true, error, config };
    }
  } else {
    isDemoMode = true;
    return { initialized: true, isDemo: true, config };
  }
}

export function checkIsDemoMode() {
  return isDemoMode;
}

export async function loginWithEmail(email, password) {
  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 600));
    if (!email || !password) throw new Error("Email and password are required.");
    demoCurrentUser = {
      uid: "demo-user-" + Math.floor(Math.random() * 100000),
      email: email,
      displayName: email.split("@")[0],
      emailVerified: true,
      providerId: "password",
      isDemo: true
    };
    notifyAuthState(demoCurrentUser);
    return demoCurrentUser;
  }

  try {
    if (!auth) initFirebase();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function registerWithEmail(email, password, displayName = "") {
  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 700));
    if (password.length < 6) {
      const err = new Error("Password must be at least 6 characters.");
      err.code = "auth/weak-password";
      throw err;
    }
    demoCurrentUser = {
      uid: "demo-user-" + Math.floor(Math.random() * 100000),
      email: email,
      displayName: displayName || email.split("@")[0],
      emailVerified: false,
      providerId: "password",
      isDemo: true
    };
    notifyAuthState(demoCurrentUser);
    return demoCurrentUser;
  }

  try {
    if (!auth) initFirebase();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function loginWithGoogle() {
  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 800));
    demoCurrentUser = {
      uid: "google-demo-" + Math.floor(Math.random() * 100000),
      email: "google.user@example.com",
      displayName: "Alex Rivera",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      emailVerified: true,
      providerId: "google.com",
      isDemo: true
    };
    notifyAuthState(demoCurrentUser);
    return demoCurrentUser;
  }

  try {
    if (!auth) initFirebase();
    if (!googleProvider) googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function resetPassword(email) {
  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, isDemo: true };
  }

  try {
    if (!auth) initFirebase();
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function getUserProfile(accountCode) {
  if (!accountCode) {
    if (auth && auth.currentUser && auth.currentUser.email) {
      accountCode = auth.currentUser.email.split("@")[0];
    } else {
      accountCode = "13022500027";
    }
  }

  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 350));
    return {
      active: false,
      address: "",
      birthdate: "2020-07-09",
      church: "السيدة العذراء مريم و الشهيد أبانوب ",
      code: accountCode,
      degree: {
        firstTerm: {
          agbya: 0,
          attencance: 6,
          coptic: 0,
          hymns: 0,
          taks: 0,
          total: 6
        },
        secondTerm: {
          agbya: 0,
          attencance: 0,
          coptic: 0,
          hymns: 0,
          taks: 0
        },
        thirdTerm: {
          agbya: 0,
          attencance: 0,
          coptic: 0,
          hymns: 0,
          taks: 0
        }
      },
      fullName: "بريانكا رومانى جميل فخرى",
      gender: "Female",
      level: "KG2",
      phoneNumber: "01202474117",
      _source: "demo"
    };
  }

  // Live Firebase Realtime Database SDK
  try {
    if (!db && app) {
      db = getDatabase(app);
    }

    if (db) {
      const userRef = ref(db, `users/${accountCode}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const val = snapshot.val();
        return { ...val, _source: "rtdb-sdk" };
      }
    }
  } catch (sdkErr) {
    console.warn(`[RTDB SDK] Direct SDK get failed for /users/${accountCode}:`, sdkErr);
  }

  // Fallback via RTDB REST endpoint
  try {
    const config = getFirebaseConfig();
    const dbUrl = config.databaseURL || "https://theotokosmobileapp-default-rtdb.firebaseio.com";
    let endpoint = `${dbUrl.replace(/\/$/, "")}/users/${encodeURIComponent(accountCode)}.json`;

    if (auth && auth.currentUser) {
      try {
        const token = await auth.currentUser.getIdToken();
        endpoint += `?auth=${token}`;
      } catch (tErr) {
        console.warn("Could not get auth token for REST query:", tErr);
      }
    }

    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      if (data) {
        return { ...data, _source: "rtdb-rest" };
      }
    }
  } catch (restErr) {
    console.warn(`[RTDB REST] REST query failed for /users/${accountCode}:`, restErr);
  }

  return null;
}

export async function logoutUser() {
  if (isDemoMode) {
    demoCurrentUser = null;
    notifyAuthState(null);
    return;
  }

  try {
    if (!auth) initFirebase();
    await signOut(auth);
  } catch (error) {
    throw handleAuthError(error);
  }
}

export function subscribeToAuth(callback) {
  if (isDemoMode) {
    authStateCallbacks.push(callback);
    callback(demoCurrentUser);
    return () => {
      const idx = authStateCallbacks.indexOf(callback);
      if (idx > -1) authStateCallbacks.splice(idx, 1);
    };
  }

  if (typeof window !== "undefined") {
    if (!auth) initFirebase();
    if (auth) {
      return onAuthStateChanged(auth, callback);
    }
  }

  return () => {};
}

function notifyAuthState(user) {
  authStateCallbacks.forEach((cb) => cb(user));
}

function handleAuthError(error) {
  let friendlyMessage = "An unexpected error occurred. Please try again.";

  switch (error.code) {
    case "auth/invalid-email":
      friendlyMessage = "Invalid email address format.";
      break;
    case "auth/user-disabled":
      friendlyMessage = "This user account has been disabled.";
      break;
    case "auth/user-not-found":
      friendlyMessage = "No account found with this email.";
      break;
    case "auth/wrong-password":
      friendlyMessage = "Incorrect password. Please verify and try again.";
      break;
    case "auth/invalid-credential":
      friendlyMessage = "Invalid email or password credentials.";
      break;
    case "auth/email-already-in-use":
      friendlyMessage = "An account with this email address already exists.";
      break;
    case "auth/operation-not-allowed":
      friendlyMessage = "This sign-in method is not enabled in your Firebase Console.";
      break;
    case "auth/weak-password":
      friendlyMessage = "Password is too weak. Please use at least 6 characters.";
      break;
    case "auth/popup-closed-by-user":
      friendlyMessage = "The Google sign-in popup was closed before completing.";
      break;
    case "auth/cancelled-popup-request":
      friendlyMessage = "Multiple popups detected. Please try again.";
      break;
    case "auth/popup-blocked":
      friendlyMessage = "Popup was blocked by your browser. Please allow popups for this site.";
      break;
    case "auth/network-request-failed":
      friendlyMessage = "Network connection error. Check your internet connection.";
      break;
    case "auth/too-many-requests":
      friendlyMessage = "Too many unsuccessful attempts. Access temporarily disabled.";
      break;
    case "auth/api-key-not-valid":
    case "auth/invalid-api-key":
      friendlyMessage = "Invalid Firebase API Key. Please verify your Firebase project configuration.";
      break;
    default:
      friendlyMessage = error.message || friendlyMessage;
  }

  const customError = new Error(friendlyMessage);
  customError.code = error.code;
  customError.originalError = error;
  return customError;
}
