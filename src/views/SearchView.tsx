import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MessageSquare, Briefcase, ShoppingBag, BookOpen, Building2 } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { CommentsModal } from '../components/CommentsModal';
import { Post } from '../types';

export const SearchView: React.FC = () => {
  const { posts, opportunities, products, universities, knowledgeEntries, setActiveTab } = useApp();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'posts' | 'opportunities' | 'products' | 'academics'>('all');
  const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);

  const q = query.trim().toLowerCase();

  const matchingPosts = q ? posts.filter((p) => p.content.toLowerCase().includes(q) || p.author.username.toLowerCase().includes(q)) : [];
  const matchingOpps = q ? opportunities.filter((o) => o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q) || o.required_skills.some(s => s.toLowerCase().includes(q))) : [];
  const matchingProducts = q ? products.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : [];
  const matchingKnowledge = q ? knowledgeEntries.filter((k) => k.title.toLowerCase().includes(q) || k.content.toLowerCase().includes(q)) : [];

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
          placeholder="Search campus discussions, opportunities, products, formulas..."
          className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1D9BF0] shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-full font-medium ${filterType === 'all' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
        >
          All Results
        </button>
        <button
          onClick={() => setFilterType('posts')}
          className={`px-3 py-1.5 rounded-full font-medium ${filterType === 'posts' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
        >
          Posts ({matchingPosts.length})
        </button>
        <button
          onClick={() => setFilterType('opportunities')}
          className={`px-3 py-1.5 rounded-full font-medium ${filterType === 'opportunities' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
        >
          CIVYN Careers ({matchingOpps.length})
        </button>
        <button
          onClick={() => setFilterType('products')}
          className={`px-3 py-1.5 rounded-full font-medium ${filterType === 'products' ? 'bg-[#1D9BF0] text-white' : 'bg-slate-100 dark:bg-[#16181C] text-slate-600 dark:text-slate-400'}`}
        >
          Marketplace ({matchingProducts.length})
        </button>
      </div>

      {/* Results Content */}
      {!q ? (
        <div className="py-16 text-center text-xs text-slate-400">
          Type above to explore university conversations, career postings, and products.
        </div>
      ) : (
        <div className="space-y-6">
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
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs cursor-pointer hover:border-[#1D9BF0]"
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
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 text-xs cursor-pointer hover:border-[#1D9BF0]"
                  >
                    <span className="text-slate-400 font-semibold">{prod.currency} {prod.price.toLocaleString()}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{prod.name}</h4>
                    <p className="text-slate-500 mt-1 truncate">Pickup: {prod.pickup_location}</p>
                  </div>
                ))}
              </div>
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
