"use client";

import { Protocol, Section } from "../types/types";
import ViewProtocolCard from "./ViewProtocolCard";
import SectionTabs from "./SectionTabs";
import { useSearchParams } from "next/navigation";
import useUpdateQueryString from "@/global/hooks/useQueryString";
import ThreadSection from "@/features/thread/components/ThreadSection";
import ReviewSection from "@/features/review/components/ReviewSection";

interface Props {
  data: Protocol;
}

const ViewProtocolContainer = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const updateQueryString = useUpdateQueryString();

  const activeSection = (searchParams.get("section") || "threads") as Section;

  const handleChangeSection = (section: Section) => {
    if (section === "reviews") {
      updateQueryString({ section }, ["sort"]);
      return;
    }

    updateQueryString({ section });
  };

  return (
    <div className="space-y-4">
      <ViewProtocolCard data={data} />
      <SectionTabs
        activeSection={activeSection}
        onSectionChange={handleChangeSection}
        threadsCount={data.threadCount}
        reviewsCount={data.reviewCount}
      />
      {activeSection === "threads" && <ThreadSection />}
      {activeSection === "reviews" && <ReviewSection />}
    </div>
  );
};

export default ViewProtocolContainer;
