import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "flex w-full shadow-sm rounded-lg bg-white p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
