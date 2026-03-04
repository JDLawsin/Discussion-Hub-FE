import StarDisplay from "@/global/components/ui/StarDisplay";
import { Review } from "../types/types";
import { Star } from "lucide-react";

interface Props {
  reviews: Review[];
}

const RatingSummary = ({ reviews }: Props) => {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="flex gap-6 items-center">
      <div className="text-center shrink-0">
        <div className="text-4xl font-extrabold text-gray-900">
          {avg.toFixed(1)}
        </div>
        <StarDisplay rating={avg} />
        <div className="text-xs text-gray-400 mt-1">
          {reviews.length} {"reviews"}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        {counts.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-3 shrink-0">{star}</span>
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-4 text-right shrink-0">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
