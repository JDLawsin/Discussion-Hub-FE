import { Star } from "lucide-react";

interface Props {
  rating: number;
}

const StarRating = ({ rating }: Props) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-3 h-3 ${
        i < Math.round(rating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-200 fill-gray-200"
      }`}
    />
  ));
};

export default StarRating;
