"use client";

import { Clock, FileText, Plus, TrendingUp } from "lucide-react";
import { ThreadSort } from "../../protocol/types/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useUpdateQueryString from "@/global/hooks/useQueryString";
import { useAuth } from "@/features/auth/hooks/useAuth";

const CreateThreadAndSorter = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const router = useRouter();
  const updateQueryString = useUpdateQueryString();
  const { isAuthenticated } = useAuth();
  const threadSort = (searchParams.get("sort") || "recent") as ThreadSort;

  const handleThreadSortChange = (sort: ThreadSort) => {
    updateQueryString({ sort });
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <FileText className="w-4 h-4 text-orange-400" />
        {"Threads"}
      </h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-0.5">
          {(["recent", "upvoted"] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => handleThreadSortChange(sort)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all capitalize ${
                threadSort === sort
                  ? "bg-orange-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {sort === "recent" ? (
                <Clock className="w-3 h-3" />
              ) : (
                <TrendingUp className="w-3 h-3" />
              )}
              {sort === "recent" ? "Recent" : "Top"}
            </button>
          ))}
        </div>
        {isAuthenticated && (
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs cursor-pointer font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors"
            onClick={() => router.push(`/protocol/${id}/threads/create`)}
          >
            <Plus className="w-3.5 h-3.5" />
            {"New Thread"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateThreadAndSorter;
