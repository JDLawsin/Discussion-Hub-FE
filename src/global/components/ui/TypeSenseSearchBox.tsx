import { Search } from "lucide-react";
import { useSearchBox } from "react-instantsearch";

const TypeSenseSearchBox = () => {
  const { query, refine } = useSearchBox();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => refine(e.target.value)}
        placeholder="Search protocols, threads..."
        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-teal-300 focus:ring-2 focus:ring-teal-100 transition-all"
      />
    </div>
  );
};

export default TypeSenseSearchBox;
