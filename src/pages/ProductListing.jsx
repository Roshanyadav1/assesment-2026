import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { fetchProducts } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ProductSkeletons from "../components/ProductSkeleton";

const ProductListing = () => {
  const dispatch = useAppDispatch();
  const {
    filteredProducts: products,
    loading,
    error,
    searchTerm,
    selectedCategory,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h2 className="text-zinc-900 font-bold text-2xl mb-3 tracking-tight">
          Connectivity Issue
        </h2>
        <p className="text-zinc-500 max-w-xs mb-8 text-sm leading-relaxed">
          {error}
        </p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="px-10 py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all rounded-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-zinc-100 pb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tighter text-zinc-900 capitalize">
            {loading
              ? "Loading..."
              : selectedCategory === "all"
                ? "Shop All"
                : selectedCategory}
          </h1>
          <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
            {loading ? "Fetching items" : `${products.length} Results`}
            {!loading && searchTerm && <span> for "{searchTerm}"</span>}
          </p>
        </div>
        <div className="w-full md:w-80">
          <SearchBar />
        </div>
      </header>

      <div className="lg:hidden mb-8">
        <FilterPanel isMobile={true} />
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterPanel isMobile={false} />
          </div>
        </aside>

        <section className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {[...Array(6)].map((_, i) => (
                <ProductSkeletons key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-32 text-center border border-dashed border-zinc-200 rounded-[2rem] bg-zinc-50/50">
              <p className="text-zinc-400 text-sm font-medium">
                No pieces found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductListing;
