'use client';

import React from 'react';
import { useAppConfig } from './AppConfigProvider';

// Arabic translations for subjects in degree records
const SUBJECT_LABELS = {
  hymns: 'الألحان',
  coptic: 'اللغة القبطية',
  agbya: 'الأجبية',
  taks: 'الطقس',
  attencance: 'نسبة الحضور',
  attendance: 'نسبة الحضور',
  total: 'المجموع الكلي'
};

const TERM_LABELS = {
  firstTerm: 'الترم الأول (Term 1)',
  secondTerm: 'الترم الثاني (Term 2)',
  thirdTerm: 'الترم الثالث (Term 3)'
};

export default function ProfileView({
  user,
  profileData,
  accountCode,
  dbStatus,
  onRefresh,
  onSignOut,
}) {
  const displayName = profileData?.fullName || user?.displayName || `كود: #${accountCode}`;
  const initial = displayName.trim().charAt(0).toUpperCase();
  const isActive = profileData?.active === true;

  const { config } = useAppConfig();
  const termByProfileKey = Object.fromEntries(config.terms.map((t) => [t.profileKey, t]));

  // Max degree for a stat key (handles the legacy "attencance" typo and the overall total)
  const getMaxDegree = (statKey) => {
    const key = statKey.toLowerCase() === 'attencance' ? 'attendance' : statKey.toLowerCase();
    if (key === 'total') return config.totalDegrees || null;
    return config.degrees[key] ?? null;
  };

  // Mask phone number for privacy: e.g. 01202474117 -> 0120***4117
  const maskPhone = (phone) => {
    if (!phone) return null;
    const str = String(phone).trim();
    if (str.length <= 6) return str;
    return `${str.slice(0, 4)}***${str.slice(-4)}`;
  };

  return (
    <section className="profile-pro-container" aria-labelledby="user-profile-title">
      {/* 1. Header Profile Identity Banner */}
      <div className="profile-id-card">
        <div className="profile-id-left">
          <div className="profile-pro-avatar">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile Avatar"
                className="profile-avatar-img"
              />
            ) : (
              <span>{initial}</span>
            )}
            <span className={`status-badge-circle ${isActive ? 'active' : 'inactive'}`}></span>
          </div>

          <div className="profile-id-text">
            <h2 className="profile-pro-name arabic-text" id="user-profile-title">
              {displayName}
            </h2>
            <div className="profile-meta-badges">
              <span className="code-chip">#{profileData?.code || accountCode}</span>
              {profileData?.level && (
                <span className="level-chip">{profileData.level}</span>
              )}
              <span className={`membership-chip ${isActive ? 'active' : 'inactive'}`}>
                {isActive ? 'عضو نشط (Active)' : 'غير نشط (Inactive)'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-id-right">
          <button
            type="button"
            className="btn-pro-refresh"
            onClick={onRefresh}
            title="تحديث البيانات"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>تحديث</span>
          </button>
        </div>
      </div>

      {/* 2. Church & Personal Information Card */}
      <div className="profile-section-card">
        <div className="section-card-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>البيانات الكنسية والشخصية</span>
        </div>

        <div className="pro-field-grid">
          <div className="pro-field-item">
            <span className="pro-field-label">الكنيسة</span>
            <span className="pro-field-val highlight arabic-text">
              {profileData?.church || 'كنيسة السيدة العذراء والشهيد أبانوب'}
            </span>
          </div>

          <div className="pro-field-item">
            <span className="pro-field-label">المستوى الدراسي / المرحلة</span>
            <span className="pro-field-val">
              {profileData?.level || 'KG2'}
            </span>
          </div>

          {profileData?.gender && (
            <div className="pro-field-item">
              <span className="pro-field-label">النوع</span>
              <span className="pro-field-val">
                {profileData.gender === 'Female' ? 'أنثى' : profileData.gender === 'Male' ? 'ذكر' : profileData.gender}
              </span>
            </div>
          )}

          {profileData?.birthdate && (
            <div className="pro-field-item">
              <span className="pro-field-label">تاريخ الميلاد</span>
              <span className="pro-field-val">{profileData.birthdate}</span>
            </div>
          )}

          {profileData?.phoneNumber && (
            <div className="pro-field-item">
              <span className="pro-field-label">رقم الهاتف</span>
              <span className="pro-field-val font-mono">
                {maskPhone(profileData.phoneNumber)}
              </span>
            </div>
          )}

          {profileData?.address && profileData.address !== 'None' && profileData.address.trim() && (
            <div className="pro-field-item">
              <span className="pro-field-label">العنوان</span>
              <span className="pro-field-val arabic-text">{profileData.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Academic Degrees & Attendance Progress */}
      {profileData?.degree && typeof profileData.degree === 'object' && (
        <div className="profile-section-card">
          <div className="section-card-title">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <span>درجات المواد الكنسية ونسب الحضور</span>
          </div>

          <div className="terms-progress-grid">
            {Object.entries(profileData.degree).map(([termKey, termData]) => {
              const termConfig = termByProfileKey[termKey];
              const termLabel = termConfig?.label || TERM_LABELS[termKey] || termKey;
              return (
                <div key={termKey} className={`term-progress-card ${termConfig?.isCurrent ? 'is-current' : ''}`}>
                  <div className="term-card-header">
                    <span className="term-title-text arabic-text">{termLabel}</span>
                    {termConfig?.isCurrent && <span className="term-current-tag">الترم الحالي</span>}
                  </div>

                  <div className="term-stats-list">
                    {termData && typeof termData === 'object' ? (
                      Object.entries(termData).map(([statKey, statVal]) => {
                        const label = SUBJECT_LABELS[statKey.toLowerCase()] || statKey;
                        const isTotal = statKey.toLowerCase() === 'total';
                        const maxDegree = getMaxDegree(statKey);
                        const score = Number(statVal);
                        const percent =
                          maxDegree && Number.isFinite(score)
                            ? Math.max(0, Math.min(100, Math.round((score / maxDegree) * 100)))
                            : null;
                        return (
                          <div
                            key={statKey}
                            className={`term-stat-row ${isTotal ? 'total-row' : ''}`}
                          >
                            <span className="stat-row-name arabic-text">{label}</span>
                            <span className="stat-row-badge" dir="ltr">
                              {String(statVal)}
                              {maxDegree ? <span className="stat-row-max"> / {maxDegree}</span> : null}
                            </span>
                            {percent !== null && (
                              <span className="stat-row-bar" aria-hidden="true">
                                <span style={{ width: `${percent}%` }} />
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <span className="no-records-msg">لا توجد درجات مسجلة</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Safe Session Footer & Logout Action */}
      <div className="profile-footer-bar">
        <div className="session-status-tag">
          <span className="green-indicator-dot"></span>
          <span>جلسة آمنة نشطة</span>
        </div>

        <button
          type="button"
          className="btn-pro-signout"
          id="btn-sign-out"
          onClick={onSignOut}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </section>
  );
}
