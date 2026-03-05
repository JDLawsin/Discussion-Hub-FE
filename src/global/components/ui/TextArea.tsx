import clsx from "clsx";

interface Props {
  name: string;
  error?: string[];
  className?: string;
  placeholder?: string;
}

const FeedbackTextarea = ({
  name,
  error,
  className,
  placeholder = "Share your thoughts (optional)...",
}: Props) => (
  <div className="flex flex-col gap-1">
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows={3}
      className={clsx(
        "w-full text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-400",
        className,
      )}
    />
    {error && <p className="text-xs text-red-500">{error[0]}</p>}
  </div>
);

export default FeedbackTextarea;
