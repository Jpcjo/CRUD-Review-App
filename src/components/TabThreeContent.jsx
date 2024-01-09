import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";

const TabThreeContent = () => {
  return (
    <div className="mx-auto max-w-[90%] flex flex-col justify-between w-full pt-6 border-y">
      <section className=" border-b w-full pb-6 space-y-4">
        <h1 className="font-semibold">Service Option</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p> Outdoor seating</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p> Takeaway</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Dine-in</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <AiOutlineStop />
            <p>Delivery</p>
          </div>
        </div>
      </section>

      <section className=" border-b w-full py-6 space-y-4">
        <h1 className="font-semibold">Accessibility</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p className="w-[170px]"> Wheelchair-accessible entrance</p>
          </div>
        </div>
      </section>

      <section className=" border-b w-full  py-6  space-y-4">
        <h1 className="font-semibold">Offerings</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Coffee</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Healthy options</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Prepared foods</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Vegan options</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Vegetarian options</p>
          </div>
        </div>
      </section>

      <section className=" border-b w-full  py-6  space-y-4">
        <h1 className="font-semibold">Dining options</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Breakfast</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Brunch</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Lunch</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Catering</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Dessert</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Seating</p>
          </div>
        </div>
      </section>

      <section className=" border-b w-full  py-6  space-y-4">
        <h1 className="font-semibold">Atmosphere</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Casual</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Cozy</p>
          </div>
        </div>
      </section>

      <section className=" border-b w-full  py-6  space-y-4">
        <h1 className="font-semibold">Payments</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Credit cards</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Cash</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p>Apple Pay</p>
          </div>
        </div>
      </section>

      <section className=" border-b w-full  py-6  space-y-4">
        <h1 className="font-semibold">Parking</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-row items-center space-x-2">
            <IoCheckmarkSharp />
            <p> Free of charge street parking</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TabThreeContent;
