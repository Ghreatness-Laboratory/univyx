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
  Users
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
    <aside className="w-80 shrink-0 hidden lg:block space-y-3 py-4 px-3 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar">
      {/* University Campus Filter Card */}
      <div className="card-theme p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
            <Building2 className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>Campus Feed Focus</span>
          </div>
          {selectedUniversityId !== 'all' && (
            <button
              onClick={() => setSelectedUniversityId('all')}
              className="text-[11px] text-accent hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <select
          value={selectedUniversityId}
          onChange={(e) => setSelectedUniversityId(e.target.value)}
          className="w-full text-[11px] p-2 rounded-xl bg-bg border border-border text-text focus:outline-none focus:border-accent cursor-pointer"
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
      <div className="card-theme p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
            <Users className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>Suggested Accounts</span>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-[11px] text-accent hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="space-y-2.5">
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
              className="flex items-center justify-between gap-2.5 text-xs group"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-full avatar-gradient font-bold text-white flex items-center justify-center shrink-0 text-[11px]">
                  {acc.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                    <span className="font-bold text-[12px] text-text truncate shrink-0 max-w-[100px] group-hover:underline">
                      {acc.name}
                    </span>
                    <VerifiedBadge type={acc.tier} size="small" />
                  </div>
                  <div className="text-[10.5px] text-text-muted truncate">
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
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer ${
                  followedMap[acc.id]
                    ? 'border border-border bg-transparent text-text hover:border-live hover:text-live'
                    : 'chip-active hover:opacity-90 active:scale-95'
                }`}
              >
                {followedMap[acc.id] ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Campus Topics */}
      <div className="card-theme p-3.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text mb-2.5">
          <TrendingUp className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
          <span>Trending on Campus</span>
        </div>

        {trendingTopics.length > 0 ? (
          <div className="space-y-2">
            {trendingTopics.map(([tag, count], idx) => (
              <div
                key={tag}
                onClick={() => setActiveTab('entertainment')}
                className="group cursor-pointer text-xs"
              >
                <div className="text-[10px] text-text-muted font-mono">0{idx + 1} · Trending Topic</div>
                <div className="font-semibold text-text group-hover:text-accent transition-colors">
                  {tag}
                </div>
                <div className="text-[10.5px] text-text-muted">
                  {count} campus {count === 1 ? 'post' : 'posts'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted">Join campus discussions to set trending topics.</p>
        )}
      </div>

      {/* Arena Power Rankings Preview */}
      <div className="card-theme p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
            <Trophy className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>Univyx Arena Standings</span>
          </div>
          <button
            onClick={() => setActiveTab('arena')}
            className="text-[11px] text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1.5">
          {topRankings.map((rank, idx) => (
            <div
              key={rank.id}
              className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-text-muted text-[10.5px] w-4">#{idx + 1}</span>
                <span className="font-medium text-text text-[11px]">
                  {rank.shortName || rank.university_short || rank.universityName}
                </span>
              </div>
              <span className="tabular-nums font-semibold text-text text-[11px]">
                {rank.powerScore ?? rank.power_score} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CIVYN Flash Opportunities */}
      <div className="card-theme p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
            <Briefcase className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            <span>CIVYN Opportunities</span>
          </div>
          <button
            onClick={() => setActiveTab('academics')}
            className="text-[11px] text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Explore</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {flashOpportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => setActiveTab('academics')}
              className="group cursor-pointer text-xs p-2 rounded-xl bg-bg border border-border hover:border-accent transition-colors"
            >
              <h4 className="font-semibold text-text group-hover:text-accent transition-colors line-clamp-1 text-[11px]">
                {opp.title}
              </h4>
              <p className="text-[10px] text-text-muted mt-0.5">{opp.organization}</p>
              <div className="text-[10.5px] text-accent font-medium mt-1">
                {opp.compensation || 'Competitive'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Campus Events */}
      {upcomingEvents.length > 0 && (
        <div className="card-theme p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text mb-2.5">
            <Calendar className="w-3.5 h-3.5 text-success" strokeWidth={1.5} />
            <span>Upcoming Campus Events</span>
          </div>

          <div className="space-y-2">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="text-xs">
                <h5 className="font-medium text-text line-clamp-1 text-[11px]">
                  {evt.title}
                </h5>
                <p className="text-[10px] text-text-muted">{evt.venue}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Public Footer Links */}
      <footer className="px-2 pt-1 text-[10.5px] text-text-muted space-y-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => setActiveTab('about')} className="hover:underline cursor-pointer">About</button>
          <span aria-hidden="true">·</span>
          <button onClick={() => setActiveTab('privacy')} className="hover:underline cursor-pointer">Privacy & Terms</button>
          <span aria-hidden="true">·</span>
          <button onClick={() => setActiveTab('settings')} className="hover:underline cursor-pointer">Settings</button>
        </div>
        <p>© 2026 Univyx. Revolutionalizing the student experience.</p>
      </footer>
    </aside>
  );
};
