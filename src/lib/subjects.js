import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";
import { getFirebaseConfig, isFirebaseConfigured, isDemoModeExplicit } from "./firebase-config";

let firestoreInstance = null;
let rtdbInstance = null;

// Cached level list in memory
let cachedLevelList = null;

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

export function getRTDB() {
  const config = getFirebaseConfig();
  let app;
  if (!getApps().length) {
    app = initializeApp(config);
  } else {
    app = getApp();
  }
  if (!rtdbInstance) {
    rtdbInstance = getDatabase(app);
  }
  return rtdbInstance;
}

/**
 * Fallback default levels if RTDB is unavailable or in demo mode
 */
export const DEFAULT_LEVEL_LIST = [
  { id: 0, arName: "حضانة", engName: "primary", saintName: "الملاك ميخائيل", sortOrder: 1 },
  { id: 1, arName: "كى جى 1", engName: "kg1", saintName: "الملاك ميخائيل", sortOrder: 2 },
  { id: 2, arName: "كى جى 2", engName: "kg2", saintName: "الملاك ميخائيل", sortOrder: 3 },
  { id: 3, arName: "أولى ابتدائى", engName: "grade 1", saintName: "الملاك روفائيل", sortOrder: 4 },
  { id: 4, arName: "ثانية ابتدائى", engName: "grade 2", saintName: "الملاك غبريال", sortOrder: 5 },
  { id: 5, arName: "ثالثة ابتدائى", engName: "grade 3", saintName: "الملاك سوريال", sortOrder: 6 },
  { id: 6, arName: "رابعة ابتدائى", engName: "grade 4", saintName: "الملاك سداكييل", sortOrder: 7 },
  { id: 7, arName: "خامسة ابتدائى", engName: "grade 5", saintName: "الملاك انانيال", sortOrder: 8 },
  { id: 8, arName: "سادسة ابتدائى", engName: "grade 6", saintName: "الملاك سراثيال", sortOrder: 9 },
  { id: 9, arName: "تمهيدى", engName: "prepairation", saintName: "مار جرجس", sortOrder: 10 },
  { id: 10, arName: "المستوى الأول", engName: "level 1", saintName: "الشهيد فيلوباتير", sortOrder: 11 },
  { id: 11, arName: "المستوى الثانى", engName: "level 2", saintName: "القديسان مكسيموس و دوماديوس", sortOrder: 12 }
];

/**
 * Reads config/levelList from Realtime Database
 * @returns {Promise<Array<object>>} List of level objects
 */
export async function getLevelList() {
  if (cachedLevelList && cachedLevelList.length > 0) {
    return cachedLevelList;
  }

  const isDemo = isDemoModeExplicit() || !isFirebaseConfigured();
  if (isDemo) {
    cachedLevelList = DEFAULT_LEVEL_LIST;
    return cachedLevelList;
  }

  // 1. Try Firebase RTDB SDK
  try {
    const db = getRTDB();
    const configRef = ref(db, "config/levelList");
    const snapshot = await get(configRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const list = Array.isArray(data) ? data.filter(Boolean) : Object.values(data);
      list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      cachedLevelList = list;
      return cachedLevelList;
    }
  } catch (err) {
    console.warn("[RTDB SDK] Could not read /config/levelList:", err);
  }

  // 2. Fallback via RTDB REST endpoint
  try {
    const config = getFirebaseConfig();
    const dbUrl = config.databaseURL || "https://theotokosmobileapp-default-rtdb.firebaseio.com";
    const endpoint = `${dbUrl.replace(/\/$/, "")}/config/levelList.json`;
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      if (data) {
        const list = Array.isArray(data) ? data.filter(Boolean) : Object.values(data);
        list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        cachedLevelList = list;
        return cachedLevelList;
      }
    }
  } catch (restErr) {
    console.warn("[RTDB REST] Failed to fetch /config/levelList.json:", restErr);
  }

  cachedLevelList = DEFAULT_LEVEL_LIST;
  return cachedLevelList;
}

/**
 * Maps numeric ageLevel IDs (e.g. [3, 4] or 0) to human-friendly Arabic level names
 * @param {Array<number>|number} ageLevel - Level ID or array of level IDs
 * @param {Array<object>} levels - Level list from RTDB
 * @returns {Array<string>} Array of Arabic level names
 */
export function formatLevelNames(ageLevel, levels = cachedLevelList || DEFAULT_LEVEL_LIST) {
  if (ageLevel === undefined || ageLevel === null) return [];
  const levelArray = Array.isArray(ageLevel) ? ageLevel : [ageLevel];
  const levelMap = new Map();

  levels.forEach((lvl) => {
    levelMap.set(Number(lvl.id), lvl.arName?.trim() || lvl.engName || `المستوى ${lvl.id}`);
  });

  return levelArray.map((id) => {
    const num = Number(id);
    return levelMap.has(num) ? levelMap.get(num) : `مستوى ${num}`;
  });
}

