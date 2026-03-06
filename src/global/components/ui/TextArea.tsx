import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  error?: string[];
  className?: string;
  placeholder?: string;
  label?: string;
}

const FeedbackTextarea = ({
  name,
  label,
  error,
  className,
  required,
  placeholder = "Share your thoughts (optional)...",
  ...props
}: Props) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={name}
      className="flex items-center text-sm font-medium text-gray-700 gap-1.5"
    >
      {label}
      {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows={3}
      className={clsx(
        "w-full text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100 transition-all placeholder-gray-400",
        className,
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error[0]}</p>}
  </div>
);

export default FeedbackTextarea;
