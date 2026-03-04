"use client";

import StarInput from "@/global/components/ui/StarInput";
import FeedbackTextarea from "@/global/components/ui/TextArea";

const ReviewForm = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-gray-800 mb-3">
        {"Rate this protocol"}
      </h4>

      <div className="mb-3">
        <StarInput value={5} onChange={() => {}} />
        {/* {errors?.rating && (
          <p className="text-xs text-red-500 mt-1">{errors.rating[0]}</p>
        )} */}
      </div>

      <FeedbackTextarea value={""} error={[]} onChange={(value) => {}} />

      <div className="flex justify-end mt-2">
        <button
          onClick={() => {}}
          disabled={false}
          className="px-4 py-1.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed rounded-full transition-colors"
        >
          {"Submit Review"}
        </button>{" "}
      </div>
    </div>
  );
};

export default ReviewForm;
