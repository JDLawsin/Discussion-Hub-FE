const ReviewSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-24 h-3 bg-gray-200 rounded-full" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
          <div className="w-12 h-3 bg-gray-200 rounded-full" />
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full" />
        <div className="w-4/5 h-3 bg-gray-100 rounded-full" />
      </div>
    </div>
  </div>
);

export default ReviewSkeleton;
