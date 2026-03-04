export type Tab = "protocols" | "threads";

export interface ThreadHit {
  id: string;
  title: string;
  body: string;
  tags: string[];
  author_name: string;
  protocol_id: string;
  protocol_title: string;
  upvote_count: number;
  comment_count: number;
  created_at: number;
  objectID: string;
}

export interface ProtocolHit {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author_name: string;
  review_count: number;
  average_rating: number;
  created_at: number;
  objectID: string;
}
