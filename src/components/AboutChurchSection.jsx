'use client';

import React from 'react';

const CONTACT_INFO = {
  phone: '+201203251110',
  whatsapp: '+201203251110',
  address: 'كنيسة السيدة العذراء والشهيد أبانوب',
  mapsUrl: 'https://maps.app.goo.gl/KwMfsQHJx54GZ28M7',
  facebookUrl: '#'
};

export default function AboutChurchSection() {
  return (
    <section className="about-church-section" id="about-us" aria-labelledby="about-church-heading">
      <div className="about-church-container">
        {/* Header */}
        <div className="about-church-header">
          <div className="portal-badge-pill">
            <span className="gold-ornament-dot">✦</span>
            <span>بيتنا الروحي وكنيستنا الأرثوذكسية</span>
            <span className="gold-ornament-dot">✦</span>
          </div>

          <h2 className="about-church-title" id="about-church-heading">
            كنيسة السيدة العذراء مريم والشهيد أبانوب
          </h2>

          <p className="about-church-lead">
            كنيسة قبطية أرثوذكسية حية، تنبض بالصلاة والتسبيح والخدمة، وتفتح أبوابها لجميع أبناء الكنيسة لنوال بركة الأسرار المقدسة والنمو في حياة التلمذة للمسيح.
          </p>
        </div>

        {/* Patrons Feature Cards */}
        <div className="patrons-grid">
          <article className="patron-card patron-mary">
            <div className="patron-badge">شفيعة الكنيسة</div>
            <div className="patron-icon-box" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L15 9H22L16.5 13.5L18.5 20.5L12 16L5.5 20.5L7.5 13.5L2 9H9L12 2Z" />
              </svg>
            </div>
            <h3 className="patron-name">أم النور القديسة مريم</h3>
            <p className="patron-desc">
              والدة الإله الشفيعة المؤتمنة، التي نتعلّم من طهارتها وخضوعها وتسليمها لمشيئة الله، وتفيض بركتها على كل ركن في كنيستنا.
            </p>
          </article>

          <article className="patron-card patron-abanoub">
            <div className="patron-badge">شفيع الكنيسة</div>
            <div className="patron-icon-box" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M5 7h14M8 17h8" strokeLinecap="round" />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <h3 className="patron-name">الشهيد العظيم أبانوب النهيسي</h3>
            <p className="patron-desc">
              شفيع الأطفال والفتيان، بطل الإيمان الذي شهد للمسيح بشجاعة نادرة في سن الثانية عشرة، ورمز للشجاعة الروحية والثبات.
            </p>
          </article>
        </div>

        {/* Church Pillars Grid: Mission, History, Ministries */}
        <div className="church-info-grid">
          <div className="info-block-card">
            <div className="info-block-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h4 className="info-block-title">رسالتنا الروحية</h4>
            <p className="info-block-text">
              بناء جيل مسيحي أرثوذكسي راسخ في الإيمان القويم، يعيش كلمة الإنجيل، يشترك في الأسرار الكنسية، ويخدم المجتمع بروح المحبة والاتضاع.
            </p>
          </div>

          <div className="info-block-card">
            <div className="info-block-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 className="info-block-title">آباء الكنيسة وخدامها</h4>
            <p className="info-block-text">
              آباء كهنة مكرسون لرعاية النفوس وسر الاعتراف والتوجيه الروحي، برفقة مئات الخدام والخادمات في كافة قطاعات التربية الكنسية.
            </p>
          </div>

          <div className="info-block-card">
            <div className="info-block-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h4 className="info-block-title">مدرسة ثيؤطوكوس للألحان</h4>
            <p className="info-block-text">
              الذراع التعليمي والطقسي للكنيسة، المعني بتسليم وحفظ التراث اللحني القبطي الأصيل وصلوات الأجبية والطقوس لمختلف المراحل العمرية.
            </p>
          </div>

          <div className="info-block-card">
            <div className="info-block-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h4 className="info-block-title">الخدمات الرعوية والاجتماعية</h4>
            <p className="info-block-text">
              خدمة إخوة الرب ورعاية المرضى والمسنين، قوافل الرعاية الطبية، الأنشطة الكشفية الصيفية، واجتماعات إعداد الخدام وتأهيل الشباب.
            </p>
          </div>
        </div>

        {/* Church Location & Visiting Info Box */}
        <div className="church-location-box">
          <div className="church-location-details">
            <span className="location-tag">موقع ومقر الكنيسة</span>
            <h3 className="location-name">كنيسة السيدة العذراء مريم والشهيد أبانوب</h3>
            <p className="location-address">
              نرحب بزيارتكم في أي وقت لنوال بركة الكنيسة وحضور القداسات الإلهية وممارسة الأسرار الكنسية.
            </p>

            <div className="location-actions">
              <a
                href={CONTACT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-map-action"
                id="btn-open-maps"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>فتح الموقع على خرائط Google Maps</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="btn-church-call"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span dir="ltr">{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
