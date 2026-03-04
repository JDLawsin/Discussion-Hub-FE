export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const createQueryString = (
  params: Record<string, string | undefined>,
  currentSearchParams?: URLSearchParams,
): string => {
  const newSearchParams = new URLSearchParams(
    currentSearchParams?.toString() ?? "",
  );

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(value));
    }
  }

  return newSearchParams.toString();
};
