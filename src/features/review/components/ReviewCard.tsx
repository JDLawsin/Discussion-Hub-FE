import StarDisplay from "@/global/components/ui/StarDisplay";
import { timeAgo } from "@/global/libs/dates";
import { getInitials } from "@/global/libs/utils";
import { Review } from "../types/types";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold shrink-0">
        {getInitials(review.author.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800">
              {review.author.name}
            </span>
            <StarDisplay rating={review.rating} />
          </div>
          <span className="text-xs text-gray-400 shrink-0">
            {timeAgo(review.createdAt)}
          </span>
        </div>
        {review.feedback && (
          <p className="text-sm text-gray-600">{review.feedback}</p>
        )}
      </div>
    </div>
  </div>
);

export default ReviewCard;
