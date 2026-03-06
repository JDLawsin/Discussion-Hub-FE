export type Comment = {
  id: number;
  author: { name: string; id: number };
  threadId: number;
  parentId: number | null;
  body: string;
  upvoteCount: number;
  downvoteCount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  replies?: Comment[];
};

export type CommentPaginatedResponse = {
  data: Comment[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};
