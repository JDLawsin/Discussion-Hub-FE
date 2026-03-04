import { timeAgo } from "@/global/libs/dates";
import {
  BookOpen,
  ChevronUp,
  FileText,
  MessageSquare,
  Tag,
} from "lucide-react";
import { ThreadHit } from "../types/types";
import Link from "next/link";
import Badge from "@/global/components/ui/Badge";

interface Props {
  hit: ThreadHit;
}

const ThreadCard = ({ hit }: Props) => (
  <Link href={`/thread/${hit.id}`}>
    <div className="bg-white border border-gray-200 rounded-xl hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
              <FileText className="w-3 h-3" />
              {"Thread"}
            </span>
            {hit.protocol_title && (
              <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                <BookOpen className="w-3 h-3" />
                {hit.protocol_title}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {"Posted by"}{" "}
              <span className="font-medium text-gray-600">
                {"u/"}
                {hit.author_name}
              </span>
            </span>
            <span className="text-xs text-gray-400">
              {timeAgo(hit.created_at)}
            </span>
          </div>

          <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
            {hit.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{hit.body}</p>

          {hit.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {hit.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  text={tag}
                  className="flex items-center gap-1 text-xs text-gray-500! bg-gray-100! hover:bg-orange-50! hover:text-orange-500! px-2 py-0.5 rounded-full transition-colors cursor-pointer"
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {hit.comment_count} {"comments"}
            </span>
            <span className="flex items-center gap-1">
              <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
              {hit.upvote_count} {"upvotes"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default ThreadCard;
