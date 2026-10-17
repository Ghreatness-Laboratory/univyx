import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { VerificationTier } from '../types';
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
  CheckCircle2,
  Award,
  Clock,
  Edit3
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
    showToast,
    currentUser,
    verificationLogs,
    setVerificationTierForUser
  } = useApp();

  const [section, setSection] = useState<
    'overview' | 'posts' | 'users' | 'universities' | 'opportunities' | 'stores' | 'reports' | 'settings'
  >('overview');

  const [searchPost, setSearchPost] = useState('');
  const [modNote, setModNote] = useState<Record<string, string>>({});

  // Verification modal state
  const [selectedUserForVerification, setSelectedUserForVerification] = useState<{
    id: string;
    name: string;
    username: string;
    university: string;
    followersCount: number;
    currentTier: VerificationTier;
  } | null>(null);
  const [newTierSelection, setNewTierSelection] = useState<VerificationTier>('gold');
  const [verificationReason, setVerificationReason] = useState<string>('');

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

  const mockUsersList = [
    {
      id: 'usr-covenant-admin',
      name: 'Covenant University',
      username: 'covenant_official',
      university: 'Covenant University',
      level: 'Official Admin',
      followersCount: 18400,
      tier: 'gold' as VerificationTier,
      isLocked: true,
      source: 'manual'
    },
    {
      id: 'usr-cst-council',
      name: 'CST Student Council',
      username: 'cst_council',
      university: 'Covenant University',
      level: 'Student Org',
      followersCount: 4200,
      tier: 'gold' as VerificationTier,
      isLocked: true,
      source: 'manual'
    },
    {
      id: 'usr-korede',
      name: 'Korede Balogun',
      username: 'korede_babcock',
      university: 'Babcock University',
      level: '300L',
      followersCount: 1000,
      tier: 'blue' as VerificationTier,
      isLocked: false,
      source: 'auto'
    },
    {
      id: 'usr-tobi',
      name: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      university: 'Babcock University',
      level: '300L',
      followersCount: 999,
      tier: 'none' as VerificationTier,
      isLocked: false,
      source: 'auto'
    },
    {
      id: 'usr-zainab',
      name: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      university: 'Nile University of Nigeria',
      level: '200L',
      followersCount: 2150,
      tier: 'blue' as VerificationTier,
      isLocked: false,
      source: 'auto'
    },
    {
      id: currentUser?.id || 'usr-chidi',
      name: currentUser?.fullName || currentUser?.full_name || 'Chidi Okafor',
      username: currentUser?.username || 'chidi_cu',
      university: currentUser?.universityName || currentUser?.university_name || 'Covenant University',
      level: currentUser?.academicLevel || currentUser?.academic_level || '400L',
      followersCount: currentUser?.followersCount ?? currentUser?.followers_count ?? 742,
      tier: (currentUser?.verificationTier || currentUser?.verification_tier || 'none') as VerificationTier,
      isLocked: currentUser?.verificationLocked || currentUser?.verification_locked || false,
      source: currentUser?.verificationSource || currentUser?.verification_source || 'auto'
    }
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

      {/* 3. USERS & VERIFICATION GOVERNANCE */}
      {section === 'users' && (
        <div className="space-y-6 text-xs">
          {/* Rules Summary Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-amber-500/10 to-transparent border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white">Univyx Verification Governance</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              • <strong>Blue Tick:</strong> Automatically earned when a scholar reaches 1,000 collegiate followers (or manually assigned by admin). Once earned, it cannot be automatically revoked if followers drop.<br />
              • <strong>Gold Tick:</strong> Special tier granted manually by Univyx admins only (official university administrations, student representative organisations, official vendors & partners). Never earned automatically.<br />
              • <strong>Auditing:</strong> Every tier modification requires a valid reason and is permanently recorded in the <code>verification_audit_log</code> table.
            </p>
          </div>

          {/* User Verification Management Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16181C] overflow-hidden shadow-xs">
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1D9BF0]" />
                <span>Collegiate Profiles & Verification Status</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {mockUsersList.length} Accounts Monitored
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-[#0A0A0A] text-slate-500 text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Scholar / Entity</th>
                    <th className="p-3">Private University</th>
                    <th className="p-3">Followers</th>
                    <th className="p-3">Current Badge</th>
                    <th className="p-3">Source / Status</th>
                    <th className="p-3 text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {mockUsersList.map((u) => {
                    const activeTier = u.tier;
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs border border-slate-200 dark:border-slate-700">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                                <span>{u.name}</span>
                                <VerifiedBadge type={activeTier} size="small" />
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-[#1D9BF0] font-medium">{u.university}</span>
                          <div className="text-[10px] text-slate-400">{u.level}</div>
                        </td>
                        <td className="p-3 font-mono font-medium">
                          {u.followersCount.toLocaleString()}
                          {u.followersCount >= 1000 && activeTier === 'none' && (
                            <span className="ml-1 text-[10px] text-amber-500 font-semibold">(Milestone reached)</span>
                          )}
                          {u.followersCount === 999 && (
                            <span className="ml-1 text-[10px] text-slate-400 font-normal">(1 away from Blue)</span>
                          )}
                        </td>
                        <td className="p-3">
                          {activeTier === 'gold' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-300 dark:border-amber-700 text-[10px]">
                              <VerifiedBadge type="gold" size="small" showPopover={false} />
                              <span>Gold Tick</span>
                            </span>
                          )}
                          {activeTier === 'blue' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-semibold border border-sky-300 dark:border-sky-800 text-[10px]">
                              <VerifiedBadge type="blue" size="small" showPopover={false} />
                              <span>Blue Tick</span>
                            </span>
                          )}
                          {activeTier === 'none' && (
                            <span className="text-slate-400 text-[11px]">None</span>
                          )}
                        </td>
                        <td className="p-3">
                          {u.isLocked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                              Manual / Locked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                              Auto Eligible
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUserForVerification({
                                id: u.id,
                                name: u.name,
                                username: u.username,
                                university: u.university,
                                followersCount: u.followersCount,
                                currentTier: activeTier
                              });
                              setNewTierSelection(activeTier === 'gold' ? 'blue' : 'gold');
                              setVerificationReason('');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#1D9BF0] hover:text-[#1D9BF0] text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer text-[11px]"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Manage Tier</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Audit Log Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16181C] overflow-hidden shadow-xs">
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Verification Audit Log (<code>verification_audit_log</code>)</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {verificationLogs.length} Logged Events
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-[#0A0A0A] text-slate-500 text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Account</th>
                    <th className="p-3">Tier Transition</th>
                    <th className="p-3">Authorised By</th>
                    <th className="p-3">Mandatory Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-[11px]">
                  {verificationLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <td className="p-3 text-slate-400 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white">
                        @{log.username}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="text-slate-400 uppercase font-bold text-[10px]">{log.oldTier}</span>
                        <span className="mx-1 text-slate-400">→</span>
                        <span
                          className={`uppercase font-bold text-[10px] px-1.5 py-0.5 rounded ${
                            log.newTier === 'gold'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : log.newTier === 'blue'
                              ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {log.newTier}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">
                        {log.adminUsername || log.adminId}
                      </td>
                      <td className="p-3 font-sans text-slate-700 dark:text-slate-300 max-w-xs truncate">
                        {log.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

      {/* Interactive Verification Tier Adjustment Modal */}
      {selectedUserForVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-2xl p-5 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Manage Verification Status</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Update verification tier for <strong>{selectedUserForVerification.name}</strong> (@{selectedUserForVerification.username})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForVerification(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Select Target Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTierSelection('none')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      newTierSelection === 'none'
                        ? 'border-slate-400 bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="text-sm">None</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Revoke / Unverified</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewTierSelection('blue')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      newTierSelection === 'blue'
                        ? 'border-[#1D9BF0] bg-sky-50 dark:bg-sky-950/50 font-bold text-[#1D9BF0]'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 text-sm font-bold text-[#1D9BF0]">
                      <VerifiedBadge type="blue" size="small" showPopover={false} />
                      <span>Blue Tick</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">1,000+ Followers</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewTierSelection('gold')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      newTierSelection === 'gold'
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/50 font-bold text-amber-600 dark:text-amber-400'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 text-sm font-bold text-amber-500">
                      <VerifiedBadge type="gold" size="small" showPopover={false} />
                      <span>Gold Tick</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Official Admin / Partner</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  Mandatory Reason for Audit Log *
                </label>
                <textarea
                  rows={2}
                  value={verificationReason}
                  onChange={(e) => setVerificationReason(e.target.value)}
                  placeholder="e.g. Official University communications channel, Accredited student association, Community guidelines violation..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1D9BF0]"
                />

                {/* Quick suggestion templates */}
                <div className="flex items-center gap-1 flex-wrap mt-2">
                  <span className="text-[10px] text-slate-400">Quick template:</span>
                  {[
                    'Official university communications channel',
                    'Accredited faculty student organization',
                    'Official collegiate store vendor partnership',
                    'Manual review: Verified collegiate notable account',
                    'Community policy review: Verification revoked'
                  ].map((tpl) => (
                    <button
                      type="button"
                      key={tpl}
                      onClick={() => setVerificationReason(tpl)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#1D9BF0] transition-colors"
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedUserForVerification(null)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!verificationReason.trim()}
                onClick={() => {
                  if (!verificationReason.trim()) return;
                  setVerificationTierForUser(
                    selectedUserForVerification.id,
                    newTierSelection,
                    verificationReason.trim()
                  );
                  setSelectedUserForVerification(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                Apply & Record to Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
