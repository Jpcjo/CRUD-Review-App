import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInitials } from "../utilis/utilities";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  isStarHovered,
  isReview,
  isDeliveryMethod,
  isMeal,
  isPriceRange,
  isSelectedTopics,
} from "../features/user/userSlice";
import { ButtonsSelect, ButtonSelectMultiple } from "../components";
import {
  deliveryMethod,
  meal,
  priceRange,
  topics,
} from "../utilis/selectButtonData";

const Review = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);
  const { hoveredStar, reviewData } = useSelector((state) => state.userState);
  const {
    reviewData: {
      starRatingSlice,
      reviewTextSlice,
      deliveryMethodSlice,
      mealSlice,
      priceRangeSlice,
      selectedTopicsSlice,
    },
  } = useSelector((state) => state.userState);

  console.log("review: ", mealSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStarHover = (index) => {
    dispatch(isStarHovered(index));
  };

  const handleReviewChange = (event) => {
    dispatch(isReview(event.target.value));
  };

  const handleDeliveryMethodSelect = (method) => {
    dispatch(isDeliveryMethod(method));
  };

  const handleMealSelect = (method) => {
    dispatch(isMeal(method));
  };

  const handlePriceRangeSelect = (method) => {
    dispatch(isPriceRange(method));
  };

  const handleTopicsSelect = (method) => {
    dispatch(isSelectedTopics(method));
  };

  const handleSubmit = () => {
    // Access the collected data in reviewData
    console.log(reviewData);
    // You can dispatch an action to store the data in Redux or send it to a server
  };

  return (
    <div className="max-w-[90%] mx-auto flex flex-col space-y-0 xs:space-y-4 h-[150vh] overflow-y-scroll">
      <p className="my-4 text-3xl grid place-items-center font-semibold text-gray-500">
        The Twin
      </p>
      <div className="flex flex-row space-x-6 items-center justify-start">
        <div
          className="w-[40px] h-[40px] rounded-full bg-purple-700 grid place-items-center font-bold text-white text-xl cursor-pointer"
          onClick={handleOpenModal}
        >
          {user && user.username ? getInitials(user.username) : ""}
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-sm">{user && user.username}</div>

          <div className="flex flex-row space-x-1 items-center">
            <p className="text-sm text-gray-500 font-light">Posting publicly</p>
            <div
              className="w-[30px] h-[30px] hover:bg-scale-[120] hover:bg-gray-100 duration-300 hover:rounded-full
             "
              onClick={handleOpenModal}
            >
              <div className="w-[20px] h-[20px]  relative top-[7px] left-[8px] ">
                <AiOutlineExclamationCircle />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dark background overlay */}
      {isModalOpen && (
        <div
          className="fixed top-[-15px] left-0 w-full h-full bg-black opacity-50 z-50"
          onClick={handleCloseModal}
        ></div>
      )}
      {/* Render the modal conditionally */}
      {isModalOpen && (
        <div className="fixed flex flex-col items-end space-y-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg overflow-y-scroll w-[65%] h-[50%] z-[60]">
          {/* Modal content goes here */}
          <button onClick={handleCloseModal}>
            <IoIosCloseCircleOutline className="w-[25px] h-[25px] hover:scale-105 duration-300 hover:text-gray-500" />
          </button>
          <p className="text-sm xs:text-base">
            Your posts will appear publicly with your profile name and picture.
            Your posts will appear on our services across the web, like Maps and
            Search, and on third-party sites ​​and apps that use our services.
            Your posts must comply with our’s policies. Read more For beta
            questions, your answers may not be displayed publicly during the
            experiment and may only be visible to you and/or others
            participating in the experiment. We may delete answers after the
            experiment.
          </p>
        </div>
      )}
      {/* star rating */}
      <div className="rating rating-lg flex flex-row justify-center ">
        {[1, 2, 3, 4, 5].map((index, indexReal) => (
          <input
            key={indexReal}
            type="radio"
            name="rating-8"
            className={`mask mask-star-2  mt-4 ${
              index <= hoveredStar
                ? "bg-yellow-500 hover:scale-110 duration-300"
                : " bg-gray-300"
            }  `}
            onClick={() => handleStarHover(index)}
          />
        ))}
      </div>
      {/* review */}
      <div className=" flex justify-center ">
        <textarea
          placeholder="Share details of your own experience at this place"
          className="textarea textarea-info textarea-lg  w-[100%]  mt-6 "
          value={reviewTextSlice}
          onChange={handleReviewChange}
        ></textarea>
      </div>
      {/* selections */}
      <div>
        <p className="font-semibold mt-6">
          Did you dine in, take out, or get delivery?
        </p>
        <ButtonsSelect
          deliveryMethod={deliveryMethod}
          handleDeliveryMethodSelect={handleDeliveryMethodSelect}
          storeKey={deliveryMethodSlice}
        />
      </div>
      <div>
        <p className="font-semibold mt-4">What did you get?</p>
        <ButtonsSelect
          deliveryMethod={meal}
          handleDeliveryMethodSelect={handleMealSelect}
          storeKey={mealSlice}
        />
      </div>

      <div>
        <p className="font-semibold mt-4">How much did you spend per person?</p>
        <ButtonsSelect
          deliveryMethod={priceRange}
          handleDeliveryMethodSelect={handlePriceRangeSelect}
          storeKey={priceRangeSlice}
        />
      </div>
      <div>
        <p className="font-semibold mt-4 ">
          Can you say more about any of these topics?
        </p>
        <p className="font-lightweight text-gray-400 text-sm mb-4">
          (Select all that apply)
        </p>
        <ButtonSelectMultiple
          deliveryMethod={topics}
          handleTopicsSelect={handleTopicsSelect}
          storeKey={selectedTopicsSlice}
        />
      </div>
      <div className="flex justify-center mt-2 pb-24">
        <Link
          to={`${user === null ? "/login" : "/result"}`}
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Post
        </Link>
      </div>
    </div>
  );
};

export default Review;
