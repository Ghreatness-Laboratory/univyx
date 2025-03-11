import { ThumbsUp } from "lucide-react";
import { useState } from "react";

interface CommentType {
  id: number;
  user: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function CommentSection() {
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      user: "Alex Chen",
      content: "This is really insightful information. Thanks for sharing!",
      timestamp: "2 hours ago",
      likes: 5,
    },
    {
      id: 2,
      user: "Jordan Smith",
      content:
        "I have some additional resources on this topic if anyone is interested.",
      timestamp: "1 day ago",
      likes: 9,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isLoggedIn = false;
    if (!isLoggedIn) {
      setActionType("comment");
      setShowLoginMessage(true);

      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }

    if (newComment.trim()) {
      const newCommentObj: CommentType = {
        id: comments.length + 1,
        user: "Current User",
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
      setActionType("like");
      setShowLoginMessage(true);

      setTimeout(() => setShowLoginMessage(false), 3000);
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

      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded-lg p-4 bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{comment.content}</p>

                <div className="flex items-center relative">
                  {showLoginMessage && actionType === "like" && (
                    <div className="absolute bottom-full mb-2 left-0 bg-purple-500 text-white shadow-md rounded-md p-2 text-sm z-10 w-48">
                      <p>Please log in to like this comment</p>
                    </div>
                  )}
                  <button
                    className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors"
                    onClick={(e) => handleLikeComment(comment.id, e)}
                  >
                    <ThumbsUp size={16} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmitComment}
        className="flex flex-col gap-4 relative"
      >
        {showLoginMessage && actionType === "comment" && (
          <div className="absolute top-4 left-1/4 bg-purple-500 text-white shadow-md rounded-md p-2 text-sm z-10 w-48">
            <p>Please log in to post a comment</p>
          </div>
        )}
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

        <button
          type="submit"
          className={`px-4 py-2 rounded-lg transition-colors ${
            newComment.trim()
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
