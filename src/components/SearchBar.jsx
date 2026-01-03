import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppSelector";
import { setSearchTerm } from "../redux/slices/productsSlice";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  // Update Redux store when debounced search term changes
  React.useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        placeholder="Search collection..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="block w-full pl-8 pr-10 py-3 bg-transparent border-b border-zinc-100 text-sm font-medium text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-0 focus:border-zinc-900"
      />
      {searchInput && (
        <button
          onClick={handleClearSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-1 group/btn"
          aria-label="Clear search"
        >
          <div className="p-1 rounded-full bg-zinc-50 group-hover/btn:bg-zinc-100 transition-all active:scale-90">
            <svg
              className="h-3 w-3 text-zinc-400 group-hover/btn:text-zinc-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
