import { Tag, X } from "lucide-react";
import { useState } from "react";

interface Props {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  error?: string[] | null;
  maxTags?: number;
}

const TagInput = ({ tags, onAdd, onRemove, error, maxTags = 5 }: Props) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = input.trim().toLowerCase().replace(/\s+/g, "-");
      if (value && !tags.includes(value) && tags.length < 5) {
        onAdd(value);
        setInput("");
      }
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="space-y-1.5">
      <div
        className={`flex flex-wrap gap-1.5 min-h-10 px-3 py-2 bg-gray-50 border rounded-xl transition-all focus-within:bg-white focus-within:border-teal-300 focus-within:ring-2 focus-within:ring-teal-100 ${
          error ? "border-red-300" : "border-gray-200"
        }`}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full"
          >
            <Tag className="w-2.5 h-2.5" />
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="ml-0.5 hover:text-teal-800 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            tags.length === 0 ? "Add tags (press Enter or comma)..." : ""
          }
          className="flex-1 min-w-32 text-sm bg-transparent outline-none placeholder-gray-400"
          disabled={tags.length >= maxTags}
        />
      </div>
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-xs text-red-500">{error[0]}</p>
        ) : (
          <p className="text-xs text-gray-400">
            {"Press Enter or comma to add · max 5 tags"}
          </p>
        )}
        <span className="text-xs text-gray-400">{tags.length}/5</span>
      </div>
    </div>
  );
};

export default TagInput;
