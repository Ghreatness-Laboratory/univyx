import { ThumbsUp } from "lucide-react";
import { useState } from "react";

interface DiscussionType {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function DiscussionSection() {
  const [discussions, setDiscussions] = useState<DiscussionType[]>([
    {
      id: 1,
      user: "Sarah Johnson",
      content:
        "I've been following this topic closely and wanted to get everyone's input on the recent changes.",
      timestamp: "3 hours ago",
      likes: 7,
    },
    {
      id: 2,
      user: "Michael Lee",
      content:
        "Can anyone recommend some good resources for someone just getting started with this topic?",
      timestamp: "2 days ago",
      likes: 12,
    },
  ]);

  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleSubmitDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      setActionType("post");
      setShowLoginMessage(true);

      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    if (newDiscussionContent.trim()) {
      const newDiscussionObj: DiscussionType = {
        id: discussions.length + 1,
        user: "Current User",
        content: newDiscussionContent,
        timestamp: "Just now",
        likes: 0,
      };

      setDiscussions([...discussions, newDiscussionObj]);
      setNewDiscussionContent("");
    }
  };

  const handleLikeDiscussion = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      setActionType("like");
      setShowLoginMessage(true);

      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    setDiscussions(
      discussions.map((discussion) =>
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
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{discussion.user}</span>
                  <span className="text-xs text-gray-500">
                    {discussion.timestamp}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{discussion.content}</p>

                <div className="flex items-center relative">
                  {showLoginMessage && actionType === "like" && (
                    <div className="absolute bottom-full mb-2 left-0 bg-teal-500 text-white shadow-md rounded-md p-2 text-sm z-10 w-48">
                      <p>
                        Please log in to like this post
                      </p>
                    </div>
                  )}
                  <button
                    className="flex items-center gap-1 text-gray-500 hover:text-teal-600 transition-colors"
                    onClick={(e) => handleLikeDiscussion(discussion.id, e)}
                  >
                    <ThumbsUp size={16} />
                    <span>{discussion.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 relative">
        {showLoginMessage && actionType === "post" && (
          <div className="absolute top-10 left-1/4 bg-teal-500 text-white shadow-md rounded-md p-2 text-sm z-10 w-48">
            <p>
              Please log in to join the discussion
            </p>
          </div>
        )}
        <form onSubmit={handleSubmitDiscussion} className="flex flex-col gap-4">
          <textarea
            placeholder="Join the discussion..."
            className="w-full border rounded-lg p-3 min-h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={newDiscussionContent}
            onChange={(e) => setNewDiscussionContent(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`px-4 py-2 rounded-lg transition-colors ${
              newDiscussionContent.trim()
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!newDiscussionContent.trim()}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
