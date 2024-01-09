import React, { useState, useEffect, useRef } from "react";
import { cafeImages } from "../utilis/imagesData";
import { Tabs } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { ReviewsLanding } from "../components/index";

const Landing = () => {
  const { activeTab } = useSelector((state) => state.userState);
  const { currentPage } = useSelector((state) => state.tabState);

  const isInitialRender = useRef(true);

  useEffect(() => {
    // Check if it's the initial render
    if (!isInitialRender.current) {
      // Scroll to the top of the "Sort" button
      const sortButton = document.getElementById("sortButton");
      if (sortButton) {
        sortButton.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      // It's not the initial render, set isInitialRender to false
      isInitialRender.current = false;
    }
  }, [currentPage]); // Add currentPage to the dependency array

  return (
    <div className="mx-auto max-w-[94%] mt-4 mb-8 overflow-x-scroll">
      {/* review title */}
      <section>
        <div className="text-2xl font-semibold mb-1 text-yellow-500">
          THE TWIN
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="text-lg">5.0 </div>
          <p className="text-xs text-gray-400">(77)</p>
          <div className="rating rating-sm rating-half">
            <input type="radio" name="rating-10" className="rating-hidden" />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-10"
              className="bg-gray-500 mask mask-star-2 mask-half-2"
              checked={activeTab === 1 || activeTab === 2 || activeTab === 3}
              readOnly
            />
          </div>
          <div className="text-md text-gray-500 ">. Cafe . $20-40</div>
        </div>
      </section>

      <section id="sortButton">
        <Tabs />
      </section>

      {/* img */}
      <div className="min-w-full  overflow-x-scroll overflow-y-hidden mt-6 h-[265px] lg:h-[400px] rounded-md ">
        <section className="grid grid-rows-2  grid-flow-col gap-2 lg:gap-3 min-w-full ">
          {cafeImages.map((image, index) => {
            return (
              <div
                key={index}
                className={`w-[200px] lg:w-[300px] ${
                  [0, 3, 6].includes(index) ? "row-span-2" : "row-span-1"
                } `}
              >
                <img
                  className={`object-cover max-w-full  rounded-md`}
                  src={image}
                  alt={index}
                />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Landing;
