import { Star } from "lucide-react";

interface Props {
  rating: number;
  size?: "sm" | "lg";
}

const StarDisplay = ({ rating, size = "sm" }: Props) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5"} ${
          i < Math.round(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-200 fill-gray-200"
        }`}
      />
    ))}
  </div>
);

export default StarDisplay;
