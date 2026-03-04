import { Tab } from "@/features/browse/types/types";
import { BookOpen, FileText, TrendingUp } from "lucide-react";

export const PROTOCOL_SORT_OPTIONS = [
  { label: "Most Recent", value: "protocols/sort/created_at:desc" },
  { label: "Most Reviewed", value: "protocols/sort/review_count:desc" },
  { label: "Top Rated", value: "protocols/sort/average_rating:desc" },
];

export const THREAD_SORT_OPTIONS = [
  { label: "Most Recent", value: "threads/sort/created_at:desc" },
  { label: "Most Upvoted", value: "threads/sort/upvote_count:desc" },
  { label: "Most Comments", value: "threads/sort/comment_count:desc" },
];

export const TABS = [
  { id: "protocols", label: "Protocols", icon: BookOpen },
  { id: "threads", label: "Threads", icon: FileText },
];
