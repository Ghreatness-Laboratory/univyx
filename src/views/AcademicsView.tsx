import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { PostComposer } from '../components/PostComposer';
import { CommentsModal } from '../components/CommentsModal';
import {
  GraduationCap,
  BookOpen,
  FileText,
  HelpCircle,
  Briefcase,
  Bot,
  Search,
  Filter,
  Bookmark,
  ExternalLink,
  Calendar,
  Building,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { AcademicResource, CareerOpportunity, Post, OpportunityType } from '../types';

export const AcademicsView: React.FC = () => {
  const {
    posts,
    academicResources,
    knowledgeEntries,
    opportunities,
    toggleBookmarkOpportunity,
    createOpportunity,
    currentUser,
    selectedUniversityId,
    selectedUniversity,
    universities,
    showToast
  } = useApp();

  const [academicTab, setAcademicTab] = useState<
    'feed' | 'civyn' | 'ai_assistant' | 'knowledge' | 'resources'
  >('feed');

  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  // CIVYN Opportunity Filters
  const [civynTypeFilter, setCivynTypeFilter] = useState<OpportunityType | 'all'>('all');
  const [civynWorkplaceFilter, setCivynWorkplaceFilter] = useState<string>('all');
  const [civynSearch, setCivynSearch] = useState<string>('');
  const [onlySavedCivyn, setOnlySavedCivyn] = useState(false);
  const [showAddOppModal, setShowAddOppModal] = useState(false);

  // New Opportunity Form state (for admins/authorized contributors)
  const [newOppTitle, setNewOppTitle] = useState('');
  const [newOppOrg, setNewOppOrg] = useState('');
  const [newOppType, setNewOppType] = useState<OpportunityType>('internship');
  const [newOppLocation, setNewOppLocation] = useState('');
  const [newOppWorkplace, setNewOppWorkplace] = useState<'remote' | 'hybrid' | 'onsite'>('hybrid');
  const [newOppCompensation, setNewOppCompensation] = useState('');
  const [newOppEligibility, setNewOppEligibility] = useState('');
  const [newOppSkills, setNewOppSkills] = useState('');
  const [newOppDeadline, setNewOppDeadline] = useState('');
  const [newOppDescription, setNewOppDescription] = useState('');
  const [newOppUrl, setNewOppUrl] = useState('');

  // AI Study Assistant state
  const [aiMessages, setAiMessages] = useState<
    { id: string; role: 'user' | 'assistant'; text: string; sources?: { title: string; url: string }[] }[]
  >([
    {
      id: 'ai-welcome',
      role: 'assistant',
      text: "Hello! I am your univyX AI Study Mentor. Ask me anything about your university courses, how to calculate your semester GPA, exam revision strategies, or campus academic guidelines.",
      sources: [{ title: 'univyX Academic Standard Guide', url: '#knowledge' }]
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Knowledge search
  const [knowledgeSearch, setKnowledgeSearch] = useState('');

  // Filter posts
  const academicPosts = posts.filter((p) => {
    if (selectedUniversityId !== 'all' && p.university_id && p.university_id !== selectedUniversityId) {
      return false;
    }
    return p.category === 'academics' || p.category === 'career';
  });

  // Filter CIVYN opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    if (onlySavedCivyn && !opp.is_bookmarked) return false;
    if (civynTypeFilter !== 'all' && opp.type !== civynTypeFilter) return false;
    if (civynWorkplaceFilter !== 'all' && opp.workplace_type !== civynWorkplaceFilter) return false;
    if (civynSearch.trim()) {
      const q = civynSearch.toLowerCase();
      const matchTitle = opp.title.toLowerCase().includes(q);
      const matchOrg = opp.organization.toLowerCase().includes(q);
      const matchSkills = opp.required_skills.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchOrg && !matchSkills) return false;
    }
    return true;
  });

  // AI Query Submission
  const handleAiSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim() || isAiLoading) return;

    const userMsgText = aiInput.trim();
    const userMsgId = `usr-${Date.now()}`;
    const newHistory = [...aiMessages, { id: userMsgId, role: 'user' as const, text: userMsgText }];

    setAiMessages(newHistory);
    setAiInput('');
    setIsAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          conversationHistory: newHistory.map((m) => ({ role: m.role, text: m.text })),
          university: selectedUniversity?.name || currentUser?.university_name || 'General Campus',
          course: currentUser?.department || 'General Academic Studies'
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.configured === false) {
        setAiMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            text: data.message || 'AI credentials are not yet configured.',
            sources: data.sources
          }
        ]);
      } else {
        setAiMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            text: data.reply,
            sources: data.sources
          }
        ]);
      }
    } catch (err: any) {
      console.error('AI chat failed:', err);
      setAiError('Unable to connect to academic assistance service. Please verify your connection.');
      setAiMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: "I experienced a temporary communication hiccup. In the meantime, you can review the official formulas and guidelines in our Knowledge Directory tab!",
          sources: [{ title: 'Official Knowledge Directory', url: '#knowledge' }]
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOppTitle || !newOppOrg || !newOppUrl) return;

    createOpportunity({
      title: newOppTitle,
      organization: newOppOrg,
      type: newOppType,
      location: newOppLocation || 'Campus-wide / Hybrid',
      workplace_type: newOppWorkplace,
      compensation: newOppCompensation,
      eligibility: newOppEligibility || 'Accredited university students',
      required_skills: newOppSkills.split(',').map((s) => s.trim()).filter(Boolean),
      deadline: newOppDeadline ? new Date(newOppDeadline).toISOString() : new Date(Date.now() + 30 * 86400000).toISOString(),
      description: newOppDescription,
      application_url: newOppUrl,
      status: 'published'
    });

    setShowAddOppModal(false);
    // Reset
    setNewOppTitle('');
    setNewOppOrg('');
    setNewOppCompensation('');
    setNewOppDescription('');
    setNewOppUrl('');
  };

  const suggestedQuestions = [
    "How is a 5.0 CGPA calculated in Nigerian universities?",
    "What are the prerequisites for SIWES & IT logbook defense?",
    "Explain the difference between SN1 and SN2 organic reactions.",
    "Give me an active recall study timetable for exam week."
  ];

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D9BF0] mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Knowledge & Opportunity Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Academics & CIVYN
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Course discussions, study resources, AI mentoring, and verified student internships.
            </p>
          </div>
        </div>
      </div>

      {/* Section Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 px-3 py-2 bg-slate-50/70 dark:bg-[#111316] border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setAcademicTab('feed')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            academicTab === 'feed'
              ? 'bg-white dark:bg-[#16181C] text-[#1D9BF0] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Academic Feed
        </button>

        <button
          onClick={() => setAcademicTab('civyn')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            academicTab === 'civyn'
              ? 'bg-[#1D9BF0] text-white shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:text-[#1D9BF0]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>CIVYN Careers</span>
        </button>

        <button
          onClick={() => setAcademicTab('ai_assistant')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            academicTab === 'ai_assistant'
              ? 'bg-white dark:bg-[#16181C] text-[#1D9BF0] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-[#1D9BF0]" />
          <span>AI Study Mentor</span>
        </button>

        <button
          onClick={() => setAcademicTab('knowledge')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            academicTab === 'knowledge'
              ? 'bg-white dark:bg-[#16181C] text-[#1D9BF0] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Knowledge Directory
        </button>

        <button
          onClick={() => setAcademicTab('resources')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            academicTab === 'resources'
              ? 'bg-white dark:bg-[#16181C] text-[#1D9BF0] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Study Notes & Books
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. ACADEMIC FEED TAB */}
      {/* ========================================================= */}
      {academicTab === 'feed' && (
        <div>
          <PostComposer defaultCategory="academics" />
          {academicPosts.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No academic discussions yet for this campus. Be the first to share coursework questions!
            </div>
          ) : (
            academicPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onOpenComments={(p) => setActiveCommentsPost(p)}
              />
            ))
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. CIVYN CAREERS & INTERNSHIPS TAB */}
      {/* ========================================================= */}
      {academicTab === 'civyn' && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Sub-brand Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/10 via-blue-900/5 to-transparent border border-[#1D9BF0]/30 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                  CIVYN
                </span>
                <span className="text-xs text-[#1D9BF0] font-semibold">· Student Career Engine</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                Verified internships, SIWES industrial placements, scholarships, and graduate trainee positions across Nigeria and worldwide.
              </p>
            </div>

            {currentUser && (currentUser.role === 'admin' || currentUser.role === 'superadmin') && (
              <button
                onClick={() => setShowAddOppModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1D9BF0] text-white text-xs font-semibold hover:bg-[#1A8CD8] shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Post Opportunity</span>
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={civynSearch}
                  onChange={(e) => setCivynSearch(e.target.value)}
                  placeholder="Search by role, company, or skills (e.g. React, ICAN, CAD)..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0]"
                />
              </div>
              <button
                onClick={() => setOnlySavedCivyn(!onlySavedCivyn)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  onlySavedCivyn
                    ? 'bg-[#1D9BF0] text-white'
                    : 'bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Saved</span>
              </button>
            </div>

            {/* Type & Workplace Controls */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <select
                value={civynTypeFilter}
                onChange={(e) => setCivynTypeFilter(e.target.value as any)}
                className="p-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">All Opportunity Types</option>
                <option value="internship">Internships</option>
                <option value="siwes">SIWES / Industrial Training</option>
                <option value="graduate_trainee">Graduate Trainee</option>
                <option value="scholarship">Scholarships & Fellowships</option>
                <option value="student_job">Campus & Student Jobs</option>
              </select>

              <select
                value={civynWorkplaceFilter}
                onChange={(e) => setCivynWorkplaceFilter(e.target.value)}
                className="p-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">All Workplaces</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
          </div>

          {/* Opportunity Listing Cards */}
          <div className="space-y-3">
            {filteredOpportunities.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No opportunities match these criteria. Try adjusting your search or filters.
              </div>
            ) : (
              filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 hover:border-[#1D9BF0]/50 transition-colors shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {/* Quiet metadata line without pills */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-slate-900 dark:text-white capitalize">
                          {opp.type.replace('_', ' ')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{opp.workplace_type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{opp.location}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {opp.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#1D9BF0] mt-0.5">
                        {opp.organization}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleBookmarkOpportunity(opp.id)}
                      title={opp.is_bookmarked ? 'Remove bookmark' : 'Save opportunity'}
                      className={`p-2 rounded-xl transition-colors ${
                        opp.is_bookmarked
                          ? 'text-[#1D9BF0] bg-[#1D9BF0]/10'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${opp.is_bookmarked ? 'fill-[#1D9BF0]' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Compensation & Eligibility */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-100 dark:border-slate-800/80 text-xs space-y-1">
                    {opp.compensation && (
                      <div className="text-slate-800 dark:text-slate-200">
                        <strong className="text-slate-500">Stipend:</strong> {opp.compensation}
                      </div>
                    )}
                    <div className="text-slate-700 dark:text-slate-300">
                      <strong className="text-slate-500">Eligibility:</strong> {opp.eligibility}
                    </div>
                  </div>

                  {/* Skills tags */}
                  {opp.required_skills && opp.required_skills.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Skills:</span>
                      {opp.required_skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Deadline & Apply */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Deadline: {new Date(opp.deadline).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </span>

                    <a
                      href={opp.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#1D9BF0] text-white text-xs font-semibold hover:bg-[#1A8CD8] active:scale-95 transition-all shadow-xs"
                    >
                      <span>Apply Official</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. AI STUDY ASSISTANT TAB */}
      {/* ========================================================= */}
      {academicTab === 'ai_assistant' && (
        <div className="p-4 sm:p-5 flex flex-col min-h-[550px]">
          {/* Header Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1D9BF0]/15 text-[#1D9BF0] flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  univyX AI Study Mentor
                </h3>
                <p className="text-[11px] text-slate-500">
                  Grounding: {selectedUniversity?.name || 'General Academic Standard'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setAiMessages([
                  {
                    id: 'ai-reset',
                    role: 'assistant',
                    text: 'Session reset. What academic challenge can I help you tackle now?',
                    sources: [{ title: 'Academic Handbook', url: '#knowledge' }]
                  }
                ]);
                showToast('AI conversation cleared');
              }}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5"
            >
              Reset Chat
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="mb-4">
            <p className="text-[11px] font-medium text-slate-400 mb-1.5">Suggested Questions:</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setAiInput(q);
                  }}
                  className="text-[11px] p-2 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#1D9BF0] transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 space-y-3 overflow-y-auto mb-4">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-[#1D9BF0]/15 text-[#1D9BF0] flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1D9BF0] text-white rounded-br-xs'
                      : 'bg-slate-100 dark:bg-[#16181C] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Academic Citations / Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Reference Sources:</span>
                      {msg.sources.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[#1D9BF0]">
                          <span>·</span>
                          <span className="underline cursor-pointer">{s.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400 pl-2">
                <Bot className="w-4 h-4 text-[#1D9BF0] animate-spin" />
                <span>Thinking through academic curriculum...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleAiSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask an academic, course, or grading question..."
              className="flex-1 text-xs p-3 rounded-xl bg-slate-100 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0]"
            />
            <button
              type="submit"
              disabled={!aiInput.trim() || isAiLoading}
              className="p-3 rounded-xl bg-[#1D9BF0] text-white hover:bg-[#1A8CD8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. KNOWLEDGE DIRECTORY TAB */}
      {/* ========================================================= */}
      {academicTab === 'knowledge' && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                placeholder="Search university procedures, GPA rules, Senate regulations..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
              />
            </div>
          </div>

          <div className="space-y-3.5">
            {knowledgeEntries
              .filter((k) =>
                knowledgeSearch.trim()
                  ? k.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) ||
                    k.content.toLowerCase().includes(knowledgeSearch.toLowerCase())
                  : true
              )
              .map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs shadow-xs"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-medium text-[#1D9BF0] uppercase tracking-wider">
                      {entry.category.replace('_', ' ')}
                    </span>
                    <span>Updated {new Date(entry.last_updated).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {entry.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 italic">
                    {entry.summary}
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 text-xs mt-3 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    {entry.content}
                  </p>
                  {entry.source_attribution && (
                    <div className="mt-3 text-[11px] text-slate-400">
                      <strong>Source:</strong> {entry.source_attribution}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. STUDY NOTES & BOOKS TAB */}
      {/* ========================================================= */}
      {academicTab === 'resources' && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {academicResources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="capitalize font-medium text-[#1D9BF0]">{res.resource_type.replace('_', ' ')}</span>
                    <span>{res.is_free ? 'Free Educational Resource' : 'Reference'}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {res.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">Author: {res.author}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{res.subject}</span>
                  {res.external_url && (
                    <a
                      href={res.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1D9BF0] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Access Material</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Post Career Opportunity */}
      {showAddOppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181C] shadow-2xl p-5 border border-slate-200 dark:border-slate-800 text-xs max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Create CIVYN Opportunity Listing
            </h3>
            <p className="text-slate-500 mt-0.5">
              Publish a verified internship, SIWES opening, or scholarship for university scholars.
            </p>

            <form onSubmit={handleCreateOpportunity} className="mt-4 space-y-3">
              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Role / Opportunity Title *</label>
                <input
                  type="text"
                  required
                  value={newOppTitle}
                  onChange={(e) => setNewOppTitle(e.target.value)}
                  placeholder="e.g. Frontend Engineering Intern (Summer 2027)"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300">Organization *</label>
                  <input
                    type="text"
                    required
                    value={newOppOrg}
                    onChange={(e) => setNewOppOrg(e.target.value)}
                    placeholder="e.g. Flutterwave"
                    className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300">Opportunity Type</label>
                  <select
                    value={newOppType}
                    onChange={(e) => setNewOppType(e.target.value as any)}
                    className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="internship">Internship</option>
                    <option value="siwes">SIWES / Industrial Training</option>
                    <option value="graduate_trainee">Graduate Trainee</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="student_job">Student Job</option>
                    <option value="volunteering">Volunteering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300">Workplace</label>
                  <select
                    value={newOppWorkplace}
                    onChange={(e) => setNewOppWorkplace(e.target.value as any)}
                    className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300">Stipend / Compensation</label>
                  <input
                    type="text"
                    value={newOppCompensation}
                    onChange={(e) => setNewOppCompensation(e.target.value)}
                    placeholder="e.g. ₦180,000 / month"
                    className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Eligibility</label>
                <input
                  type="text"
                  value={newOppEligibility}
                  onChange={(e) => setNewOppEligibility(e.target.value)}
                  placeholder="e.g. 300L/400L Computer Science & Engineering students"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newOppSkills}
                  onChange={(e) => setNewOppSkills(e.target.value)}
                  placeholder="e.g. TypeScript, React, SQL, Problem Solving"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Application URL *</label>
                <input
                  type="url"
                  required
                  value={newOppUrl}
                  onChange={(e) => setNewOppUrl(e.target.value)}
                  placeholder="https://company.com/apply"
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={newOppDescription}
                  onChange={(e) => setNewOppDescription(e.target.value)}
                  placeholder="Detailed role responsibilities and learning objectives..."
                  className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddOppModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1D9BF0] text-white font-semibold hover:bg-[#1A8CD8]"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}
    </div>
  );
};
