import clsx from "clsx";

interface Props {
  value: string;
  error?: string[];
  onChange: (value: string) => void;
  className?: string;
}

const FeedbackTextarea = ({ value, error, onChange, className }: Props) => (
  <div className="flex flex-col gap-1">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Share your thoughts (optional)..."
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
