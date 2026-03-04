"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  value: number;
  max?: number;
  onChange: (val: number) => void;
}

const StarInput = ({ value, max = 5, onChange }: Props) => {
  const [hovered, setHovered] = useState(0);

  const isActive = (index: number) => index <= (hovered || value);

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              isActive(star)
                ? "fill-orange-400 text-orange-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarInput;
