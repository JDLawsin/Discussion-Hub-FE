"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Thread } from "../types/types";
import useVote, { VoteType } from "@/features/vote/hooks/useVote";
import { Nullable } from "@/global/types";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface Props {
  thread: Thread;
  userVoteType: Nullable<VoteType>;
}

const ThreadVoteSidebar = ({ thread, userVoteType }: Props) => {
  const { voteType, upvoteCount, downvoteCount, isVoting, vote } = useVote({
    votableType: "thread",
    votableId: thread.id,
    initialUpVotes: thread.upvoteCount,
    initialDownVotes: thread.downvoteCount,
    initialVoteType: userVoteType,
  });
  const netVotes = upvoteCount - downvoteCount;
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <button
        onClick={() => vote("upvote")}
        disabled={isVoting || !isAuthenticated}
        className={`p-1.5 rounded-full transition-colors ${
          voteType === "upvote"
            ? "bg-teal-100 text-teal-500"
            : "text-gray-400 hover:text-teal-500 hover:bg-teal-50"
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      <span
        className={`text-sm font-bold min-w-8 text-center ${
          voteType === "upvote"
            ? "text-teal-500"
            : voteType === "downvote"
              ? "text-blue-500"
              : "text-gray-700"
        }`}
      >
        {netVotes}
      </span>
      <button
        onClick={() => vote("downvote")}
        disabled={isVoting || !isAuthenticated}
        className={`p-1.5 rounded-full transition-colors ${
          voteType === "downvote"
            ? "bg-blue-100 text-blue-500"
            : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
        }`}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThreadVoteSidebar;
