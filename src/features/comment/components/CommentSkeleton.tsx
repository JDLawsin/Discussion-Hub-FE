const CommentSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <div className="w-20 h-3 bg-gray-200 rounded-full" />
          <div className="w-12 h-3 bg-gray-200 rounded-full" />
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full" />
        <div className="w-4/5 h-3 bg-gray-100 rounded-full" />
        <div className="w-3/5 h-3 bg-gray-100 rounded-full" />
        <div className="flex gap-2 mt-1">
          <div className="w-10 h-5 bg-gray-100 rounded-full" />
          <div className="w-10 h-5 bg-gray-100 rounded-full" />
          <div className="w-12 h-5 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export default CommentSkeleton;
