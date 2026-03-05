import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/global/libs/fetcher";
import { Nullable } from "@/global/types";
import { Comment, CommentPaginatedResponse } from "../types/types";
import { ParamValue } from "next/dist/server/request/params";

type Params = {
  threadId: ParamValue;
};

const INITIAL_PAGE_SIZE = 10;
const LOAD_MORE_PAGE_SIZE = 10;

const useComments = (params: Params) => {
  const getKey = (
    pageIndex: number,
    previousPageData: Nullable<CommentPaginatedResponse>,
  ): Nullable<string> => {
    if (previousPageData && !previousPageData.data.length) return null;
    if (previousPageData && !previousPageData.links.next) return null;

    const perPage = pageIndex === 0 ? INITIAL_PAGE_SIZE : LOAD_MORE_PAGE_SIZE;

    const searchParams = new URLSearchParams({
      perPage: String(perPage),
      page: String(pageIndex + 1),
    });

    return `${process.env.NEXT_PUBLIC_API_URL}/threads/${params.threadId}/comments?${searchParams.toString()}`;
  };

  const { data, isLoading, error, size, setSize, mutate } =
    useSWRInfinite<CommentPaginatedResponse>(getKey, fetcher);

  const comments: Comment[] = data ? data.flatMap((page) => page.data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const hasMore = data ? data[data.length - 1]?.links.next !== null : false;

  const loadMore = () => setSize(size + 1);

  return {
    comments,
    isLoading,
    isLoadingMore: !!isLoadingMore,
    hasMore,
    error,
    loadMore,
    mutate,
  };
};

export default useComments;
