import { ref, onValue } from 'firebase/database';
import { getRTDB } from './subjects';
import { getFirebaseConfig, isFirebaseConfigured, isDemoModeExplicit } from './firebase-config';

/**
 * Weekday name mappings and day index resolution (0 = Sunday, 6 = Saturday)
 */
const DAY_MAP = {
  sunday: { index: 0, ar: 'الأحد', en: 'Sunday', key: 'sunday' },
  sun: { index: 0, ar: 'الأحد', en: 'Sunday', key: 'sunday' },
  'الأحد': { index: 0, ar: 'الأحد', en: 'Sunday', key: 'sunday' },
  'الاحد': { index: 0, ar: 'الأحد', en: 'Sunday', key: 'sunday' },

  monday: { index: 1, ar: 'الإثنين', en: 'Monday', key: 'monday' },
  mon: { index: 1, ar: 'الإثنين', en: 'Monday', key: 'monday' },
  'الإثنين': { index: 1, ar: 'الإثنين', en: 'Monday', key: 'monday' },
  'الاثنين': { index: 1, ar: 'الإثنين', en: 'Monday', key: 'monday' },

  tuesday: { index: 2, ar: 'الثلاثاء', en: 'Tuesday', key: 'tuesday' },
  tue: { index: 2, ar: 'الثلاثاء', en: 'Tuesday', key: 'tuesday' },
  'الثلاثاء': { index: 2, ar: 'الثلاثاء', en: 'Tuesday', key: 'tuesday' },

  wednesday: { index: 3, ar: 'الأربعاء', en: 'Wednesday', key: 'wednesday' },
  wed: { index: 3, ar: 'الأربعاء', en: 'Wednesday', key: 'wednesday' },
  'الأربعاء': { index: 3, ar: 'الأربعاء', en: 'Wednesday', key: 'wednesday' },
  'الاربعاء': { index: 3, ar: 'الأربعاء', en: 'Wednesday', key: 'wednesday' },

  thursday: { index: 4, ar: 'الخميس', en: 'Thursday', key: 'thursday' },
  thu: { index: 4, ar: 'الخميس', en: 'Thursday', key: 'thursday' },
  'الخميس': { index: 4, ar: 'الخميس', en: 'Thursday', key: 'thursday' },

  friday: { index: 5, ar: 'الجمعة', en: 'Friday', key: 'friday' },
  fri: { index: 5, ar: 'الجمعة', en: 'Friday', key: 'friday' },
  'الجمعة': { index: 5, ar: 'الجمعة', en: 'Friday', key: 'friday' },

  saturday: { index: 6, ar: 'السبت', en: 'Saturday', key: 'saturday' },
  satureday: { index: 6, ar: 'السبت', en: 'Saturday', key: 'saturday' }, // Support common phonetic spelling
  sat: { index: 6, ar: 'السبت', en: 'Saturday', key: 'saturday' },
  'السبت': { index: 6, ar: 'السبت', en: 'Saturday', key: 'saturday' },
};

/**
 * Resolves day information from any string (English or Arabic).
 */
export function resolveDayInfo(weekDayStr) {
  if (!weekDayStr || typeof weekDayStr !== 'string') {
    return { index: -1, ar: 'يوم كنسي', en: 'Day', key: 'other' };
  }
  const normalized = weekDayStr.trim().toLowerCase();
  if (DAY_MAP[normalized]) {
    return DAY_MAP[normalized];
  }
  // If not exact match, look for sub-string match
  for (const [key, val] of Object.entries(DAY_MAP)) {
    if (normalized.includes(key)) {
      return val;
    }
  }
  return { index: -1, ar: weekDayStr.trim(), en: weekDayStr.trim(), key: 'other' };
}

/**
 * Formats time string cleanly (converting AM/PM to ص/م if applicable).
 */
export function formatLiturgyTime(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return '';
  return timeStr
    .replace(/\bAM\b/gi, 'ص')
    .replace(/\bPM\b/gi, 'م')
    .replace(/\s*-\s*/g, ' – ')
    .trim();
}

