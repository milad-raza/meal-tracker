import WeekOrders from "@/components/weekOrders";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-[60vh] md:h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/pizza.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-white/65"></div>
        <div className="relative text-center p-4">
          <h1 className="text-4xl font-bold">Optimize Your Meal</h1>
          <p className="mt-3">
            Select Meal to Add in Week. You will be able to edit, modify, and
            change the Meal Weeks.
          </p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <div className="max-w-screen-xl w-full">
          <p className="p-6 px-10 text-xl font-bol">Week Orders</p>
        </div>
        <WeekOrders />
      </div>
    </>
  );
}
