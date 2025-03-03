import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { trendingTopics } from "../../../data/entertainment/trendingTopics";
import { MessageCircle, Share2, X } from "lucide-react";
import DiscussionSection from "./DiscussionSection";
import AuthRequiredOverlay from "./AuthRequiredOverlay";

export default function TopicsModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const section = searchParams.get("section");
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });
  const [overlayType, setOverlayType] = useState<"discuss" | "share">("discuss");

  useEffect(() => {
    setShowAuthOverlay(false);
  }, []);

  const closeModal = () => {
    searchParams.delete("id");
    searchParams.delete("section");
    setSearchParams(searchParams);
    setShowAuthOverlay(false);
  };

  useEffect(() => {
    if (id && section === "topics") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setShowAuthOverlay(false); 
    }
    return () => {
      document.body.style.overflow = "auto";
      setShowAuthOverlay(false);
    };
  }, [id, section]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!id || section !== "topics") return null;

  const content = trendingTopics.find((item) => item.id === Number(id));

  if (!content) return null;

  const handleAddDiscussion = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setOverlayType("discuss");
      setShowAuthOverlay(true);
      return;
    }
    document.getElementById("discussion-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setOverlayType("share");
      setShowAuthOverlay(true);
      return;
    }
    // Share functionality
  };

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <button
        className="absolute top-2 md:top-4 right-3 md:right-6 text-white hover:opacity-50 p-2 rounded-full bg-black/30 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      >
        <X size={20} />
      </button>
      <div 
        className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[86vh] md:max-h-[93vh] overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold text-white mb-3">{content.title}</h2>
            <div className="flex gap-2 flex-wrap mb-3">
              {content.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <MessageCircle size={18} className="text-teal-500 mr-2" />
              <span className="font-medium">
                {content.discussionCount} discussions
              </span>
            </div>
            <span className="text-sm text-gray-500">Updated {content.lastUpdated}</span>
          </div>
          
          <div className="prose max-w-none mb-6">
            <p className="text-lg">{content.title}</p>
          </div>
          
          <div className="flex items-center justify-between border-t border-b py-4 my-4">
            <button
              className="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors font-medium"
              onClick={handleAddDiscussion}
            >
              <MessageCircle size={20} />
              <span>Start a discussion</span>
            </button>
            
            <button
              className="text-teal-600 hover:text-teal-800 transition-colors"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Discussions</h3>
            <DiscussionSection />
          </div>
        </div>
      </div>
      
      {showAuthOverlay && (
        <AuthRequiredOverlay
          position={overlayPosition}
          onClose={(e) => {
            e?.stopPropagation();
            setShowAuthOverlay(false);
          }}
          type={overlayType}
        />
      )}
    </div>
  );
}