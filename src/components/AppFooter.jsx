'use client';

import React from 'react';
import Link from 'next/link';

const CONTACT_INFO = {
  facebookUrl: 'https://facebook.com',
  phone: '+201203251110',
  whatsapp: '+201203251110',
  address: 'كنيسة السيدة العذراء والشهيد أبانوب',
  mapsUrl: 'https://maps.app.goo.gl/KwMfsQHJx54GZ28M7',
};

export default function AppFooter() {
  return (
    <footer className="footer-panel" id="contact-section">
      <div className="footer-cross">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A45C" strokeWidth="1.8">
          <path d="M12 2v20M5 7h14M8 17h8" strokeLinecap="round" />
        </svg>
      </div>
      <p className="footer-church-title">كنيسة السيدة العذراء مريم والشهيد أبانوب</p>
      <p className="footer-desc">مدرسة ثيؤطوكوس للألحان &bull; المناهج والأنشطة الروحية المقررة</p>

      {/* Quick Page Links */}
      <div className="footer-nav-links" style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', margin: '1.2rem 0', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: 'var(--church-gold-light)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>الرئيسية</Link>
        <span style={{ color: 'rgba(201,164,92,0.4)' }}>•</span>
        <Link href="/hymns-school" style={{ color: 'var(--church-gold-light)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>مدرسة الألحان</Link>
        <span style={{ color: 'rgba(201,164,92,0.4)' }}>•</span>
        <Link href="/liturgies" style={{ color: 'var(--church-gold-light)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>مواعيد القداسات</Link>
        <span style={{ color: 'rgba(201,164,92,0.4)' }}>•</span>
        <Link href="/about-us" style={{ color: 'var(--church-gold-light)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>عن الكنيسة</Link>
      </div>

      {/* Contact Details */}
      <div className="footer-contact">
        <h2 className="footer-contact-title">تواصل معنا</h2>
        <ul className="footer-contact-list">
          <li>
            <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="footer-contact-item" id="footer-contact-phone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span dir="ltr">{CONTACT_INFO.phone}</span>
            </a>
          </li>
          <li>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="footer-contact-item" id="footer-contact-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.46 9.48-9.46a9.4 9.4 0 0 1 6.7 2.78 9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.52A11.32 11.32 0 0 0 12.04.66C5.76.66.65 5.77.65 12.04c0 2 .52 3.96 1.52 5.69L.55 23.66l6.08-1.6a11.36 11.36 0 0 0 5.4 1.38h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
              </svg>
              <span>واتساب</span>
            </a>
          </li>
          <li>
            <a href={CONTACT_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-item" id="footer-contact-address">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{CONTACT_INFO.address}</span>
            </a>
          </li>
        </ul>

        <div className="footer-social">
          <a
            href={CONTACT_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn footer-social-facebook"
            id="footer-facebook-link"
            aria-label="صفحتنا على فيسبوك"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
            </svg>
            <span>تابعنا على فيسبوك</span>
          </a>
        </div>
      </div>

      <div className="footer-divider-ornament">
        <span></span>
        <span className="dot">✦</span>
        <span></span>
      </div>
      <p className="footer-copyright">&copy; {new Date().getFullYear()} Coptic Orthodox Curriculum Portal</p>
    </footer>
  );
}
