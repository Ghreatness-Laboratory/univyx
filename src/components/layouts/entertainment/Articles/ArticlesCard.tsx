import {
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Clock,
  Heart,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { ArticleProps } from "../../../../data/entertainment/articles";

interface ArticleCardProps {
  article: ArticleProps;
  className?: string;
}

export default function ArticleCard({ article, className }: ArticleCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked);

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {article.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <User size={14} className="text-gray-500 mr-1" />
              <span className="text-xs text-gray-700 font-medium">
                {article.author}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <Clock size={14} className="text-gray-500 mr-1" />
              <span className="text-xs text-gray-500">{article.readTime}</span>
            </div>
            <span className="text-xs text-gray-500">{article.date}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <button
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
            onClick={() => {}}
          >
            Read full article <ChevronRight size={16} />
          </button>
          <div className="flex items-center gap-3">
            <button
              className={`flex items-center gap-1 ${
                isLiked ? "text-red-500" : "text-gray-400"
              } hover:text-red-500 transition-colors`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-xs">
                {isLiked ? article.likes + 1 : article.likes}
              </span>
            </button>
            <button
              className={`${
                isBookmarked ? "text-purple-500" : "text-gray-400"
              } hover:text-purple-500 transition-colors`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              {isBookmarked ? (
                <BookmarkCheck size={16} />
              ) : (
                <Bookmark size={16} />
              )}
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
