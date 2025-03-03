import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import AuthRequiredOverlay from "./AuthRequiredOverlay";

interface CommentType {
  id: number;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function CommentSection() {
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      user: "Alex Chen",
      avatar: "/api/placeholder/40/40",
      content: "This is really insightful information. Thanks for sharing!",
      timestamp: "2 hours ago",
      likes: 5,
    },
    {
      id: 2,
      user: "Jordan Smith",
      avatar: "/api/placeholder/40/40",
      content:
        "I have some additional resources on this topic if anyone is interested.",
      timestamp: "1 day ago",
      likes: 9,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0 });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setShowAuthOverlay(true);
      return;
    }

    if (newComment.trim()) {
      const newCommentObj: CommentType = {
        id: comments.length + 1,
        user: "Current User",
        avatar: "/api/placeholder/40/40",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleLikeComment = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setOverlayPosition({ top: rect.top, left: rect.left });
      setShowAuthOverlay(true);
      return;
    }

    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <div className="mt-8 pt-6 border-t" onClick={(e) => e.stopPropagation()}>
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="flex-shrink-0">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
              <button
                className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors mt-1 ml-1"
                onClick={(e) => handleLikeComment(comment.id, e)}
              >
                <ThumbsUp size={14} />
                <span className="text-sm">{comment.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmitComment}
        className="flex gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0">
          <img
            src="/api/placeholder/40/40"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Add a comment..."
            className="w-full border rounded-lg p-3 min-h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newComment}
            onChange={(e) => {
              e.stopPropagation();
              setNewComment(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            required
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className={`bg-primary text-white px-4 py-2 rounded-lg transition-colors`}
            >
              Post comment
            </button>
          </div>
        </div>
      </form>

      {showAuthOverlay && (
        <AuthRequiredOverlay
          position={overlayPosition}
          onClose={(e) => {
            e?.stopPropagation();
            setShowAuthOverlay(false);
          }}
          type="comment"
        />
      )}
    </div>
  );
}
