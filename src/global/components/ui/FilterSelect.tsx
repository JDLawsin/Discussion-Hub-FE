import { TABS } from "@/features/browse/constants/constants";
import { Tab } from "@/features/browse/types/types";

interface Props {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const FilterSelect = ({ activeTab, onChange }: Props) => {
  const handleButtonClick = (tab: Tab) => {
    onChange(tab);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => handleButtonClick(id as Tab)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            activeTab === id
              ? "bg-white text-teal-500 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterSelect;
