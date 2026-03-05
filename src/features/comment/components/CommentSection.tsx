"use client";

import { useToggle } from "@reactuses/core";
import { useParams } from "next/navigation";
import useComments from "../hooks/useComments";
import { MessageSquare, Minus, Plus } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentSkeleton from "./CommentSkeleton";
import EmptyComment from "./EmptyComment";
import CommentItem from "./CommentItem";
import LoadMoreButton from "@/global/components/ui/LoadMoreButton";

const CommentSection = () => {
  const [on, toggle] = useToggle(false);
  const { id } = useParams();
  const {
    comments,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    mutate,
  } = useComments({ threadId: id });

  const handleCommentSubmit = async (body: string) => {
    try {
      //   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads/${id}/comments`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //     credentials: "include",
      //     body: JSON.stringify({ body }),
      //   });
      mutate(); // refresh comments
      toggle(); // hide form
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleReply = async (parentId: number, body: string) => {
    try {
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads/${id}/comments`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({ body, parent_id: parentId }),
      // });
      mutate(); // refresh comments
    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-sm font-medium text-red-600 mb-1">
          {"Failed to load comments"}
        </p>
        <p className="text-xs text-red-400">
          {"Please try refreshing the page"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-orange-400" />
          {"Comments"}
          {!isLoading && (
            <span className="text-xs font-medium bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </h2>
        <button
          onClick={() => toggle()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors"
        >
          {on ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
          {on ? "Hide" : "Add Comment"}
        </button>
      </div>

      {on && <CommentForm onToggle={() => toggle()} />}

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <EmptyComment />
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              onReply={handleReply}
            />
          ))}
          <LoadMoreButton
            onClick={loadMore}
            loading={isLoadingMore}
            hasMore={hasMore}
            label="Comments"
          />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
