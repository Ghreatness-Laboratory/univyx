import React from 'react';
import { useApp } from '../context/AppContext';
import { PostComposer } from './PostComposer';
import { X } from 'lucide-react';

export const ComposerModal: React.FC = () => {
  const { isComposerOpen, setIsComposerOpen } = useApp();

  if (!isComposerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg card-theme shadow-2xl overflow-hidden mt-12 sm:mt-0">
        <div className="p-3.5 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold text-text">
            Create Campus Post
          </span>
          <button
            onClick={() => setIsComposerOpen(false)}
            aria-label="Close composer"
            className="p-1 text-text-muted hover:text-text rounded-lg hover:bg-accent-soft/40 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-5 h-5 text-text-muted" strokeWidth={1.8} />
          </button>
        </div>
        <div className="p-2">
          <PostComposer onClose={() => setIsComposerOpen(false)} initiallyExpanded={true} />
        </div>
      </div>
    </div>
  );
};
