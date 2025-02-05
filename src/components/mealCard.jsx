"use client";

import StarRating from "./starRating";
import { Trash2 } from "lucide-react";

const MealCard = ({
  name,
  image,
  isSelected,
  onSelect,
  deleteMeal,
  cuisine,
  rating,
  instructions,
}) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={`relative border bg-white rounded-lg p-4 m-2 cursor-pointer max-w-[360px] shadow-xl ${
        isSelected ? "border-2 border-[#004370]" : "border border-gray-300"
      }`}
      onClick={handleSelect}
    >
      {deleteMeal && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteMeal();
          }}
          className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
        >
          <Trash2 size={20} />
        </button>
      )}

      <img src={image} alt={name} className="rounded-lg w-full h-64 object-cover" />
      <h2 className="text-xl font-bold mt-4">{name}</h2>

      <div className="md:h-48 overflow-y-auto mt-2">
        <p>{instructions}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>
          <strong>Cuisine:</strong> {cuisine}
        </p>
        <div className="flex items-center">
          <p className="me-1">
            <strong>Rating:</strong> {rating}
          </p>
          <StarRating rating={parseFloat(rating)} />
        </div>
      </div>
    </div>
  );
};

export default MealCard;
