import { Search } from "lucide-react";

const EmptyResults = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Search className="w-7 h-7 text-gray-400" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 mb-1">
      {"No results found"}
    </h3>
    <p className="text-sm text-gray-400">
      {"Try a different search term or filter"}
    </p>
  </div>
);

export default EmptyResults;
