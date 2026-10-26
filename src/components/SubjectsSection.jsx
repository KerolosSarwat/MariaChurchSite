'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getSubjectItems, formatLevelNames } from '../lib/subjects';
import { SUBJECT_DEGREE_LABELS } from '../lib/appConfig';
import { useAppConfig } from './AppConfigProvider';
import SubjectDetailModal from './SubjectDetailModal';
import SubjectReaderPane from './SubjectReaderPane';

const formatDate = (date) =>
  date ? date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

const SUBJECTS_CONFIG = [
  {
    id: 'hymns',
    title: 'الألحان',
    titleEn: 'Hymns',
    badge: 'Liturgical Chants',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    ),
    description: 'الألحان القبطية الكنسية مع النصوص باللغة القبطية والمعربة والتسجيلات الصوتية مع خيارات تكرار الأرباع وسرعة الحفظ.'
  },
  {
    id: 'agbya',
    title: 'الأجبية',
    titleEn: 'Agbya',
    badge: 'Book of Hours',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    description: 'صلوات السواعي والمزامير والقطع الإنجيلية المقررة لمختلف المراحل الدراسية.'
  },
  {
    id: 'taks',
    title: 'الطقس',
    titleEn: 'Taks',
    badge: 'Church Rites',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    description: 'الطقوس الكنسية، أشكال ومباني الكنيسة، الأواشي، والواجبات التعليمية التطبيقية.'
  }
];

