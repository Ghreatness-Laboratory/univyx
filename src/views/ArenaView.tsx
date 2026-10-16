import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { PostComposer } from '../components/PostComposer';
import { CommentsModal } from '../components/CommentsModal';
import {
  Trophy,
  Gamepad2,
  Users,
  Award,
  Bell,
  Sparkles,
  Calendar,
  Shield,
  Zap,
  Target,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Post } from '../types';

export const ArenaView: React.FC = () => {
  const {
    rankings,
    arenaAnnouncements,
    posts,
    currentUser,
    selectedUniversityId,
    showToast
  } = useApp();

  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(() => {
    return localStorage.getItem('univyx_arena_waitlist') === 'true';
  });
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'overall' | 'academic' | 'gaming' | 'sports'>('overall');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    localStorage.setItem('univyx_arena_waitlist', 'true');
    setHasJoinedWaitlist(true);
    showToast('You are on the univyX Arena early-access collegiate roster!');
  };

  const arenaPosts = posts.filter((p) => {
    if (selectedUniversityId !== 'all' && p.university_id && p.university_id !== selectedUniversityId) {
      return false;
    }
    return p.category === 'gaming';
  });

  // Sort rankings based on active leaderboard criteria
  const sortedRankings = [...rankings].sort((a, b) => {
    if (activeLeaderboardTab === 'academic') return b.academic_score - a.academic_score;
    if (activeLeaderboardTab === 'gaming') return b.gaming_score - a.gaming_score;
    if (activeLeaderboardTab === 'sports') return b.sports_score - a.sports_score;
    return b.power_score - a.power_score;
  });

  const plannedFeatures = [
    {
      icon: Users,
      title: 'Collegiate Student Avatar',
      desc: 'Customize your student identity, faculty gear, and campus society insignia.'
    },
    {
      icon: Target,
      title: 'Interactive Campus Challenges',
      desc: 'Defend your faculty in collegiate hackathons, debate leagues, and academic quiz bowls.'
    },
    {
      icon: Trophy,
      title: 'University Power Rankings',
      desc: 'Every challenge won adds live power points to your university\'s national standing.'
    },
    {
      icon: Award,
      title: 'Tier Progression & Awards',
      desc: 'Unlock verifiable collegiate trophies, campus hall of fame plaques, and sponsored swag.'
    }
  ];

  return (
    <div className="w-full min-w-0">
      {/* Hero: Coming Soon Banner */}
      <div className="p-5 sm:p-7 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-[#1D9BF0]/10 via-white dark:via-[#0A0A0A] to-white dark:to-[#0A0A0A]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1D9BF0] mb-2">
          <Gamepad2 className="w-4 h-4" />
          <span>Collegiate Simulation & Esports · In Active Development</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          univyX Arena
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
          The upcoming browser-based student-life simulation game where campus scholars compete, complete academic quests, and represent their university on the national leaderboard.
        </p>

        {/* Waitlist Form */}
        <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 max-w-md shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Collegiate Alpha Access Waitlist</span>
            </span>
            <span className="text-[10px] text-slate-400">Season 1 Launch</span>
          </div>

          {hasJoinedWaitlist ? (
            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium py-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You have secured priority access. We will notify your university email!</span>
            </div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="flex gap-2">
              <input
                type="email"
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter university or personal email..."
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1D9BF0] text-white text-xs font-semibold hover:bg-[#1A8CD8] transition-colors shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Planned Simulation Features */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-[#0E1013]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Planned Simulation Mechanics (Roadmap Preview)
          </h2>
          <span className="text-[11px] text-slate-400">Phase 4 Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plannedFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1D9BF0]/15 text-[#1D9BF0] flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {feat.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-normal">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified University Power Rankings Leaderboard */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0A]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Collegiate Power Standings (2026/2027)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Computed from verified inter-campus debate leagues, esports invitationals, and academic competitions.
            </p>
          </div>
        </div>

        {/* Leaderboard Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#16181C] rounded-xl mb-3 text-xs">
          <button
            onClick={() => setActiveLeaderboardTab('overall')}
            className={`flex-1 py-1.5 font-medium rounded-lg transition-colors ${
              activeLeaderboardTab === 'overall'
                ? 'bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Overall Power
          </button>
          <button
            onClick={() => setActiveLeaderboardTab('academic')}
            className={`flex-1 py-1.5 font-medium rounded-lg transition-colors ${
              activeLeaderboardTab === 'academic'
                ? 'bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Academic
          </button>
          <button
            onClick={() => setActiveLeaderboardTab('gaming')}
            className={`flex-1 py-1.5 font-medium rounded-lg transition-colors ${
              activeLeaderboardTab === 'gaming'
                ? 'bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Esports / Gaming
          </button>
          <button
            onClick={() => setActiveLeaderboardTab('sports')}
            className={`flex-1 py-1.5 font-medium rounded-lg transition-colors ${
              activeLeaderboardTab === 'sports'
                ? 'bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Athletics
          </button>
        </div>

        {/* Leaderboard Table (tabular numerals) */}
        <div className="space-y-2">
          {sortedRankings.map((rank, index) => {
            const isTop3 = index < 3;
            const score =
              activeLeaderboardTab === 'academic'
                ? rank.academic_score
                : activeLeaderboardTab === 'gaming'
                ? rank.gaming_score
                : activeLeaderboardTab === 'sports'
                ? rank.sports_score
                : rank.power_score;

            return (
              <div
                key={rank.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#16181C] border border-slate-200/80 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                      index === 0
                        ? 'bg-amber-400 text-black'
                        : index === 1
                        ? 'bg-slate-300 text-black'
                        : index === 2
                        ? 'bg-amber-700/60 text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {rank.university_name}
                      </span>
                      <span className="text-slate-400">({rank.university_short})</span>
                    </div>
                    {rank.badge && (
                      <span className="text-[11px] text-[#1D9BF0] font-medium">
                        {rank.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="tabular-nums font-extrabold text-sm text-slate-900 dark:text-white">
                    {score.toFixed(1)}
                  </span>
                  <div className="text-[10px] text-slate-400">
                    {rank.tournaments_won} titles won
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tournaments & Schedules */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0E1013]">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
          Upcoming Collegiate Tournaments & Challenges
        </h3>
        <div className="space-y-3">
          {arenaAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs"
            >
              <div className="flex items-center justify-between text-[11px] text-[#1D9BF0] font-semibold mb-1">
                <span>{ann.category}</span>
                {ann.event_date && (
                  <span className="text-slate-400">
                    Starts {new Date(ann.event_date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {ann.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                {ann.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gaming Community Discussion Feed */}
      <div className="p-4 sm:p-5">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
          Arena Community Discussions
        </h3>
        <PostComposer defaultCategory="gaming" />

        <div className="mt-3">
          {arenaPosts.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No gaming posts yet. Challenge rival campuses to an arena derby!
            </div>
          ) : (
            arenaPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onOpenComments={(p) => setActiveCommentsPost(p)}
              />
            ))
          )}
        </div>
      </div>

      {activeCommentsPost && (
        <CommentsModal
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}
    </div>
  );
};
