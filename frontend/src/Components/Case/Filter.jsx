// src/Components/Case/Filter.jsx

import { useSearchParams } from "react-router-dom";

import { useCallback } from "react";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = useCallback((key, value) => { 
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") newParams.delete(key);
    else newParams.set(key, value);
    newParams.set("page", 1);
    setSearchParams(newParams);

  }, [searchParams, setSearchParams]);

  return (
    <div className="flex gap-4">
      <select
        value={searchParams.get("filterType") || "all"}
        onChange={(e) => updateParam("filterType", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="all">All Types</option>
        <option value="docs">Document</option>
        <option value="image">Image</option>
        <option value="media">Media</option>
        <option value="other">Other</option>
      </select>

      <select
        value={searchParams.get("accessFilter") || "all"}
        onChange={(e) => updateParam("accessFilter", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="all">All Access</option>
        <option value="canDelete">Can Delete</option>
      </select>
    </div>
  );
};

export default Filter;
