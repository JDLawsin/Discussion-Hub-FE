import { useState } from "react";
import { Nullable } from "@/global/types";
import { castVote } from "../actions/actions";
import { toast } from "react-toastify";

export type VotableType = "thread" | "comment";
export type VoteType = "upvote" | "downvote";

type VoteState = {
  type: Nullable<VoteType>;
  upVoteCount: number;
  downVoteCount: number;
};

type Params = {
  votableType: VotableType;
  votableId: string | number;
  initialUpVotes: number;
  initialDownVotes: number;
  initialVoteType: Nullable<VoteType>;
};

const useVote = ({
  votableType,
  votableId,
  initialUpVotes,
  initialDownVotes,
  initialVoteType,
}: Params) => {
  const [voteState, setVoteState] = useState<VoteState>({
    type: initialVoteType,
    upVoteCount: initialUpVotes,
    downVoteCount: initialDownVotes,
  });
  const [isVoting, setIsVoting] = useState(false);

  const vote = async (type: VoteType) => {
    if (isVoting) return;
    setIsVoting(true);

    const isSameVote = voteState.type === type;
    const prevState = { ...voteState };

    setVoteState((prev) => {
      if (isSameVote) {
        return {
          type: null,
          upVoteCount:
            type === "upvote" ? prev.upVoteCount - 1 : prev.upVoteCount,
          downVoteCount:
            type === "downvote" ? prev.downVoteCount - 1 : prev.downVoteCount,
        };
      }

      const wasUpvote = prev.type === "upvote";
      const wasDownvote = prev.type === "downvote";

      return {
        type,
        upVoteCount:
          type === "upvote"
            ? prev.upVoteCount + 1
            : wasUpvote
              ? prev.upVoteCount - 1
              : prev.upVoteCount,
        downVoteCount:
          type === "downvote"
            ? prev.downVoteCount + 1
            : wasDownvote
              ? prev.downVoteCount - 1
              : prev.downVoteCount,
      };
    });

    try {
      await castVote({
        votableId,
        votableType,
        type,
      });
    } catch (error) {
      setVoteState(prevState);
      toast.error("Voting Failed. Something went wrong. Please try again!");
    } finally {
      setIsVoting(false);
    }
  };

  return {
    voteType: voteState.type,
    upvoteCount: voteState.upVoteCount,
    downvoteCount: voteState.downVoteCount,
    isVoting,
    vote,
  };
};

export default useVote;
