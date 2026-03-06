"use client";

import { FileText, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const EmptyThread = () => {
  const router = useRouter();
  const { protocolId } = useParams();

  return (
    <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
      <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <h3 className="text-sm font-semibold text-gray-600 mb-1">
        {"No threads yet"}
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        {"Be the first to start a discussion!"}
      </p>
      <button
        onClick={() => router.push(`/protocol/${protocolId}/thread/create`)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-full transition-colors mx-auto"
      >
        <Plus className="w-4 h-4" />
        {"Post Thread"}
      </button>
    </div>
  );
};

export default EmptyThread;
