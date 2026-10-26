'use client';

import React from 'react';
import LiturgiesSection from '../../components/LiturgiesSection';

export default function LiturgiesPage() {
  return (
    <main className="portal-main-container page-liturgies" id="liturgies-page">
      {/* Page Header Banner */}
      <section className="page-header-banner">
        <div className="portal-badge-pill">
          <span className="gold-ornament-dot">✦</span>
          <span>سر الإفخارستيا والصلوات الكنسية</span>
          <span className="gold-ornament-dot">✦</span>
        </div>

        <h1 className="page-header-title">
          مواعيد القداسات والصلوات الأسبوعية
        </h1>

        <p className="page-header-subtitle">
          جدول مواعيد صلوات القداسات الإلهية ورفع بخور عشية بكنيسة السيدة العذراء مريم والشهيد أبانوب، لنلتقي جميعاً بروح المحبة والشركة الروحية.
        </p>

        <div className="page-header-divider" aria-hidden="true">
          <span></span>
          <span className="dot">✦</span>
          <span></span>
        </div>
      </section>

      {/* Liturgies Schedule and Guidelines Component */}
      <div className="liturgies-page-content">
        <LiturgiesSection />
      </div>
    </main>
  );
}
