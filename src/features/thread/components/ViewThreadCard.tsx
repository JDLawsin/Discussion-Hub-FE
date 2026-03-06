import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  MessageSquare,
  Tag,
} from "lucide-react";
import { Thread } from "../types/types";
import { timeAgo } from "@/global/libs/dates";
import Breadcrumb from "@/global/components/ui/Breadcrumb";
import ThreadVoteSidebar from "./ThreadVoteSidebar";
import { Nullable } from "@/global/types";
import { VoteType } from "@/features/vote/hooks/useVote";

interface Props {
  thread: Thread;
  userVoteType: Nullable<VoteType>;
}

const ViewThreadCard = ({ thread, userVoteType }: Props) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
    <div className="h-1 bg-linear-to-r from-orange-400 to-orange-500" />

    <div className="p-6">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 flex-wrap">
        <Breadcrumb
          items={[
            { label: "Protocol", icon: BookOpen },
            { label: thread.protocol.title },
            { label: thread.title },
          ]}
        />
      </div>

      <div className="flex gap-4">
        <ThreadVoteSidebar thread={thread} userVoteType={userVoteType} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
              <FileText className="w-3 h-3" />
              {"Thread"}
            </span>
            <span className="text-xs text-gray-400">
              {"Posted by"}{" "}
              <span className="font-medium text-gray-600">
                {"u/"}
                {thread.author.name}
              </span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {timeAgo(thread.createdAt)}
            </span>
          </div>

          <h1 className="text-xl font-extrabold text-gray-900 leading-tight mb-3">
            {thread.title}
          </h1>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
            {thread.body}
          </div>

          {thread.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {thread.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3" />
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
              {thread.upvoteCount} {"upvotes"}
            </span>
            <span className="flex items-center gap-1">
              <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
              {thread.downvoteCount} {"downvotes"}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {"Discussion below"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ViewThreadCard;
