'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import {
  gregorianToCoptic,
  weekdayOf,
  WEEKDAYS_AR,
  GREGORIAN_MONTHS_AR,
  toArabicNumber
} from '../lib/coptic-calendar';

function useCurrentDateTime() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    // Set immediate time on client mount
    setNow(new Date());

    // Update every second to keep the clock live
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();
  const coptic = gregorianToCoptic(year, month, day);

  const weekdayName = WEEKDAYS_AR[weekdayOf(year, month, day)];
  const gregMonthName = GREGORIAN_MONTHS_AR[month - 1];
  const gregDayNum = toArabicNumber(day);
  const gregYearNum = toArabicNumber(year);

  const copticDayNum = toArabicNumber(coptic.day);
  const copticMonthName = coptic.monthName;
  const copticYearNum = toArabicNumber(coptic.year);

  const rawHours = now.getHours();
  const hours = rawHours % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = rawHours >= 12 ? 'م' : 'ص';
  const timeFormatted = `${toArabicNumber(hours)}:${toArabicNumber(minutes)} ${period}`;

  return {
    weekdayName,
    gregDayNum,
    gregMonthName,
    gregYearNum,
    copticDayNum,
    copticMonthName,
    copticYearNum,
    timeFormatted
  };
}

function NavDateTimeBadge() {
  const dt = useCurrentDateTime();

  if (!dt) {
    return (
      <div className="nav-datetime-skeleton" aria-hidden="true">
        <span className="datetime-skel-icon" />
        <div className="datetime-skel-lines">
          <span className="datetime-skel-line" style={{ width: '92px' }} />
          <span className="datetime-skel-line" style={{ width: '68px' }} />
        </div>
      </div>
    );
  }

  const {
    weekdayName,
    gregDayNum,
    gregMonthName,
    copticDayNum,
    copticMonthName,
    copticYearNum,
    timeFormatted
  } = dt;

  return (
    <Link
      href="/calendar"
      className="nav-datetime-badge"
      title="عرض التقويم القبطي والميلادي وقراءات اليوم"
      aria-label={`التقويم: ${weekdayName} ${gregDayNum} ${gregMonthName}، الموافق ${copticDayNum} ${copticMonthName} ${copticYearNum} ش، الساعة ${timeFormatted}`}
    >
      <div className="datetime-icon-box" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      <div className="datetime-info-block">
        <div className="datetime-primary-row">
          <span className="datetime-weekday">{weekdayName}</span>
          <span className="datetime-greg-date">{gregDayNum} {gregMonthName}</span>
          <span className="datetime-bullet" aria-hidden="true">•</span>
          <span className="datetime-time-val">{timeFormatted}</span>
        </div>
        <div className="datetime-coptic-row">
          <span className="coptic-cross-glyph" aria-hidden="true">☩</span>
          <span className="datetime-coptic-date">{copticDayNum} {copticMonthName} {copticYearNum} ش</span>
        </div>
      </div>
    </Link>
  );
}

