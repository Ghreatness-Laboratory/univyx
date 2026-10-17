import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from './VerifiedBadge';
import { VerificationTier } from '../types';
import {
  TrendingUp,
  Calendar,
  Briefcase,
  Trophy,
  Building2,
  ChevronRight,
  Users,
  UserPlus,
  Check
} from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const {
    posts,
    events,
    opportunities,
    rankings,
    setActiveTab,
    selectedUniversityId,
    setSelectedUniversityId,
    universities
  } = useApp();

  const [followedMap, setFollowedMap] = useState<Record<string, boolean>>({});

  // Extract dynamic trending hashtags and topics from actual posts
  const hashtagMap: Record<string, number> = {};
  posts.forEach((p) => {
    const matches = p.content.match(/#[a-zA-Z0-9_]+/g);
    if (matches) {
      matches.forEach((tag) => {
        hashtagMap[tag] = (hashtagMap[tag] || 0) + 1;
      });
    }
  });

  const trendingTopics = Object.entries(hashtagMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const upcomingEvents = events.slice(0, 2);
  const flashOpportunities = opportunities.filter((o) => o.status === 'published').slice(0, 2);
  const topRankings = rankings.slice(0, 3);

  return (
    <aside className="w-80 shrink-0 hidden lg:block space-y-4 py-4 px-3 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar">
      {/* University Campus Filter Card */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
            <Building2 className="w-4 h-4 text-[#1D9BF0]" />
            <span>Campus Feed Focus</span>
          </div>
          {selectedUniversityId !== 'all' && (
            <button
              onClick={() => setSelectedUniversityId('all')}
              className="text-[11px] text-[#1D9BF0] hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <select
          value={selectedUniversityId}
          onChange={(e) => setSelectedUniversityId(e.target.value)}
          className="w-full text-xs p-2 rounded-xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#1D9BF0] cursor-pointer"
        >
          <option value="all">All Participating Campuses</option>
          {universities.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.shortName || u.short_name})
            </option>
          ))}
        </select>
      </div>

      {/* Suggested Campus Accounts (Who to follow) */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
            <Users className="w-4 h-4 text-[#1D9BF0]" />
            <span>Suggested Accounts</span>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-[11px] text-[#1D9BF0] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'usr-covenant-admin',
              name: 'Covenant University',
              username: 'covenant_official',
              university: 'Covenant University',
              tier: 'gold' as VerificationTier
            },
            {
              id: 'usr-cst-council',
              name: 'CST Student Council',
              username: 'cst_council',
              university: 'Covenant University',
              tier: 'gold' as VerificationTier
            },
            {
              id: 'usr-korede',
              name: 'Korede Balogun',
              username: 'korede_babcock',
              university: 'Babcock University',
              tier: 'blue' as VerificationTier
            },
            {
              id: 'usr-tobi',
              name: 'Tobi Adebayo',
              username: 'tobi_adebayo',
              university: 'Babcock University',
              tier: 'none' as VerificationTier
            },
            {
              id: 'usr-zainab',
              name: 'Zainab Al-Hassan',
              username: 'zainab_nile',
              university: 'Nile University of Nigeria',
              tier: 'blue' as VerificationTier
            }
          ].map((acc) => (
            <div
              key={acc.id}
              className="flex items-center justify-between gap-3 text-xs group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F1419] dark:text-[#E7E9EA] font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 text-[15px]">
                  {acc.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                    <span className="display-name font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA] truncate shrink-0 max-w-[100px] sm:max-w-[120px] group-hover:underline">
                      {acc.name}
                    </span>
                    <VerifiedBadge type={acc.tier} size="small" />
                  </div>
                  <div className="handle-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] truncate">
                    @{acc.username}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFollowedMap((prev) => ({
                    ...prev,
                    [acc.id]: !prev[acc.id]
                  }));
                }}
                className={`btn-pill text-[15px] font-bold px-4 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  followedMap[acc.id]
                    ? 'border border-slate-300 dark:border-slate-700 bg-transparent text-[#0F1419] dark:text-[#E7E9EA] hover:border-red-500 hover:text-red-500 hover:bg-red-500/10'
                    : 'bg-[#0F1419] dark:bg-[#E7E9EA] text-white dark:text-[#0F1419] hover:opacity-90 active:scale-95'
                }`}
              >
                {followedMap[acc.id] ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Campus Topics */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-3">
          <TrendingUp className="w-4 h-4 text-[#1D9BF0]" />
          <span>Trending on Campus</span>
        </div>

        {trendingTopics.length > 0 ? (
          <div className="space-y-2.5">
            {trendingTopics.map(([tag, count], idx) => (
              <div
                key={tag}
                onClick={() => setActiveTab('entertainment')}
                className="group cursor-pointer text-xs"
              >
                <div className="text-[10px] text-slate-400 font-mono">0{idx + 1} · Trending Topic</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#1D9BF0] transition-colors">
                  {tag}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {count} campus {count === 1 ? 'post' : 'posts'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">Join campus discussions to set trending topics.</p>
        )}
      </div>

      {/* Arena Power Rankings Preview */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Univyx Arena Standings</span>
          </div>
          <button
            onClick={() => setActiveTab('arena')}
            className="text-[11px] text-[#1D9BF0] hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {topRankings.map((rank, idx) => (
            <div
              key={rank.id}
              className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-none"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 text-[11px] w-4">#{idx + 1}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {rank.shortName || rank.university_short || rank.universityName}
                </span>
              </div>
              <span className="tabular-nums font-semibold text-slate-900 dark:text-white">
                {rank.powerScore ?? rank.power_score} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CIVYN Flash Opportunities */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
            <Briefcase className="w-4 h-4 text-[#1D9BF0]" />
            <span>CIVYN Opportunities</span>
          </div>
          <button
            onClick={() => setActiveTab('academics')}
            className="text-[11px] text-[#1D9BF0] hover:underline flex items-center gap-0.5"
          >
            <span>Explore</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {flashOpportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => setActiveTab('academics')}
              className="group cursor-pointer text-xs p-2 rounded-xl bg-white dark:bg-[#0A0A0A] border border-slate-200/60 dark:border-slate-800"
            >
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#1D9BF0] transition-colors line-clamp-1">
                {opp.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{opp.organization}</p>
              <div className="text-[11px] text-[#1D9BF0] font-medium mt-1">
                {opp.compensation || 'Competitive'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Campus Events */}
      {upcomingEvents.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-3">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>Upcoming Campus Events</span>
          </div>

          <div className="space-y-2.5">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="text-xs">
                <h5 className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                  {evt.title}
                </h5>
                <p className="text-[11px] text-slate-500">{evt.venue}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Public Footer Links (NEVER links to admin) */}
      <footer className="px-2 pt-2 text-[11px] text-slate-400 dark:text-slate-500 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setActiveTab('about')} className="hover:underline">About</button>
          <span aria-hidden="true">·</span>
          <button onClick={() => setActiveTab('privacy')} className="hover:underline">Privacy & Terms</button>
          <span aria-hidden="true">·</span>
          <button onClick={() => setActiveTab('settings')} className="hover:underline">Settings</button>
        </div>
        <p>© 2026 Univyx. Revolutionalizing the student experience.</p>
      </footer>
    </aside>
  );
};
