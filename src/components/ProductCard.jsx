import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../redux/slices/favoritesSlice";

const ProductCard = ({ product }) => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    selectIsFavorite(state, product.id),
  );

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(product));
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white border border-zinc-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-sm"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-zinc-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {location.pathname !== "/favorites" && (
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-zinc-100 shadow-sm hover:bg-white transition-all active:scale-90"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className={`w-4 h-4 transition-colors duration-300 ${
                isFavorite ? "text-zinc-900 fill-current" : "text-zinc-400"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-2.5 py-1 bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="text-zinc-900 font-medium leading-tight line-clamp-1 group-hover:underline decoration-zinc-300 underline-offset-4">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <Rating rating={product.rating.rate} />
            <span className="text-[11px] font-medium text-zinc-400">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
            Free Shipping
          </span>
        </div>
      </div>
    </Link>
  );
};

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < Math.floor(rating)
              ? "text-zinc-900 fill-current"
              : "text-zinc-200 fill-current"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

export default ProductCard;
