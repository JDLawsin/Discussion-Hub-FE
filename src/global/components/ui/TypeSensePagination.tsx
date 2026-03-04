import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "react-instantsearch";

const TypeSensePagination = () => {
  const { currentRefinement, nbPages, refine, isFirstPage, isLastPage } =
    usePagination();

  if (nbPages <= 1) return null;

  const pages = Array.from({ length: Math.min(nbPages, 5) }, (_, i) => {
    const start = Math.max(0, currentRefinement - 2);
    return start + i;
  }).filter((p) => p < nbPages);

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => refine(currentRefinement - 1)}
        disabled={isFirstPage}
        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => refine(page)}
          className={`w-8 h-8 text-xs font-medium rounded-lg transition-colors ${
            currentRefinement === page
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => refine(currentRefinement + 1)}
        disabled={isLastPage}
        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TypeSensePagination;
