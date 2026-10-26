'use client';

import React from 'react';
import CopticCalendar from '../../components/CopticCalendar';

export default function CalendarPage() {
  return (
    <main className="portal-main-container page-calendar" id="calendar-page">
      {/* Page Header Banner */}
      <section className="page-header-banner">
        <div className="portal-badge-pill">
          <span className="gold-ornament-dot">✦</span>
          <span>التقويم القبطي وقراءات الكنيسة</span>
          <span className="gold-ornament-dot">✦</span>
        </div>

        <h1 className="page-header-title">التقويم القبطي وقراءات اليوم</h1>

        <p className="page-header-subtitle">
          تقويم ميلادي وقبطي معاً، مع قراءات القطمارس اليومية (العشية وباكر والقداس) والسنكسار لكل يوم.
        </p>

        <div className="page-header-divider" aria-hidden="true">
          <span></span>
          <span className="dot">✦</span>
          <span></span>
        </div>
      </section>

      <div className="cal-page-content">
        <CopticCalendar />
      </div>
    </main>
  );
}
