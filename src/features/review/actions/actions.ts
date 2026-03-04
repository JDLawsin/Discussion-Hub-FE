"use server";

import ApiRequestBuilder from "@/global/libs/axios";
import { SuccessApiResponse } from "@/global/types";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";

export const submitReview = async (id: ParamValue, formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      const res = await new ApiRequestBuilder<SuccessApiResponse>()
        .setMethod("post")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/protocols/${id}/reviews`)
        .setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
        .setData(Object.fromEntries(formData.entries()))
        .send();

      return res;
    }
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};