/**
 * Fetch items from one of the subjects: 'hymns' | 'agbya' | 'taks'
 */
export async function getSubjectItems(subjectName, maxItems = 70) {
  const isDemo = isDemoModeExplicit() || !isFirebaseConfigured();

  if (isDemo) {
    return getDemoDataForSubject(subjectName);
  }

  try {
    const db = getFirestoreDB();
    const colRef = collection(db, subjectName);
    const q = query(colRef, limit(maxItems));
    const snapshot = await getDocs(q);

    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    items.sort((a, b) => {
      if (a.term !== undefined && b.term !== undefined && a.term !== b.term) {
        return a.term - b.term;
      }
      return (a.title || "").localeCompare(b.title || "", "ar");
    });

    return items;
  } catch (error) {
    console.error(`Error loading subject "${subjectName}" from Firestore:`, error);
    return getDemoDataForSubject(subjectName);
  }
}

function getDemoDataForSubject(subjectName) {
  if (subjectName === "hymns") {
    return [
      {
        id: "demo-hymn-1",
        title: "تين اوؤشت",
        arabicContent: "نسجد لك أيها المسيح مع أبيك الصالح والروح القدس، لأنك أتيت وخلصتنا.",
        copticArabicContent: "تين أوؤشت إمموك أوبي إخرستوس نيم بيك يوت إن أغاثوس نيم بي إبنيفما إثؤواف جي آف إى أكسوتي إممون.",
        copticContent: "Tenouwsht `mmok `w Pi`xrictoc...",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        term: 1,
        yearNumber: 1,
        ageLevel: [1, 2]
      },
      {
        id: "demo-hymn-2",
        title: "لحن يونان في بطن الحوت",
        arabicContent: "يونان في بطن الحوت كمثال المسيح في القبر ثلاثة أيام وثلاث ليالٍ.",
        copticArabicContent: "يونا خين إثنيجي إمبي كيتوس كاطا إبتيبوس...",
        copticContent: "Iwna qen `0negi `mpikitoc kata `ptvpoc...",
        term: 2,
        yearNumber: 1,
        ageLevel: [3, 4]
      }
    ];
  } else if (subjectName === "agbya") {
    return [
      {
        id: "demo-agbya-1",
        title: "2-قانون الايمان",
        content: "بالحقيقة نؤمن بإله واحد، الله الآب، ضابط الكل، خالق السماء والأرض، ما يُرَى وما لا يرى.\nنؤمن برب واحد يسوع المسيح، ابن الله الوحيد، المولود من الآب قبل كل الدهور...",
        description: "قانون الإيمان الأرثوذكسي المقدس",
        term: 2,
        yearNumber: 2,
        ageLevel: [0]
      },
      {
        id: "demo-agbya-2",
        title: "4- القطعه التالته لصلاه الساعه التالته",
        content: "يا والدة الإله أنت هي الكرمة الحقيقية الحاملة عنقود الحياة، نسألك أيتها المملوءة نعمة، مع الرسل، من أجل خلاص نفوسنا. مبارك الرب إلهنا مبارك الرب يوماً فيوماً.",
        description: "قطعة صلاة الساعة الثالثة",
        term: 2,
        yearNumber: 1,
        ageLevel: [3, 4]
      }
    ];
  } else if (subjectName === "taks") {
    return [
      {
        id: "demo-taks-1",
        title: "2- بناء الكنيسة",
        content: "شكل بناء الكنيسة: تجاه الشرق*\nشكل سفينة: لأنها سفينة نجاة للمؤمنين بالمسيح في بحر هذا العالم.*\nشكل دائرة: تشير إلى الأبدية التي لا بداية لها ولا نهاية.*",
        homework: "اكمل: تبنى الكنيسة على شكل ....... أو .......",
        term: 1,
        yearNumber: 1,
        ageLevel: [1, 2]
      },
      {
        id: "demo-taks-2",
        title: "7- الأواشى",
        content: "الأواشي الكبار: أوشية السلامة، أوشية الآباء، أوشية الاجتماعات.*\nكلمة أوشية تعني طلبة أو صلاة تضرع يرفعها الكاهن والشعب معاً.*",
        homework: "اذكر الأواشي الكبار الثلاثة",
        term: 1,
        yearNumber: 2,
        ageLevel: [3, 4]
      }
    ];
  }
  return [];
}