function MobileNavDateTimeCard() {
  const dt = useCurrentDateTime();
  if (!dt) return null;

  const {
    weekdayName,
    gregDayNum,
    gregMonthName,
    gregYearNum,
    copticDayNum,
    copticMonthName,
    copticYearNum,
    timeFormatted
  } = dt;

  return (
    <Link
      href="/calendar"
      className="mobile-nav-datetime-card"
      title="الانتقال إلى صفحة التقويم والقراءات"
    >
      <div className="mobile-datetime-top">
        <div className="mobile-datetime-clock">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="mobile-time-text">{timeFormatted}</span>
        </div>
        <span className="mobile-coptic-tag">
          ☩ {copticDayNum} {copticMonthName} {copticYearNum} ش
        </span>
      </div>
      <div className="mobile-greg-text">
        {weekdayName} {gregDayNum} {gregMonthName} {gregYearNum}
      </div>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, displayName, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on pathname change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    {
      id: 'home',
      href: '/',
      labelAr: 'الرئيسية',
      labelEn: 'Home',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      description: 'معلومات الكنيسة والخدمات'
    },
    {
      id: 'hymns-school',
      href: '/hymns-school',
      labelAr: 'مدرسة الألحان',
      labelEn: 'Hymns School',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
      description: 'المناهج والمحتوى التعليمي'
    },
    {
      id: 'liturgies',
      href: '/liturgies',
      labelAr: 'مواعيد القداسات',
      labelEn: 'Liturgies',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M5 7h14M8 17h8" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        </svg>
      ),
      description: 'جدول القداسات الأسبوعي'
    },
    // {
    //   id: 'calendar',
    //   href: '/calendar',
    //   labelAr: 'التقويم والقراءات',
    //   labelEn: 'Calendar',
    //   icon: (
    //     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    //       <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    //       <line x1="16" y1="2" x2="16" y2="6" />
    //       <line x1="8" y1="2" x2="8" y2="6" />
    //       <line x1="3" y1="10" x2="21" y2="10" />
    //     </svg>
    //   ),
    //   description: 'التقويم القبطي وقراءات اليوم'
    // },
    {
      id: 'about-us',
      href: '/about-us',
      labelAr: 'عن الكنيسة',
      labelEn: 'About Us',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      description: 'تاريخ الكنيسة ورعايتها'
    }
  ];

  return (
    <header className={`top-nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="top-nav-inner">
        {/* Brand / Logo Section */}
        <Link
          href="/"
          className="brand"
          aria-label="كنيسة السيدة العذراء والشهيد أبانوب"
        >
          <div className="brand-logo-container">
            <img
              src="/logo_icon.jpg"
              alt="شعار الكنيسة"
              className="brand-logo-img"
              width={44}
              height={44}
            />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">كنيسة السيدة العذراء مريم</span>
            <span className="brand-sub">و الشهيد أبانوب النهيسى</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-menu" aria-label="القائمة الرئيسية">
          <ul className="nav-menu-list">
            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.id} className="nav-menu-item">
                  <Link
                    href={item.href}
                    className={`nav-menu-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    title={`${item.labelAr} - ${item.description}`}
                  >
                    <span className="nav-link-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="nav-link-text">{item.labelAr}</span>
                    {isActive && <span className="nav-link-indicator" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions (DateTime Widget, User Account & Mobile Toggle) */}
        <div className="nav-actions">
          {/* Gregorian & Coptic Live DateTime Badge */}
          <NavDateTimeBadge />

          {/* User Account Button */}
          <button
            type="button"
            className="btn-profile-toggle"
            id="btn-user-profile-toggle"
            onClick={openAuthModal}
            aria-label={user ? 'فتح الحساب الشخصي' : 'تسجيل الدخول / الحساب'}
          >
            <div className="btn-profile-avatar">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : user ? (
                displayName.charAt(0).toUpperCase()
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <span className="btn-profile-name">
              {user ? displayName : 'تسجيل الدخول'}
            </span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className={`btn-mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
        <div className="mobile-nav-content" role="dialog" aria-modal="true" aria-label="قائمة الملاحة للجوال">
          <div className="mobile-nav-header">
            <div className="mobile-brand-title">
              <span>أقسام الموقع والخدمات</span>
            </div>
            <button
              type="button"
              className="btn-close-mobile-nav"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Live Mobile DateTime Card */}
          <MobileNavDateTimeCard />

          <nav className="mobile-nav-menu" aria-label="قائمة الجوال">
            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

                return (
                  <li key={item.id} className="mobile-nav-item">
                    <Link
                      href={item.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="mobile-nav-icon" aria-hidden="true">
                        {item.icon}
                      </div>
                      <div className="mobile-nav-text-group">
                        <span className="mobile-nav-label">{item.labelAr}</span>
                        <span className="mobile-nav-desc">{item.description}</span>
                      </div>
                      <svg className="mobile-nav-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-nav-footer">
            <p className="mobile-church-label">كنيسة السيدة العذراء والشهيد أبانوب</p>
            <p className="mobile-school-label">مدرسة ثيؤطوكوس للألحان القبطية</p>
          </div>
        </div>
      </div>
    </header>
  );
}
