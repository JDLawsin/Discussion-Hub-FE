"use client";

import { swrConfig } from "@/global/config/swr";
import { SWRConfig } from "swr";

interface SWRProviderProps {
  children: React.ReactNode;
}

const SWRProvider = ({ children }: SWRProviderProps) => (
  <SWRConfig value={swrConfig}>{children}</SWRConfig>
);

export default SWRProvider;
