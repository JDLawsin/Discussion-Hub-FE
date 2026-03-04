import ApiRequestBuilder from "@/global/libs/axios";
import { Protocol } from "../types/types";
import { ApiResponse } from "@/global/types";

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
