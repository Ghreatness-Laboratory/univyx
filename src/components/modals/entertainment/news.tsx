import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { universityNews } from "../../../data/entertainment/news";

export default function NewsModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const section = searchParams.get("section");
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const closeModal = () => {
    searchParams.delete("id");
    searchParams.delete("section");
    setSearchParams(searchParams);
    setShowLoginMessage(false);
  };

  useEffect(() => {
    if (id && section === "news") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setShowLoginMessage(false);
    }
    return () => {
      document.body.style.overflow = "auto";
      setShowLoginMessage(false);
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
      setShowLoginMessage(true);

      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }
    setIsLiked(!isLiked);
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
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {content.category}
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex max-md:flex-col gap-1 md:items-center justify-between">
              <div>
                <span className="text-sm text-gray-700 font-medium">
                  {content.source}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {content.readTime}
                </span>
              </div>
              <span className="text-sm text-gray-500">{content.date}</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{content.title}</h2>

          <div className="prose max-w-none mb-4">
            <p>{content.content}</p>
          </div>

          <div className="flex items-center justify-between mt-6 border-t pt-4">
            <span className="text-sm text-gray-500">{content.date}</span>
            <div className="relative">
              {showLoginMessage && (
                <div className="absolute bottom-full mb-2 right-0 bg-indigo-500 text-white shadow-md rounded-md p-2 text-sm z-10 w-48">
                  <p>Please log in to like this article</p>
                </div>
              )}
              <button
                className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium ${
                  isLiked
                    ? "text-red-500 border-red-500"
                    : "text-gray-500 border-gray-300"
                } hover:text-red-500 transition-colors`}
                onClick={handleLike}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{isLiked ? content.likes + 1 : content.likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
