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
  Edit3,
  Megaphone,
  Play,
  Pause,
  Plus,
  Upload
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
    setVerificationTierForUser,
    ads,
    createAd,
    updateAd,
    deleteAd
  } = useApp();

  const [section, setSection] = useState<
    'overview' | 'posts' | 'users' | 'universities' | 'opportunities' | 'stores' | 'reports' | 'ads' | 'settings'
  >('overview');

  // Ad Center state
  const [adFilter, setAdFilter] = useState<'all' | 'Running' | 'Paused' | 'Pending' | 'Completed'>('all');
  const [showCreateAdModal, setShowCreateAdModal] = useState(false);
  const [newAdAdvertiser, setNewAdAdvertiser] = useState('');
  const [newAdHeadline, setNewAdHeadline] = useState('');
  const [newAdBody, setNewAdBody] = useState('');
  const [newAdDestUrl, setNewAdDestUrl] = useState('');
  const [newAdCtaText, setNewAdCtaText] = useState('Learn More');
  const [newAdPlacement, setNewAdPlacement] = useState<'home' | 'academics' | 'store'>('home');
  const [newAdTargetUni, setNewAdTargetUni] = useState('all');
  const [newAdMediaType, setNewAdMediaType] = useState<'image' | 'video'>('image');
  const [newAdMediaUrl, setNewAdMediaUrl] = useState('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
  const [newAdMediaFileName, setNewAdMediaFileName] = useState('');
  const [newAdError, setNewAdError] = useState('');

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
          { id: 'ads', label: `Ad Center (${ads.length})`, icon: Megaphone },
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

      {/* 8. AD CENTER (ADMIN ONLY) */}
      {section === 'ads' && (
        <div className="space-y-4 text-xs">
          {/* Header & Metrics */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Megaphone className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-base text-[#0F1419] dark:text-[#E7E9EA]">
                  Univyx Sponsored Ads Center
                </h3>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Manage high-intent collegiate ad campaigns. Strictly accessible via admin credentials.
              </p>
            </div>

            <button
              onClick={() => setShowCreateAdModal(true)}
              className="btn-pill px-4 py-2 bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Ad Campaign</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Running Campaigns</span>
              <div className="text-xl font-bold font-display mt-0.5">
                {ads.filter((a) => a.status === 'Running' || a.status === 'Active').length}
              </div>
              <span className="text-[10px] text-emerald-500 font-medium">Live on feeds</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Total Impressions</span>
              <div className="text-xl font-bold font-display mt-0.5">
                {ads.reduce((acc, a) => acc + (a.impressions || 0), 0).toLocaleString()}
              </div>
              <span className="text-[10px] text-[#1D9BF0] font-medium">Collegiate reach</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Total Clicks</span>
              <div className="text-xl font-bold font-display mt-0.5">
                {ads.reduce((acc, a) => acc + (a.clicks || 0), 0).toLocaleString()}
              </div>
              <span className="text-[10px] text-purple-500 font-medium">Student engagement</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-medium">Average CTR</span>
              <div className="text-xl font-bold font-display mt-0.5">
                {ads.length > 0
                  ? (ads.reduce((acc, a) => acc + (a.ctr || 0), 0) / ads.length).toFixed(2)
                  : '0.00'}%
              </div>
              <span className="text-[10px] text-emerald-500 font-medium">High intent</span>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['all', 'Running', 'Paused', 'Pending', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setAdFilter(st as any)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer capitalize text-[11px] ${
                  adFilter === st
                    ? 'bg-[#1D9BF0] text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st === 'all' ? `All Campaigns (${ads.length})` : st}
              </button>
            ))}
          </div>

          {/* Ads Table */}
          <div className="rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#121417] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3">Advertiser & Campaign</th>
                  <th className="p-3">Placement</th>
                  <th className="p-3">Target Uni</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Spend</th>
                  <th className="p-3">Impressions</th>
                  <th className="p-3">Clicks</th>
                  <th className="p-3">CTR</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {ads
                  .filter((a) => {
                    if (adFilter === 'all') return true;
                    if (adFilter === 'Running') return a.status === 'Running' || a.status === 'Active';
                    return a.status === adFilter;
                  })
                  .map((ad) => {
                    const isRunning = ad.status === 'Running' || ad.status === 'Active';
                    return (
                      <tr key={ad.id} className="hover:bg-slate-50 dark:hover:bg-[#121417] transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                              {ad.mediaType === 'video' ? (
                                <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center font-bold text-[9px]">
                                  VID
                                </div>
                              ) : (
                                <img src={ad.mediaUrl} alt="" className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="min-w-0 max-w-[200px]">
                              <span className="font-bold text-slate-900 dark:text-white truncate block">
                                {ad.advertiserName}
                              </span>
                              <span className="text-[11px] text-slate-500 truncate block">
                                {ad.headline || ad.title}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 capitalize text-slate-600 dark:text-slate-400">
                          {ad.placement || 'home'}
                        </td>
                        <td className="p-3 capitalize text-slate-600 dark:text-slate-400">
                          {ad.targetUniversityId === 'all' ? 'All Varsities' : ad.targetUniversityId}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isRunning
                                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                : ad.status === 'Paused'
                                ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                                : ad.status === 'Pending'
                                ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {ad.status}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">
                          {ad.spend || '₦120,000'}
                        </td>
                        <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                          {ad.impressions.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                          {ad.clicks.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono font-bold text-[#1D9BF0]">
                          {ad.ctr}%
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                updateAd(ad.id, {
                                  status: isRunning ? 'Paused' : 'Running'
                                });
                              }}
                              title={isRunning ? 'Pause Campaign' : 'Resume Campaign'}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
                            >
                              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                            </button>
                            <button
                              onClick={() => deleteAd(ad.id)}
                              title="Delete Campaign"
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. SETTINGS */}
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

      {/* Create Ad Modal (Admin Only) */}
      {showCreateAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#16181C] text-[#0F1419] dark:text-[#E7E9EA] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 text-xs max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-[#0F1419] dark:text-[#E7E9EA]">
                  Create Sponsored Ad Campaign
                </h3>
                <p className="text-[11px] text-slate-500">
                  Target students across private universities in home feed, academics, or store
                </p>
              </div>
              <button
                onClick={() => setShowCreateAdModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newAdAdvertiser.trim() || !newAdHeadline.trim() || !newAdBody.trim()) {
                  setNewAdError('Please fill out all required fields.');
                  return;
                }
                createAd({
                  advertiserName: newAdAdvertiser.trim(),
                  title: newAdHeadline.trim(),
                  headline: newAdHeadline.trim(),
                  text: newAdBody.trim(),
                  ctaLabel: newAdCtaText,
                  ctaUrl: newAdDestUrl.trim() || '#store',
                  mediaType: newAdMediaType,
                  mediaUrl: newAdMediaUrl,
                  placement: newAdPlacement,
                  targetUniversityId: newAdTargetUni,
                  status: 'Running',
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: '2026-12-31',
                  spend: '₦150,000'
                });
                setShowCreateAdModal(false);
                setNewAdAdvertiser('');
                setNewAdHeadline('');
                setNewAdBody('');
                setNewAdDestUrl('');
                setNewAdError('');
              }}
              className="space-y-3"
            >
              {newAdError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-semibold">
                  {newAdError}
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Advertiser Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Access Bank Collegiate Youth or Samsung Campus Hub"
                  value={newAdAdvertiser}
                  onChange={(e) => setNewAdAdvertiser(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50% Off Student Gadgets & Certified Delivery"
                  value={newAdHeadline}
                  onChange={(e) => setNewAdHeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Body Text *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your promotion or opportunity clearly for university students..."
                  value={newAdBody}
                  onChange={(e) => setNewAdBody(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or #store"
                    value={newAdDestUrl}
                    onChange={(e) => setNewAdDestUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    CTA Button Text *
                  </label>
                  <select
                    value={newAdCtaText}
                    onChange={(e) => setNewAdCtaText(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
                  >
                    <option value="Learn More">Learn More</option>
                    <option value="Shop Now">Shop Now</option>
                    <option value="Apply">Apply</option>
                    <option value="Sign Up">Sign Up</option>
                    <option value="Visit">Visit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Placement *
                  </label>
                  <select
                    value={newAdPlacement}
                    onChange={(e) => setNewAdPlacement(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
                  >
                    <option value="home">Home Feed</option>
                    <option value="academics">Academics</option>
                    <option value="store">Store</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target University *
                  </label>
                  <select
                    value={newAdTargetUni}
                    onChange={(e) => setNewAdTargetUni(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-[#0F1419] dark:text-[#E7E9EA]"
                  >
                    <option value="all">All Private Universities</option>
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Creative Media (Image or Video) *
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewAdMediaType('image');
                      setNewAdMediaUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
                    }}
                    className={`flex-1 p-2 rounded-xl border text-center font-bold ${
                      newAdMediaType === 'image'
                        ? 'bg-[#1D9BF0] text-white border-[#1D9BF0]'
                        : 'bg-slate-50 dark:bg-[#0A0A0A] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Image Ad
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewAdMediaType('video');
                      setNewAdMediaUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                    }}
                    className={`flex-1 p-2 rounded-xl border text-center font-bold ${
                      newAdMediaType === 'video'
                        ? 'bg-[#1D9BF0] text-white border-[#1D9BF0]'
                        : 'bg-slate-50 dark:bg-[#0A0A0A] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Video Ad
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center cursor-pointer relative bg-slate-50/50 dark:bg-[#0A0A0A]">
                  <input
                    type="file"
                    accept={newAdMediaType === 'video' ? 'video/*' : 'image/*'}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setNewAdMediaFileName(file.name);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-4 h-4 mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {newAdMediaFileName || `Click to mock upload ${newAdMediaType}`}
                  </p>
                  <p className="text-[10px] text-slate-400">1200x675 recommended format</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateAdModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1D9BF0] hover:bg-[#1A8CD8] text-white font-bold transition-colors shadow-xs cursor-pointer"
                >
                  Publish Campaign
                </button>
              </div>
            </form>
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
