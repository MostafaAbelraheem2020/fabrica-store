export default function ProductSkeleton() {
  return (
    <div className=" border-neutral-400 rounded-lg p-4 shadow-sm animate-pulse">
      {/* Placeholder for the image */}
      <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>

      {/* Placeholder for the title */}
      <div className="h-4 bg-gray-300 rounded mb-2"></div>

      {/* Placeholder for the category */}
      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>

      {/* Placeholder for the description */}
      <div className="h-3 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded mb-3 w-2/3"></div>

      {/* Placeholder for the price */}
      <div className="h-5 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}
