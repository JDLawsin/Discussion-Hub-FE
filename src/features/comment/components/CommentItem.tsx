"use client";

import useVote from "@/features/vote/hooks/useVote";
import { useState } from "react";
import { Comment } from "../types/types";
import { getInitials } from "@/global/libs/utils";
import Avatar from "@/global/components/ui/Avatar";
import { timeAgo } from "@/global/libs/dates";
import {
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  MessageSquare,
} from "lucide-react";
import ReplyForm from "./ReplyForm";
import { useToggle } from "@reactuses/core";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AuthorMenu from "@/global/components/ui/AuthorMenu";
import { toast } from "react-toastify";
import { deleteComment } from "../actions/actions";

interface Props {
  comment: Comment;
  depth?: number;
  maxDepth?: number;
  mutate: () => void;
}

const CommentItem = ({ comment, depth = 0, maxDepth, mutate }: Props) => {
  const [on, toggle] = useToggle(false);
  const { isAuthenticated, user } = useAuth();
  const [showReplies, setShowReplies] = useState(true);

  const { voteType, upvoteCount, downvoteCount, isVoting, vote } = useVote({
    votableType: "comment",
    votableId: comment.id,
    initialUpVotes: comment.upvoteCount,
    initialDownVotes: comment.downvoteCount,
    initialVoteType: null,
  });

  const hasReplies = comment.replies && comment.replies.length > 0;
  const canReply = maxDepth === undefined ? true : depth < maxDepth;
  const canRenderReplies = maxDepth === undefined ? true : depth < maxDepth;
  const isAuthor = user?.id === comment.author.id;

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      mutate();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div
      className={`${depth > 0 ? `ml-4 pl-3 border-l-2 border-gray-200` : ""}`}
    >
      <div className="group">
        <div className="flex items-start gap-2">
          <Avatar name={comment.author.name} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-800">
                {"u/"}
                {comment.author.name}
              </span>
              <span className="text-xs text-gray-400">
                · {timeAgo(comment.created_at)}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              {comment.body}
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => vote("upvote")}
                disabled={isVoting || !isAuthenticated}
                className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                  voteType === "upvote"
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-400 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
                {upvoteCount}
              </button>

              <button
                onClick={() => vote("downvote")}
                disabled={isVoting || !isAuthenticated}
                className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                  voteType === "downvote"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                }`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
                {downvoteCount}
              </button>

              {canReply && isAuthenticated && (
                <button
                  onClick={() => toggle()}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                >
                  <CornerDownRight className="w-3 h-3" />
                  {"Reply"}
                </button>
              )}

              {hasReplies && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  {showReplies
                    ? `Hide ${comment.replies!.length} ${comment.replies!.length === 1 ? "reply" : "replies"}`
                    : `Show ${comment.replies!.length} ${comment.replies!.length === 1 ? "reply" : "replies"}`}
                </button>
              )}

              {isAuthor && (
                <AuthorMenu
                  size="sm"
                  editAction={{
                    type: "callback",
                    onEdit: () => {},
                  }}
                  editLabel="Edit Comment"
                  deleteTitle="Delete Comment"
                  deleteDescription="This will permanently delete the comment. This action cannot be undone."
                  deleteLabel="Delete"
                  onDelete={handleDelete}
                  isIconHorizontal={false}
                />
              )}
            </div>

            {on && (
              <ReplyForm
                commentParentId={comment.id}
                onToggle={() => toggle()}
                mutate={mutate}
              />
            )}
          </div>
        </div>

        {hasReplies && showReplies && canRenderReplies && (
          <div className="mt-3 space-y-3">
            {comment.replies!.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                maxDepth={maxDepth}
                mutate={mutate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
