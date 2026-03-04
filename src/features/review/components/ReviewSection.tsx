import ReviewForm from "@/features/protocol/components/ReviewForm";
import { useToggle } from "@reactuses/core";
import { Minus, Plus, Star } from "lucide-react";

const ReviewSection = () => {
  const [on, toggle] = useToggle(false);

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
    </div>
  );
};

export default ReviewSection;
