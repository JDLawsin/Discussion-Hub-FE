"use server";

import ApiRequestBuilder from "@/global/libs/axios";
import { SuccessApiResponse } from "@/global/types";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";

export const submitComment = async (
  id: ParamValue,
  formData: FormData,
  parentId?: number,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<SuccessApiResponse>()
        .setMethod("post")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/threads/${id}/comments`)
        .setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
        .setData({
          ...Object.fromEntries(formData.entries()),
          ...(parentId ? { parent_id: parentId } : {}),
        })
        .send();

      return res;
    }
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<SuccessApiResponse>()
        .setMethod("delete")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`)
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
