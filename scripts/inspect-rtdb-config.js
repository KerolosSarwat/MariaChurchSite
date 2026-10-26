import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { DEFAULT_FIREBASE_CONFIG } from "../src/lib/firebase-config.js";

async function inspectRTDBConfig() {
  const app = initializeApp(DEFAULT_FIREBASE_CONFIG);
  const db = getDatabase(app);

  try {
    const configRef = ref(db, "config");
    const snap = await get(configRef);
    if (snap.exists()) {
      console.log("=== /config in RTDB exists! ===");
      console.log(JSON.stringify(snap.val(), null, 2));
    } else {
      console.log("=== /config not found, checking root keys ===");
      const rootRef = ref(db, "/");
      const rootSnap = await get(rootRef);
      if (rootSnap.exists()) {
        const val = rootSnap.val();
        console.log("Root keys:", Object.keys(val));
        if (val.config) {
          console.log("Config found:", val.config);
        }
      }
    }
  } catch (err) {
    console.error("RTDB query error:", err.message);
  }
  process.exit(0);
}

inspectRTDBConfig();
