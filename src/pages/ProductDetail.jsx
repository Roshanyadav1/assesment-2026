import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import {
  fetchProductById,
  clearCurrentProduct,
} from "../redux/slices/productsSlice";
import {
  toggleFavorite,
  selectIsFavorite,
} from "../redux/slices/favoritesSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    currentProduct: item,
    loading,
    error,
  } = useAppSelector((state) => state.products);
  const isWishlisted = useAppSelector((state) =>
    selectIsFavorite(state, parseInt(id)),
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(parseInt(id)));
    return () => dispatch(clearCurrentProduct());
  }, [id, dispatch]);

  const handleWishlistToggle = () => {
    if (item) dispatch(toggleFavorite(item));
  };

  // Minimalist Shimmer for Detail Page
  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square bg-zinc-100 rounded-[2rem]" />
          <div className="space-y-6 py-10">
            <div className="h-12 bg-zinc-100 rounded-xl w-3/4" />
            <div className="h-6 bg-zinc-50 rounded-xl w-1/4" />
            <div className="h-32 bg-zinc-50 rounded-xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Item not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="underline underline-offset-8 font-bold text-xs uppercase tracking-widest"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
      {/* Navigation Rail */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 mb-12 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M15 19l-7-7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Visual Presentation */}
        <div className="bg-zinc-50 rounded-[2.5rem] p-12 lg:p-20 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[600px] object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Product Information */}
        <div className="lg:sticky lg:top-32 space-y-10 py-4">
          <header className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                {item.category}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-zinc-900">
                  {item.rating.rate}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${i < Math.floor(item.rating.rate) ? "bg-zinc-900" : "bg-zinc-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-900 leading-tight">
              {item.title}
            </h1>
          </header>

          <div className="space-y-4">
            <h2 className="text-5xl font-light tracking-tighter text-zinc-900">
              ${item.price.toFixed(2)}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md italic">
              Excluding taxes and shipping. Sustainable materials.
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-100 pt-10">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
              Description
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>

          {/* Action Hub */}
          <div className="pt-6">
            <button
              onClick={handleWishlistToggle}
              className={`w-full py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 ${
                isWishlisted
                  ? "bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200"
                  : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200"
              }`}
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Collection"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
