/**
 * Coptic calendar utilities (offline, no API calls).
 *
 * The Katameros API does not return `copticDate` on feast days and offers no month
 * endpoint, so the calendar grid is computed locally via Julian Day Numbers.
 *
 * Coptic calendar: 12 months x 30 days + Nasi (13th month) of 5 days (6 in a leap year).
 * A Coptic year is a leap year when (year + 1) % 4 === 0.
 */

// Integer JDN of Coptic 1/1/1 minus 1 (see coptic_to_jdn below)
const COPTIC_EPOCH_OFFSET = 1825029;
// Integer JDN of 1970-01-01 (Unix epoch)
const UNIX_EPOCH_JDN = 2440588;
const MS_PER_DAY = 86400000;

export const COPTIC_MONTHS_AR = [
  'توت',
  'بابه',
  'هاتور',
  'كيهك',
  'طوبة',
  'أمشير',
  'برمهات',
  'برمودة',
  'بشنس',
  'بؤونة',
  'أبيب',
  'مسرى',
  'النسيء',
];

export const GREGORIAN_MONTHS_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const WEEKDAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const arabicDigits = new Intl.NumberFormat('ar-EG', { useGrouping: false });

/** Formats a number with Arabic-Indic digits (e.g. 15 -> ١٥). */
export function toArabicNumber(value) {
  return arabicDigits.format(value);
}

function copticToJdn(year, month, day) {
  return COPTIC_EPOCH_OFFSET + 365 * (year - 1) + Math.floor(year / 4) + 30 * (month - 1) + day;
}

/** Gregorian (month is 1-12) -> integer JDN */
export function gregorianToJdn(year, month, day) {
  const d = new Date(Date.UTC(2000, month - 1, day));
  d.setUTCFullYear(year);
  return Math.floor(d.getTime() / MS_PER_DAY) + UNIX_EPOCH_JDN;
}

/** Integer JDN -> Gregorian { year, month (1-12), day } */
export function jdnToGregorian(jdn) {
  const d = new Date((jdn - UNIX_EPOCH_JDN) * MS_PER_DAY);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

/** Integer JDN -> Coptic { year, month (1-13), day } */
export function jdnToCoptic(jdn) {
  const c = jdn - COPTIC_EPOCH_OFFSET - 1;
  const year = Math.floor((4 * c + 1463) / 1461);
  const month = Math.floor((jdn - copticToJdn(year, 1, 1)) / 30) + 1;
  const day = jdn + 1 - copticToJdn(year, month, 1);
  return { year, month, day };
}

/** Gregorian (month is 1-12) -> Coptic { year, month, day, monthName } */
export function gregorianToCoptic(year, month, day) {
  const coptic = jdnToCoptic(gregorianToJdn(year, month, day));
  return { ...coptic, monthName: COPTIC_MONTHS_AR[coptic.month - 1] };
}

export function isCopticLeapYear(year) {
  return (year + 1) % 4 === 0;
}

export function daysInGregorianMonth(year, month) {
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  return gregorianToJdn(nextYear, nextMonth, 1) - gregorianToJdn(year, month, 1);
}

/** Day of week (0 = Sunday) for a Gregorian date. */
export function weekdayOf(year, month, day) {
  return (gregorianToJdn(year, month, day) + 1) % 7;
}

/**
 * Builds a month grid (weeks starting on Sunday) for the given Gregorian month.
 * Each cell: { year, month, day, inMonth, weekday, key, coptic: {year, month, day, monthName} }
 */
export function buildMonthGrid(year, month) {
  const firstJdn = gregorianToJdn(year, month, 1);
  const total = daysInGregorianMonth(year, month);
  const leading = (firstJdn + 1) % 7;
  const cellCount = Math.ceil((leading + total) / 7) * 7;

  const cells = [];
  for (let i = 0; i < cellCount; i += 1) {
    const jdn = firstJdn - leading + i;
    const g = jdnToGregorian(jdn);
    const coptic = jdnToCoptic(jdn);
    cells.push({
      ...g,
      jdn,
      inMonth: g.year === year && g.month === month,
      weekday: i % 7,
      key: toDateKey(g.year, g.month, g.day),
      coptic: { ...coptic, monthName: COPTIC_MONTHS_AR[coptic.month - 1] },
    });
  }
  return cells;
}

/** Returns the distinct Coptic month names spanned by a Gregorian month, e.g. "بابه – هاتور ١٧٤٣". */
export function describeCopticSpan(year, month) {
  const total = daysInGregorianMonth(year, month);
  const first = jdnToCoptic(gregorianToJdn(year, month, 1));
  const last = jdnToCoptic(gregorianToJdn(year, month, total));
  const firstName = COPTIC_MONTHS_AR[first.month - 1];
  const lastName = COPTIC_MONTHS_AR[last.month - 1];
  const yearPart = first.year === last.year
    ? toArabicNumber(first.year)
    : `${toArabicNumber(first.year)} – ${toArabicNumber(last.year)}`;
  const names = first.month === last.month ? firstName : `${firstName} – ${lastName}`;
  return `${names} ${yearPart}`;
}

/** yyyy-mm-dd key used for comparisons and React keys. */
export function toDateKey(year, month, day) {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** Katameros expects dd-MM-yyyy. */
export function toApiDate(year, month, day) {
  return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${String(year).padStart(4, '0')}`;
}

export function getTodayParts(now = new Date()) {
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

/** Adds (or subtracts) days to a Gregorian date. */
export function addDays(year, month, day, delta) {
  return jdnToGregorian(gregorianToJdn(year, month, day) + delta);
}

/** "الأحد ٢٥ أكتوبر ٢٠٢٦" */
export function formatGregorianLong(year, month, day) {
  return `${WEEKDAYS_AR[weekdayOf(year, month, day)]} ${toArabicNumber(day)} ${GREGORIAN_MONTHS_AR[month - 1]} ${toArabicNumber(year)}`;
}

/** "١٥ بابه ١٧٤٣" */
export function formatCopticLong(coptic) {
  return `${toArabicNumber(coptic.day)} ${COPTIC_MONTHS_AR[coptic.month - 1]} ${toArabicNumber(coptic.year)}`;
}
