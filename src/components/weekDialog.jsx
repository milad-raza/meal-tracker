"use client";

import { capitalizeText } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export default function WeekDialog({ onClose, onSubmit }) {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleSubmit = () => {
    if (selectedWeek) {
      onSubmit(selectedWeek);
      onClose();
    } else {
      toast.error('Please select a week')
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} 
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-bold mb-10 text-center">Select Week</h2>
        <div className="flex gap-2">
          {["WEEK_1", "WEEK_2", "WEEK_3", "WEEK_4"].map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`w-full text-center py-2 px-6 rounded-lg ${
                selectedWeek === week ? "bg-[#cfecff]" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {capitalizeText(week)}
            </button>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-12 py-2 bg-[#004370] text-white rounded hover:bg-[#003256]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
