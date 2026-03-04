const RatingSummarySkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
    <div className="flex gap-6 items-center">
      <div className="text-center shrink-0 space-y-2">
        <div className="w-12 h-10 bg-gray-200 rounded-lg mx-auto" />
        <div className="flex gap-0.5 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="w-14 h-3 bg-gray-200 rounded-full mx-auto" />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full" />
            <div className="w-4 h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RatingSummarySkeleton;
