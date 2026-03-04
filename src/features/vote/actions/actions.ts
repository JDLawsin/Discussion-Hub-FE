"use server";

import ApiRequestBuilder from "@/global/libs/axios";
import { cookies } from "next/headers";

type VotePayload = {
  votableType: "thread" | "comment";
  votableId: string | number;
  type: "upvote" | "downvote" | null;
};

export const castVote = async (payload: VotePayload) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  if (!token) throw new Error("Unauthenticated");

  const res = await new ApiRequestBuilder()
    .setMethod("post")
    .setUrl(
      `${process.env.NEXT_PUBLIC_API_URL}/${payload.votableType}s/${payload.votableId}/vote`,
    )
    .setHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    })
    .setData(payload)
    .send();

  return res;
};
