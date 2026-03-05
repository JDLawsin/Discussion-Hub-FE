import { MessageSquare } from "lucide-react";

const EmptyComment = () => (
  <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
    <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
    <h3 className="text-sm font-semibold text-gray-600 mb-1">
      {"No comments yet"}
    </h3>
    <p className="text-xs text-gray-400">
      {"Be the first to share your thoughts!"}
    </p>
  </div>
);

export default EmptyComment;
