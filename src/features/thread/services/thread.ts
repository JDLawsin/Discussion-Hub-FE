import ApiRequestBuilder from "@/global/libs/axios";
import { Thread } from "../types/types";
import { ApiResponse } from "@/global/types";

export const getThreadById = async (id: string): Promise<Thread> => {
  try {
    const response = await new ApiRequestBuilder<ApiResponse<Thread>>()
      .setMethod("get")
      .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/threads/view/${id}`)
      .send();

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch protocol with id ${id}: ${error}`);
  }
};
