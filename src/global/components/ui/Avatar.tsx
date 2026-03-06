import { getInitials } from "@/global/libs/utils";
import clsx from "clsx";

interface Props {
  name: string;
  classname?: string;
}

const Avatar = ({ name, classname }: Props) => (
  <div
    className={clsx(
      "w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0",
      classname,
    )}
  >
    {getInitials(name)}
  </div>
);

export default Avatar;
