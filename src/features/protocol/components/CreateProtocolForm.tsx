"use client";

import { FormEvent, useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FormButton from "@/global/components/ui/FormButton";
import { ErrorState } from "@/global/types";
import TagInput from "@/global/components/ui/TagInput";
import { CreateProtocolObject, CreateProtocolSchema } from "../schema";
import { createProtocol } from "../actions/actions";
import FormInput from "@/global/components/ui/FormInput";
import FeedbackTextarea from "@/global/components/ui/TextArea";

const CreateProtocolForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorState<CreateProtocolSchema> | null>(
    null,
  );
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => setTags((prev) => [...prev, tag]);
  const handleRemoveTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const handleFormSubmit = async (_: string, formData: FormData) => {
    try {
      setErrors(null);

      formData.set("tags", tags.join(","));

      const res = await createProtocol(formData);

      if (res && res.success) {
        toast.success("Created Successfully");
        router.push(`/protocol/${res.id}`);
      }

      return "Form submitted successfully!";
    } catch (error) {
      console.error("Create protocol failed:", error);
      toast.error("Submission Failed. Something went wrong. Please try again!");
      return `Form submission failed! ${JSON.stringify(error)}`;
    }
  };

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    const result = CreateProtocolObject.safeParse(entries);

    if (!result.success) {
      event.preventDefault();
      setErrors(result.error.flatten().fieldErrors);
    }
  };

  const [_, formAction] = useActionState(handleFormSubmit, "");

  return (
    <form action={formAction} onSubmit={validateForm} className="space-y-5">
      <div className="space-y-1.5">
        <FormInput
          label={"Title"}
          type="text"
          name="title"
          errors={errors?.title}
          required
          placeholder="Give your protocol a clear, descriptive title..."
        />
      </div>

      <div className="space-y-1.5">
        <FeedbackTextarea
          label="Content"
          required
          placeholder="Describe your protocol in detail. What problem does it solve? How does it work? What are the best practices?"
          name="content"
          error={errors?.content}
          rows={8}
        />
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          {"Tags"}
        </label>
        <TagInput
          tags={tags}
          onAdd={handleAddTag}
          onRemove={handleRemoveTag}
          error={errors?.tags}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 ">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          {"Cancel"}
        </button>
        <FormButton className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-full transition-colors cursor-pointer">
          {"Publish Protocol"}
        </FormButton>
      </div>
    </form>
  );
};

export default CreateProtocolForm;
