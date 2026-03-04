"use client";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useState } from "react";
import { Tab } from "../types/types";
import "instantsearch.css/themes/satellite.css";
import TypeSenseSearchBox from "@/global/components/ui/TypeSenseSearchBox";
import TypeSenseSortBy from "@/global/components/ui/TypeSenseSortBy";
import TypeSenseHits from "@/global/components/ui/TypeSenseHits";
import TypeSensePagination from "@/global/components/ui/TypeSensePagination";
import { searchClients } from "@/global/libs/typesense";
import SearchTrigger from "./SearchTrigger";
import FilterSelect from "@/global/components/ui/FilterSelect";

const Browse = () => {
  const [activeTab, setActiveTab] = useState<Tab>("protocols");

  return (
    <InstantSearchNext
      key={activeTab}
      routing={false}
      indexName={activeTab === "protocols" ? "protocols" : "threads"}
      searchClient={searchClients[activeTab]}
      initialUiState={{
        [activeTab]: {
          page: 1,
        },
      }}
    >
      {/** // NOTE: `SearchTrigger` is a workaround for InstantSearch not firing an initial search on mount
          // when switching between collections (protocols <-> threads).
          // We can update this logic once we have a better understanding of the root cause and able to implement a more elegant solution.
        */}
      <SearchTrigger />

      <div className="mb-4">
        <TypeSenseSearchBox />
      </div>

      <div className="flex items-center justify-between mb-4">
        <FilterSelect
          activeTab={activeTab}
          onChange={(tab: Tab) => setActiveTab(tab)}
        />

        <TypeSenseSortBy activeTab={activeTab} />
      </div>
      <TypeSenseHits activeTab={activeTab} />

      <TypeSensePagination />
    </InstantSearchNext>
  );
};

export default Browse;
