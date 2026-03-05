const ONE_MINUTE = 3 * 60 * 1000;

export const swrConfig = {
  dedupingInterval: ONE_MINUTE,
  focusThrottleInterval: ONE_MINUTE,
  refreshInterval: 0,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
} as const;
