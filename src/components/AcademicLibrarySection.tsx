import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicLibraryResource, LibraryResourceType } from '../data/academicLibrary';
import {
  Search,
  BookOpen,
  FileText,
  Download,
  Bookmark,
  Eye,
  Plus,
  Filter,
  GraduationCap,
  Building2,
  Calendar,
  Clock,
  User,
  Check,
  X,
  Upload,
  AlertCircle,
  FileCheck,
  Sparkles
} from 'lucide-react';

export const AcademicLibrarySection: React.FC = () => {
  const {
    currentUser,
    libraryResources,
    toggleSaveLibraryResource,
    addLibraryResource,
    incrementDownloadResource,
    universities,
    showToast
  } = useApp();

  // Tab: Past Questions, Lecture Notes, Summaries, Saved
  const [activeTab, setActiveTab] = useState<'all' | 'past_question' | 'lecture_note' | 'summary' | 'saved'>('past_question');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Preview modal state
  const [previewResource, setPreviewResource] = useState<AcademicLibraryResource | null>(null);

  // Upload sheet modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<LibraryResourceType>('past_question');
  const [uploadCourseCode, setUploadCourseCode] = useState('');
  const [uploadCourseTitle, setUploadCourseTitle] = useState('');
  const [uploadUniversity, setUploadUniversity] = useState(currentUser?.universityName || 'Covenant University');
  const [uploadFaculty, setUploadFaculty] = useState('College of Science & Technology');
  const [uploadDepartment, setUploadDepartment] = useState(currentUser?.department || 'Computer & Information Sciences');
  const [uploadLevel, setUploadLevel] = useState<'100L' | '200L' | '300L' | '400L' | '500L' | 'Postgraduate'>('300L');
  const [uploadSemester, setUploadSemester] = useState<'First Semester' | 'Second Semester'>('First Semester');
  const [uploadYear, setUploadYear] = useState('2025/2026');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Filtered resources list
  const filteredResources = useMemo(() => {
    return libraryResources.filter((res) => {
      // Tab filter
      if (activeTab === 'saved') {
        if (!res.isSaved) return false;
      } else if (activeTab !== 'all') {
        if (res.type !== activeTab) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCode = res.courseCode.toLowerCase().includes(q);
        const matchTitle = res.courseTitle.toLowerCase().includes(q);
        const matchUni = res.universityName.toLowerCase().includes(q);
        const matchDept = res.department.toLowerCase().includes(q);
        if (!matchCode && !matchTitle && !matchUni && !matchDept) return false;
      }

      // University filter
      if (selectedUniversity !== 'all' && res.universityId !== selectedUniversity && res.universityName !== selectedUniversity) {
        return false;
      }

      // Department filter
      if (selectedDepartment !== 'all' && res.department !== selectedDepartment) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && res.academicLevel !== selectedLevel) {
        return false;
      }

      // Semester filter
      if (selectedSemester !== 'all' && res.semester !== selectedSemester) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'all' && res.year !== selectedYear) {
        return false;
      }

      return true;
    });
  }, [
    libraryResources,
    activeTab,
    searchQuery,
    selectedUniversity,
    selectedDepartment,
    selectedLevel,
    selectedSemester,
    selectedYear
  ]);

  const handleDownload = (res: AcademicLibraryResource) => {
    incrementDownloadResource(res.id);
    showToast(`Downloading "${res.courseCode} — ${res.courseTitle}" (${res.fileSize})`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadCourseCode.trim() || !uploadCourseTitle.trim()) {
      setUploadError('Please provide both the course code and course title.');
      return;
    }
    if (!uploadFileName) {
      setUploadError('Please select a PDF or DOCX file to upload.');
      return;
    }

    addLibraryResource({
      courseCode: uploadCourseCode.trim().toUpperCase(),
      courseTitle: uploadCourseTitle.trim(),
      type: uploadType,
      universityId: currentUser?.universityId || 'covenant',
      universityName: uploadUniversity,
      faculty: uploadFaculty,
      department: uploadDepartment,
      academicLevel: uploadLevel,
      semester: uploadSemester,
      year: uploadYear,
      uploaderName: currentUser?.fullName || currentUser?.full_name || 'Scholar',
      uploaderUsername: currentUser?.username || 'scholar',
      uploaderUniversity: uploadUniversity,
      isSaved: false,
      pagesCount: Math.floor(Math.random() * 25) + 6,
      fileSize: '2.4 MB',
      description: uploadDescription || `Comprehensive ${uploadType.replace('_', ' ')} material for ${uploadCourseCode.toUpperCase()}.`,
      mockContent: {
        overview: `Official collegiate course dossier for ${uploadCourseCode.toUpperCase()} (${uploadCourseTitle}) under ${uploadDepartment} at ${uploadUniversity}.`,
        sections: [
          {
            heading: '1. Modular Course Syllabi & Foundations',
            body: 'Curriculum coverage of fundamental theory, practical lab applications, and lecture summaries.'
          },
          {
            heading: '2. Review Questions & Key Concepts',
            body: 'Detailed breakdowns of frequent examination questions, calculation steps, and memory techniques.'
          }
        ]
      }
    });

    setIsUploadOpen(false);
    setUploadCourseCode('');
    setUploadCourseTitle('');
    setUploadDescription('');
    setUploadFileName('');
    setUploadError('');
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Student Upload Action */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-indigo-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#1D9BF0] text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0F1419] dark:text-[#E7E9EA]">
              Past Questions and Notes Library
            </h2>
          </div>
          <p className="text-xs text-[#536471] dark:text-[#71767B] mt-1 max-w-lg">
            Curated archive of semester examination questions, lecture handouts, and student study summaries for private universities.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="btn-pill px-4 py-2 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Tabs: Past Questions, Lecture Notes, Summaries, Saved */}
      <div className="flex border-b border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#000000]">
        {[
          { id: 'past_question' as const, label: 'Past Questions', icon: FileCheck },
          { id: 'lecture_note' as const, label: 'Lecture Notes', icon: FileText },
          { id: 'summary' as const, label: 'Summaries', icon: Sparkles },
          { id: 'saved' as const, label: 'Saved', icon: Bookmark }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === 'saved'
              ? libraryResources.filter((r) => r.isSaved).length
              : libraryResources.filter((r) => r.type === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center transition-colors relative cursor-pointer font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'text-[#1D9BF0]'
                  : 'text-[#536471] dark:text-[#71767B] hover:text-[#0F1419] dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-[#16181C] text-slate-500">
                {count}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D9BF0]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Search Bar & Multi-Dimensional Filters */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by course code (e.g. CSC 412, MAT 211, BUS 301), title, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-xs text-[#0F1419] dark:text-[#E7E9EA] placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0]"
          />
        </div>

        {/* Filter Selectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
          {/* University Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">University</label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
            >
              <option value="all">All Universities</option>
              {universities.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Level */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
            >
              <option value="all">All Levels</option>
              <option value="100L">100 Level</option>
              <option value="200L">200 Level</option>
              <option value="300L">300 Level</option>
              <option value="400L">400 Level</option>
              <option value="500L">500 Level</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
            >
              <option value="all">All Semesters</option>
              <option value="First Semester">First Semester (Alpha)</option>
              <option value="Second Semester">Second Semester (Omega)</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
            >
              <option value="all">All Years</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedUniversity('all');
                setSelectedDepartment('all');
                setSelectedLevel('all');
                setSelectedSemester('all');
                setSelectedYear('all');
              }}
              className="w-full p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-300 transition-colors text-center cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 space-y-2 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
          <p className="font-semibold text-slate-600 dark:text-slate-400">
            No study materials found for this filter criteria
          </p>
          <p className="text-[11px] max-w-sm mx-auto">
            Try adjusting your search terms or be the first student to upload past questions or notes for this course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredResources.map((res) => {
            const isSaved = Boolean(res.isSaved);
            const typeLabel =
              res.type === 'past_question'
                ? 'Past Question'
                : res.type === 'lecture_note'
                ? 'Lecture Note'
                : 'Summary';

            return (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Type Badge & University */}
                  <div className="flex items-center justify-between text-[11px] gap-2 mb-2">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px] ${
                        res.type === 'past_question'
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                          : res.type === 'lecture_note'
                          ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                          : 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400'
                      }`}
                    >
                      {typeLabel}
                    </span>

                    <span className="text-slate-400 font-medium truncate">
                      {res.year} · {res.semester}
                    </span>
                  </div>

                  {/* Course Code & Title */}
                  <div className="mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-[#1D9BF0]">
                        {res.courseCode}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-semibold text-slate-500">
                        {res.academicLevel}
                      </span>
                    </div>
                    <h3 className="font-bold text-[14px] text-[#0F1419] dark:text-[#E7E9EA] leading-snug line-clamp-2 mt-0.5">
                      {res.courseTitle}
                    </h3>
                  </div>

                  {/* University & Department */}
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate mb-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{res.universityName}</span>
                    <span>·</span>
                    <span className="truncate">{res.department}</span>
                  </p>

                  {/* Description snippet */}
                  <p className="text-[12px] text-slate-600 dark:text-slate-300/90 line-clamp-2 leading-relaxed mb-3">
                    {res.description}
                  </p>

                  {/* Uploader & Downloads info */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80 mb-3">
                    <span>
                      Uploaded by <strong className="text-slate-700 dark:text-slate-300">@{res.uploaderUsername}</strong>
                    </span>
                    <span>{res.downloadsCount} downloads</span>
                  </div>
                </div>

                {/* Card Action Buttons: Preview, Download, Save */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(res)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#1D9BF0] text-white font-semibold text-xs hover:bg-[#1A8CD8] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => toggleSaveLibraryResource(res.id)}
                    title={isSaved ? 'Remove from saved' : 'Save for later'}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      isSaved
                        ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 border-amber-300 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================== */}
      {/* PREVIEW VIEWER MODAL */}
      {/* ======================================================== */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#16181C] text-[#0F1419] dark:text-[#E7E9EA] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#1D9BF0] text-sm">
                    {previewResource.courseCode}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs uppercase font-bold text-slate-500">
                    {previewResource.type.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F1419] dark:text-[#E7E9EA] mt-0.5">
                  {previewResource.courseTitle}
                </h3>
              </div>

              <button
                onClick={() => setPreviewResource(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewer Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm leading-relaxed no-scrollbar">
              {/* Meta information strip */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div>
                  <strong>Institution:</strong> {previewResource.universityName}
                </div>
                <div>
                  <strong>Level:</strong> {previewResource.academicLevel}
                </div>
                <div>
                  <strong>Session:</strong> {previewResource.year} ({previewResource.semester})
                </div>
                <div>
                  <strong>Pages:</strong> {previewResource.pagesCount}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">
                  Document Overview
                </h4>
                <p className="text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-[#121417] p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {previewResource.mockContent.overview}
                </p>
              </div>

              {/* Document Sections */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Content Preview & Syllabus Highlights
                </h4>
                {previewResource.mockContent.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#121417] border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                  >
                    <h5 className="font-bold text-sm text-[#0F1419] dark:text-[#E7E9EA]">
                      {sec.heading}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sample Questions if any */}
              {previewResource.mockContent.sampleQuestions && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                    Sample Examination Questions
                  </h4>
                  {previewResource.mockContent.sampleQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start justify-between gap-3 text-xs"
                    >
                      <p className="font-medium text-amber-900 dark:text-amber-200">
                        {idx + 1}. {q.q}
                      </p>
                      <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">
                        [{q.marks} marks]
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between bg-slate-50 dark:bg-[#0A0A0A]">
              <div className="text-xs text-slate-400">
                Uploader: <strong>@{previewResource.uploaderUsername}</strong> · {previewResource.downloadsCount} downloads
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveLibraryResource(previewResource.id)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {previewResource.isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewResource);
                    setPreviewResource(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1D9BF0] text-white text-xs font-bold hover:bg-[#1A8CD8] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STUDENT UPLOAD SHEET MODAL */}
      {/* ======================================================== */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#16181C] text-[#0F1419] dark:text-[#E7E9EA] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F1419] dark:text-[#E7E9EA]">
                  Upload Academic Resource
                </h3>
                <p className="text-xs text-slate-500">
                  Share verified examination papers or course notes
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-3.5 overflow-y-auto no-scrollbar text-xs">
              {uploadError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-semibold">
                  {uploadError}
                </div>
              )}

              {/* Resource Type */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Resource Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'past_question' as const, label: 'Past Question' },
                    { id: 'lecture_note' as const, label: 'Lecture Note' },
                    { id: 'summary' as const, label: 'Summary' }
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setUploadType(t.id)}
                      className={`p-2 rounded-xl text-center font-bold transition-colors cursor-pointer border ${
                        uploadType === t.id
                          ? 'bg-[#1D9BF0] text-white border-[#1D9BF0]'
                          : 'bg-slate-50 dark:bg-[#0A0A0A] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Code & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSC 412"
                    value={uploadCourseCode}
                    onChange={(e) => setUploadCourseCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed Systems"
                    value={uploadCourseTitle}
                    onChange={(e) => setUploadCourseTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* University Selector (Private Varsities only) */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  University *
                </label>
                <select
                  value={uploadUniversity}
                  onChange={(e) => setUploadUniversity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700"
                >
                  {universities.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level, Semester & Year */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Level</label>
                  <select
                    value={uploadLevel}
                    onChange={(e) => setUploadLevel(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700"
                  >
                    <option value="100L">100L</option>
                    <option value="200L">200L</option>
                    <option value="300L">300L</option>
                    <option value="400L">400L</option>
                    <option value="500L">500L</option>
                    <option value="Postgraduate">Postgrad</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Semester</label>
                  <select
                    value={uploadSemester}
                    onChange={(e) => setUploadSemester(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700"
                  >
                    <option value="First Semester">First (Alpha)</option>
                    <option value="Second Semester">Second (Omega)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Year</label>
                  <select
                    value={uploadYear}
                    onChange={(e) => setUploadYear(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700"
                  >
                    <option value="2025/2026">2025/2026</option>
                    <option value="2024/2025">2024/2025</option>
                    <option value="2023/2024">2023/2024</option>
                    <option value="2022/2023">2022/2023</option>
                  </select>
                </div>
              </div>

              {/* File Picker */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Document File (PDF / DOCX) *
                </label>
                <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center cursor-pointer hover:border-[#1D9BF0] transition-colors relative bg-slate-50/50 dark:bg-[#0A0A0A]">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setUploadFileName(file.name);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <Upload className="w-5 h-5 mx-auto text-slate-400" />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {uploadFileName || 'Click or drag PDF/DOCX to upload'}
                    </p>
                    <p className="text-[10px] text-slate-400">Max size 25MB</p>
                  </div>
                </div>
              </div>

              {/* Review Note */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Student Review Note:</strong> Uploads are reviewed by verified university moderators before appearing publicly in the library to verify academic integrity.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Submit Resource for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
