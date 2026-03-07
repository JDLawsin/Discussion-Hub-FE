"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import StarInput from "@/global/components/ui/StarInput";
import FeedbackTextarea from "@/global/components/ui/TextArea";
import { ErrorState } from "@/global/types";
import { ReviewFormObject, ReviewFormSchema } from "../schema";
import { FormEvent, useActionState, useState } from "react";
import FormButton from "@/global/components/ui/FormButton";
import { useParams } from "next/navigation";
import { submitReview } from "@/features/review/actions/actions";
import { toast } from "react-toastify";

interface Props {
  onToggle: () => void;
  mutate: () => void;
}

const ReviewForm = ({ onToggle, mutate }: Props) => {
  const { isAuthenticated } = useAuth();
  const { protocolId } = useParams();
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState<ErrorState<ReviewFormSchema> | null>(
    null,
  );

  const handleFormSubmit = async (_: string, formData: FormData) => {
    try {
      setErrors(null);

      const res = await submitReview(protocolId, formData);

      if (res && res.success) {
        mutate();
        toast.success("Reviewed Successfully");
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
    const result = ReviewFormObject.safeParse(formDataEntries);

    if (result.error) {
      event.preventDefault();
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <form action={formAction} onSubmit={validateForm}>
        <h4 className="text-sm font-semibold text-gray-800 mb-3">
          {"Rate this protocol"}
        </h4>

        <div className="mb-3">
          <input type="hidden" name="rating" value={rating} />
          <StarInput value={rating} onChange={(val) => setRating(val)} />
        </div>

        <FeedbackTextarea name="feedback" error={errors?.feedback} />

        <div className="flex justify-end mt-2">
          <FormButton className="flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-full transition-colors cursor-pointer">
            {"Submit Review"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
