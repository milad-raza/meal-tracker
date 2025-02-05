export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-lg">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-[#004370]">
          &#9733;
        </span> // Full star
      ))}
      {hasHalfStar && <span className="text-[#004370]">&#9733;</span>}{" "}
      {/* Half star */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">
          &#9733;
        </span> // Empty star
      ))}
    </div>
  );
}
