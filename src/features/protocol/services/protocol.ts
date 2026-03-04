import ApiRequestBuilder from "@/global/libs/axios";
import { Protocol } from "../types/types";
import { ApiResponse } from "@/global/types";
import { cookies } from "next/headers";

export const getProtocolById = async (id: string): Promise<Protocol> => {
  try {
    const response = await new ApiRequestBuilder<ApiResponse<Protocol>>()
      .setMethod("get")
      .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/protocols/${id}`)
      .send();

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch protocol with id ${id}: ${error}`);
  }
};

export const checkIfUserHasReviewed = async (id: string): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    const response = await new ApiRequestBuilder<{ hasReviewed: boolean }>()
      .setMethod("get")
      .setUrl(
        `${process.env.NEXT_PUBLIC_API_URL}/protocols/${id}/reviews/has-reviewed`,
      )
      .setHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      })
      .send();

    return response.hasReviewed;
  } catch (error) {
    throw new Error(`Failed to fetch hasReviewed with id ${id}: ${error}`);
  }
};
