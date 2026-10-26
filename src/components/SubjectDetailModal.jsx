'use client';

import React, { useState } from 'react';
import { formatLevelNames } from '../lib/subjects';

export default function SubjectDetailModal({ item, subjectId, levels = [], onClose }) {
  const [activeTab, setActiveTab] = useState('arabic');

  if (!item) return null;

  // Convert numeric ageLevel to Arabic level names from RTDB levelList
  const levelNames = formatLevelNames(item.ageLevel, levels);

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-subject-dialog">
        <div className="modal-header">
          <div className="subject-modal-badge-group">
            <span className="subject-chip">
              {subjectId === 'hymns' ? 'الألحان' : subjectId === 'agbya' ? 'الأجبية' : 'الطقس'}
            </span>
            {item.term !== undefined && (
              <span className="subject-chip secondary">الترم {item.term}</span>
            )}
            {item.yearNumber !== undefined && (
              <span className="subject-chip secondary">سنة {item.yearNumber}</span>
            )}
          </div>
          <button
            type="button"
            className="btn-close-modal"
            aria-label="Close dialog"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <h2 className="subject-modal-title arabic-text">{item.title}</h2>
        {item.description && item.description.trim() && (
          <p className="subject-modal-desc arabic-text">{item.description}</p>
        )}

        {/* Audio Player for Hymns if available */}
        {subjectId === 'hymns' && item.audio && (
          <div className="hymn-audio-card">
            <div className="audio-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              <span>تسجيل صوتي للحن</span>
            </div>
            <audio controls src={item.audio} className="audio-player">
              متصفحك لا يدعم تشغيل الصوت.
            </audio>
          </div>
        )}

        {/* Sub-tabs for Hymns (Arabic, Coptic-Arabic, Coptic) */}
        {subjectId === 'hymns' && (
          <div className="subject-subtabs">
            {item.arabicContent && (
              <button
                type="button"
                className={`subtab-btn ${activeTab === 'arabic' ? 'active' : ''}`}
                onClick={() => setActiveTab('arabic')}
              >
                عربي
              </button>
            )}
            {item.copticArabicContent && (
              <button
                type="button"
                className={`subtab-btn ${activeTab === 'copticArabic' ? 'active' : ''}`}
                onClick={() => setActiveTab('copticArabic')}
              >
                قبطي معرب
              </button>
            )}
            {item.copticContent && (
              <button
                type="button"
                className={`subtab-btn ${activeTab === 'coptic' ? 'active' : ''}`}
                onClick={() => setActiveTab('coptic')}
              >
                قبطي
              </button>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="subject-content-box">
          {subjectId === 'hymns' && (
            <div className={`content-text ${activeTab === 'coptic' ? 'coptic-content-wrap' : 'arabic-text'} pre-wrap`}>
              {activeTab === 'arabic' && (item.arabicContent || 'لا يوجد نص عربي متاح.')}
              {activeTab === 'copticArabic' && (item.copticArabicContent || 'لا يوجد نص قبطي معرب متاح.')}
              {activeTab === 'coptic' && (
                <div className="coptic-font" dir="ltr" lang="cop">
                  {item.copticContent || 'لا يوجد نص قبطي متاح.'}
                </div>
              )}
            </div>
          )}

          {subjectId === 'agbya' && (
            <div className="content-text arabic-text pre-wrap">
              {item.content || 'لا يوجد نص متاح.'}
            </div>
          )}

          {subjectId === 'taks' && (
            <div className="taks-content-wrapper">
              <div className="content-text arabic-text pre-wrap">
                {item.content || 'لا يوجد نص متاح.'}
              </div>
              {item.homework && (
                <div className="taks-homework-card">
                  <div className="homework-label">
                    <span>📝</span> الواجب والأسئلة
                  </div>
                  <div className="homework-body arabic-text pre-wrap">
                    {item.homework}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Metadata displaying human-friendly level names */}
        {levelNames.length > 0 && (
          <div className="modal-footer-meta">
            <div className="meta-tag">
              <span>المرحلة الدراسية:</span>
              <div className="modal-level-chips">
                {levelNames.map((name, idx) => (
                  <span key={idx} className="modal-level-badge arabic-text">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
