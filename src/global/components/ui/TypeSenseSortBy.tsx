import {
  PROTOCOL_SORT_OPTIONS,
  THREAD_SORT_OPTIONS,
} from "@/features/browse/constants/constants";
import { ChevronDown } from "lucide-react";
import { useSortBy } from "react-instantsearch";

const TypeSenseSortBy = ({ activeTab }: { activeTab: string }) => {
  const sortOptions =
    activeTab === "threads" ? THREAD_SORT_OPTIONS : PROTOCOL_SORT_OPTIONS;

  const { currentRefinement, refine } = useSortBy({
    items: sortOptions,
  });

  return (
    <div className="relative">
      <select
        id="filter"
        value={currentRefinement}
        onChange={(e) => refine(e.target.value)}
        className="appearance-none pl-3 pr-8 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray-600 focus:outline-none focus:border-teal-300 cursor-pointer hover:border-gray-300 transition-colors"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default TypeSenseSortBy;
