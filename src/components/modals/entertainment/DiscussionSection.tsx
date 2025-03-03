import { useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import AuthRequiredOverlay from "./AuthRequiredOverlay";

interface DiscussionType {
  id: number;
  user: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export default function DiscussionSection() {
  const [discussions, setDiscussions] = useState<DiscussionType[]>([
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      title: "What are your thoughts on the latest developments?",
      content: "I've been following this topic closely and wanted to get everyone's input on the recent changes.",
      timestamp: "3 hours ago",
      likes: 7,
      replies: 2
    },
    {
      id: 2,
      user: "Michael Lee",
      avatar: "/api/placeholder/40/40",
      title: "Resources for beginners",
      content: "Can anyone recommend some good resources for someone just getting started with this topic?",
      timestamp: "2 days ago",
      likes: 12,
      replies: 5
    }
  ]);
  
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });
  
  const handleSubmitDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setShowAuthOverlay(true);
      return;
    }
    
    if (newDiscussionTitle.trim() && newDiscussionContent.trim()) {
      const newDiscussionObj: DiscussionType = {
        id: discussions.length + 1,
        user: "Current User",
        avatar: "/api/placeholder/40/40",
        title: newDiscussionTitle,
        content: newDiscussionContent,
        timestamp: "Just now",
        likes: 0,
        replies: 0
      };
      
      setDiscussions([...discussions, newDiscussionObj]);
      setNewDiscussionTitle("");
      setNewDiscussionContent("");
    }
  };

  const handleLikeDiscussion = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setShowAuthOverlay(true);
      return;
    }
    
    setDiscussions(
      discussions.map(discussion =>
        discussion.id === id
          ? { ...discussion, likes: discussion.likes + 1 }
          : discussion
      )
    );
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="space-y-4 mb-8">
        {discussions.map((discussion) => (
          <div 
            key={discussion.id} 
            className="border rounded-lg p-4 bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <img
                  src={discussion.avatar}
                  alt={discussion.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{discussion.user}</span>
                  <span className="text-xs text-gray-500">{discussion.timestamp}</span>
                </div>
                <h4 className="font-medium text-lg mb-2">{discussion.title}</h4>
                <p className="text-gray-700 mb-3">{discussion.content}</p>
                
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1 text-gray-500 hover:text-teal-600 transition-colors"
                    onClick={(e) => handleLikeDiscussion(discussion.id, e)}
                  >
                    <ThumbsUp size={16} />
                    <span>{discussion.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-gray-500 hover:text-teal-600 transition-colors">
                    <MessageCircle size={16} />
                    <span>{discussion.replies} replies</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div id="discussion-form" className="border-t pt-6">
        <h4 className="text-lg font-bold mb-4">Start a new discussion</h4>
        
        <form onSubmit={handleSubmitDiscussion}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Discussion title"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newDiscussionTitle}
              onChange={(e) => setNewDiscussionTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <textarea
              placeholder="What would you like to discuss?"
              className="w-full border rounded-lg p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newDiscussionContent}
              onChange={(e) => setNewDiscussionContent(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Post Discussion
          </button>
        </form>
      </div>
      
      {showAuthOverlay && (
        <AuthRequiredOverlay
          position={overlayPosition}
          onClose={() => setShowAuthOverlay(false)}
        />
      )}
    </div>
  );
}