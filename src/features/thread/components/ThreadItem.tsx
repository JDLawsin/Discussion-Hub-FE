import { useState } from "react";
import { Thread } from "../types/types";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import { timeAgo } from "@/global/libs/dates";
import Link from "next/link";

interface Props {
  thread: Thread;
}

const ThreadItem = ({ thread }: Props) => {
  return (
    <Link href={`/protocol/${thread.protocolId}/thread/${thread.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl hover:border-teal-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex">
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
              <span>
                u/
                <span className="font-medium text-gray-600">
                  {thread.author.name}
                </span>
              </span>
              <span>· {timeAgo(thread.createdAt)}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5 group-hover:text-teal-600 transition-colors line-clamp-2">
              {thread.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
              {thread.body}
            </p>
            {thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {thread.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="text-xs text-gray-500 bg-gray-100 hover:bg-teal-50 hover:text-teal-500 px-2 py-0.5 rounded-full transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {thread.commentCount} comments
              </span>
              <span className="flex items-center gap-1">
                <ChevronUp className="w-3.5 h-3.5 text-teal-400" />
                {thread.upvoteCount} upvotes
              </span>
            </div>
          </div>

          <div className="flex items-center pr-4">
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-400 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ThreadItem;
