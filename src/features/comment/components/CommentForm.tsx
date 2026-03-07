"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import FormButton from "@/global/components/ui/FormButton";
import FeedbackTextarea from "@/global/components/ui/TextArea";
import { ErrorState } from "@/global/types";
import { useParams } from "next/navigation";
import { FormEvent, useActionState, useState } from "react";
import { toast } from "react-toastify";
import { CommentFormObject } from "../schema";
import { submitComment } from "../actions/actions";

interface Props {
  onToggle: () => void;
  mutate: () => void;
}

const CommentForm = ({ onToggle, mutate }: Props) => {
  const { isAuthenticated } = useAuth();
  const { threadId } = useParams();
  const [errors, setErrors] = useState<ErrorState<{ comment: "" }> | null>(
    null,
  );

  const handleFormSubmit = async (_: string, formData: FormData) => {
    try {
      setErrors(null);

      const res = await submitComment(threadId, formData);

      if (res && res.success) {
        mutate();
        toast.success("Commented Successfully");
        onToggle();
      }

      return "Form submitted successfully!";
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Submission Failed. Something went wrong. Please try again!");
      return `Form submission failed! ${JSON.stringify(error)}`;
    }
  };

  const [_, formAction, __] = useActionState(handleFormSubmit, "");

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const formDataEntries = Object.fromEntries(formData.entries());
    const result = CommentFormObject.safeParse(formDataEntries);

    if (result.error) {
      event.preventDefault();
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
      <form action={formAction} onSubmit={validateForm}>
        <FeedbackTextarea
          placeholder={"What are your thoughts?"}
          name="comment"
          error={errors?.comment}
        />
        <div className="flex justify-end mt-2">
          <FormButton className="flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-full transition-colors cursor-pointer">
            {"Comment"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
