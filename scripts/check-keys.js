import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";
import { DEFAULT_FIREBASE_CONFIG } from "../src/lib/firebase-config.js";

async function dumpMore() {
  const app = initializeApp(DEFAULT_FIREBASE_CONFIG);
  const db = getFirestore(app);
  const agbyaCol = collection(db, "agbya");
  const q = query(agbyaCol, limit(10));
  const snapshot = await getDocs(q);

  const keyMap = {};
  const docList = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    docList.push({ id: doc.id, ...data });
    for (const [k, v] of Object.entries(data)) {
      if (!keyMap[k]) keyMap[k] = new Set();
      keyMap[k].add(Array.isArray(v) ? `Array<${typeof v[0]}>` : typeof v);
    }
  });

  console.log("ALL UNIQUE KEYS ACROSS 10 DOCS:");
  for (const [k, types] of Object.entries(keyMap)) {
    console.log(`- ${k}: ${Array.from(types).join(", ")}`);
  }

  console.log("\nSAMPLE DOC TITLES & IDs:");
  docList.forEach(d => console.log(`• [${d.id}] "${d.title}" (term: ${d.term}, yearNumber: ${d.yearNumber}, ageLevel: ${JSON.stringify(d.ageLevel)})`));
  process.exit(0);
}

dumpMore();
