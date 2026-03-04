import { FileText, Star } from "lucide-react";
import { Section } from "../types/types";

interface Props {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  threadsCount: number;
  reviewsCount: number;
}

const SectionTabs = ({
  activeSection,
  onSectionChange,
  threadsCount,
  reviewsCount,
}: Props) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full w-fit">
      {["threads", "reviews"].map((section) => (
        <button
          key={section}
          onClick={() => onSectionChange(section as Section)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
            activeSection === section
              ? "bg-white text-orange-500 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {section === "threads" ? (
            <FileText className="w-3.5 h-3.5" />
          ) : (
            <Star className="w-3.5 h-3.5" />
          )}
          {section}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${activeSection === section ? "bg-orange-100 text-orange-600" : "bg-gray-200 text-gray-500"}`}
          >
            {section === "threads" ? threadsCount : reviewsCount}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;
