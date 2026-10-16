import React from 'react';
import { ShieldCheck, Lock, Eye, AlertOctagon } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="w-full min-w-0 p-5 sm:p-7 space-y-6 text-xs text-slate-700 dark:text-slate-300">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <span className="text-[#1D9BF0] font-bold text-xs uppercase tracking-wider">Legal & Trust</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          Privacy Policy & Community Guidelines
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Last revised: October 2026. Designed in compliance with standard university privacy ethics and NDPR principles.
        </p>
      </div>

      <div className="space-y-4 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#1D9BF0]" />
            <span>1. Information Collection & Least-Privilege</span>
          </h2>
          <p>
            univyX collects only the bare minimum data necessary to provide student social networking: display name, unique username, institutional email, academic level, and campus affiliation. We never harvest unneeded personal device metrics or sell student data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span>2. Zero-Tolerance Campus Safety Policy</span>
          </h2>
          <p>
            The campus entertainment and gossip streams must never be weaponized for targeted harassment. univyX strictly prohibits:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Doxxing or non-consensual disclosure of phone numbers, hostel room numbers, or private records.</li>
            <li>Targeted bullying, threats, cyberstalking, or extortion.</li>
            <li>Impersonating lecturers, student union executives, or fellow scholars.</li>
            <li>Promoting academic fraud, examination malpractice, or scam services.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>3. Marketplace & Transaction Safety</span>
          </h2>
          <p>
            All marketplace handovers take place in verified public campus locations (e.g. Student Union Building, Faculty Quads, Library foyer). univyX does not request banking passwords or debit card PINs.
          </p>
        </section>
      </div>
    </div>
  );
};
