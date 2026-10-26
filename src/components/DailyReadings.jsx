'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  fetchDailyReadings,
  prefetchDailyReadings,
  SECTION_IDS,
} from '../lib/katameros';
import {
  addDays,
  formatCopticLong,
  formatGregorianLong,
  gregorianToCoptic,
  toArabicNumber,
} from '../lib/coptic-calendar';

function ReadingSkeleton() {
  return (
    <div className="cal-skeleton" aria-hidden="true">
      <div className="cal-skeleton-line cal-skeleton-title" />
      <div className="cal-skeleton-line" />
      <div className="cal-skeleton-line" />
      <div className="cal-skeleton-line cal-skeleton-short" />
      <div className="cal-skeleton-line cal-skeleton-title" style={{ marginTop: '1.4rem' }} />
      <div className="cal-skeleton-line" />
      <div className="cal-skeleton-line cal-skeleton-short" />
    </div>
  );
}

function Passage({ passage }) {
  return (
    <details className="cal-passage" open>
      <summary className="cal-passage-summary">
        <span className="cal-passage-ref">
          {passage.book} {passage.ref}
        </span>
        <span className="cal-passage-count">{toArabicNumber(passage.verses.length)} آية</span>
      </summary>
      <p className="cal-passage-text">
        {passage.verses.map((verse) => (
          <span key={verse.number} className="cal-verse">
            <sup className="cal-verse-number">{toArabicNumber(verse.number)}</sup>
            {verse.text}{' '}
          </span>
        ))}
      </p>
    </details>
  );
}

function Reading({ reading }) {
  if (reading.isSynaxarium) {
    return (
      <article className="cal-reading cal-reading-synaxarium">
        {reading.title && <h5 className="cal-reading-title">{reading.title}</h5>}
        {reading.paragraphs.map((text, idx) => (
          <p key={idx} className="cal-synaxarium-text">
            {text}
          </p>
        ))}
      </article>
    );
  }

  return (
    <article className="cal-reading">
      {reading.title && <h5 className="cal-reading-title">{reading.title}</h5>}
      {reading.introduction && <p className="cal-reading-intro">{reading.introduction}</p>}
      {reading.passages.map((passage, idx) => (
        <Passage key={`${passage.bookId}-${passage.ref}-${idx}`} passage={passage} />
      ))}
      {reading.conclusion && <p className="cal-reading-conclusion">{reading.conclusion}</p>}
    </article>
  );
}

export default function DailyReadings({ date }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });
  const [activeSectionId, setActiveSectionId] = useState(SECTION_IDS.LITURGY);
  const [retryToken, setRetryToken] = useState(0);

  const { year, month, day } = date;
  const coptic = useMemo(() => gregorianToCoptic(year, month, day), [year, month, day]);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ status: 'loading', data: prev.data, error: '' }));

    fetchDailyReadings({ year, month, day }, { signal: controller.signal })
      .then((data) => {
        setState({ status: 'ready', data, error: '' });
        // Warm the neighbouring days for instant next/previous navigation
        [-1, 1].forEach((delta) => prefetchDailyReadings(addDays(year, month, day, delta)));
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return;
        setState({ status: 'error', data: null, error: error?.message || 'تعذر تحميل القراءات' });
      });

    return () => controller.abort();
  }, [year, month, day, retryToken]);

  const data = state.data;
  const sections = data?.sections || [];

  // Fall back to the first available section when the chosen one doesn't exist for this day
  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId) || sections[0] || null,
    [sections, activeSectionId]
  );

  const handleRetry = useCallback(() => setRetryToken((n) => n + 1), []);

  return (
    <section className="cal-readings-panel" aria-live="polite" aria-label="قراءات اليوم">
      <header className="cal-day-header">
        <div className="cal-day-header-main">
          <span className="cal-day-cross" aria-hidden="true">☩</span>
          <div>
            <h2 className="cal-day-gregorian">{formatGregorianLong(year, month, day)}</h2>
            <p className="cal-day-coptic">{formatCopticLong(coptic)} للشهداء</p>
          </div>
        </div>

        {(data?.title || data?.periodInfo) && (
          <div className="cal-day-badges">
            {data.title && <span className="cal-feast-badge">{data.title}</span>}
            {data.periodInfo && <span className="cal-period-badge">{data.periodInfo}</span>}
          </div>
        )}
      </header>

      {state.status === 'loading' && !data && <ReadingSkeleton />}

      {state.status === 'error' && (
        <div className="cal-error" role="alert">
          <p className="cal-error-title">تعذر تحميل قراءات هذا اليوم</p>
          <p className="cal-error-text">تأكد من اتصالك بالإنترنت ثم حاول مرة أخرى.</p>
          <button type="button" className="cal-retry-btn" onClick={handleRetry}>
            إعادة المحاولة
          </button>
        </div>
      )}

      {data && state.status !== 'error' && (
        <div className={state.status === 'loading' ? 'cal-readings-body is-refreshing' : 'cal-readings-body'}>
          {sections.length > 0 ? (
            <>
              <div className="cal-section-tabs" role="tablist" aria-label="أقسام القراءات">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    role="tab"
                    aria-selected={activeSection?.id === section.id}
                    className={`cal-section-tab ${activeSection?.id === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSectionId(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>

              {activeSection &&
                activeSection.subSections.map((sub) => (
                  <div key={sub.id} className="cal-subsection">
                    <h4 className="cal-subsection-title">{sub.title}</h4>
                    {sub.introduction && <p className="cal-reading-intro">{sub.introduction}</p>}
                    {sub.readings.map((reading) => (
                      <Reading key={reading.id} reading={reading} />
                    ))}
                  </div>
                ))}

              {data.bibleName && <p className="cal-bible-credit">النص: {data.bibleName}</p>}
            </>
          ) : (
            <p className="cal-empty">لا توجد قراءات متاحة لهذا اليوم.</p>
          )}
        </div>
      )}
    </section>
  );
}
