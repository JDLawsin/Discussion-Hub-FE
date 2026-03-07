"use server";

import ApiRequestBuilder from "@/global/libs/axios";
import { SuccessApiResponse } from "@/global/types";
import { cookies } from "next/headers";

export const createProtocol = async (formData: FormData, tags: string[]) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<
        SuccessApiResponse & { id: number }
      >()
        .setMethod("post")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/protocols`)
        .setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
        .setData({
          ...Object.fromEntries(formData.entries()),
          tags: tags,
        })
        .send();

      return res;
    }
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};

export const deleteProtocol = async (protocolId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<SuccessApiResponse>()
        .setMethod("delete")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/protocols/${protocolId}`)
        .setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
        .send();

      return res;
    }
  } catch (error) {
    console.error("Failed to delete protocol:", error);
    throw error;
  }
};
