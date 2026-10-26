'use client';

import React, { useState, useRef, useEffect } from 'react';
import { formatLevelNames } from '../lib/subjects';

export default function SubjectReaderPane({
  item,
  subjectId,
  levels = [],
  items = [],
  currentIndex = -1,
  onSelectIndex,
  onOpenMobileSidebar
}) {
  const [activeTab, setActiveTab] = useState('arabic'); // 'arabic' | 'copticArabic' | 'coptic' | 'parallel'
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); // 0.9, 1, 1.2, 1.4
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  // Sync playback rate & loop when item or controls change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;
    }
  }, [item, playbackRate, isLooping]);

  // Reset tab if current tab is not valid for item
  useEffect(() => {
    if (subjectId === 'hymns') {
      if (activeTab === 'coptic' && !item?.copticContent) {
        setActiveTab('arabic');
      } else if (activeTab === 'copticArabic' && !item?.copticArabicContent) {
        setActiveTab('arabic');
      }
    }
  }, [item, subjectId, activeTab]);

  if (!item) {
    return (
      <div className="reader-pane-empty-state">
        <div className="empty-state-symbol">✦ ✠ ✦</div>
        <h3 className="empty-state-title arabic-text">اختر درساً من الفهرس</h3>
        <p className="empty-state-desc arabic-text">
          اختر أحد الدروس أو الألحان من القائمة الجانبية لبدء القراءة، الاستماع للتسجيل الصوتي، ومتابعة النصوص باللغة القبطية والمعربة.
        </p>
        {onOpenMobileSidebar && (
          <button
            type="button"
            className="btn-primary-portal open-sidebar-mobile-btn arabic-text"
            onClick={onOpenMobileSidebar}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            عرض فهرس الدروس
          </button>
        )}
      </div>
    );
  }

  const levelNames = formatLevelNames(item.ageLevel, levels);
  const hasAudio = subjectId === 'hymns' && !!item.audio;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < items.length - 1;
  const prevItem = hasPrevious ? items[currentIndex - 1] : null;
  const nextItem = hasNext ? items[currentIndex + 1] : null;

  // Copy active text content to clipboard
  const handleCopyText = () => {
    let text = '';
    if (subjectId === 'hymns') {
      if (activeTab === 'arabic') text = item.arabicContent || '';
      else if (activeTab === 'copticArabic') text = item.copticArabicContent || '';
      else if (activeTab === 'coptic') text = item.copticContent || '';
      else if (activeTab === 'parallel') {
        text = `[قبطي]:\n${item.copticContent || ''}\n\n[معرب]:\n${item.copticArabicContent || ''}\n\n[عربي]:\n${item.arabicContent || ''}`;
      }
    } else if (subjectId === 'taks') {
      text = `${item.title}\n\n${item.content || ''}${item.homework ? `\n\nالواجب:\n${item.homework}` : ''}`;
    } else {
      text = `${item.title}\n\n${item.content || ''}`;
    }

    if (navigator.clipboard && text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="reader-pane-container">
      {/* Reader Top Action Bar: Breadcrumbs & Utility Controls */}
      <div className="reader-top-bar">
        <div className="reader-top-meta">
          {onOpenMobileSidebar && (
            <button
              type="button"
              className="reader-sidebar-toggle-btn arabic-text"
              onClick={onOpenMobileSidebar}
              title="فتح قائمة الدروس"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span>الفهرس ({items.length})</span>
            </button>
          )}

          <div className="reader-breadcrumbs">
            <span className="crumb-badge subject">
              {subjectId === 'hymns' ? 'الألحان' : subjectId === 'agbya' ? 'الأجبية' : 'الطقس'}
            </span>
            {item.term !== undefined && (
              <span className="crumb-badge secondary">الترم {item.term}</span>
            )}
            {item.yearNumber !== undefined && (
              <span className="crumb-badge secondary">سنة {item.yearNumber}</span>
            )}
          </div>
        </div>

        {/* Font size adjustment & Copy tools */}
        <div className="reader-tools">
          <div className="font-size-controls" role="group" aria-label="حجم الخط">
            <button
              type="button"
              className={`font-tool-btn ${fontSizeMultiplier === 0.9 ? 'active' : ''}`}
              onClick={() => setFontSizeMultiplier(0.9)}
              title="تصغير الخط"
            >
              A-
            </button>
            <button
              type="button"
              className={`font-tool-btn ${fontSizeMultiplier === 1 ? 'active' : ''}`}
              onClick={() => setFontSizeMultiplier(1)}
              title="حجم الخط الافتراضي"
            >
              A
            </button>
            <button
              type="button"
              className={`font-tool-btn ${fontSizeMultiplier === 1.2 ? 'active' : ''}`}
              onClick={() => setFontSizeMultiplier(1.2)}
              title="تكبير الخط"
            >
              A+
            </button>
            <button
              type="button"
              className={`font-tool-btn ${fontSizeMultiplier === 1.45 ? 'active' : ''}`}
              onClick={() => setFontSizeMultiplier(1.45)}
              title="تكبير أقصى"
            >
              A++
            </button>
          </div>

          <button
            type="button"
            className={`reader-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyText}
            title="نسخ نص الدرس"
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>تم النسخ</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>نسخ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lesson Header Title & Meta */}
      <div className="reader-header-section">
        <h2 className="reader-lesson-title arabic-text">{item.title}</h2>
        {item.description && item.description.trim() && (
          <p className="reader-lesson-desc arabic-text">{item.description}</p>
        )}

        {/* Level Tags */}
        {levelNames.length > 0 && (
          <div className="reader-level-tags">
            <span className="reader-level-label">المرحلة الدراسية:</span>
            {levelNames.map((name, idx) => (
              <span key={idx} className="reader-level-chip arabic-text">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Church Audio Player (For Hymns with audio) */}
      {hasAudio && (
        <div className="reader-audio-panel">
          <div className="audio-panel-header">
            <div className="audio-panel-title">
              <span className="audio-wave-icon">♪</span>
              <span>التسجيل الصوتي للحن الكنسي</span>
            </div>

            {/* Playback rate & Loop options */}
            <div className="audio-control-pills">
              <span className="control-label">سرعة الحفظ:</span>
              <button
                type="button"
                className={`rate-pill ${playbackRate === 0.75 ? 'active' : ''}`}
                onClick={() => setPlaybackRate(0.75)}
                title="سرعة بطيئة للمبتدئين والحفظ المتأني"
              >
                0.75x
              </button>
              <button
                type="button"
                className={`rate-pill ${playbackRate === 1 ? 'active' : ''}`}
                onClick={() => setPlaybackRate(1)}
                title="السرعة العادية"
              >
                1.0x
              </button>
              <button
                type="button"
                className={`rate-pill ${playbackRate === 1.25 ? 'active' : ''}`}
                onClick={() => setPlaybackRate(1.25)}
                title="سرعة أسرع للمراجعة"
              >
                1.25x
              </button>

              <button
                type="button"
                className={`loop-toggle-btn ${isLooping ? 'active' : ''}`}
                onClick={() => setIsLooping(!isLooping)}
                title="تكرار التسجيل باستمرار أثناء الحفظ"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
                <span>تكرار</span>
              </button>
            </div>
          </div>

          <audio
            ref={audioRef}
            controls
            src={item.audio}
            className="reader-audio-element"
            key={item.id}
          >
            متصفحك لا يدعم مشغل الصوت.
          </audio>
        </div>
      )}

      {/* Subtabs for Hymns: Arabic, Coptic-Arabic, Coptic, Parallel View */}
      {subjectId === 'hymns' && (
        <div className="reader-subtabs-bar">
          <div className="reader-tabs-group">
            {item.arabicContent && (
              <button
                type="button"
                className={`reader-tab-btn ${activeTab === 'arabic' ? 'active' : ''}`}
                onClick={() => setActiveTab('arabic')}
              >
                عربي
              </button>
            )}
            {item.copticArabicContent && (
              <button
                type="button"
                className={`reader-tab-btn ${activeTab === 'copticArabic' ? 'active' : ''}`}
                onClick={() => setActiveTab('copticArabic')}
              >
                قبطي معرب
              </button>
            )}
            {item.copticContent && (
              <button
                type="button"
                className={`reader-tab-btn ${activeTab === 'coptic' ? 'active' : ''}`}
                onClick={() => setActiveTab('coptic')}
              >
                قبطي
              </button>
            )}
            {(item.copticContent || item.copticArabicContent) && item.arabicContent && (
              <button
                type="button"
                className={`reader-tab-btn parallel-btn ${activeTab === 'parallel' ? 'active' : ''}`}
                onClick={() => setActiveTab('parallel')}
                title="عرض النصوص جنباً إلى جنب للمقارنة والحفظ"
              >
                <span>عرض متوازي ⬌</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div
        className="reader-content-body"
        style={{
          fontSize: `${1.15 * fontSizeMultiplier}rem`,
          lineHeight: 1.85 + (fontSizeMultiplier - 1) * 0.3
        }}
      >
        {subjectId === 'hymns' && (
          <>
            {activeTab === 'parallel' ? (
              <div className="reader-parallel-grid">
                {item.copticContent && (
                  <div className="parallel-col coptic-col">
                    <div className="col-header">
                      <span>النص القبطي</span>
                    </div>
                    <div className="coptic-font pre-wrap" dir="ltr" lang="cop">
                      {item.copticContent}
                    </div>
                  </div>
                )}
                {item.copticArabicContent && (
                  <div className="parallel-col phonetic-col">
                    <div className="col-header">
                      <span>قبطي معرب (النطق)</span>
                    </div>
                    <div className="arabic-text pre-wrap">
                      {item.copticArabicContent}
                    </div>
                  </div>
                )}
                {item.arabicContent && (
                  <div className="parallel-col arabic-col">
                    <div className="col-header">
                      <span>المعنى والترجمة بالعربية</span>
                    </div>
                    <div className="arabic-text pre-wrap">
                      {item.arabicContent}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`single-text-display ${
                  activeTab === 'coptic' ? 'coptic-content-wrap' : 'arabic-text'
                } pre-wrap`}
              >
                {activeTab === 'arabic' && (item.arabicContent || 'لا يوجد نص عربي متاح لهذا اللحن.')}
                {activeTab === 'copticArabic' &&
                  (item.copticArabicContent || 'لا يوجد نص قبطي معرب متاح لهذا اللحن.')}
                {activeTab === 'coptic' && (
                  <div className="coptic-font" dir="ltr" lang="cop">
                    {item.copticContent || 'لا يوجد نص قبطي متاح لهذا اللحن.'}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {subjectId === 'agbya' && (
          <div className="agbya-reader-content arabic-text pre-wrap">
            {item.content || 'لا يوجد نص صلاة متاح حالياً.'}
          </div>
        )}

        {subjectId === 'taks' && (
          <div className="taks-reader-content">
            <div className="arabic-text pre-wrap taks-body-text">
              {item.content || 'لا يوجد شرح متاح لهذا الدرس الطقسي.'}
            </div>

            {item.homework && (
              <div className="reader-homework-card">
                <div className="homework-badge-bar">
                  <div className="homework-badge-title">
                    <span className="homework-icon">📝</span>
                    <span>الواجب والأسئلة التطبيقية</span>
                  </div>
                  <span className="homework-tag">مطلوب من الطالب</span>
                </div>
                <div className="homework-body-text arabic-text pre-wrap">
                  {item.homework}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reader Bottom Navigation: Previous & Next Lesson */}
      <div className="reader-navigation-footer">
        <button
          type="button"
          className="reader-nav-btn prev-btn"
          disabled={!hasPrevious}
          onClick={() => hasPrevious && onSelectIndex(currentIndex - 1)}
          title={prevItem ? `الدرس السابق: ${prevItem.title}` : 'لا يوجد درس سابق'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <div className="nav-btn-text">
            <span className="nav-label">الدرس السابق</span>
            {prevItem && <span className="nav-title arabic-text">{prevItem.title}</span>}
          </div>
        </button>

        <div className="reader-progress-indicator">
          <span>
            {currentIndex >= 0 ? currentIndex + 1 : 1} من {items.length}
          </span>
        </div>

        <button
          type="button"
          className="reader-nav-btn next-btn"
          disabled={!hasNext}
          onClick={() => hasNext && onSelectIndex(currentIndex + 1)}
          title={nextItem ? `الدرس التالي: ${nextItem.title}` : 'لا يوجد درس تالٍ'}
        >
          <div className="nav-btn-text">
            <span className="nav-label">الدرس التالي</span>
            {nextItem && <span className="nav-title arabic-text">{nextItem.title}</span>}
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
