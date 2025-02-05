"use client";

import { useLayoutEffect, useState } from "react";
import MealCard from "./mealCard";
import { capitalizeText } from "@/lib/utils";
import WeekDialog from "./weekDialog";
import toast from "react-hot-toast";
import MealCardSkeleton from "./mealCardSkeleton";

export default function WeekOrders() {
  const [activeTab, setActiveTab] = useState("ALL_MEALS");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [meals, setMeals] = useState({
    data: [],
    loading: false,
    error: null,
  });
  const [selectedMealsByWeek, setSelectedMealsByWeek] = useState([]);
  const [isWeekDialogOpen, setIsWeekDialogOpen] = useState(false);

  const fetchMeals = async () => {
    try {
      setMeals({
        ...meals,
        loading: true,
      });
      const res = await fetch("https://dummyjson.com/recipes");
      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }
      const data = await res.json();
      setMeals({
        ...meals,
        loading: false,
        data: data?.recipes,
      });
    } catch (err) {
      setMeals({
        ...meals,
        error: err?.message,
      });
    }
  };

  useLayoutEffect(() => {
    fetchMeals();
  }, []);

  const handleMealSelection = (meal) => {
    const allSelectedMeals = [...selectedMeals];
    const mealExists = selectedMeals.findIndex((data) => data?.id === meal?.id);
    if (mealExists !== -1) {
      allSelectedMeals.splice(mealExists, 1);
    } else {
      allSelectedMeals.push(meal);
    }
    setSelectedMeals(allSelectedMeals);
  };

  const handleAddMealsToWeek = (week) => {
    // Check if any selected meals are already assigned to a different week
    const mealsAlreadyAssigned = selectedMeals.filter((meal) =>
      selectedMealsByWeek.some((m) => m.id === meal.id && m.week !== week)
    );

    // Filter meals that are not already added to the same week
    const mealsToAdd = selectedMeals.filter(
      (meal) =>
        !selectedMealsByWeek.some((m) => m.id === meal.id && m.week === week) &&
        !mealsAlreadyAssigned.some((m) => m.id === meal.id)
    );

    if (mealsAlreadyAssigned.length > 0) {
      toast.error(
        `${mealsAlreadyAssigned
          .map((meal) => meal.name)
          .join(", ")} are already assigned to a different week`
      );
    }

    if (mealsToAdd.length > 0) {
      const mealsWithWeek = mealsToAdd.map((meal) => ({
        ...meal,
        week,
      }));

      // Append new meals while preventing duplicates
      const mealsByWeek = [...selectedMealsByWeek, ...mealsWithWeek];
      setSelectedMealsByWeek(mealsByWeek);
      toast.success(
        `${mealsWithWeek
          .map((meal) => meal.name)
          .join(", ")} are added to ${capitalizeText(week)}`
      );
    }

    setSelectedMeals([]);
    setIsWeekDialogOpen(false);
  };

  const handleDeleteMealFromWeek = (id) => {
    setSelectedMealsByWeek((prevMeals) =>
      prevMeals.filter((meal) => meal.id !== id)
    );
  };

  return (
    <>
      <div className="bg-white md:sticky top-0 w-full z-30">
        <div className="flex justify-center flex-col items-center">
          <div className="max-w-screen-xl w-full flex justify-between items-center flex-col md:flex-row py-6 px-10 gap-4">
            <div className="flex sm:justify-between flex-wrap w-full md:w-3/5">
              {["ALL_MEALS", "WEEK_1", "WEEK_2", "WEEK_3", "WEEK_4"].map(
                (tab) => (
                  <div
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-4 py-2 text-center border-b-4 ${
                      activeTab === tab
                        ? "text-[#004370] border-[#004370]"
                        : "text-gray-500 border-transparent"
                    }`}
                  >
                    {capitalizeText(tab)}
                  </div>
                )
              )}
            </div>

            <button
              disabled={Boolean(
                activeTab !== "ALL_MEALS" || selectedMeals?.length === 0
              )}
              onClick={() => setIsWeekDialogOpen(true)}
              className={`bg-[#004370] text-white px-6 py-2 rounded-md font-medium  
                ${
                  Boolean(
                    activeTab !== "ALL_MEALS" || selectedMeals?.length === 0
                  )
                    ? "bg-gray-400 cursor-default"
                    : "hover:bg-[#003256]"
                }`}
            >
              Add to Week
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center py-6">
        <div className="max-w-screen-xl w-full flex justify-center gap-6 items-stretch flex-wrap">
          {meals?.loading ? (
            [1, 2, 3].map((data, index) => <MealCardSkeleton key={index} />)
          ) : meals?.error ? (
            <div className="h-[40vh] flex items-center flex-col justify-center">
              <p className="text-red-500 text-lg font-bold">{meals?.error}</p>
            </div>
          ) : activeTab === "ALL_MEALS" ? (
            meals?.data.map((meal) => {
              const isSelected = Boolean(
                selectedMeals.findIndex((data) => data?.id === meal?.id) !== -1
              );
              return (
                <MealCard
                  key={meal?.id}
                  name={meal.name}
                  image={meal.image}
                  cuisine={meal.cuisine}
                  rating={meal.rating}
                  instructions={meal.instructions}
                  isSelected={isSelected}
                  onSelect={() => handleMealSelection(meal)}
                />
              );
            })
          ) : selectedMealsByWeek.filter((meal) => meal?.week === activeTab)
              ?.length > 0 ? (
            selectedMealsByWeek
              .filter((meal) => meal?.week === activeTab)
              .map((meal) => (
                <MealCard
                  key={meal?.id}
                  name={meal.name}
                  image={meal.image}
                  cuisine={meal.cuisine}
                  rating={meal.rating}
                  instructions={meal.instructions}
                  deleteMeal={() => handleDeleteMealFromWeek(meal?.id)}
                />
              ))
          ) : (
            <div className="h-[40vh] flex items-center flex-col justify-center">
              <p className="text-red-500 text-lg font-bold">
                Meal not added for {capitalizeText(activeTab)}
              </p>
              <button
                onClick={() => setActiveTab("ALL_MEALS")}
                className="px-6 py-2 mt-6 bg-[#004370] text-white rounded hover:bg-[#003256]"
              >
                Add Meal
              </button>
            </div>
          )}
        </div>
      </div>

      {isWeekDialogOpen && (
        <WeekDialog
          onClose={() => setIsWeekDialogOpen(false)}
          onSubmit={handleAddMealsToWeek}
        />
      )}
    </>
  );
}
