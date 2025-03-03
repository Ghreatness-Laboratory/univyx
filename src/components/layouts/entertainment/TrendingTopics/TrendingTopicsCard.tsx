import { ChevronRight, MessageCircle, Share2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { TrendingTopicProps } from "../../../../data/entertainment/trendingTopics";

interface TopicCard {
  topic: TrendingTopicProps;
  className?: string;
}

export default function TopicCard({ topic, className }: TopicCard) {
  const [, setSearchParams] = useSearchParams();
  
  const openModal = () => {
    setSearchParams({ id: topic.id.toString(), section: "topics" });
  };
  
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative">
        <img
          src={topic.imageUrl}
          alt={topic.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="font-bold text-lg text-white mb-2">{topic.title}</h3>
          <div className="flex gap-2 flex-wrap mb-2">
            {topic.tags.map((tag, index) => (
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
      <div className="p-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-sm text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            <span className="font-medium text-gray-700">
              {topic.discussionCount} discussions
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Updated {topic.lastUpdated}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button 
            className="flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
            onClick={openModal}
          >
            Join discussion <ChevronRight size={16} />
          </button>
          <button className="text-teal-500 hover:text-teal-700">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}