import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import {
  selectFavorites,
  removeFromFavorites,
  clearFavorites,
} from "../redux/slices/favoritesSlice";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleClearAll = () => {
    if (window.confirm("Remove all items from your wishlist?")) {
      dispatch(clearFavorites());
    }
  };

  // Empty State
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-zinc-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-zinc-500 max-w-xs mb-8 text-sm">
          Save items you love here to keep track of your favorite pieces.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-all active:scale-95"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Wishlist
          </h1>
          <p className="text-zinc-500 text-sm">
            {favorites.length} {favorites.length === 1 ? "Product" : "Products"}{" "}
            Saved
          </p>
        </div>

        <button
          onClick={handleClearAll}
          className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors py-2"
        >
          Clear All Items
        </button>
      </header>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {favorites.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />

            {/* Overlay */}
            <button
              onClick={() => dispatch(removeFromFavorites(product.id))}
              className="absolute top-4 left-4 z-20 p-2 bg-white/90 backdrop-blur-sm border border-zinc-100 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-600"
              title="Quick Remove"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
