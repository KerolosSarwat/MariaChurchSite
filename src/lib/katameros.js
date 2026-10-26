/**
 * Katameros readings client.
 *
 * API: GET https://api.katameros.app/readings/gregorian/{dd-MM-yyyy}?languageId={n}
 * (CORS is open, one request = one day, no cache headers -> we cache here.)
 */

import { toApiDate } from './coptic-calendar';

const KATAMEROS_BASE_URL = 'https://api.katameros.app';
export const ARABIC_LANGUAGE_ID = 3;

const SESSION_PREFIX = 'katameros:v1:';
const memoryCache = new Map();
const inflight = new Map();

/** Stable section ids used by the API. */
export const SECTION_IDS = { VESPERS: 1, MATINS: 2, LITURGY: 3 };
/** SubSection id of the Synaxarium within the Liturgy section. */
export const SYNAXARIUM_SUBSECTION_ID = 10;

function cleanText(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n?/g, '\n').replace(/[ \t]{2,}/g, ' ').trim();
}

/**
 * Safely converts the Synaxarium HTML into plain paragraphs.
 * DOMParser never executes scripts, and we only keep text, so no HTML is ever injected.
 */
function htmlToParagraphs(html) {
  if (typeof html !== 'string' || !html.trim()) return [];
  if (typeof DOMParser === 'undefined') {
    return html
      .split(/<\/p>/i)
      .map((chunk) => cleanText(chunk.replace(/<[^>]*>/g, '')))
      .filter(Boolean);
  }
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const paragraphs = Array.from(doc.body.querySelectorAll('p'))
    .map((p) => cleanText(p.textContent))
    .filter(Boolean);
  if (paragraphs.length > 0) return paragraphs;
  const fallback = cleanText(doc.body.textContent);
  return fallback ? [fallback] : [];
}

function normalizePassage(passage) {
  const verses = Array.isArray(passage?.verses) ? passage.verses : [];
  return {
    bookId: passage?.bookId ?? null,
    book: cleanText(passage?.bookTranslation),
    chapter: passage?.chapter ?? null,
    ref: cleanText(passage?.ref),
    verses: verses.map((v) => ({ number: v.number, text: cleanText(v.text) })),
  };
}

function normalizeReading(reading, subSectionId) {
  const passages = Array.isArray(reading?.passages) ? reading.passages.map(normalizePassage) : [];
  const paragraphs = htmlToParagraphs(reading?.html);
  return {
    id: reading?.id,
    title: cleanText(reading?.title),
    introduction: cleanText(reading?.introduction),
    conclusion: cleanText(reading?.conclusion),
    passages,
    paragraphs,
    isSynaxarium: subSectionId === SYNAXARIUM_SUBSECTION_ID || (paragraphs.length > 0 && passages.length === 0),
  };
}

/**
 * Converts the raw API payload into a predictable UI model.
 * Sections are identified by their stable `id`, never by array index.
 */
export function normalizeReadings(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  const sections = (Array.isArray(data.sections) ? data.sections : []).map((section) => ({
    id: section.id,
    title: cleanText(section.title),
    subSections: (Array.isArray(section.subSections) ? section.subSections : []).map((sub) => ({
      id: sub.id,
      title: cleanText(sub.title),
      introduction: cleanText(sub.introduction),
      readings: (Array.isArray(sub.readings) ? sub.readings : []).map((r) => normalizeReading(r, sub.id)),
    })),
  }));

  return {
    title: cleanText(data.title),
    periodInfo: cleanText(data.periodInfo),
    bibleName: cleanText(data.bible?.name),
    sections,
  };
}

function readSession(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SESSION_PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable - memory cache still works.
  }
}

/**
 * Fetches (and caches) the normalized readings for one Gregorian day.
 * @param {{year:number, month:number, day:number}} date month is 1-12
 * @param {{languageId?: number, signal?: AbortSignal}} [options]
 */
export async function fetchDailyReadings({ year, month, day }, { languageId = ARABIC_LANGUAGE_ID, signal } = {}) {
  const apiDate = toApiDate(year, month, day);
  const cacheKey = `${languageId}|${apiDate}`;

  if (memoryCache.has(cacheKey)) return memoryCache.get(cacheKey);
  const stored = readSession(cacheKey);
  if (stored) {
    memoryCache.set(cacheKey, stored);
    return stored;
  }

  // Share one network request between concurrent callers (prefetch + selection).
  // The shared request is not tied to a single caller's signal so a cancelled caller can't break others.
  let promise = inflight.get(cacheKey);
  if (!promise) {
    promise = (async () => {
      const response = await fetch(
        `${KATAMEROS_BASE_URL}/readings/gregorian/${apiDate}?languageId=${languageId}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!response.ok) {
        let detail = '';
        try {
          detail = (await response.json())?.detail || '';
        } catch {
          // ignore body parse errors
        }
        throw new Error(detail || `HTTP ${response.status}`);
      }
      const normalized = normalizeReadings(await response.json());
      memoryCache.set(cacheKey, normalized);
      writeSession(cacheKey, normalized);
      return normalized;
    })().finally(() => inflight.delete(cacheKey));
    inflight.set(cacheKey, promise);
  }

  if (!signal) return promise;
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

  return new Promise((resolve, reject) => {
    const onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener('abort', onAbort);
        reject(error);
      }
    );
  });
}

/** Warms the cache for a day without surfacing errors. */
export function prefetchDailyReadings(date, options) {
  fetchDailyReadings(date, options).catch(() => {});
}