/**
 * Generates an appropriate badge label based on pray name.
 */
function deriveLiturgyBadge(pray, badgeProp) {
  if (badgeProp && typeof badgeProp === 'string' && badgeProp.trim()) {
    return badgeProp.trim();
  }
  const p = (pray || '').trim();
  if (p.includes('عشية')) return 'عشية';
  if (p.includes('تسبحة')) return 'تسبحة';
  if (p.includes('أول') || p.includes('اول') || p.includes('باكر')) return 'القداس الأول';
  if (p.includes('ثان') || p.includes('ثاني') || p.includes('ثانى') || p.includes('متأخر')) return 'القداس الثاني';
  if (p.includes('قداس')) return 'قداس إلهي';
  return p || 'صلاة كنسية';
}

/**
 * Provides a meaningful spiritual default description if description is empty in RTDB.
 */
function deriveLiturgyDetails(description, pray) {
  if (description && typeof description === 'string' && description.trim().length > 0) {
    return description.trim();
  }
  const p = (pray || '').trim();
  if (p.includes('عشية')) {
    return 'رفع بخور عشية، ذكصولوجيات القديسين وتماجيد المساء المباركة.';
  }
  if (p.includes('تسبحة')) {
    return 'تسبحة نصف الليل والأبصاليات والهوسات والذكصولوجيات الروحية.';
  }
  if (p.includes('أول') || p.includes('باكر')) {
    return 'صلاة باكر، تقديم الحمل، قراءات اليوم والقداس الإلهي والتناول من الأسرار المقدسة.';
  }
  if (p.includes('ثان') || p.includes('متأخر')) {
    return 'صلاة السواعي، تقديم الحمل، العظة الروحية، والقداس الإلهي والتناول من الأسرار المقدسة.';
  }
  return 'صلوات القداس الإلهي، تقديم الحمل، ونوال بركة التناول من الأسرار المقدسة.';
}

/**
 * Normalizes a raw RTDB liturgy object into a predictable UI model.
 */
export function normalizeLiturgyItem(item, index) {
  if (!item || typeof item !== 'object') return null;

  const dayInfo = resolveDayInfo(item.weekDay);
  const pray = typeof item.pray === 'string' ? item.pray.trim() : 'قداس إلهي';
  const isVesper = pray.includes('عشية') || pray.includes('تسبحة');
  const badge = deriveLiturgyBadge(pray, item.badge);
  const details = deriveLiturgyDetails(item.description, pray);
  const timeFormatted = formatLiturgyTime(item.time || '');
  const place = typeof item.place === 'string' && item.place.trim() ? item.place.trim() : 'كنيسة السيدة العذراء مريم';
  const id = item.id || `L-${String(index + 1).padStart(2, '0')}`;

  return {
    id,
    rawId: item.id || '',
    weekDay: item.weekDay || '',
    dayName: dayInfo.ar,
    dayEn: dayInfo.en,
    dayIndex: dayInfo.index,
    dayKey: dayInfo.key,
    time: item.time || '',
    timeRange: timeFormatted,
    pray,
    serviceType: pray,
    place,
    altar: place,
    description: item.description || '',
    details,
    badge,
    isVesper,
    sortOrder: index,
  };
}

/**
 * Normalizes a collection of liturgies (array or object map).
 */
export function normalizeLiturgiesList(raw) {
  if (!raw) return [];
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === 'object'
    ? Object.values(raw)
    : [];

  return list
    .filter(Boolean)
    .map((item, idx) => normalizeLiturgyItem(item, idx))
    .filter(Boolean);
}

/**
 * Fallback static data if offline or RTDB unavailable.
 */
