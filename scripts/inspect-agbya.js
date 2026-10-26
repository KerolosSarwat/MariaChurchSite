import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";
import { DEFAULT_FIREBASE_CONFIG } from "../src/lib/firebase-config.js";

function getDetailedType(val) {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (Array.isArray(val)) {
    const itemTypes = [...new Set(val.map(item => getDetailedType(item)))];
    return `array<${itemTypes.join(" | ") || "any"}> (length: ${val.length})`;
  }
  if (typeof val === "object") {
    if (typeof val.toDate === "function" || (val.seconds !== undefined && val.nanoseconds !== undefined)) {
      return "Timestamp";
    }
    if (val.latitude !== undefined && val.longitude !== undefined) {
      return "GeoPoint";
    }
    return "map/object";
  }
  return typeof val;
}

async function runInspection() {
  console.log("Connecting to Firestore with project:", DEFAULT_FIREBASE_CONFIG.projectId);
  const app = initializeApp(DEFAULT_FIREBASE_CONFIG);
  const db = getFirestore(app);

  try {
    const agbyaCol = collection(db, "agbya");
    const q = query(agbyaCol, limit(5));
    const snapshot = await getDocs(q);

    console.log(`\nSuccessfully fetched documents from "agbya". Total retrieved: ${snapshot.size}`);

    if (snapshot.empty) {
      console.log('Collection "agbya" exists or was queried, but contains 0 documents or security rules prevent reading.');
      return;
    }

    const aggregatedSchema = {};
    const sampleDocs = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      sampleDocs.push({ id: docSnap.id, ...data });

      for (const [key, val] of Object.entries(data)) {
        const typeStr = getDetailedType(val);
        if (!aggregatedSchema[key]) {
          aggregatedSchema[key] = {
            types: new Set([typeStr]),
            sample: val
          };
        } else {
          aggregatedSchema[key].types.add(typeStr);
        }
      }
    });

    console.log("\n=================== DOCUMENT KEYS & DATA TYPES ===================");
    const tableData = Object.entries(aggregatedSchema).map(([key, info]) => ({
      Key: key,
      "Data Type": Array.from(info.types).join(" | "),
      "Sample Value": typeof info.sample === "object" ? JSON.stringify(info.sample).substring(0, 50) + "..." : String(info.sample)
    }));
    console.table(tableData);

    console.log("\n=================== FIRST DOCUMENT (FULL PREVIEW) ===================");
    console.log(JSON.stringify(sampleDocs[0], null, 2));

  } catch (error) {
    console.error("Failed to query Firestore 'agbya' collection:", error.message);
    if (error.code) {
      console.error("Error Code:", error.code);
    }
  }
}

runInspection();
