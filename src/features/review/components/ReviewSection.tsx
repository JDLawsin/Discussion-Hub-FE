import ReviewForm from "@/features/protocol/components/ReviewForm";
import { useToggle } from "@reactuses/core";
import { Minus, Plus, Star } from "lucide-react";
import RatingSummary from "./RatingSummary";
import LoadMoreButton from "@/global/components/ui/LoadMoreButton";
import useReviews from "../hooks/useReviews";
import { useParams } from "next/navigation";
import ReviewCard from "./ReviewCard";
import ReviewSkeleton from "./ReviewSkeleton";
import RatingSummarySkeleton from "./RatingSummarySkeleton";

const ReviewSection = () => {
  const [on, toggle] = useToggle(false);
  const { id } = useParams();
  const { reviews, isLoading, isLoadingMore, error, hasMore, loadMore } =
    useReviews(id);

  const handleLoadMoreReviews = () => loadMore();

  if (error) {
    return (
      <div className="space-y-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-sm font-medium text-red-600 mb-1">
            {"Failed to load reviews"}
          </p>
          <p className="text-xs text-red-400">
            {"Please try refreshing the page"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between animate-pulse">
          <div className="w-20 h-4 bg-gray-200 rounded-full" />
          <div className="w-28 h-7 bg-gray-200 rounded-full" />
        </div>

        <RatingSummarySkeleton />

        {Array.from({ length: 4 }).map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          {"Reviews"}
        </h2>
        <button
          onClick={() => toggle()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors"
        >
          {!on ? (
            <Plus className="w-3.5 h-3.5" />
          ) : (
            <Minus className="w-3.5 h-3.5" />
          )}
          {!on ? "Write Review" : "Hide Review"}
        </button>
      </div>

      {on && <ReviewForm />}

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <RatingSummary reviews={reviews} />
      </div>

      <div className="space-y-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        <LoadMoreButton
          onClick={handleLoadMoreReviews}
          loading={isLoadingMore}
          hasMore={hasMore}
          label="Reviews"
        />
      </div>
    </div>
  );
};

export default ReviewSection;
