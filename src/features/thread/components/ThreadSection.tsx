"use client";

import EmptyThread from "./EmptyThread";
import CreateThreadAndSorter from "./CreateThreadAndSorter";
import { useParams, useSearchParams } from "next/navigation";
import { ThreadSort } from "@/features/protocol/types/types";
import useThreads from "../hooks/useThreads";
import ThreadItem from "./ThreadItem";
import LoadMoreButton from "@/global/components/ui/LoadMoreButton";
import ThreadSkeleton from "./ThreadSkeleton";

const ThreadSection = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const threadSort = (searchParams.get("sort") || "recent") as ThreadSort;
  const { threads, isLoading, isLoadingMore, error, hasMore, loadMore } =
    useThreads({ threadSort }, id);
  const hasData = threads.length > 0;

  const handleLoadMoreThreads = () => loadMore();

  if (error) {
    return (
      <div className="space-y-3">
        <CreateThreadAndSorter />
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-sm font-medium text-red-600 mb-1">
            {"Failed to load threads"}
          </p>
          <p className="text-xs text-red-400">
            {"Please try refreshing the page"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <CreateThreadAndSorter />
        {Array.from({ length: 5 }).map((_, i) => (
          <ThreadSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <CreateThreadAndSorter />
      {hasData ? (
        <>
          {threads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))}
          <LoadMoreButton
            onClick={handleLoadMoreThreads}
            loading={isLoadingMore}
            hasMore={hasMore}
            label="Threads"
          />
        </>
      ) : (
        <EmptyThread />
      )}
    </div>
  );
};

export default ThreadSection;
