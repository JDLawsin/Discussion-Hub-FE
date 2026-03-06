"use client";

import Card from "@/global/components/ui/Card";
import FormButton from "@/global/components/ui/FormButton";
import { FormEvent, useActionState, useState } from "react";
import { LoginFormObject, LoginFormSchema } from "../schema";
import { AuthenticatedUser, ErrorState } from "@/global/types";
import FormInput from "@/global/components/ui/FormInput";
import Link from "next/link";
import ApiRequestBuilder from "@/global/libs/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setAuthCookies } from "../actions/actions";
import { isAxiosError } from "axios";

const LoginForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorState<LoginFormSchema> | null>(
    null,
  );

  const handleFormSubmit = async (_: string, formData: FormData) => {
    try {
      setErrors(null);

      const authenticatedUser = await new ApiRequestBuilder<AuthenticatedUser>()
        .setMethod("post")
        .setUrl(`${process.env.NEXT_PUBLIC_API_URL}/login`)
        .setHeaders({ "Content-Type": "application/json" })
        .setData(Object.fromEntries(formData.entries()))
        .send();
      const { token, user } = authenticatedUser;

      if (token && user) {
        await setAuthCookies(token, user);
      } else {
        throw new Error("Invalid response from server");
      }

      router.push("/browse");
      return "Form submitted successfully!";
    } catch (error) {
      console.error("Login failed:", error);
      if (isAxiosError(error) && error.response) {
        setErrors(error.response.data.errors || null);
      } else {
        toast.error("Login failed. Something went wrong. Please try again!");
      }
      return `Form submission failed! ${JSON.stringify(error)}`;
    }
  };

  const [_, formAction, __] = useActionState(handleFormSubmit, "");

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const formDataEntries = Object.fromEntries(formData.entries());
    const result = LoginFormObject.safeParse(formDataEntries);

    if (result.error) {
      event.preventDefault();
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  return (
    <Card className="flex-col gap-5 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-gray-800">{"Welcome back"}</h2>
        <p className="text-xs text-gray-400">
          {"Log in to continue the conversation"}
        </p>
      </div>

      <form
        action={formAction}
        onSubmit={validateForm}
        className="flex flex-col gap-4"
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          errors={errors?.email}
          placeholder="you@example.com"
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          errors={errors?.password}
          placeholder="••••••••"
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-teal-500 hover:underline"
          >
            {"Forgot password?"}
          </Link>
        </div>

        <FormButton className="flex w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-md cursor-pointer transition-colors items-center justify-center">
          {"Log in"}
        </FormButton>
      </form>
    </Card>
  );
};

export default LoginForm;
