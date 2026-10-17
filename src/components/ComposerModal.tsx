import React from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from './PostComposer';
import { X } from 'lucide-react';

export const ComposerModal: React.FC = () => {
  const { isComposerOpen, setIsComposerOpen } = useApp();

  if (!isComposerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-[20px] bg-white dark:bg-[#121A30] shadow-2xl border border-slate-200 dark:border-[#1E2846] overflow-hidden mt-12 sm:mt-0">
        <div className="p-3.5 border-b border-slate-100 dark:border-[#1E2846] flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-[#F2F5FF]">
            Create Campus Post
          </span>
          <button
            onClick={() => setIsComposerOpen(false)}
            aria-label="Close composer"
            className="p-1 text-[#8A94B3] hover:text-[#F2F5FF] rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E2846]/60 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>
        <div className="p-2">
          <PostComposer onClose={() => setIsComposerOpen(false)} />
        </div>
      </div>
    </div>
  );
};
