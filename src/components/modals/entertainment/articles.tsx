import { Bookmark, BookmarkCheck, Clock, Heart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { studentArticles } from "../../../data/entertainment/articles";
import AuthRequiredOverlay from "./AuthRequiredOverlay";
import CommentSection from "./CommentSection";

export default function ArticlesModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const section = searchParams.get("section");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });

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
    if (id && section === "articles") {
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

  if (!id || section !== "articles") return null;

  const content = studentArticles.find((item) => item.id === Number(id));

  if (!content) return null;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setShowAuthOverlay(true);
      return;
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setShowAuthOverlay(true);
      return;
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <button
        className="absolute top-2 md:top-4 right-3 md:right-6 text-white hover:opacity-50"
        onClick={closeModal}
      >
        ✖
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
          <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {content.category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <User size={18} className="text-purple-500 mr-2" />
              <span className="text-sm text-gray-700 font-medium">
                {content.author}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <Clock size={16} className="text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">{content.readTime}</span>
            </div>
            <span className="text-sm text-gray-500">{content.date}</span>
          </div>

          <h2 className="text-2xl font-bold mb-4">{content.title}</h2>

          <div className="prose max-w-none mb-6">
            <p>{content.content}</p>
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-1 ${
                  isLiked ? "text-red-500" : "text-gray-500"
                } hover:text-red-500 transition-colors`}
                onClick={handleLike}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{isLiked ? content.likes + 1 : content.likes}</span>
              </button>

              <button
                className={`flex items-center gap-1 ${
                  isBookmarked ? "text-purple-500" : "text-gray-500"
                } hover:text-purple-500 transition-colors`}
                onClick={handleBookmark}
              >
                {isBookmarked ? (
                  <BookmarkCheck size={20} />
                ) : (
                  <Bookmark size={20} />
                )}
                <span>Save</span>
              </button>
            </div>
          </div>

          <div id="article-comment-section" className="mt-6">
            <CommentSection />
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
        />
      )}
    </div>
  );
}
