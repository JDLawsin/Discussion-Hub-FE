import ProtocolCard from "@/features/browse/components/ProtocolCard";
import ThreadCard from "@/features/browse/components/ThreadCard";
import { ProtocolHit, Tab, ThreadHit } from "@/features/browse/types/types";
import { useHits } from "react-instantsearch";
import EmptyResults from "./EmptyResults";

const TypeSenseHits = ({ activeTab }: { activeTab: Tab }) => {
  const { hits } = useHits();

  if (hits.length === 0) {
    return <EmptyResults />;
  }

  return (
    <div className="flex flex-col gap-3">
      {hits.map((hit) => {
        if (activeTab === "protocols" || "average_rating" in hit) {
          return (
            <ProtocolCard
              key={hit.objectID}
              hit={hit as unknown as ProtocolHit}
            />
          );
        }
        return (
          <ThreadCard key={hit.objectID} hit={hit as unknown as ThreadHit} />
        );
      })}
    </div>
  );
};

export default TypeSenseHits;