export default function SubjectsSection({ user = null }) {
  const { config, status: configStatus } = useAppConfig();
  const levels = config.levelList;

  const [activeSubject, setActiveSubject] = useState('hymns');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedLevelId, setSelectedLevelId] = useState('all');
  const [viewMode, setViewMode] = useState('split'); // 'split' (Master-Detail Portal) | 'grid'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // For modal popup in 'grid' mode only
  const [modalItem, setModalItem] = useState(null);

  const effectiveYear = selectedYear ?? (user ? String(config.currentYear) : 'all');
  const effectiveTerm = selectedTerm ?? (user ? String(config.currentTerm) : 'all');
  const currentTermInfo = config.terms.find((t) => t.isCurrent);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedYear(null);
    setSelectedTerm(null);
    setSelectedLevelId('all');
  };

  // 2. Fetch subject items whenever activeSubject changes
  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      setLoading(true);
      try {
        const data = await getSubjectItems(activeSubject, 70);
        if (!isCancelled) {
          setItems(data);
        }
      } catch (err) {
        console.error('Failed to load items:', err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    loadData();
    return () => {
      isCancelled = true;
    };
  }, [activeSubject]);

  // Year options: years present in the data plus the configured current year
  const yearOptions = useMemo(() => {
    const years = new Set([Number(config.currentYear)]);
    items.forEach((item) => {
      const y = Number(item.yearNumber);
      if (item.yearNumber !== undefined && item.yearNumber !== null && Number.isFinite(y)) years.add(y);
    });
    return [...years].sort((a, b) => a - b);
  }, [items, config.currentYear]);

  // 3. Filter items by Search, Year, Term, and Level
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.arabicContent && item.arabicContent.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.copticArabicContent && item.copticArabicContent.toLowerCase().includes(searchQuery.toLowerCase()));

      const hasYear = item.yearNumber !== undefined && item.yearNumber !== null && item.yearNumber !== '';
      const matchesYear = effectiveYear === 'all' || !hasYear || String(item.yearNumber) === effectiveYear;

      const hasTerm = item.term !== undefined && item.term !== null && item.term !== '';
      const matchesTerm = effectiveTerm === 'all' || !hasTerm || String(item.term) === effectiveTerm;

      let matchesLevel = true;
      if (selectedLevelId !== 'all') {
        const targetId = Number(selectedLevelId);
        if (Array.isArray(item.ageLevel)) {
          matchesLevel = item.ageLevel.map(Number).includes(targetId);
        } else if (item.ageLevel !== undefined && item.ageLevel !== null) {
          matchesLevel = Number(item.ageLevel) === targetId;
        } else {
          matchesLevel = false;
        }
      }

      return matchesSearch && matchesYear && matchesTerm && matchesLevel;
    });
  }, [items, searchQuery, effectiveYear, effectiveTerm, selectedLevelId]);

  // Auto-select first item when filtered items change if current selection is invalid
  useEffect(() => {
    if (filteredItems.length > 0) {
      setSelectedItem((prev) => {
        if (prev && filteredItems.some((it) => it.id === prev.id)) {
          return prev;
        }
        return filteredItems[0];
      });
    } else {
      setSelectedItem(null);
    }
  }, [filteredItems]);

  const currentIndex = selectedItem
    ? filteredItems.findIndex((it) => it.id === selectedItem.id)
    : -1;

  const handleSelectIndex = (idx) => {
    if (idx >= 0 && idx < filteredItems.length) {
      setSelectedItem(filteredItems[idx]);
    }
  };

  const currentConfig = SUBJECTS_CONFIG.find((s) => s.id === activeSubject);
  const activeSubjectDegree = config.degrees[activeSubject];

  return (
    <section className="subjects-section" aria-label="Church Subjects Curriculum">
      {/* Academic overview driven by RTDB /config - displayed ONLY if a user is logged in */}
      {user && (
        <div
          className={`academic-overview ${configStatus === 'loading' ? 'is-loading' : ''}`}
          aria-label="العام الدراسي الحالي"
        >
          <div className="academic-overview-stats">
            {config.academicYear && (
              <div className="academic-stat">
                <span className="academic-stat-label">العام الدراسي</span>
                <span className="academic-stat-value" dir="ltr">
                  {config.academicYear}
                </span>
              </div>
            )}
            <div className="academic-stat">
              <span className="academic-stat-label">سنة المنهج الحالية</span>
              <span className="academic-stat-value">السنة {config.currentYear}</span>
            </div>
            {currentTermInfo && (
              <div className="academic-stat">
                <span className="academic-stat-label">الترم الحالي</span>
                <span className="academic-stat-value">{currentTermInfo.label}</span>
                {currentTermInfo.startDate && currentTermInfo.endDate && (
                  <span className="academic-stat-meta">
                    {formatDate(currentTermInfo.startDate)} – {formatDate(currentTermInfo.endDate)}
                  </span>
                )}
              </div>
            )}
            {currentTermInfo?.weekCount ? (
              <div className="academic-stat academic-stat-progress">
                <span className="academic-stat-label">
                  {currentTermInfo.currentWeek
                    ? `الأسبوع ${currentTermInfo.currentWeek} من ${currentTermInfo.weekCount}`
                    : `${currentTermInfo.weekCount} أسبوع`}
                </span>
                <div
                  className="week-progress-track"
                  role="progressbar"
                  aria-label="تقدم الترم"
                  aria-valuemin={0}
                  aria-valuemax={currentTermInfo.weekCount}
                  aria-valuenow={currentTermInfo.currentWeek || 0}
                >
                  <span
                    className="week-progress-fill"
                    style={{
                      width: `${Math.round(
                        ((currentTermInfo.currentWeek || 0) / currentTermInfo.weekCount) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>

          {Object.keys(config.degrees).length > 0 && (
            <div className="degree-distribution">
              <span className="degree-distribution-title">توزيع الدرجات</span>
              <div className="degree-chips">
                {Object.entries(config.degrees).map(([key, value]) => (
                  <span key={key} className={`degree-chip ${key === activeSubject ? 'active' : ''}`}>
                    {SUBJECT_DEGREE_LABELS[key] || key}
                    <strong>{value}</strong>
                  </span>
                ))}
                <span className="degree-chip total">
                  المجموع
                  <strong>{config.totalDegrees}</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subjects Category Tabs */}
      <div className="subjects-nav-container">
        <div className="subjects-nav">
          {SUBJECTS_CONFIG.map((subj) => {
            const isActive = activeSubject === subj.id;
            return (
              <button
                key={subj.id}
                type="button"
                className={`subject-tab ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveSubject(subj.id);
                  resetFilters();
                }}
              >
                <span className="subject-tab-icon">{subj.icon}</span>
                <div className="subject-tab-text">
                  <span className="subject-tab-title arabic-text">{subj.title}</span>
                </div>
                {user && config.degrees[subj.id] !== undefined && (
                  <span className="subject-tab-degree" title="الدرجة النهائية">
                    {config.degrees[subj.id]} درجة
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Subject Banner, Global Filters & View Switcher */}
      <div className="subject-toolbar">
        <div className="subject-info">
          <div className="subject-heading-row">
            <h2 className="subject-heading arabic-text">
              {currentConfig?.title}
              {user && activeSubjectDegree !== undefined && (
                <span className="subject-degree-pill">الدرجة النهائية: {activeSubjectDegree}</span>
              )}
            </h2>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle" role="group" aria-label="طريقة العرض">
              <button
                type="button"
                className={`view-mode-btn ${viewMode === 'split' ? 'active' : ''}`}
                onClick={() => setViewMode('split')}
                title="عرض التعلم المتكامل بدون نوافذ منبثقة"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg>
                <span>العرض المتكامل</span>
              </button>
              <button
                type="button"
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="عرض شبكة البطاقات التقليدية"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>شبكة البطاقات</span>
              </button>
            </div>
          </div>

          <p className="subject-desc arabic-text">{currentConfig?.description}</p>
        </div>

        {/* Global Toolbar Filters */}
        <div className="subject-filters">
          {/* Level Filter Dropdown (Loaded from RTDB levelList) */}
          <div className="filter-select-wrapper">
            <select
              className="filter-select arabic-text"
              value={selectedLevelId}
              onChange={(e) => setSelectedLevelId(e.target.value)}
              aria-label="تصفية حسب المرحلة الدراسية"
            >
              <option value="all">كل المراحل الدراسية (All Levels)</option>
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.arName?.trim()} ({lvl.engName})
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="filter-select-wrapper">
            <select
              className="filter-select arabic-text"
              id="filter-year-select"
              value={effectiveYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="تصفية حسب سنة المنهج"
            >
              <option value="all">كل السنوات</option>
              {yearOptions.map((y) => (
                <option key={y} value={String(y)}>
                  السنة {y}
                  {user && y === Number(config.currentYear) ? ' (الحالية)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Term Filter Chips */}
          <div className="term-filter-group" role="group" aria-label="تصفية حسب الترم">
            <button
              type="button"
              id="term-chip-all"
              className={`term-chip ${effectiveTerm === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTerm('all')}
            >
              كل الترمات
            </button>
            {config.terms.map((term) => (
              <button
                key={term.number}
                type="button"
                id={`term-chip-${term.number}`}
                className={`term-chip ${effectiveTerm === String(term.number) ? 'active' : ''}`}
                onClick={() => setSelectedTerm(String(term.number))}
                title={
                  user && term.startDate && term.endDate
                    ? `${formatDate(term.startDate)} – ${formatDate(term.endDate)}`
                    : undefined
                }
              >
                {term.label}
                {user && term.isCurrent && (
                  <span className="term-chip-current-dot" aria-label="الترم الحالي" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area based on View Mode */}
      {loading ? (
        <div className="subjects-loading-state">
          <span className="btn-spinner"></span>
          <p className="arabic-text">جاري تحميل المحتوى الدراسي ومناهج مدرسة الألحان...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="subjects-empty-state">
          <p className="arabic-text">
            لا توجد عناصر مطابقة لبحثك في قسم &quot;{currentConfig?.title}&quot;.
          </p>
          {(effectiveYear !== 'all' || effectiveTerm !== 'all' || selectedLevelId !== 'all' || searchQuery) && (
            <button
              type="button"
              className="btn-primary-portal"
              id="btn-show-all-years-terms"
              onClick={resetFilters}
            >
              إعادة ضبط الفلاتر وعرض الكل
            </button>
          )}
        </div>
      ) : viewMode === 'split' ? (
        /* OPTION 1: Master-Detail Split Layout */
        <div className={`subjects-portal-split-layout ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
          {/* Mobile backdrop for drawer */}
          {mobileSidebarOpen && (
            <div
              className="portal-sidebar-backdrop"
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Sidebar Navigation Pane (Right side in RTL) */}
          <aside className={`curriculum-sidebar-pane ${mobileSidebarOpen ? 'drawer-open' : ''}`}>
            <div className="sidebar-header-bar">
              <div className="sidebar-title-group">
                <span className="sidebar-icon">📖</span>
                <h3 className="sidebar-heading arabic-text">فهرس المحتوى</h3>
                <span className="sidebar-count-chip">{filteredItems.length} درس</span>
              </div>

              {/* Mobile Close Button */}
              <button
                type="button"
                className="sidebar-close-btn"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="إغلاق الفهرس"
              >
                &times;
              </button>
            </div>

            {/* Quick Search within the curriculum list */}
            <div className="sidebar-search-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="بحث في الدروس أو النصوص..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="مسح البحث"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Items Navigation List */}
            <div className="curriculum-items-list" role="list">
              {filteredItems.map((item, idx) => {
                const isSelected = selectedItem?.id === item.id;
                const hasAudio = activeSubject === 'hymns' && !!item.audio;
                const itemLevelNames = formatLevelNames(item.ageLevel, levels);

                return (
                  <div
                    key={item.id}
                    role="listitem"
                    className={`curriculum-list-item ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedItem(item);
                      setMobileSidebarOpen(false);
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSelectedItem(item);
                        setMobileSidebarOpen(false);
                      }
                    }}
                  >
                    <div className="list-item-index-badge">
                      {idx + 1}
                    </div>

                    <div className="list-item-content">
                      <div className="list-item-title-row">
                        <span className="list-item-title arabic-text">{item.title}</span>
                        {hasAudio && (
                          <span className="audio-mini-indicator" title="يحتوي على تسجيل صوتي">
                            ♪
                          </span>
                        )}
                      </div>

                      <div className="list-item-meta-chips">
                        {item.term !== undefined && (
                          <span className="mini-chip term">ترم {item.term}</span>
                        )}
                        {item.yearNumber !== undefined && (
                          <span className="mini-chip year">سنة {item.yearNumber}</span>
                        )}
                        {itemLevelNames[0] && (
                          <span className="mini-chip level arabic-text">{itemLevelNames[0]}</span>
                        )}
                      </div>
                    </div>

                    <div className="list-item-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main Reader Pane (Left side in RTL) */}
          <main className="curriculum-reader-area">
            <SubjectReaderPane
              item={selectedItem}
              subjectId={activeSubject}
              levels={levels}
              items={filteredItems}
              currentIndex={currentIndex}
              onSelectIndex={handleSelectIndex}
              onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            />
          </main>
        </div>
      ) : (
        /* Traditional Grid of Cards */
        <div className="subjects-cards-grid">
          {filteredItems.map((item) => {
            const hasAudio = activeSubject === 'hymns' && !!item.audio;
            const previewText =
              item.content ||
              item.arabicContent ||
              item.copticArabicContent ||
              item.description ||
              '';

            const itemLevelNames = formatLevelNames(item.ageLevel, levels);

            return (
              <div
                key={item.id}
                className="subject-card"
                onClick={() => setModalItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setModalItem(item);
                }}
              >
                <div className="subject-card-header">
                  <div className="subject-card-badges">
                    {item.term !== undefined && (
                      <span className="card-badge term-badge">الترم {item.term}</span>
                    )}
                    {item.yearNumber !== undefined && (
                      <span className="card-badge year-badge">سنة {item.yearNumber}</span>
                    )}
                    {hasAudio && (
                      <span className="card-badge audio-badge" title="يحتوي على تسجيل صوتي">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18V5l12-2v13"></path>
                          <circle cx="6" cy="18" r="3"></circle>
                          <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                        صوت
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="subject-card-title arabic-text">{item.title}</h3>

                {itemLevelNames.length > 0 && (
                  <div className="card-level-tags">
                    {itemLevelNames.map((name, i) => (
                      <span key={i} className="card-level-chip arabic-text">
                        {name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="subject-card-preview arabic-text">
                  {previewText.replace(/\*/g, ' ').substring(0, 110)}
                  {previewText.length > 110 ? '...' : ''}
                </p>

                <div className="subject-card-footer">
                  <span className="read-more-text">
                    فتح المحتوى
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Item Detail Modal when in Grid View */}
      {modalItem && (
        <SubjectDetailModal
          item={modalItem}
          subjectId={activeSubject}
          levels={levels}
          onClose={() => setModalItem(null)}
        />
      )}
    </section>
  );
}
