import React from 'react';
import { Sparkles, GraduationCap, Briefcase, ShoppingBag, Trophy, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full min-w-0 p-5 sm:p-7 space-y-6 text-xs text-slate-700 dark:text-slate-300">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center p-2 shadow-sm">
            <svg viewBox="0 0 512 512" className="w-full h-full fill-white dark:fill-black stroke-white dark:stroke-black stroke-[30] stroke-linecap-round stroke-linejoin-round">
              <rect x="186" y="112" width="34" height="52" rx="17" transform="rotate(-22 203 138)" stroke="none"/>
              <rect x="178" y="348" width="52" height="34" rx="17" transform="rotate(-30 204 365)" stroke="none"/>
              <path d="M 235,260 L 98,228" strokeWidth="50"/>
              <path d="M 235,260 L 420,180" strokeWidth="50"/>
              <path d="M 235,260 L 210,195" strokeWidth="50"/>
              <path d="M 235,260 L 338,416" strokeWidth="52"/>
              <circle cx="235" cy="260" r="30" stroke="none"/>
            </svg>
          </div>
          <div>
            <span className="text-[#1D9BF0] font-bold text-xs uppercase tracking-wider block">Official Brand Identity</span>
            <span className="text-lg font-black tracking-wider text-slate-900 dark:text-white uppercase font-sans">
              univy<span className="text-[#1D9BF0]">X</span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          One Platform. Every Campus. Every Opportunity.
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
          univyX is a text-first university social network and digital ecosystem created specifically for undergraduate students, postgraduates, campus entrepreneurs, and collegiate communities.
        </p>
      </div>

      <div className="space-y-4 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Our 5 Core Pillars</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#1D9BF0]" />
              <span>1. Text-First Campus Feed</span>
            </h3>
            <p className="text-slate-500">
              Clear, distraction-free social networking where ideas, wit, and discussions take center stage without algorithmic clutter or visual distraction.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-[#1D9BF0]" />
              <span>2. Academics & AI Study Mentor</span>
            </h3>
            <p className="text-slate-500">
              Shared study materials, tutorials, CGPA calculation formulas, and server-side AI academic mentoring grounded in university curricula.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#1D9BF0]" />
              <span>3. CIVYN Careers</span>
            </h3>
            <p className="text-slate-500">
              Verified SIWES industrial placements, student internships, scholarships, and entry-level career opportunities tailored to collegiate calendars.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2 mb-1">
              <ShoppingBag className="w-4 h-4 text-[#1D9BF0]" />
              <span>4. Student Marketplace</span>
            </h3>
            <p className="text-slate-500">
              Discover campus vendors, thrift fashion, fast chargers, textbooks, and hostel essentials with direct peer-to-peer campus pickup.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#16181C] border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>5. univyX Arena (Coming Soon)</span>
          </h3>
          <p className="text-slate-500">
            Our upcoming collegiate simulation engine allowing scholars to earn live power rankings for their universities through esports, academic hackathons, and debate challenges.
          </p>
        </div>
      </div>
    </div>
  );
};
