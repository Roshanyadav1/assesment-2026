const ProductSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {/* Image area */}
    <div className="aspect-[4/5] w-full bg-zinc-100 rounded-2xl" />

    {/* Content lines */}
    <div className="space-y-2">
      <div className="h-4 bg-zinc-100 rounded w-2/3" />
      <div className="h-3 bg-zinc-50 rounded w-1/3" />
    </div>

    {/* Bottom line */}
    <div className="flex justify-between items-center pt-2">
      <div className="h-5 bg-zinc-100 rounded w-1/4" />
      <div className="h-3 bg-zinc-50 rounded w-1/4" />
    </div>
  </div>
);

export default ProductSkeleton;
