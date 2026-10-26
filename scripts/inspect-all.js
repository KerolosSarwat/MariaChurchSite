import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";
import { DEFAULT_FIREBASE_CONFIG } from "../src/lib/firebase-config.js";

async function inspectCollections() {
  const app = initializeApp(DEFAULT_FIREBASE_CONFIG);
  const db = getFirestore(app);

  for (const colName of ["hymns", "agbya", "taks"]) {
    try {
      const colRef = collection(db, colName);
      const q = query(colRef, limit(3));
      const snap = await getDocs(q);
      console.log(`\n=== COLLECTION: "${colName}" (${snap.size} docs found) ===`);
      if (!snap.empty) {
        snap.forEach((d) => {
          const data = d.data();
          console.log(`- ID: ${d.id}`);
          console.log(`  Keys:`, Object.keys(data));
          console.log(`  Title:`, data.title || data.name || "N/A");
          console.log(`  Sample:`, JSON.stringify(data).substring(0, 140) + "...");
        });
      }
    } catch (err) {
      console.error(`Error querying "${colName}":`, err.message);
    }
  }
  process.exit(0);
}

inspectCollections();