export const DEFAULT_FALLBACK_LITURGIES = [
  {
    id: 'L-01',
    weekDay: 'Saturday',
    dayName: 'السبت',
    dayEn: 'Saturday',
    dayIndex: 6,
    dayKey: 'saturday',
    serviceType: 'عشية',
    pray: 'عشية',
    time: '5:30 PM - 6:30 PM',
    timeRange: '05:30 م – 06:30 م',
    place: 'كنيسة السيدة العذراء مريم',
    altar: 'كنيسة السيدة العذراء مريم',
    description: '',
    details: 'رفع بخور عشية، ذكصولوجيات القديسين وتماجيد المساء المباركة.',
    badge: 'عشية',
    isVesper: true,
  },
  {
    id: 'L-02',
    weekDay: 'Sunday',
    dayName: 'الأحد',
    dayEn: 'Sunday',
    dayIndex: 0,
    dayKey: 'sunday',
    serviceType: 'قداس أول',
    pray: 'قداس أول',
    time: '5:30 AM - 8:00 AM',
    timeRange: '05:30 ص – 08:00 ص',
    place: 'كنيسة الشهيد مارجرجس',
    altar: 'كنيسة الشهيد مارجرجس',
    description: '',
    details: 'صلاة باكر، تقديم الحمل، قراءات اليوم والقداس الإلهي والتناول من الأسرار المقدسة.',
    badge: 'القداس الأول',
    isVesper: false,
  },
  {
    id: 'L-03',
    weekDay: 'Sunday',
    dayName: 'الأحد',
    dayEn: 'Sunday',
    dayIndex: 0,
    dayKey: 'sunday',
    serviceType: 'قداس ثانى',
    pray: 'قداس ثانى',
    time: '7:00 AM - 10:00 AM',
    timeRange: '07:00 ص – 10:00 ص',
    place: 'كنيسة السيدة العذراء مريم',
    altar: 'كنيسة السيدة العذراء مريم',
    description: '',
    details: 'صلاة السواعي، تقديم الحمل، العظة الروحية، والقداس الإلهي والتناول من الأسرار المقدسة.',
    badge: 'القداس الثاني',
    isVesper: false,
  },
];

/**
 * Fetches liturgies via Firebase RTDB REST API.
 */
export async function fetchLiturgiesViaRest() {
  const config = getFirebaseConfig();
  const dbUrl = config.databaseURL || 'https://theotokosmobileapp-default-rtdb.firebaseio.com';
  const response = await fetch(`${dbUrl.replace(/\/$/, '')}/liturgies.json`, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/**
 * Subscribes to live changes of `/liturgies`.
 * Falls back to REST read if websocket fails, or fallback data if offline.
 *
 * @param {(items: Array, source: 'live'|'rest'|'default') => void} callback
 * @returns {() => void} unsubscribe
 */
export function subscribeToLiturgies(callback) {
  const isDemo = isDemoModeExplicit() || !isFirebaseConfigured();
  if (isDemo) {
    callback(DEFAULT_FALLBACK_LITURGIES, 'default');
    return () => {};
  }

  let cancelled = false;

  const fallback = async (reason) => {
    console.warn('[RTDB] Live /liturgies subscription issue, using REST fallback:', reason);
    try {
      const data = await fetchLiturgiesViaRest();
      if (!cancelled) {
        if (data !== null && data !== undefined) {
          callback(normalizeLiturgiesList(data), 'rest');
        } else {
          callback(DEFAULT_FALLBACK_LITURGIES, 'default');
        }
      }
    } catch (err) {
      console.warn('[RTDB REST] Failed to fetch /liturgies.json:', err);
      if (!cancelled) {
        callback(DEFAULT_FALLBACK_LITURGIES, 'default');
      }
    }
  };

  try {
    const db = getRTDB();
    const unsubscribe = onValue(
      ref(db, 'liturgies'),
      (snapshot) => {
        if (cancelled) return;
        if (snapshot.exists()) {
          const val = snapshot.val();
          callback(normalizeLiturgiesList(val), 'live');
        } else {
          // If node doesn't exist yet, pass empty or fallback
          callback([], 'live');
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
