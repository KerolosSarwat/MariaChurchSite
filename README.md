# Firebase Authentication Web Portal (Next.js)

A production-grade, secure, and modern authentication interface converted to **Next.js 16 (App Router)**, **React 19**, and the official **Firebase Web SDK (v13)** with high-aesthetic Cosmic Glassmorphic styling.

---

## ✨ Features

- **Next.js 16 App Router & React 19**: Modern component architecture, server rendering support, and client interactivity.
- **Official Firebase SDK Integration**: Integrated with `firebase/app`, `firebase/auth`, and `firebase/database`.
- **Multiple Authentication Flows**:
  - 📧 **Email & Password Login** (`signInWithEmailAndPassword`)
  - 👤 **Account Registration** (`createUserWithEmailAndPassword` & `updateProfile`)
  - 🌐 **Google OAuth Sign-In** (`signInWithPopup` + `GoogleAuthProvider`)
  - 🔑 **Password Reset Link** (`sendPasswordResetEmail`)
  - 🚪 **Sign Out** (`signOut`)
- **Realtime Database Profile Dashboard**:
  - Fetches and displays user profile and degree records from `/users/{accountCode}`
  - Includes raw JSON payload viewer and clipboard copy
- **Cosmic Glassmorphic Design**:
  - Animated glowing background orbs and ambient tech grid
  - Frosted glass card with backdrop blur and delicate gradient border
  - Google Font typography (*Plus Jakarta Sans*, *Cairo*, *Fira Code*)
  - Password visibility toggles (Show/Hide)
  - Real-time password strength meter (Weak / Fair / Good / Strong)
  - React Context Toast notifications system
  - Responsive loading spinners and micro-animations
- **Interactive Configuration Manager**:
  - Built-in **⚙️ Firebase Setup** modal allowing you to paste your Firebase credentials directly in the browser or configure in [firebase-config.js](file:///d:/D/repos/site/src/lib/firebase-config.js).
  - Fallback **Demo Mode** enabled by default for instant testing without mandatory credentials.

---

## 🚀 Quick Start

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
site/
├── src/
│   ├── app/
│   │   ├── globals.css          # Glassmorphism & Cosmic dark styling tokens
│   │   ├── layout.js            # App Router RootLayout with fonts & ToastProvider
│   │   └── page.js              # Main authenticated / unauthenticated portal page
│   ├── components/
│   │   ├── AuthForms.jsx        # Sign In, Sign Up, and Forgot Password forms
│   │   ├── ConfigModal.jsx      # Modal for custom Firebase JSON configuration
│   │   ├── ProfileView.jsx      # Authenticated user dashboard & RTDB profile viewer
│   │   └── ToastProvider.jsx    # React Context for toast notifications
│   └── lib/
│       ├── auth.js              # Firebase Auth methods & demo fallback
│       └── firebase-config.js   # Configuration loader & localStorage sync
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies & scripts
```
