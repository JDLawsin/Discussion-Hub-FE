const ThreadSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
    <div className="flex">
      <div className="flex flex-col items-center gap-2 px-3 py-4 bg-gray-50 border-r border-gray-100 min-w-12">
        <div className="w-5 h-5 bg-gray-200 rounded" />
        <div className="w-4 h-3 bg-gray-200 rounded" />
        <div className="w-5 h-5 bg-gray-200 rounded" />
      </div>

      <div className="flex-1 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-16 h-3 bg-gray-200 rounded-full" />
          <div className="w-12 h-3 bg-gray-200 rounded-full" />
        </div>

        <div className="space-y-1.5">
          <div className="w-3/4 h-4 bg-gray-200 rounded-full" />
          <div className="w-1/2 h-4 bg-gray-200 rounded-full" />
        </div>

        <div className="space-y-1.5">
          <div className="w-full h-3 bg-gray-100 rounded-full" />
          <div className="w-5/6 h-3 bg-gray-100 rounded-full" />
        </div>

        <div className="flex gap-1.5">
          <div className="w-12 h-5 bg-gray-100 rounded-full" />
          <div className="w-16 h-5 bg-gray-100 rounded-full" />
          <div className="w-10 h-5 bg-gray-100 rounded-full" />
        </div>

        <div className="flex gap-3">
          <div className="w-20 h-3 bg-gray-100 rounded-full" />
          <div className="w-16 h-3 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export default ThreadSkeleton;
