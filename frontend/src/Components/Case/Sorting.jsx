// src/Components/Case/Sorting.jsx
 
import { useSearchParams } from "react-router-dom";

import { useCallback } from "react";

const Sorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSort = useCallback((value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", value);
    newParams.set("page", 1);
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  return (
    <select
      value={searchParams.get("sortBy") || "newest"}
      onChange={(e) => updateSort(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="titleAsc">Title A-Z</option>
      <option value="titleDesc">Title Z-A</option>
      <option value="sizeAsc">Size A-Z</option>
      <option value="sizeDesc">Size Z-A</option>
    </select>
  );
};

export default Sorting;
