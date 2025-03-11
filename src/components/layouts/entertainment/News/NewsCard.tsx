import { ChevronRight, Clock, Heart } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NewsProps } from "../../../../data/entertainment/news";

interface NewsCardProps {
  news: NewsProps;
  className?: string;
}

export default function NewsCard({ news, className }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const openModal = () => {
    setSearchParams({ id: news.id.toString(), section: "news" });
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 ${className}`}
    >
      <div className="relative">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {news.category}
        </div>
      </div>
      <div className="p-5 ">
        <div className="flex flex-col gap-1 mb-2">
          <span className="text-xs text-gray-500 flex items-center">
            <span className="font-medium text-gray-700">{news.source}</span>
            <span className="mx-2">•</span>
            <Clock size={12} className="mr-1" />
            {news.readTime}
          </span>
          <span className="text-xs text-gray-500">{news.date}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-1 hover:text-indigo-600 transition-colors ">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {news.description}
        </p>
        <div className="flex justify-between items-center">
          <button
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={openModal}
          >
            Read more <ChevronRight size={16} />
          </button>
          <button
            className={`flex items-center gap-1 ${
              isLiked ? "text-red-500" : "text-gray-400"
            } hover:text-red-500 transition-colors`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-xs">
              {isLiked ? news.likes + 1 : news.likes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
