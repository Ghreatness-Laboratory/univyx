import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MessageSquare, Briefcase, ShoppingBag, BookOpen, Building2, Users, Check, Sparkles } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { CommentsModal } from '../components/CommentsModal';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { Post, VerificationTier } from '../types';

export const SearchView: React.FC = () => {
  const { posts, opportunities, products, universities, knowledgeEntries, setActiveTab, showToast } = useApp();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'posts' | 'people' | 'opportunities' | 'products' | 'academics'>('all');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  const q = query.trim().toLowerCase();

  // Network scholars and accounts database
  const networkAccounts = [
    {
      id: 'usr-covenant-admin',
      name: 'Covenant University',
      username: 'covenant_official',
      university: 'Covenant University',
      followersCount: 18400,
      tier: 'gold' as VerificationTier,
      bio: 'Official university senate, accredited faculty notices, and central collegiate communications.'
    },
    {
      id: 'usr-cst-council',
      name: 'CST Student Council',
      username: 'cst_council',
      university: 'Covenant University',
      followersCount: 4200,
      tier: 'gold' as VerificationTier,
      bio: 'College of Science & Technology student representative body.'
    },
    {
      id: 'usr-korede',
      name: 'Korede Balogun',
      username: 'korede_babcock',
      university: 'Babcock University',
      followersCount: 1000,
      tier: 'blue' as VerificationTier,
      bio: 'Music & Arts scholar · Exactly 1,000 followers on Univyx.'
    },
    {
      id: 'usr-tobi',
      name: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      university: 'Babcock University',
      followersCount: 999,
      tier: 'none' as VerificationTier,
      bio: '300L Pre-med undergraduate · 999 followers (1 follower away from Blue Tick).'
    },
    {
      id: 'usr-zainab',
      name: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      university: 'Nile University of Nigeria',
      followersCount: 2150,
      tier: 'blue' as VerificationTier,
      bio: 'Cybersecurity lead · Inter-collegiate arena competitor.'
    },
    {
      id: 'usr-damola',
      name: 'Adedamola Adeleke',
      username: 'damola_abuad',
      university: 'Afe Babalola University (ABUAD)',
      followersCount: 1420,
      tier: 'blue' as VerificationTier,
      bio: '400L Law student · ABUAD Law Clinic lead.'
    },
    {
      id: 'usr-chidi',
      name: 'Chidi Okafor',
      username: 'chidi_cu',
      university: 'Covenant University',
      followersCount: 742,
      tier: 'none' as VerificationTier,
      bio: 'Software Engineering scholar · Building campus tech.'
    },
    {
      id: 'usr-pulse',
      name: 'Univyx Campus Pulse',
      username: 'univyx_official',
      university: 'All Private Universities',
      followersCount: 35000,
      tier: 'gold' as VerificationTier,
      bio: 'Official central network broadcast for private university students across Nigeria.'
    }
  ];

  let matchingPosts = q
    ? posts.filter((p) => {
        const matchesQuery =
          p.content.toLowerCase().includes(q) ||
          (p.author?.username || p.username).toLowerCase().includes(q) ||
          (p.authorName || p.author?.fullName || '').toLowerCase().includes(q);
        if (!matchesQuery) return false;
        if (onlyVerified) {
          const tier = p.verificationTier || p.verification_tier || p.author?.verificationTier || (p.isVerified ? 'blue' : 'none');
          return tier === 'blue' || tier === 'gold';
        }
        return true;
      })
    : [];

  let matchingAccounts = q
    ? networkAccounts.filter((a) => {
        const matchesQuery =
          a.name.toLowerCase().includes(q) ||
          a.username.toLowerCase().includes(q) ||
          a.university.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q);
        if (!matchesQuery) return false;
        if (onlyVerified) {
          return a.tier === 'blue' || a.tier === 'gold';
        }
        return true;
      })
    : onlyVerified
    ? networkAccounts.filter((a) => a.tier === 'blue' || a.tier === 'gold')
    : [];

  const matchingOpps = q
    ? opportunities.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.organization.toLowerCase().includes(q) ||
          (o.required_skills || o.requiredSkills || []).some((s) => s.toLowerCase().includes(q))
      )
    : [];
  const matchingProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.store_name || p.storeName || '').toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search campus discussions, scholars, official accounts, opportunities..."
          className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0] shadow-xs"
        />
      </div>

      {/* Filter Tabs & Optional Verified Filter Chip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setFilterType('all')}
          className={`btn-pill px-4 py-1.5 text-[15px] transition-colors shrink-0 cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#0F1419] dark:bg-[#E7E9EA] text-white dark:text-[#0F1419] font-bold'
              : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          All Results
        </button>
        <button
          onClick={() => setFilterType('people')}
          className={`btn-pill px-4 py-1.5 text-[15px] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 ${
            filterType === 'people'
              ? 'bg-[#0F1419] dark:bg-[#E7E9EA] text-white dark:text-[#0F1419] font-bold'
              : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Scholars & Accounts ({matchingAccounts.length})</span>
        </button>
        <button
          onClick={() => setFilterType('posts')}
          className={`btn-pill px-4 py-1.5 text-[15px] transition-colors shrink-0 cursor-pointer ${
            filterType === 'posts'
              ? 'bg-[#0F1419] dark:bg-[#E7E9EA] text-white dark:text-[#0F1419] font-bold'
              : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Posts ({matchingPosts.length})
        </button>
        <button
          onClick={() => setFilterType('opportunities')}
          className={`btn-pill px-4 py-1.5 text-[15px] transition-colors shrink-0 cursor-pointer ${
            filterType === 'opportunities'
              ? 'bg-[#0F1419] dark:bg-[#E7E9EA] text-white dark:text-[#0F1419] font-bold'
              : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          CIVYN Careers ({matchingOpps.length})
        </button>
        <button
          onClick={() => setFilterType('products')}
          className={`btn-pill px-4 py-1.5 text-[15px] transition-colors shrink-0 cursor-pointer ${
            filterType === 'products'
              ? 'bg-[#0F1419] dark:bg-[#E7E9EA] text-white dark:text-[#0F1419] font-bold'
              : 'bg-slate-100 dark:bg-[#16181C] text-[#536471] dark:text-[#71767B] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          Marketplace ({matchingProducts.length})
        </button>

        {/* Optional Verified Filter Chip */}
        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 shrink-0" />
        <button
          type="button"
          onClick={() => setOnlyVerified((prev) => !prev)}
          className={`btn-pill px-4 py-1.5 text-[15px] transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border ${
            onlyVerified
              ? 'bg-[#1D9BF0]/10 border-[#1D9BF0] text-[#1D9BF0] font-bold'
              : 'bg-white dark:bg-[#16181C] border-slate-200 dark:border-slate-800 text-[#536471] dark:text-[#71767B] font-semibold hover:border-slate-300'
          }`}
        >
          <VerifiedBadge type="blue" size="small" showPopover={false} />
          <span>Verified Accounts Only</span>
          {onlyVerified && <Check className="w-3.5 h-3.5 text-[#1D9BF0]" />}
        </button>
      </div>

      {/* Results Content */}
      {!q && !onlyVerified ? (
        <div className="py-16 text-center text-xs text-slate-400 space-y-2">
          <p>Type above to explore university conversations, verified scholars, career postings, and products.</p>
          <p className="text-[11px] text-slate-500">
            Tip: Try searching <span className="font-mono text-[#1D9BF0]">"Covenant"</span>, <span className="font-mono text-[#1D9BF0]">"Korede"</span>, or click <span className="font-medium">"Verified Accounts Only"</span>.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Matching Scholars / Accounts */}
          {(filterType === 'all' || filterType === 'people') && matchingAccounts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#1D9BF0]" />
                  <span>Scholars & Accounts ({matchingAccounts.length})</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchingAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 hover:border-[#1D9BF0]/50 transition-colors flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 text-sm">
                      {account.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 min-w-0 overflow-hidden leading-tight">
                        <span className="display-name font-bold text-[15px] text-[#0F1419] dark:text-[#E7E9EA] truncate shrink-0 max-w-[140px] sm:max-w-[180px]">
                          {account.name}
                        </span>
                        <VerifiedBadge type={account.tier} size="small" />
                        <span className="handle-text font-normal text-[15px] text-[#536471] dark:text-[#71767B] truncate shrink min-w-0">
                          @{account.username}
                        </span>
                      </div>
                      <div className="text-[13px] text-[#536471] dark:text-[#71767B] mt-0.5 truncate">
                        {account.university} · {account.followersCount.toLocaleString()} followers
                      </div>
                      <p className="post-text text-[15px] leading-[20px] text-[#0F1419] dark:text-[#E7E9EA] mt-1 line-clamp-2">
                        {account.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts */}
          {(filterType === 'all' || filterType === 'posts') && matchingPosts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Posts ({matchingPosts.length})
              </h3>
              <div className="space-y-2">
                {matchingPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onOpenComments={(p) => setActiveCommentsPost(p)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Opportunities */}
          {(filterType === 'all' || filterType === 'opportunities') && matchingOpps.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                CIVYN Opportunities ({matchingOpps.length})
              </h3>
              <div className="space-y-2.5">
                {matchingOpps.map((opp) => (
                  <div
                    key={opp.id}
                    onClick={() => setActiveTab('academics')}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs cursor-pointer hover:border-[#1D9BF0] transition-colors"
                  >
                    <span className="text-[#1D9BF0] font-semibold">{opp.organization}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{opp.title}</h4>
                    <p className="text-slate-500 mt-1">{opp.location} · {opp.compensation || 'Stipend provided'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {(filterType === 'all' || filterType === 'products') && matchingProducts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Store Products ({matchingProducts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => setActiveTab('store')}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs cursor-pointer hover:border-[#1D9BF0] transition-colors"
                  >
                    <span className="text-slate-400 font-semibold">{prod.currency} {prod.price.toLocaleString()}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{prod.name}</h4>
                    <p className="text-slate-500 mt-1 truncate">Pickup: {prod.pickup_location || prod.pickupLocation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state when query produces nothing */}
          {matchingPosts.length === 0 && matchingAccounts.length === 0 && matchingOpps.length === 0 && matchingProducts.length === 0 && (
            <div className="py-16 text-center text-xs text-slate-400">
              No results found matching "{query}" {onlyVerified ? 'with verified accounts' : ''}. Try broadening your search.
            </div>
          )}
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

