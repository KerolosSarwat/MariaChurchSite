'use client';

import React from 'react';
import SubjectsSection from '../../components/SubjectsSection';
import { useAuth } from '../../components/AuthProvider';

export default function HymnsSchoolPage() {
  const { user } = useAuth();

  return (
    <main className="portal-main-container page-hymns-school" id="hymns-school">
      {/* Page Header Banner */}
      <section className="page-header-banner">
        <div className="portal-badge-pill">
          <span className="gold-ornament-dot">✦</span>
          <span>مدرسة ثيؤطوكوس للألحان القبطية</span>
          <span className="gold-ornament-dot">✦</span>
        </div>

        <h1 className="page-header-title">
          مناهج مدرسة الألحان والمحتوى التعليمي
        </h1>

        <p className="page-header-subtitle">
          استعرض محتوى الألحان القبطية الأصيلة، صلوات الأجبية، والطقوس الكنسية المقررة لمختلف المراحل الدراسية مع التسجيلات الصوتية والنصوص والواجبات التعليمية.
        </p>

        <div className="page-header-divider" aria-hidden="true">
          <span></span>
          <span className="dot">✦</span>
          <span></span>
        </div>
      </section>

      {/* Subjects and Curriculum Section */}
      <div className="hymns-school-content-wrapper">
        <SubjectsSection user={user} />
      </div>
    </main>
  );
}
