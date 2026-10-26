'use client';

import React from 'react';
import AboutChurchSection from '../../components/AboutChurchSection';

export default function AboutUsPage() {
  return (
    <main className="portal-main-container page-about-us" id="about-us-page">
      {/* Page Header Banner */}
      <section className="page-header-banner">
        <div className="portal-badge-pill">
          <span className="gold-ornament-dot">✦</span>
          <span>بيتنا الروحي وكنيستنا القبطية</span>
          <span className="gold-ornament-dot">✦</span>
        </div>

        <h1 className="page-header-title">
          عن كنيسة السيدة العذراء والشهيد أبانوب
        </h1>

        <p className="page-header-subtitle">
          تاريخ الكنيسة، شفعاؤها القديسون، آباؤها الكهنة وخدامها، ورسالتها الروحية والتعليمية والمجتمعية في خدمة شعب الله.
        </p>

        <div className="page-header-divider" aria-hidden="true">
          <span></span>
          <span className="dot">✦</span>
          <span></span>
        </div>
      </section>

      {/* About Church Section */}
      <div className="about-us-page-content">
        <AboutChurchSection />
      </div>
    </main>
  );
}
