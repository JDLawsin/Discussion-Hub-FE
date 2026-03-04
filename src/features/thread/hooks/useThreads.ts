import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/global/libs/fetcher";
import { Thread, ThreadPaginatedResponse, ThreadSort } from "../types/types";
import { Nullable } from "@/global/types";
import { ParamValue } from "next/dist/server/request/params";

type Params = {
  threadSort: ThreadSort;
};

const INITIAL_PAGE_SIZE = 5;
const LOAD_MORE_PAGE_SIZE = 5;

const useThreads = (params: Params, id: ParamValue) => {
  const getKey = (
    pageIndex: number,
    previousPageData: Nullable<ThreadPaginatedResponse>,
  ): Nullable<string> => {
    if (previousPageData && !previousPageData.data.length) return null;
    if (previousPageData && !previousPageData.links.next) return null;

    const perPage = pageIndex === 0 ? INITIAL_PAGE_SIZE : LOAD_MORE_PAGE_SIZE;

    const searchParams = new URLSearchParams({
      threadSort: params.threadSort,
      perPage: String(perPage),
      page: String(pageIndex + 1),
    });

    return `${process.env.NEXT_PUBLIC_API_URL}/threads/${id}?${searchParams.toString()}`;
  };

  const { data, isLoading, error, size, setSize } =
    useSWRInfinite<ThreadPaginatedResponse>(getKey, fetcher);

  const threads: Thread[] = data ? data.flatMap((page) => page.data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const hasMore = data ? data[data.length - 1]?.links.next !== null : false;

  const loadMore = () => setSize(size + 1);

  return {
    threads,
    isLoading,
    isLoadingMore: !!isLoadingMore,
    hasMore,
    error,
    loadMore,
  };
};

export default useThreads;
