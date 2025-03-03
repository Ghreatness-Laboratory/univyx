import { Heart, MessageCircle, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { universityNews } from "../../../data/entertainment/news";
import AuthRequiredOverlay from "./AuthRequiredOverlay";
import CommentSection from "./CommentSection";

export default function NewsModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const section = searchParams.get("section");
  const [isLiked, setIsLiked] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });
  const [overlayType, setOverlayType] = useState<"like" | "comment" | "share">(
    "like"
  );

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
    if (id && section === "news") {
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

  if (!id || section !== "news") return null;

  const content = universityNews.find((item) => item.id === Number(id));

  if (!content) return null;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setOverlayType("like");
      setShowAuthOverlay(true);
      return;
    }
    setIsLiked(!isLiked);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setOverlayType("comment");
      setShowAuthOverlay(true);
      return;
    }
    document
      .getElementById("comment-section")
      ?.scrollIntoView({ behavior: "smooth" });
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
          <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {content.category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-700 font-medium">
                  {content.source}
                </span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-500">
                  {content.readTime}
                </span>
              </div>
              <span className="text-sm text-gray-500">{content.date}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{content.title}</h2>

          <div className="prose max-w-none mb-6">
            <p>{content.content}</p>
          </div>

          <div className="flex items-center justify-between border-t border-b py-4 my-4">
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
                className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors"
                onClick={handleComment}
              >
                <MessageCircle size={20} />
                <span>Comment</span>
              </button>
            </div>

            <button
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </button>
          </div>

          <div id="comment-section" className="mt-6">
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
          type={overlayType}
        />
      )}
    </div>
  );
}
