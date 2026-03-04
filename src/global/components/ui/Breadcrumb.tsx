import { ChevronRight } from "lucide-react";
import { ComponentType } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ComponentType<{ className?: string }>;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

interface BreadcrumbItemProps {
  item: BreadcrumbItem;
  isLast: boolean;
  Icon?: ComponentType<{ className?: string }>;
}

const Breadcrumb = ({ items = [], className = "" }: Props) => {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 text-xs text-gray-400 ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Icon = item.icon;

        return (
          <BreadcrumbItem
            key={item.label}
            item={item}
            isLast={isLast}
            Icon={Icon}
          />
        );
      })}
    </nav>
  );
};

const BreadcrumbItem = ({ item, isLast, Icon }: BreadcrumbItemProps) => (
  <>
    <span
      className={`flex items-center gap-1.5 ${
        isLast ? "text-gray-600 font-medium truncate" : ""
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}

      {item.href && !isLast ? (
        <a href={item.href} className="hover:text-gray-600 transition-colors">
          {item.label}
        </a>
      ) : (
        <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
      )}
    </span>

    {!isLast && (
      <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
    )}
  </>
);

export default Breadcrumb;
