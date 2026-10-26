'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { subscribeToLiturgies, DEFAULT_FALLBACK_LITURGIES } from '../lib/liturgies';

export default function LiturgiesSection() {
  const [liturgies, setLiturgies] = useState(DEFAULT_FALLBACK_LITURGIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to live /liturgies from RTDB (with REST fallback)
  useEffect(() => {
    const unsubscribe = subscribeToLiturgies((items) => {
      if (Array.isArray(items)) {
        setLiturgies(items);
      }
      setIsLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Detect current day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayIndex = useMemo(() => {
    return new Date().getDay();
  }, []);

  // Dynamically compute category filter tabs based on available liturgies
  const categories = useMemo(() => {
    const tabs = [
      { id: 'all', label: `جميع الصلوات (${liturgies.length})` }
    ];

    // Check if any vespers/tashbeha exist
    const vespersCount = liturgies.filter((l) => l.isVesper).length;
    if (vespersCount > 0) {
      tabs.push({ id: 'vespers', label: `العشيات والتسبحة (${vespersCount})` });
    }

    // Days in canonical weekly sequence (Sunday -> Saturday)
    const dayDefinitions = [
      { key: 'sunday', index: 0, label: 'صلوات الأحد' },
      { key: 'monday', index: 1, label: 'صلوات الإثنين' },
      { key: 'tuesday', index: 2, label: 'صلوات الثلاثاء' },
      { key: 'wednesday', index: 3, label: 'صلوات الأربعاء' },
      { key: 'thursday', index: 4, label: 'صلوات الخميس' },
      { key: 'friday', index: 5, label: 'صلوات الجمعة' },
      { key: 'saturday', index: 6, label: 'صلوات السبت' },
    ];

    dayDefinitions.forEach((d) => {
      const count = liturgies.filter((l) => l.dayIndex === d.index || l.dayKey === d.key).length;
      if (count > 0) {
        tabs.push({ id: d.key, label: `${d.label} (${count})` });
      }
    });

    // Check for custom/unmapped days
    liturgies.forEach((l) => {
      if (l.dayKey === 'other' && l.dayName && !tabs.some((t) => t.id === `day-${l.dayName}`)) {
        const count = liturgies.filter((item) => item.dayName === l.dayName).length;
        tabs.push({ id: `day-${l.dayName}`, label: `صلوات ${l.dayName} (${count})` });
      }
    });

    return tabs;
  }, [liturgies]);

  // If active filter tab is no longer in categories, reset to 'all'
  useEffect(() => {
    if (selectedCategory !== 'all' && !categories.some((c) => c.id === selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [categories, selectedCategory]);

  // Filter items according to the active tab
  const filteredLiturgies = useMemo(() => {
    if (selectedCategory === 'all') return liturgies;
    if (selectedCategory === 'vespers') {
      return liturgies.filter((item) => item.isVesper);
    }
    return liturgies.filter(
      (item) => item.dayKey === selectedCategory || `day-${item.dayName}` === selectedCategory
    );
  }, [liturgies, selectedCategory]);

  return (
    <section className="liturgies-section" id="liturgies" aria-labelledby="liturgies-heading">
      <div className="liturgies-container">
        {/* Section Header */}
        <header className="liturgies-header">
          <div className="portal-badge-pill">
            <span className="gold-ornament-dot">✦</span>
            <span>سر الإفخارستيا والصلوات الكنسية</span>
            <span className="gold-ornament-dot">✦</span>
          </div>

          <h2 className="liturgies-title" id="liturgies-heading">
            مواعيد القداسات والصلوات الأسبوعية
          </h2>

          <p className="liturgies-subtitle">
            جدول مواعيد صلوات القداسات الإلهية ورفع بخور عشية بكنيسة السيدة العذراء مريم والشهيد أبانوب، لنلتقي جميعاً بروح المحبة والشركة الروحية.
          </p>

          {/* Category Filter Pills (rendered if there are multiple filter options) */}
          {categories.length > 1 && (
            <div className="liturgies-filter-bar" role="tablist" aria-label="تصنيفات صلوات القداسات">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`liturgies-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Liturgies Grid or Empty State */}
        {filteredLiturgies.length > 0 ? (
          <div className="liturgies-cards-grid">
            {filteredLiturgies.map((liturgy) => {
              const isToday = liturgy.dayIndex === currentDayIndex;

              return (
                <article
                  key={liturgy.id}
                  className={`liturgy-card ${isToday ? 'liturgy-card-today' : ''}`}
                >
                  {/* Header row: Day + Today Pill + Badge */}
                  <div className="liturgy-card-top">
                    <div className="liturgy-day-tag">
                      <span className="liturgy-coptic-cross" aria-hidden="true">☩</span>
                      <span className="liturgy-day-name">{liturgy.dayName}</span>
                    </div>

                    <div className="liturgy-badges-group">
                      {isToday && (
                        <span className="badge-today-pulse" title="اليوم الحالي">
                          <span className="pulse-dot"></span>
                          اليوم
                        </span>
                      )}
                      {liturgy.badge && (
                        <span className="liturgy-badge-pill">{liturgy.badge}</span>
                      )}
                    </div>
                  </div>

                  {/* Main Service Title */}
                  <h3 className="liturgy-service-name">
                    {liturgy.serviceType || liturgy.pray}
                  </h3>

                  {/* Time Badge */}
                  {liturgy.timeRange && (
                    <div className="liturgy-time-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="time-text" dir="rtl">{liturgy.timeRange}</span>
                    </div>
                  )}

                  {/* Altar / Location / Place */}
                  {liturgy.place && (
                    <div className="liturgy-altar-row">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                        <path d="M9 10a3 3 0 0 1 6 0v11H9z" />
                      </svg>
                      <span className="altar-text">{liturgy.place}</span>
                    </div>
                  )}

                  {/* Details / Description */}
                  {/* {liturgy.details && (
                    <p className="liturgy-details-text">
                      {liturgy.details}
                    </p>
                  )} */}

                  {/* Bottom decorative bar */}
                  <div className="liturgy-card-footer">
                    <span className="liturgy-communion-hint">
                      {/* ✦ التناول من الأسرار المقدسة */}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="liturgies-empty-state">
            <div className="empty-icon">☩</div>
            <h3 className="empty-title">لا توجد صلوات مسجلة في هذا القسم حالياً</h3>
            <p className="empty-text">
              {isLoading
                ? 'جارٍ تحميل مواعيد الصلوات من قاعدة البيانات...'
                : 'يتم تحديث مواعيد القداسات والصلوات الاستثنائية بانتظام عبر النظام الكنسي.'}
            </p>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                className="liturgies-filter-btn active"
                onClick={() => setSelectedCategory('all')}
                style={{ marginTop: '1.2rem', display: 'inline-block' }}
              >
                عرض جميع الصلوات
              </button>
            )}
          </div>
        )}

        {/* Instructions & Spiritual Preparation Notice */}
        <div className="liturgy-guidelines-banner">
          <div className="guidelines-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2v20M5 7h14M8 17h8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="guidelines-content">
            <h4 className="guidelines-title">إرشادات الاستعداد للتناول من الأسرار المقدسة</h4>
            <ul className="guidelines-list">
              <li>
                <strong>الصوم الانقطاعي:</strong> يبدأ الصوم الانقطاعي للكبار تسع (9) ساعات قبل موعد التناول، وللأطفال بحسب سنهم وتوجيه أب الاعتراف.
              </li>
              <li>
                <strong>سر التوبة والاعتراف:</strong> الحرص على ممارسة سر الاعتراف بانتظام والمصالحة مع الجميع ونقاوة القلب قبل التقدم للمذبح.
              </li>
              <li>
                <strong>الحضور المبكر:</strong> نرجو من الجميع الحضور مبكراً في رفع بخور باكر أو تقديم الحمل لنوال بركة الصلوات كاملة.
              </li>
              <li>
                <strong>المناسبات والأعياد الكبرى:</strong> قداسات الأعياد السيدية والمناسبات تُعلن مواعيدها الاستثنائية بانتظام عبر الموقع وبورد الإعلانات.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
