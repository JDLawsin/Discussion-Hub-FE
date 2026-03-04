import { useEffect, useRef } from "react";
import { useInstantSearch } from "react-instantsearch"; // add useInstantSearch

const SearchTrigger = () => {
  const { refresh } = useInstantSearch();
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;
    refresh();
  }, [refresh]);

  return null;
};

export default SearchTrigger;
