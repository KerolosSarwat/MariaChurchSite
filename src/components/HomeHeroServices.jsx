'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function HomeHeroServices() {
  const { user, openAuthModal } = useAuth();

  const services = [
    {
      id: 'hymns-service',
      title: 'مدرسة ثيؤطوكوس للألحان',
      titleEn: 'Hymns & Coptic Praises',
      desc: 'المناهج التعليمية المقررة لمختلف المراحل الدراسية: الألحان القبطية، صلوات الأجبية، والطقوس الكنسية مع تسجيلات صوتية استرشادية.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
      actionText: 'تصفح صفحة مدرسة الألحان والمحتوى',
      href: '/hymns-school',
      badge: 'المناهج الدراسية'
    },
    {
      id: 'liturgies-service',
      title: 'مواعيد القداسات والصلوات',
      titleEn: 'Divine Liturgies Schedule',
      desc: 'مواعيد صلوات القداسات الإلهية الأسبوعية (الأحد، الجمعة، الأربعاء، السبت) ورفع بخور عشية وتسبحة نصف الليل بالمذبح الرئيسي والمذابح الملحقة.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M5 7h14M8 17h8" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        </svg>
      ),
      actionText: 'استعراض صفحة جدول القداسات',
      href: '/liturgies',
      badge: 'الصلوات الأسبوعية'
    },
    {
      id: 'calendar-service',
      title: 'التقويم القبطي وقراءات اليوم',
      titleEn: 'Coptic Calendar & Daily Readings',
      desc: 'تقويم ميلادي وقبطي معاً مع قراءات القطمارس اليومية: العشية وباكر والقداس (البولس والكاثوليكون والإبركسيس والإنجيل) والسنكسار.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      actionText: 'فتح التقويم وقراءات اليوم',
      href: '/calendar',
      badge: 'التقويم والقراءات'
    },
    {
      id: 'portal-service',
      title: 'بوابة الدارسين والشهادات',
      titleEn: 'Student Evaluation Portal',
      desc: 'تسجيل دخول الدارسين برقم الكود لمتابعة التقييمات، درجات الشفوي والتحريري، ونتائج الامتحانات الفصلية ومستوى الحفظ.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      actionText: user ? 'فتح ملفي الشخصي' : 'تسجيل دخول الدارس',
      isAuthAction: true,
      badge: 'التقييم والمتابعة'
    },
    {
      id: 'church-service',
      title: 'عن الكنيسة ورعايتها',
      titleEn: 'Church Life & Pastoral Care',
      desc: 'معلومات عن كنيسة السيدة العذراء والشهيد أبانوب، تاريخها، رعاة الكنيسة الأجلاء، فصول مدارس الأحد والأنشطة الروحية والاجتماعية.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      actionText: 'زيارة صفحة عن الكنيسة',
      href: '/about-us',
      badge: 'الرعاية والخدمة'
    }
  ];

  return (
    <section className="coptic-hero-section" id="home" aria-labelledby="home-hero-title">
      <div className="coptic-hero-bg" aria-hidden="true"></div>
      <div className="coptic-hero-overlay" aria-hidden="true"></div>

      <div className="coptic-hero-content">
        {/* Top Cross Ornament */}
        <div className="coptic-cross-ornament">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A45C" strokeWidth="1.75">
            <path d="M12 2v20M5 7h14M8 17h8" strokeLinecap="round" />
            <circle cx="12" cy="7" r="1.5" fill="#C9A45C" />
          </svg>
        </div>

        {/* Portal Pill */}
        <div className="portal-badge-pill">
          <span className="gold-ornament-dot">✦</span>
          <span>كنيسة السيدة العذراء مريم والشهيد أبانوب</span>
          <span className="gold-ornament-dot">✦</span>
        </div>

        {/* Hero Title */}
        <h1 className="portal-hero-title" id="home-hero-title">
          البوابة الرسمية لكنيسة السيدة العذراء والشهيد أبانوب
        </h1>

        {/* Hero Subtitle */}
        <p className="portal-hero-subtitle">
          أهلاً بكم في بيتنا الروحي؛ بوابتكم لمتابعة صلوات القداسات الإلهية، مناهج مدرسة ثيؤطوكوس للألحان القبطية، والتواصل مع مختلف خدمات الكنيسة بروحانية ووقار.
        </p>

        {/* Hero CTA Group */}
        <div className="hero-cta-group">
          <Link href="/hymns-school" className="btn-hero-primary">
            <span>مدرسة الألحان</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>

          <Link href="/liturgies" className="btn-hero-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>مواعيد القداسات</span>
          </Link>

          <Link href="/about-us" className="btn-hero-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>عن الكنيسة</span>
          </Link>

          {!user && (
            <button
              type="button"
              className="btn-hero-accent"
              onClick={openAuthModal}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>دخول الدارس بالكود</span>
            </button>
          )}
        </div>

        {/* Services Overview Cards Grid */}
        <div className="home-services-wrapper">
          <div className="home-services-heading">
            <span className="gold-ornament-dot">✦</span>
            <h3>أقسام وخدمات الموقع الرسمية</h3>
            <span className="gold-ornament-dot">✦</span>
          </div>

          <div className="home-services-grid">
            {services.map((srv) => (
              <article key={srv.id} className="home-service-card">
                <div className="service-card-top">
                  <span className="service-badge">{srv.badge}</span>
                  <div className="service-icon-box" aria-hidden="true">
                    {srv.icon}
                  </div>
                </div>

                <h4 className="service-title">{srv.title}</h4>
                <p className="service-desc">{srv.desc}</p>

                <div className="service-action-wrap">
                  {srv.isAuthAction ? (
                    <button
                      type="button"
                      className="service-link-btn"
                      onClick={openAuthModal}
                    >
                      <span>{srv.actionText}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  ) : (
                    <Link href={srv.href} className="service-link-btn">
                      <span>{srv.actionText}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Architectural Arch Divider */}
      <div className="hero-arch-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none">
          <path d="M0,48 C360,16 1080,16 1440,48 L1440,48 L0,48 Z" fill="#FFF9EF" />
        </svg>
      </div>
    </section>
  );
}
