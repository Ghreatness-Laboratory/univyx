import React from "react";

interface AuthRequiredOverlayProps {
  position: { top: number; left: number };
  onClose: (e?: React.MouseEvent) => void;
}

export default function AuthRequiredOverlay({ 
  position, 
  onClose 
}: AuthRequiredOverlayProps) {
  const offsetTop = window.scrollY + position.top - 100; 
  
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      className="fixed z-[60] shadow-xl bg-white rounded-lg p-4 border border-gray-200"
      style={{ 
        top: `${offsetTop}px`, 
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        maxWidth: '300px'
      }}
      onClick={handleContainerClick}
    >
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          onClose(e);
        }}
      >
        ✖
      </button>
      <div className="text-center">
        <h4 className="font-bold text-lg mb-2">Login Required</h4>
        <p className="text-gray-600 mb-3">
          You need to be logged in to interact with this content.
        </p>
      </div>
    </div>
  );
}