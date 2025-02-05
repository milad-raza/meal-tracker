const MealCardSkeleton = () => {
  return (
    <div className="relative border bg-white rounded-lg p-4 m-2 w-[300] sm:w-[360px] shadow-xl animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-200 rounded-lg"></div>

      {/* Title Placeholder */}
      <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>

      {/* Description Placeholder */}
      <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
      <div className="mt-1 h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="mt-1 h-4 bg-gray-200 rounded w-4/6"></div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        {/* Cuisine Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>

        {/* Rating Placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-300 rounded w-6"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default MealCardSkeleton;
