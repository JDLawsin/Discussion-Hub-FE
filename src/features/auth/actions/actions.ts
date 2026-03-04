"use server";
import ApiRequestBuilder from "@/global/libs/axios";
import { User } from "@/global/types";
import { cookies } from "next/headers";

const isProduction = process.env.NODE_ENV === "production";

export const setAuthCookies = async (token: string, user: User) => {
  const cookieStore = await cookies();
  cookieStore.set("apiToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  cookieStore.set("authUser", JSON.stringify(user), {
    httpOnly: false,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  cookieStore.set("isAuthenticated", "true", { httpOnly: false });
};

export const logout = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  try {
    if (token) {
      await new ApiRequestBuilder()
        .setMethod("post")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/logout`)
        .setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
        .send();
    }
  } catch (error) {
    console.error("Logout failed:", error);
    console.log("Logout failed, clearing cookies anyway");
  } finally {
    cookieStore.delete("apiToken");
    cookieStore.delete("authUser");
    cookieStore.delete("isAuthenticated");
  }
};
