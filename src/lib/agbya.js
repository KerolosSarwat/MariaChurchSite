import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  doc,
  getDoc
} from "firebase/firestore";
import { getFirebaseConfig, isFirebaseConfigured, isDemoModeExplicit } from "./firebase-config";

let firestoreInstance = null;

/**
 * Initializes and returns the Firestore instance
 */
export function getFirestoreDB() {
  const config = getFirebaseConfig();
  let app;
  if (!getApps().length) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(app);
  }
  return firestoreInstance;
}

/**
 * Helper function to determine the exact data type of a value
 */
export function getDetailedType(val) {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (Array.isArray(val)) {
    const itemTypes = [...new Set(val.map(item => getDetailedType(item)))];
    return `array<${itemTypes.join(" | ") || "any"}> (length: ${val.length})`;
  }
  if (typeof val === "object") {
    // Check for Firestore Timestamp
    if (typeof val.toDate === "function" || (val.seconds !== undefined && val.nanoseconds !== undefined)) {
      return "Timestamp (Firestore)";
    }
    // Check for DocumentReference / GeoPoint
    if (val.latitude !== undefined && val.longitude !== undefined) {
      return "GeoPoint (Firestore)";
    }
    return "map/object";
  }
  return typeof val;
}

/**
 * Inspects a Firestore document or collection to extract schema (keys and data types)
 */
export function inspectDocumentSchema(data) {
  if (!data || typeof data !== "object") return {};
  const schema = {};
  for (const [key, value] of Object.entries(data)) {
    const type = getDetailedType(value);
    schema[key] = {
      type,
      sample: typeof value === "object" && value !== null && !Array.isArray(value)
        ? (typeof value.toDate === "function" ? value.toDate().toISOString() : value)
        : value
    };
  }
  return schema;
}

/**
 * Reads documents from the "agbya" Firestore collection
 * @param {number} maxDocs - Maximum number of documents to retrieve (default: 10)
 * @returns {Promise<{ docs: Array<object>, schema: object, totalRead: number }>}
 */
export async function getAgbyaDocuments(maxDocs = 10) {
  const isDemo = isDemoModeExplicit() || !isFirebaseConfigured();

  if (isDemo) {
    // Simulated demo data if in demo mode
    const demoDoc = {
      id: "morning-prayer-sample",
      title: "صلاة باكر",
      titleEn: "Prime (Morning Prayer)",
      hour: 1,
      order: 1,
      isActive: true,
      passages: [
        {
          title: "المزمور الأول",
          text: "طوبى للرجل الذي لم يسلك في مشورة الأشرار..."
        }
      ],
      createdAt: { seconds: 1700000000, nanoseconds: 0 }
    };
    return {
      docs: [demoDoc],
      schema: inspectDocumentSchema(demoDoc),
      totalRead: 1,
      source: "demo"
    };
  }

  try {
    const db = getFirestoreDB();
    const agbyaCol = collection(db, "agbya");
    const q = query(agbyaCol, limit(maxDocs));
    const querySnapshot = await getDocs(q);

    const docs = [];
    const aggregatedSchema = {};

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docWithId = { id: docSnap.id, ...data };
      docs.push(docWithId);

      // Aggregate schema over documents
      for (const [key, val] of Object.entries(data)) {
        if (!aggregatedSchema[key]) {
          aggregatedSchema[key] = {
            types: new Set([getDetailedType(val)]),
            sample: val
          };
        } else {
          aggregatedSchema[key].types.add(getDetailedType(val));
        }
      }
    });

    // Format types
    const formattedSchema = {};
    for (const [key, info] of Object.entries(aggregatedSchema)) {
      formattedSchema[key] = {
        type: Array.from(info.types).join(" | "),
        sample: info.sample
      };
    }

    return {
      docs,
      schema: formattedSchema,
      totalRead: docs.length,
      source: "firestore"
    };
  } catch (error) {
    console.error("Error fetching 'agbya' collection from Firestore:", error);
    throw error;
  }
}
