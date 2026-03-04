import { Nullable } from "@/global/types";
import { VotableType, VoteType } from "../hooks/useVote";
import ApiRequestBuilder from "@/global/libs/axios";
import { cookies } from "next/headers";

type UserVoteResponse = {
  type: Nullable<VoteType>;
};

export const getUserVoteType = async (
  votableType: VotableType,
  votableId: string | number,
): Promise<Nullable<VoteType>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  if (!token) return null;

  try {
    const response = await new ApiRequestBuilder<UserVoteResponse>()
      .setMethod("get")
      .setUrl(
        `${process.env.NEXT_PUBLIC_API_URL}/${votableType}s/${votableId}/vote/user`,
      )
      .setHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      })
      .send();

    return response.type;
  } catch (error) {
    throw new Error(`Failed to fetch user vote: ${error}`);
  }
};
