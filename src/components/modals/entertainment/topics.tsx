import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { trendingTopics } from "../../../data/entertainment/trendingTopics";

export default function TopicsModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const section = searchParams.get("section");

  const closeModal = () => {
    searchParams.delete("id");
    searchParams.delete("section");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (id && section === "topics") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
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
      <div className="relative bg-white p-6 pb-10 sm:px-6 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[86vh] md:max-h-[93vh] overflow-y-auto">
        <h2 className="text-xl font-bold">{content.title}</h2>
        <img
          src={content.imageUrl}
          alt={content.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <p className="text-gray-500">{content.lastUpdated}</p>
        <p>{content.title}</p>
      </div>
    </div>
  );
}
