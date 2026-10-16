import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  FileText,
  Briefcase,
  ShoppingBag,
  Trophy,
  Check,
  X,
  Trash2,
  Lock,
  Calendar,
  Layers,
  Database
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    currentUser,
    posts,
    opportunities,
    products,
    events,
    reports,
    resolveReport,
    deletePost,
    deleteOpportunity,
    isSupabaseConfigured,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'moderation' | 'content' | 'database'>('overview');
  const [modNote, setModNote] = useState<Record<string, string>>({});

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'superadmin' || currentUser?.role === 'moderator';

  if (!isAdmin) {
    return (
      <div className="p-8 text-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Access Restricted
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          This administration dashboard is restricted to verified campus moderators and univyX platform administrators.
        </p>
      </div>
    );
  }

  // Calculate metrics from state
  const pendingReports = reports.filter((r) => r.status === 'pending');
  const totalPostsCount = posts.length;
  const totalOppsCount = opportunities.length;
  const totalProductsCount = products.length;
  const totalEventsCount = events.length;

  const categoryBreakdown: Record<string, number> = {};
  posts.forEach((p) => {
    categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
  });

  const handleActionReport = (reportId: string, status: 'dismissed' | 'action_taken', contentId?: string, contentType?: string) => {
    const note = modNote[reportId] || 'Reviewed by moderator';
    resolveReport(reportId, status, note);

    if (status === 'action_taken' && contentId && contentType === 'post') {
      deletePost(contentId);
      showToast('Reported post deleted');
    }
  };

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Administration & Security Console</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            univyX Admin Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational oversight, moderation queue, content curation, and database status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 font-semibold border border-amber-500/20">
            {currentUser?.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 text-xs">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`pb-2.5 font-semibold transition-colors relative ${
            activeAdminTab === 'overview'
              ? 'text-[#1D9BF0]'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <span>Operational Overview</span>
          {activeAdminTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D9BF0]" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`pb-2.5 font-semibold transition-colors relative flex items-center gap-1.5 ${
            activeAdminTab === 'moderation'
              ? 'text-[#1D9BF0]'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <span>Moderation Queue</span>
          {pendingReports.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingReports.length}
            </span>
          )}
          {activeAdminTab === 'moderation' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D9BF0]" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('content')}
          className={`pb-2.5 font-semibold transition-colors relative ${
            activeAdminTab === 'content'
              ? 'text-[#1D9BF0]'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <span>Content Management</span>
          {activeAdminTab === 'content' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D9BF0]" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('database')}
          className={`pb-2.5 font-semibold transition-colors relative ${
            activeAdminTab === 'database'
              ? 'text-[#1D9BF0]'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <span>Database & Supabase</span>
          {activeAdminTab === 'database' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D9BF0]" />
          )}
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. OVERVIEW METRICS */}
      {/* ========================================================= */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">Total Live Posts</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                {totalPostsCount}
              </div>
              <span className="text-[10px] text-green-500 font-medium">Text-only format</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">Pending Reports</span>
              <div className="text-2xl font-extrabold text-rose-500 mt-1 tabular-nums">
                {pendingReports.length}
              </div>
              <span className="text-[10px] text-slate-400">Needs review</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">CIVYN Opportunities</span>
              <div className="text-2xl font-extrabold text-[#1D9BF0] mt-1 tabular-nums">
                {totalOppsCount}
              </div>
              <span className="text-[10px] text-slate-400">Active student roles</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-medium">Store Listings</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                {totalProductsCount}
              </div>
              <span className="text-[10px] text-slate-400">Student vendors</span>
            </div>
          </div>

          {/* Posts by Category */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Posts Distribution by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {Object.entries(categoryBreakdown).map(([cat, count]) => (
                <div key={cat} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-100 dark:border-slate-800">
                  <span className="capitalize font-medium text-slate-600 dark:text-slate-400">{cat.replace('_', ' ')}</span>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. MODERATION QUEUE */}
      {/* ========================================================= */}
      {activeAdminTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Reported Content Queue ({pendingReports.length})
            </h3>
            <span className="text-xs text-slate-400">Enforce community safety rules</span>
          </div>

          {pendingReports.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-[#16181C] rounded-2xl border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2 opacity-80" />
              <span>Moderation queue is empty! Campus feeds are safe and clean.</span>
            </div>
          ) : (
            pendingReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-rose-500 uppercase tracking-wide">
                    {report.content_type} Reported
                  </span>
                  <span>Reported by @{report.reporter_username}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-100 dark:border-slate-800">
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    "{report.content_snippet}"
                  </p>
                  <p className="mt-1 text-slate-500 text-[11px]">
                    <strong>Report Reason:</strong> {report.reason}
                  </p>
                </div>

                {/* Moderator note input */}
                <input
                  type="text"
                  placeholder="Optional internal moderator note..."
                  value={modNote[report.id] || ''}
                  onChange={(e) => setModNote({ ...modNote, [report.id]: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleActionReport(report.id, 'dismissed')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Dismiss Report</span>
                  </button>
                  <button
                    onClick={() => handleActionReport(report.id, 'action_taken', report.content_id, report.content_type)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Content</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CONTENT MANAGEMENT */}
      {/* ========================================================= */}
      {activeAdminTab === 'content' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Recent Social Posts Management
            </h3>
            <div className="space-y-2 text-xs">
              {posts.slice(0, 5).map((p) => (
                <div key={p.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 dark:text-white">@{p.author.username}</span>: {p.content}
                  </div>
                  <button
                    onClick={() => {
                      deletePost(p.id);
                      showToast('Post removed by administrator');
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg shrink-0"
                    title="Remove post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              CIVYN Opportunities Curation
            </h3>
            <div className="space-y-2 text-xs">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 dark:text-white">{opp.title}</span> ({opp.organization})
                  </div>
                  <button
                    onClick={() => {
                      deleteOpportunity(opp.id);
                      showToast('Opportunity removed');
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg shrink-0"
                    title="Remove listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. DATABASE & SUPABASE STATUS */}
      {/* ========================================================= */}
      {activeAdminTab === 'database' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs text-xs space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#1D9BF0]" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Supabase Backend & PostgreSQL Schema
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Connection Mode:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {isSupabaseConfigured ? 'Connected to Remote Supabase' : 'Active Local Engine (Zero-Config Preview)'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-slate-400">Migration Script:</span>
                <span className="font-mono text-[#1D9BF0]">supabase/migrations/001_initial_schema.sql</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-slate-400">Seed Fixtures:</span>
                <span className="font-mono text-[#1D9BF0]">supabase/seed.sql</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To connect your live external Supabase project, specify <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your environment variables. Then execute the included migration in your Supabase SQL Editor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
