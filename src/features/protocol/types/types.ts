export type Protocol = {
  id: string;
  title: string;
  content: string;
  author: { name: string };
  tags: { name: string }[];
  threadCount: number;
  reviewCount: number;
  averageRating: string;
  createdAt: string;
};

export type Section = "threads" | "reviews";
export type ThreadSort = "recent" | "upvoted";
