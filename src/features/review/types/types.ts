import { PaginationLink } from "@/features/thread/types/types";
import { Nullable } from "@/global/types";

export interface ReviewAuthor {
  name: string;
  id: number;
}

export interface ReviewTag {
  name: string;
}

export interface Review {
  id: string;
  author: ReviewAuthor;
  rating: number;
  feedback: string | null;
  createdAt: string;
}

export interface ThreadMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ReviewLinks {
  first: Nullable<string>;
  last: Nullable<string>;
  prev: Nullable<string>;
  next: Nullable<string>;
}

export interface ReviewPaginatedResponse {
  data: Review[];
  links: ReviewLinks;
  meta: ThreadMeta;
}
