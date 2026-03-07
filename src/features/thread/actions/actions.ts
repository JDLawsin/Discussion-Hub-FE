"use server";

import ApiRequestBuilder from "@/global/libs/axios";
import { SuccessApiResponse } from "@/global/types";
import { cookies } from "next/headers";

export const createThread = async (formData: FormData, tags: string[]) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<
        SuccessApiResponse & { id: number }
      >()
        .setMethod("post")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/threads`)
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

export const deleteThread = async (threadId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<SuccessApiResponse>()
        .setMethod("delete")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/threads/${threadId}`)
        .setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
        .send();

      return res;
    }
  } catch (error) {
    console.error("Failed to delete thread:", error);
    throw error;
  }
};
