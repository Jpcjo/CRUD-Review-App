import React, { useState, useEffect, useRef } from "react";
import { getInitials } from "../utilis/utilities";
import { useDispatch, useSelector } from "react-redux";
import { twins } from "../utilis/imagesData";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { deleteReview } from "../features/user/userSlice";

const Result = () => {
  const dispatch = useDispatch();

  const [isDotsIconHovered, setDotsIconHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isBodyOverflowHidden, setIsBodyOverflowHidden] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const buttonRef = useRef(null);

  const { user } = useSelector((state) => state.userState);
  const { hoveredStar } = useSelector((state) => state.userState);
  const {
    reviewData: {
      reviewTextSlice,
      deliveryMethodSlice,
      mealSlice,
      priceRangeSlice,
      selectedTopicsSlice,
    },
  } = useSelector((state) => state.userState);

  console.log(selectedTopicsSlice);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleEditReview = () => {
    // Add logic to handle "Edit Review" click (e.g., navigate to edit page)

    setShowOptions(false);
  };

  const handleDeleteReview = () => {
    // Show the delete review modal
    setDotsIconHovered(false);
    setShowDeleteModal(true);
    setIsBodyOverflowHidden(true);
  };

  const handleConfirmDelete = () => {
    // Add logic to handle the actual deletion of the review
    console.log("Review deleted");
    // Close the modal after handling the delete action
    setShowDeleteModal(false);
    // Close the options menu
    setShowOptions(false);
    setIsBodyOverflowHidden(false);
    dispatch(deleteReview());
    setDeleteConfirmed(true);
  };

  const handleCancelDelete = () => {
    // Close the modal when cancel is clicked
    setShowDeleteModal(false);
    setIsBodyOverflowHidden(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close options if the click is outside the button area
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    // Attach the event listener
    document.addEventListener("click", handleClickOutside);

    // Detach the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[85%] mx-auto flex flex-col space-y-4 min-h-[100vh] overflow-y-auto mb-24">
      <div className="grid place-items-center mt-8 mb-4">
        {/* avatar */}
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <div className=" w-16 h-16 bg-purple-700 grid place-items-center font-bold text-white text-3xl cursor-pointer">
              {user && user.username ? getInitials(user.username) : ""}
            </div>
          </div>
        </div>

        {/* login email */}
        <div className="text-sm mt-4 mb-4">{user && user.username}</div>

        {/* twins */}
        <div className="flex flex-row w-full justify-between items-center relative">
          <div className="avatar flex flex-row justify-start  space-x-4 w-full mt-6">
            <div className="w-12 h-11 rounded-full">
              <img src={twins} />
            </div>
            <div className="flex flex-col w-full max-h-[60px]">
              <div className="font-semibold">The Twin</div>
              <div className="text-sm text-gray-500">
                27 Vulture St, West EndQLD 4101
              </div>
            </div>
          </div>
          <button
            ref={buttonRef}
            onMouseEnter={() => setDotsIconHovered(true)}
            onMouseLeave={() => setDotsIconHovered(false)}
            onClick={handleButtonClick}
          >
            <PiDotsThreeVerticalBold className="w-6 h-6" />
            {isDotsIconHovered && (
              <div
                className={`absolute right-2  bg-gray-800 text-white w-fit text-sm px-2 py-1 transition-opacity hover:duration-300 ${
                  isDotsIconHovered && !showOptions
                    ? "opacity-100"
                    : "opacity-0"
                } rounded`}
              >
                Actions for the Twin's review
              </div>
            )}
            {showOptions && (
              <div className="absolute right-2 top-8 flex flex-col bg-white text-gray-800 shadow-md text-sm p-2 rounded">
                <Link
                  to="/review"
                  onClick={handleEditReview}
                  className="cursor-pointer  hover:underline my-2"
                >
                  Edit Review
                </Link>
                {showOptions && !deleteConfirmed && (
                  <div
                    onClick={handleDeleteReview}
                    className="cursor-pointer hover:underline my-2"
                  >
                    Delete Review
                  </div>
                )}
              </div>
            )}
          </button>
        </div>

        {/* Delete Review Modal */}
        {showDeleteModal && (
          <div
            className="fixed  min-h-[120vh] inset-0 flex overflow-y-auto items-center justify-center bg-black bg-opacity-0 z-[2000]"
            content="Delete this review?"
          >
            <div className="bg-gray-500 text-white opacity-90 p-4 rounded-xl">
              <h1 className="text-xl font-semibold mb-4">
                Delete this review?
              </h1>
              <p>Deleted reviews cannot be recovered.</p>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-4 font-semibold "
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="font-semibold text-blue-300"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* review displays */}
        <div className="flex flex-col item-starts w-full space-y-6  ">
          {/* star */}
          <div className="rating rating-md flex flex-row  pointer-events-none ">
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
              />
            ))}
          </div>

          {/* review */}
          <div className="  max-auto self-center">
            <div> {reviewTextSlice}</div>
          </div>

          {/* service */}
          <div className="flex flex-col">
            <div className="font-semibold text-lg">
              {deliveryMethodSlice === null ? "" : "Service"}
            </div>
            <div>{deliveryMethodSlice}</div>
          </div>

          {/* Meal Type */}
          <div className="flex flex-col">
            <div className="font-semibold text-lg">
              {mealSlice === null ? "" : "Meal Type"}
            </div>
            <div>{mealSlice}</div>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <div className="font-semibold text-lg">
              {priceRangeSlice === null ? "" : "Price Per Person"}
            </div>
            <div>{priceRangeSlice}</div>
          </div>

          {/* Options */}
          <div className="flex flex-col w-[80%]">
            <div className="font-semibold text-lg">
              {selectedTopicsSlice && selectedTopicsSlice.length > 0
                ? "What's Available"
                : ""}
            </div>
            <div>{selectedTopicsSlice && selectedTopicsSlice.join(", ")}</div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link to={"/"} className="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
