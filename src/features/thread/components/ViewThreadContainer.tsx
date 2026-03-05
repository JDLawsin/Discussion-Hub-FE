import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Thread } from "../types/types";
import ViewThreadCard from "./ViewThreadCard";
import { Nullable } from "@/global/types";
import { VoteType } from "@/features/vote/hooks/useVote";
import CommentSection from "@/features/comment/components/CommentSection";

interface Props {
  thread: Thread;
  userVoteType: Nullable<VoteType>;
}

const ViewThreadContainer = ({ thread, userVoteType }: Props) => {
  return (
    <>
      <Link
        href={`/protocol/${thread.protocolId}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {"Back to"}{" "}
        <span className="font-medium truncate max-w-[16rem]">
          {thread.protocol.title}
        </span>
      </Link>

      <ViewThreadCard thread={thread} userVoteType={userVoteType} />

      <CommentSection />
    </>
  );
};

export default ViewThreadContainer;
