import { formatDistanceToNowStrict } from "date-fns";

const unitMap: Record<string, string> = {
  seconds: "s",
  second: "s",
  minutes: "m",
  minute: "m",
  hours: "h",
  hour: "h",
  days: "d",
  day: "d",
};

export const timeAgo = (timestamp: number | string) => {
  const date =
    typeof timestamp === "string"
      ? new Date(timestamp)
      : new Date(timestamp * 1000);

  const result = formatDistanceToNowStrict(date, { addSuffix: true });

  const [value, unit] = result.split(" ");
  return `${value}${unitMap[unit] ?? unit} ago`;
};
