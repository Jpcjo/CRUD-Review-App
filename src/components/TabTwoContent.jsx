import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isStarHovered } from "../features/user/userSlice";
import { getInitials } from "../utilis/utilities";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { deleteReview } from "../features/user/userSlice";
import { ReviewsLanding } from "../components/index";
import { Result } from "../pages";

const TabTwoContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage } = useSelector((state) => state.tabState);

  const [isDotsIconHovered, setDotsIconHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isBodyOverflowHidden, setIsBodyOverflowHidden] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  console.log(deleteConfirmed);

  const buttonRef = useRef(null);

  const { activeTab, hoveredStar, user, userId } = useSelector(
    (state) => state.userState
  );

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

  // const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarHover = (starIndex) => {
    dispatch(isStarHovered(starIndex));
  };

  const handleStarLeave = () => {
    dispatch(isStarHovered(0));
  };
  // console.log(user);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleEditReview = () => {
    // Add logic to handle "Edit Review" click (e.g., navigate to edit page)

    setShowOptions(false);
  };

  const handleDeleteReview = () => {
    console.log("modal");
    // Show the delete review modal
    setDotsIconHovered(false);
    setShowDeleteModal(true);
    setIsBodyOverflowHidden(true);
  };

  const handleConfirmDelete = () => {
    // Add logic to handle the actual deletion of the review
    console.log("Review deleted");

    setDeleteConfirmed(true);
    // Close the modal after handling the delete action
    setShowDeleteModal(false);
    // Close the options menu
    setShowOptions(false);
    setIsBodyOverflowHidden(false);
    dispatch(deleteReview());
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

  useEffect(() => {
    // Update body overflow style based on state
    document.body.style.overflow = isBodyOverflowHidden ? "hidden" : "auto";

    // Clean up style on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isBodyOverflowHidden]);

  return (
    <div className="flex flex-col place-items-start pl-2 xs:pl-0 space-y-4 w-[89%] xxxs:w-[86%] xxs:w-[95%] xs:w-full ">
      {/* First section */}
      <div className="flex flex-row space-x-4 items-center py-4 w-full sm:p-4 border-y">
        {/* Rating Left */}
        <div className="flex flex-col items-center ">
          <p className="text-xl">5.0</p>
          <div className="rating rating-xs rating-half">
            <input type="radio" name="rating-11" className="rating-hidden" />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-1"
              readOnly
            />
            <input
              type="radio"
              name="rating-11"
              className="bg-yellow-500 mask mask-star-2 mask-half-2"
              checked={activeTab === 1 || activeTab === 2 || activeTab === 3}
              readOnly
            />
          </div>
          <p className="text-xs text-gray-400">(77)</p>
        </div>

        {/* Chart */}
        <section className="flex flex-col space-y-1.5 ">
          <progress
            className="progress progress-warning w-[98%] xxxs:w-56 h-[6px]"
            value="100"
            max="100"
          ></progress>
          <progress
            className="progress progress-warning w-[98%] xxxs:w-56 h-[6px]"
            value="90"
            max="100"
          ></progress>
          <progress
            className="progress progress-warning w-[98%] xxxs:w-56 h-[6px]"
            value="20"
            max="100"
          ></progress>
          <progress
            className="progress progress-warning w-[98%] xxxs:w-56 h-[6px]"
            value="5"
            max="100"
          ></progress>
          <progress
            className="progress progress-warning w-[98%] xxxs:w-56 h-[6px]"
            value="2"
            max="100"
          ></progress>
        </section>
      </div>

      {/* Second Section */}
      <div className="flex flex-col space-y-3 relative w-full">
        <p className="font-medium">Rate and review</p>
        <p className=" text-gray-400 text-sm  ">
          Share your experience below to help others. Select stars to begin.
        </p>

        <div className="flex flex-row place-items-center space-x-4">
          {userId === null ? (
            ""
          ) : (
            <div
              className={`w-[40px] h-[40px] rounded-full  bg-purple-700 grid place-items-center font-bold text-white text-xl cursor-pointer`}
            >
              {user && user.username ? getInitials(user.username) : ""}
            </div>
          )}
          <div className="text-sm">{user && user.username}</div>
        </div>

        <div className="flex flex-row justify-between  w-full pt-3 pr-2">
          <Link to={`${user === null ? "/login" : "/review"}`}>
            <div className="rating rating-md" onMouseLeave={handleStarLeave}>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <input
                  key={starIndex}
                  type="radio"
                  name="rating-7"
                  className={`mask mask-star-2 bg-gray-200 ${
                    starIndex <= hoveredStar
                      ? "bg-yellow-500 hover:scale-110 duration-300"
                      : ""
                  }`}
                  onMouseEnter={() => handleStarHover(starIndex)}
                />
              ))}
            </div>
          </Link>

          <button
            ref={buttonRef}
            onMouseEnter={() => setDotsIconHovered(true)}
            onMouseLeave={() => setDotsIconHovered(false)}
            onClick={handleButtonClick}
          >
            {userId === null ? (
              ""
            ) : (
              <PiDotsThreeVerticalBold className="w-6 h-6" />
            )}

            {isDotsIconHovered && (
              <div
                className={`absolute right-5  bg-gray-800 text-white w-fit text-sm px-2 py-1 transition-opacity hover:duration-300 ${
                  isDotsIconHovered && !showOptions
                    ? "opacity-100"
                    : "opacity-0"
                } rounded`}
              >
                Actions for the Twin's review
              </div>
            )}
            {showOptions && (
              <div
                className={`absolute right-5   ${
                  deleteConfirmed === true
                    ? "top-[100px] xs:top-[70px]"
                    : "top-[60px] xs:top-12"
                } flex flex-col bg-white text-gray-800 shadow-md text-sm p-2 rounded`}
              >
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
      </div>

      {/* Delete Review Modal */}
      {showDeleteModal && (
        <div
          className="fixed  h-full  w-full grid place-items-center bg-black bg-opacity-0 z-[2000]"
          content="Delete this review?"
        >
          <div className="bg-gray-500 text-white opacity-90 p-4 shadow-xl  rounded-xl w-[50%] fixed top-[200px]  ">
            <h1 className="text-[13px] xs:text-base lg:text-xl font-semibold mb-4">
              Delete this review?
            </h1>
            <p className="text-[12px] xs:text-sm lg:text-base">
              Deleted reviews cannot be recovered.
            </p>
            <div className="flex justify-end mt-4 text-[13px] xxs:text-sm lg:text-base">
              <button
                className="mr-4 font-semibold "
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="font-semibold text-blue-300 "
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {userId === null ? (
        ""
      ) : (
        <div
          className={`flex flex-col items-start  space-y-6 ${
            deleteConfirmed === true ? "h-0" : "h-auto"
          } `}
        >
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
      )}

      <ReviewsLanding />
    </div>
  );
};

export default TabTwoContent;
