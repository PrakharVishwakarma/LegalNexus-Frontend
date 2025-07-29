// src/Components/Case/SearchByTitle.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchByTitle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";

      // ✅ Don't update if input hasn't changed
      if (input === currentSearch) return;

      const newParams = new URLSearchParams(searchParams);
      
      if (input === "") {
        newParams.delete("search");
      } else {
        newParams.set("search", input);
      }

      // ✅ Reset to first page only if the search term changes
      newParams.set("page", "1");

      setSearchParams(newParams);
    }, 500); // debounce faster (UX improvement)

    return () => clearTimeout(handler);
  }, [input]); // ✅ Only run effect when input changes

  return (
    <input
      type="text"
      placeholder="Search by title..."
      className="border border-gray-300 rounded px-3 py-2 w-64"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchByTitle;
