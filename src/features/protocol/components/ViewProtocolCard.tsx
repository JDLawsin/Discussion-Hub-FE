import { Protocol } from "../types/types";
import { BookOpen, Clock, MessageSquare, Star } from "lucide-react";
import Badge from "@/global/components/ui/Badge";
import { timeAgo } from "@/global/libs/dates";
import StarRating from "@/global/components/ui/StarRating";
import Avatar from "@/global/components/ui/Avatar";
import Breadcrumb from "@/global/components/ui/Breadcrumb";

interface Props {
  data: Protocol;
}

const ViewProtocolCard = ({ data }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="h-1 bg-linear-to-r from-orange-400 to-orange-500" />
      <div className="p-6">
        <Breadcrumb
          items={[{ label: "Protocol", icon: BookOpen }, { label: data.title }]}
          className="mb-4"
        />

        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
          {data.title}
        </h1>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Avatar name={data.author.name} />
            <span className="text-sm text-gray-600">
              {"u/" + data.author.name}
            </span>
          </div>
          <span className="text-gray-300">·</span>
          <div className="flex items-center gap-1">
            <StarRating rating={Number(data.averageRating)} />
            <span className="text-sm font-medium text-gray-700 ml-1">
              {Number(data.averageRating).toFixed(1)}
            </span>
          </div>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo(data.createdAt)}
          </span>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
          {data.content}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag) => (
            <Badge key={tag.name} text={tag.name} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-700">
              {data.threadCount}
            </span>
            {"threads"}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-700">
              {data.reviewCount}
            </span>{" "}
            {"reviews"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProtocolCard;
