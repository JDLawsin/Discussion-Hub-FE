import { Protocol } from "@/features/protocol/types/types";
import { Nullable } from "@/global/types";

export type ThreadSort = "recent" | "upvoted";

export interface ThreadAuthor {
  name: string;
  id: number;
}

export interface ThreadTag {
  name: string;
}

export interface Thread {
  id: number;
  protocolId: number;
  protocol: Pick<Protocol, "title">;
  title: string;
  body: string;
  author: ThreadAuthor;
  tags: ThreadTag[];
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  createdAt: string;
}

export interface PaginationLink {
  url: Nullable<string>;
  label: string;
  page: Nullable<number>;
  active: boolean;
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

export interface ThreadLinks {
  first: Nullable<string>;
  last: Nullable<string>;
  prev: Nullable<string>;
  next: Nullable<string>;
}

export interface ThreadPaginatedResponse {
  data: Thread[];
  links: ThreadLinks;
  meta: ThreadMeta;
}
