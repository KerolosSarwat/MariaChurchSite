import { ref, onValue } from "firebase/database";
import { getRTDB, DEFAULT_LEVEL_LIST } from "./subjects";
import { getFirebaseConfig, isFirebaseConfigured, isDemoModeExplicit } from "./firebase-config";

/**
 * App-wide configuration stored in RTDB under `/config`.
 *
 * Shape (as stored):
 * {
 *   academicYear: "2026-2027",
 *   currentYear: 2,                         // curriculum cycle year -> matches item.yearNumber
 *   degrees: { hymns: 30, agbya: 15, ... }, // max degree per subject
 *   levelList: [...],
 *   terms: {
 *     current_term: 1,
 *     first_term:  { start_date, end_date, week_count },
 *     second_term: { ... },
 *     third_term:  { ... }
 *   }
 * }
 */

// Static metadata for each term slot. `profileKey` is the key used in user degree records.
const TERM_SLOTS = [
  { number: 1, configKey: "first_term", profileKey: "firstTerm", label: "الترم الأول" },
  { number: 2, configKey: "second_term", profileKey: "secondTerm", label: "الترم الثاني" },
  { number: 3, configKey: "third_term", profileKey: "thirdTerm", label: "الترم الثالث" },
];

export const SUBJECT_DEGREE_LABELS = {
  hymns: "الألحان",
  coptic: "اللغة القبطية",
  agbya: "الأجبية",
  taks: "الطقس",
  attendance: "الحضور",
};

export const DEFAULT_APP_CONFIG = {
  academicYear: "",
  currentYear: 1,
  degrees: { hymns: 30, coptic: 20, agbya: 15, taks: 20, attendance: 15 },
  levelList: DEFAULT_LEVEL_LIST,
  terms: { current_term: 1 },
};

/**
 * Parses both "YYYY-MM-DD" and "DD/MM/YYYY" date strings (both formats exist in RTDB).
 * @returns {Date|null}
 */
export function parseConfigDate(value) {
  if (!value || typeof value !== "string") return null;
  const str = value.trim();

  let match = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    const [, y, m, d] = match;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, d, m, y] = match;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }

  const fallback = new Date(str);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function toNumber(value, fallback) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

/**
 * Computes the current week number (1-based) within a term, or null if today is outside it.
 */
function computeCurrentWeek(startDate, endDate, weekCount, now = new Date()) {
  if (!startDate) return null;
  if (now < startDate) return null;
  if (endDate && now > new Date(endDate.getTime() + 24 * 60 * 60 * 1000)) return null;
  const week = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
  return weekCount ? Math.min(week, weekCount) : week;
}

/**
 * Converts the raw RTDB `/config` value into a predictable, UI-friendly object.
 */
export function normalizeAppConfig(raw) {
  const data = raw && typeof raw === "object" ? raw : {};

  // Levels
  const rawLevels = data.levelList;
  let levelList = rawLevels
    ? (Array.isArray(rawLevels) ? rawLevels.filter(Boolean) : Object.values(rawLevels))
    : DEFAULT_LEVEL_LIST;
  levelList = levelList
    .map((lvl) => ({
      ...lvl,
      arName: typeof lvl.arName === "string" ? lvl.arName.trim() : lvl.arName,
      engName: typeof lvl.engName === "string" ? lvl.engName.trim() : lvl.engName,
      saintName: typeof lvl.saintName === "string" ? lvl.saintName.trim() : lvl.saintName,
    }))
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  // Degrees (max score per subject)
  const rawDegrees = data.degrees && typeof data.degrees === "object" ? data.degrees : DEFAULT_APP_CONFIG.degrees;
  const degrees = {};
  Object.entries(rawDegrees).forEach(([key, val]) => {
    const num = toNumber(val, null);
    if (num !== null) degrees[key] = num;
  });
  const totalDegrees = Object.values(degrees).reduce((sum, n) => sum + n, 0);

  // Terms
  const rawTerms = data.terms && typeof data.terms === "object" ? data.terms : {};
  const currentTerm = toNumber(rawTerms.current_term, 1);
  const terms = TERM_SLOTS.filter((slot) => rawTerms[slot.configKey] || slot.number === currentTerm).map((slot) => {
    const info = rawTerms[slot.configKey] || {};
    const startDate = parseConfigDate(info.start_date);
    const endDate = parseConfigDate(info.end_date);
    const weekCount = toNumber(info.week_count, null);
    const isCurrent = slot.number === currentTerm;
    return {
      ...slot,
      startDate,
      endDate,
      weekCount,
      isCurrent,
      currentWeek: isCurrent ? computeCurrentWeek(startDate, endDate, weekCount) : null,
    };
  });

  return {
    academicYear: data.academicYear || DEFAULT_APP_CONFIG.academicYear,
    currentYear: toNumber(data.currentYear, DEFAULT_APP_CONFIG.currentYear),
    currentTerm,
    terms,
    degrees,
    totalDegrees,
    levelList,
  };
}

async function fetchConfigViaRest() {
  const config = getFirebaseConfig();
  const dbUrl = config.databaseURL || "https://theotokosmobileapp-default-rtdb.firebaseio.com";
  const response = await fetch(`${dbUrl.replace(/\/$/, "")}/config.json`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/**
 * Subscribes to live changes of `/config`. Falls back to a one-shot REST read, then defaults.
 * @param {(config: object, source: 'live'|'rest'|'default') => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribeToAppConfig(callback) {
  const isDemo = isDemoModeExplicit() || !isFirebaseConfigured();
  if (isDemo) {
    callback(normalizeAppConfig(DEFAULT_APP_CONFIG), "default");
    return () => {};
  }

  let cancelled = false;

  const fallback = async (reason) => {
    console.warn("[RTDB] Live /config subscription failed, using REST fallback:", reason);
    try {
      const data = await fetchConfigViaRest();
      if (!cancelled) callback(normalizeAppConfig(data || DEFAULT_APP_CONFIG), data ? "rest" : "default");
    } catch (err) {
      console.warn("[RTDB REST] Failed to fetch /config.json:", err);
      if (!cancelled) callback(normalizeAppConfig(DEFAULT_APP_CONFIG), "default");
    }
  };

  try {
    const db = getRTDB();
    const unsubscribe = onValue(
      ref(db, "config"),
      (snapshot) => {
        if (cancelled) return;
        if (snapshot.exists()) {
          callback(normalizeAppConfig(snapshot.val()), "live");
        } else {
          callback(normalizeAppConfig(DEFAULT_APP_CONFIG), "default");
        }
      },
      (error) => fallback(error)
    );
    return () => {
      cancelled = true;
      unsubscribe();
    };
  } catch (err) {
    fallback(err);
    return () => {
      cancelled = true;
    };
  }
}
