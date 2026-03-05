import { useAuth } from "@/features/auth/hooks/useAuth";
import FormButton from "@/global/components/ui/FormButton";
import FeedbackTextarea from "@/global/components/ui/TextArea";
import { ErrorState } from "@/global/types";
import { useParams } from "next/navigation";
import { FormEvent, useActionState, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onToggle: () => void;
}

const ReplyForm = ({ onToggle }: Props) => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const [errors, setErrors] = useState<ErrorState<{ comment: "" }> | null>(
    null,
  );

  const handleFormSubmit = async (_: string, formData: FormData) => {
    try {
      setErrors(null);

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
    // const result = {}.safeParse(formDataEntries);

    // if (result.error) {
    //   event.preventDefault();
    //   setErrors(result.error.flatten().fieldErrors);
    // }
  };

  if (!isAuthenticated) return null;

  if (!isAuthenticated) return null;

  return (
    <div className="mt-2 space-y-2">
      <form action={formAction} onSubmit={validateForm}>
        <FeedbackTextarea
          placeholder="Write a reply..."
          name="feedback"
          error={errors?.comment}
        />
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => onToggle()}
            className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            {"Cancel"}
          </button>
          <FormButton className="flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-colors cursor-pointer">
            {"Reply"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
