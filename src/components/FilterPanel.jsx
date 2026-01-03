import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import {
  setSelectedCategory,
  setSortBy,
  setSearchTerm,
} from "../redux/slices/productsSlice";

const FilterPanel = ({ isMobile = false }) => {
  const dispatch = useAppDispatch();
  const { selectedCategory, sortBy, categories } = useAppSelector((state) => state.products);
  
  // Professional touch: Always start mobile closed, desktop open
  const [isOpen, setIsOpen] = useState(!isMobile);

  const sortOptions = [
    { value: "default", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating-high", label: "Top Rated" },
  ];

  const handleSelect = (action, value) => {
    dispatch(action(value));
    if (isMobile) setIsOpen(false); 
  };

  const FilterSection = ({ title, children }) => (
    <div className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        {title}
      </h3>
      <div className="flex flex-col items-start gap-2">
        {children}
      </div>
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-10">
      {/* Category List */}
      <FilterSection title="Categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(setSelectedCategory, cat)}
            className={`text-sm transition-all duration-200 capitalize ${
              selectedCategory === cat 
                ? "text-zinc-900 font-semibold underline underline-offset-8" 
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {cat === "all" ? "All Collections" : cat}
          </button>
        ))}
      </FilterSection>

      {/* Sort List */}
      <FilterSection title="Sort By">
        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(setSortBy, opt.value)}
            className={`text-sm transition-all duration-200 ${
              sortBy === opt.value 
                ? "text-zinc-900 font-semibold underline underline-offset-8" 
                : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </FilterSection>

      <button
        onClick={() => {
          dispatch(setSelectedCategory("all"));
          dispatch(setSortBy("default"));
          dispatch(setSearchTerm(""));
        }}
        className="text-[10px] font-bold text-red-500 uppercase tracking-widest pt-4 hover:opacity-70 transition-opacity"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-4 px-1 border-b border-zinc-100"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">
            {isOpen ? "Close Filters" : "Filter & Sort"}
          </span>
          <span className="text-xl text-zinc-900">{isOpen ? "−" : "+"}</span>
        </button>
      )}

      {/* Accordion / Panel Logic */}
      <div className={`${isMobile ? (isOpen ? "block animate-in fade-in slide-in-from-top-4 duration-300 py-6" : "hidden") : "block"}`}>
        <FilterContent />
      </div>
    </div>
  );
};

export default FilterPanel;