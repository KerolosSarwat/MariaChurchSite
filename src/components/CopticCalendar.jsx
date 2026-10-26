'use client';

import React, { useEffect, useMemo, useState } from 'react';
import DailyReadings from './DailyReadings';
import {
  buildMonthGrid,
  describeCopticSpan,
  getTodayParts,
  GREGORIAN_MONTHS_AR,
  toArabicNumber,
  toDateKey,
  WEEKDAYS_AR,
} from '../lib/coptic-calendar';

export default function CopticCalendar() {
  // Resolved on the client only so the statically prerendered HTML never shows a stale "today"
  const [today, setToday] = useState(null);
  const [view, setView] = useState(null); // { year, month }
  const [selected, setSelected] = useState(null); // { year, month, day }

  useEffect(() => {
    const now = getTodayParts();
    setToday(now);
    setView({ year: now.year, month: now.month });
    setSelected(now);
  }, []);

  const cells = useMemo(() => (view ? buildMonthGrid(view.year, view.month) : []), [view]);

  if (!view || !selected || !today) {
    return (
      <div className="cal-layout" aria-busy="true">
        <div className="cal-card cal-skeleton" aria-hidden="true">
          <div className="cal-skeleton-line cal-skeleton-title" />
          <div className="cal-skeleton-grid" />
        </div>
        <div className="cal-card cal-skeleton" aria-hidden="true">
          <div className="cal-skeleton-line cal-skeleton-title" />
          <div className="cal-skeleton-line" />
          <div className="cal-skeleton-line" />
        </div>
      </div>
    );
  }

  const todayKey = toDateKey(today.year, today.month, today.day);
  const selectedKey = toDateKey(selected.year, selected.month, selected.day);
  const isCurrentMonth = view.year === today.year && view.month === today.month;
  // Roving tabindex: the selected day if visible in this month, otherwise the 1st
  const selectedInView = selected.year === view.year && selected.month === view.month;
  const focusKey = selectedInView ? selectedKey : toDateKey(view.year, view.month, 1);

  const shiftMonth = (delta) => {
    setView((prev) => {
      const index = prev.year * 12 + (prev.month - 1) + delta;
      return { year: Math.floor(index / 12), month: (index % 12) + 1 };
    });
  };

  const goToToday = () => {
    setView({ year: today.year, month: today.month });
    setSelected(today);
  };

  const onGridKeyDown = (event, cell) => {
    const offsets = { ArrowRight: -1, ArrowLeft: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(event.key in offsets)) return;
    event.preventDefault();
    const index = cells.findIndex((c) => c.key === cell.key);
    const target = cells[index + offsets[event.key]];
    if (target) {
      setSelected({ year: target.year, month: target.month, day: target.day });
      if (!target.inMonth) setView({ year: target.year, month: target.month });
      requestAnimationFrame(() => document.getElementById(`cal-day-${target.key}`)?.focus());
    }
  };

  return (
    <div className="cal-layout">
      {/* Month grid */}
      <section className="cal-card cal-grid-card" aria-label="التقويم القبطي والميلادي">
        <header className="cal-grid-header">
          <button
            type="button"
            className="cal-nav-btn"
            onClick={() => shiftMonth(-1)}
            aria-label="الشهر السابق"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="cal-grid-title-block">
            <h2 className="cal-grid-title">
              {GREGORIAN_MONTHS_AR[view.month - 1]} {toArabicNumber(view.year)}
            </h2>
            <p className="cal-grid-subtitle">{describeCopticSpan(view.year, view.month)}</p>
          </div>

          <button
            type="button"
            className="cal-nav-btn"
            onClick={() => shiftMonth(1)}
            aria-label="الشهر التالي"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </header>

        <div className="cal-weekdays" aria-hidden="true">
          {WEEKDAYS_AR.map((name, i) => (
            <span key={name} className={`cal-weekday ${i === 0 ? 'is-sunday' : ''}`}>
              {name}
            </span>
          ))}
        </div>

        <div className="cal-days" role="group" aria-label={`${GREGORIAN_MONTHS_AR[view.month - 1]} ${toArabicNumber(view.year)}`}>
          {cells.map((cell) => {
            const isToday = cell.key === todayKey;
            const isSelected = cell.key === selectedKey;
            const startsCopticMonth = cell.coptic.day === 1;
            const classes = [
              'cal-day',
              cell.inMonth ? '' : 'is-outside',
              cell.weekday === 0 ? 'is-sunday' : '',
              isToday ? 'is-today' : '',
              isSelected ? 'is-selected' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={cell.key}
                id={`cal-day-${cell.key}`}
                type="button"
                className={classes}
                aria-pressed={isSelected}
                aria-current={isToday ? 'date' : undefined}
                aria-label={`${toArabicNumber(cell.day)} ${GREGORIAN_MONTHS_AR[cell.month - 1]} — ${toArabicNumber(cell.coptic.day)} ${cell.coptic.monthName}`}
                tabIndex={cell.key === focusKey ? 0 : -1}
                onClick={() => {
                  setSelected({ year: cell.year, month: cell.month, day: cell.day });
                  if (!cell.inMonth) setView({ year: cell.year, month: cell.month });
                }}
                onKeyDown={(e) => onGridKeyDown(e, cell)}
              >
                <span className="cal-day-gregorian-num">{toArabicNumber(cell.day)}</span>
                <span className={`cal-day-coptic-num ${startsCopticMonth ? 'is-month-start' : ''}`}>
                  {startsCopticMonth ? cell.coptic.monthName : toArabicNumber(cell.coptic.day)}
                </span>
              </button>
            );
          })}
        </div>

        <footer className="cal-grid-footer">
          <div className="cal-legend" aria-hidden="true">
            <span className="cal-legend-item">
              <span className="cal-legend-dot is-greg" /> ميلادي
            </span>
            <span className="cal-legend-item">
              <span className="cal-legend-dot is-coptic" /> قبطي
            </span>
          </div>
          <button
            type="button"
            className="cal-today-btn"
            onClick={goToToday}
            disabled={isCurrentMonth && todayKey === selectedKey}
          >
            اليوم
          </button>
        </footer>
      </section>

      {/* Readings for the selected day */}
      <div className="cal-card cal-readings-card">
        <DailyReadings date={selected} />
      </div>
    </div>
  );
}
