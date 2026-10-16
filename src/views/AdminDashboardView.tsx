import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  FileText,
  Users,
  Building2,
  Briefcase,
  ShoppingBag,
  AlertTriangle,
  Settings,
  LogOut,
  Trash2,
  Check,
  X,
  Search,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminLogout,
    setActiveTab,
    posts,
    deletePost,
    opportunities,
    deleteOpportunity,
    products,
    universities,
    reports,
    resolveReport,
    showToast
  } = useApp();

  const [section, setSection] = useState<
    'overview' | 'posts' | 'users' | 'universities' | 'opportunities' | 'stores' | 'reports' | 'settings'
  >('overview');

  const [searchPost, setSearchPost] = useState('');
  const [modNote, setModNote] = useState<Record<string, string>>({});

  useEffect(() => {
    // Route guard: redirect unauthenticated visitor to admin login
    if (!isAdminAuthenticated) {
      setActiveTab('admin_login');
    }
    // Maintain noindex meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }, [isAdminAuthenticated, setActiveTab]);

  if (!isAdminAuthenticated) return null;

  const pendingReports = reports.filter((r) => r.status === 'pending');

  const mockUsers = [
    { id: 'usr-1', name: 'Chidi Okafor', username: 'chidi_cu', university: 'Covenant University', level: '400L', role: 'Student' },
    { id: 'usr-2', name: 'Korede Balogun', username: 'korede_babcock', university: 'Babcock University', level: '300L', role: 'Student' },
    { id: 'usr-3', name: 'Zainab Al-Hassan', username: 'zainab_nile', university: 'Nile University of Nigeria', level: '200L', role: 'Student' },
    { id: 'usr-4', name: 'Adedamola Adeleke', username: 'damola_abuad', university: 'Afe Babalola University (ABUAD)', level: '400L', role: 'Student' },
    { id: 'usr-5', name: 'Somtochukwu Eze', username: 'somto_pau', university: 'Pan-Atlantic University', level: '300L', role: 'Student' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Admin Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-display">Univyx Administration Console</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-bold uppercase tracking-wider">
                Internal Only
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Private University Student Network Governance & Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            Switch to Public App
          </button>
          <button
            onClick={adminLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* Admin Section Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: ShieldCheck },
          { id: 'posts', label: `Posts (${posts.length})`, icon: FileText },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'universities', label: `Universities (${universities.length})`, icon: Building2 },
          { id: 'opportunities', label: `CIVYN (${opportunities.length})`, icon: Briefcase },
          { id: 'stores', label: `Store (${products.length})`, icon: ShoppingBag },
          { id: 'reports', label: `Reports (${pendingReports.length})`, icon: AlertTriangle, badge: pendingReports.length },
          { id: 'settings', label: 'Platform Settings', icon: Settings }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#1D9BF0] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW */}
      {section === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-400 font-medium">Verified Institutions</span>
              <div className="text-2xl font-bold font-display mt-1">{universities.length}</div>
              <span className="text-[11px] text-[#1D9BF0]">Private universities only</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-400 font-medium">Text Posts Published</span>
              <div className="text-2xl font-bold font-display mt-1">{posts.length}</div>
              <span className="text-[11px] text-green-500">Live active threads</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-400 font-medium">CIVYN Opportunities</span>
              <div className="text-2xl font-bold font-display mt-1">{opportunities.length}</div>
              <span className="text-[11px] text-[#1D9BF0]">Internships & Gigs</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-400 font-medium">Pending Moderation</span>
              <div className="text-2xl font-bold font-display mt-1 text-rose-500">{pendingReports.length}</div>
              <span className="text-[11px] text-slate-400">Needs review</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs space-y-3">
            <h3 className="font-bold text-sm">Security & Architectural Invariants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A]">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Zero Public University Invariant:</strong>
                All selectors, mock users, posts, and listings strictly adhere to the verified private universities list.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A]">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">URL-Only Admin Access:</strong>
                No links exist in the public UI. Direct URL access to <code>/admin/login</code> is required.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. POSTS */}
      {section === 'posts' && (
        <div className="space-y-4 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts by content or author..."
              value={searchPost}
              onChange={(e) => setSearchPost(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            {posts
              .filter((p) => p.content.toLowerCase().includes(searchPost.toLowerCase()) || p.authorName.toLowerCase().includes(searchPost.toLowerCase()))
              .map((post) => (
                <div key={post.id} className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{post.authorName}</span>
                      <span className="text-slate-400">@{post.username}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-[#1D9BF0] font-medium">{post.universityName}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{post.content}</p>
                  </div>
                  <button
                    onClick={() => {
                      deletePost(post.id);
                      showToast('Post deleted by admin');
                    }}
                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 3. USERS */}
      {section === 'users' && (
        <div className="space-y-3 text-xs">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16181C] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-[#0A0A0A] text-slate-500 text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Scholar</th>
                  <th className="p-3">Handle</th>
                  <th className="p-3">Private University</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {mockUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="p-3 font-semibold">{u.name}</td>
                    <td className="p-3 text-slate-400">@{u.username}</td>
                    <td className="p-3 text-[#1D9BF0]">{u.university}</td>
                    <td className="p-3">{u.level}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Student</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. UNIVERSITIES */}
      {section === 'universities' && (
        <div className="space-y-3 text-xs">
          <p className="text-xs text-slate-500">
            Official roster of 28 verified private universities configured in <code>src/data/universities.ts</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {universities.map((u, idx) => (
              <div key={u.id} className="p-3 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white mt-0.5">{u.name}</h4>
                  <p className="text-[11px] text-slate-500">{u.city}, {u.state}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#1D9BF0] text-[10px] font-semibold">
                  {u.shortName}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. OPPORTUNITIES (CIVYN) */}
      {section === 'opportunities' && (
        <div className="space-y-3 text-xs">
          {opportunities.map((opp) => (
            <div key={opp.id} className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-[#1D9BF0] uppercase tracking-wide text-[10px]">{opp.type}</span>
                <h4 className="font-bold text-sm mt-0.5">{opp.title}</h4>
                <p className="text-slate-500">{opp.organization} · {opp.compensation}</p>
              </div>
              <button
                onClick={() => {
                  deleteOpportunity(opp.id);
                  showToast('Opportunity listing removed');
                }}
                className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 6. STORES */}
      {section === 'stores' && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((prod) => (
              <div key={prod.id} className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-[#1D9BF0] font-semibold">{prod.category}</span>
                  <span>{prod.currency}{prod.price.toLocaleString()}</span>
                </div>
                <h4 className="font-bold text-sm">{prod.name}</h4>
                <p className="text-slate-500 text-[11px]">{prod.storeName} ({prod.vendorUniversityName})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. REPORTS / MODERATION QUEUE */}
      {section === 'reports' && (
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-sm">Moderation Queue ({pendingReports.length} Pending)</h3>
          {pendingReports.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-white dark:bg-[#16181C] rounded-2xl border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <span>Queue is clear. No reported violations awaiting review.</span>
            </div>
          ) : (
            pendingReports.map((rep) => (
              <div key={rep.id} className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-bold text-rose-500 uppercase">{rep.contentType} Reported</span>
                  <span>Reporter: @{rep.reporterUsername}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A]">
                  <p className="font-medium">"{rep.contentSnippet}"</p>
                  <p className="text-slate-500 text-[11px] mt-1">Reason: {rep.reason}</p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => resolveReport(rep.id, 'dismissed')}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => resolveReport(rep.id, 'action_taken')}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 8. SETTINGS */}
      {section === 'settings' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs space-y-3">
          <h3 className="font-bold text-sm">Platform Settings & Security Policies</h3>
          <p className="text-slate-500">
            Configure system-wide character posting bounds, private university affiliation requirements, and automated moderation rules.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A]">
              <span>Maximum Post Character Limit</span>
              <span className="font-bold font-mono">500 Chars</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0A0A0A]">
              <span>Private University Verification Enforcement</span>
              <span className="text-emerald-500 font-bold">Active & Enforced</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
