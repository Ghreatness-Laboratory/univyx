import React from "react";

interface AuthRequiredOverlayProps {
  position: { top: number; left: number };
  onClose: (e?: React.MouseEvent) => void;
  type?: "like" | "comment" | "share" | "bookmark" | "discuss";
}

export default function AuthRequiredOverlay({ 
  position, 
  onClose, 
  type = "like" 
}: AuthRequiredOverlayProps) {
  const offsetTop = window.scrollY + position.top - 100; // Adjust position to be above the clicked element
  
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
          You need to be logged in to {type === "like" ? "like" : 
            type === "comment" ? "comment on" : 
            type === "share" ? "share" : 
            type === "bookmark" ? "bookmark" :
            type === "discuss" ? "start a discussion on" : 
            "interact with"} this content
        </p>
        <div className="flex gap-2 justify-center">
          <button 
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Add login functionality
              onClose(e);
            }}
          >
            Login
          </button>
          <button 
            className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Add signup functionality
              onClose(e);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}