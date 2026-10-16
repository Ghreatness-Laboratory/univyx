import React from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from './PostComposer';
import { X } from 'lucide-react';

export const ComposerModal: React.FC = () => {
  const { isComposerOpen, setIsComposerOpen } = useApp();

  if (!isComposerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#16181C] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mt-12 sm:mt-0">
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Create Campus Post
          </span>
          <button
            onClick={() => setIsComposerOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <PostComposer onClose={() => setIsComposerOpen(false)} />
      </div>
    </div>
  );
};
