import clsx from "clsx";
import { Tag } from "lucide-react";

interface Props {
  text: string;
  className?: string;
}

const Badge = ({ text, className }: Props) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer",
      className,
    )}
  >
    <Tag className="w-3 h-3" />
    {text}
  </span>
);

export default Badge;
