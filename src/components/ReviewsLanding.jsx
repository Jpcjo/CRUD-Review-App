import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviews } from "../utilis/reviews";
import { getInitials } from "../utilis/utilities";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { setCurrentPage } from "../features/user/tabSlice";

const ReviewsLanding = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.tabState);

  const [sortOption, setSortOption] = useState("relevant"); // Default sort option
  const [showSortOptions, setShowSortOptions] = useState(false);

  const [readMoreMap, setReadMoreMap] = useState({});
  const dropdownRef = useRef(null);

  // Pagination state

  const reviewsPerPage = 5;

  const showMoreReview = (index) => {
    setReadMoreMap((prev) => {
      const newReadMoreMap = { ...prev };
      newReadMoreMap[index] = !newReadMoreMap[index];
      return newReadMoreMap;
    });
  };

  const handleSort = (option) => {
    setSortOption(option);
    dispatch(setCurrentPage(1));
    setShowSortOptions(false);
  };
  const sortedReviews = [...reviews];

  // Sort reviews based on the selected option
  switch (sortOption) {
    case "newest":
      sortedReviews.sort((a, b) => {
        const [aMonth, aYear] = a.date.split("/");
        const [bMonth, bYear] = b.date.split("/");

        // Compare years first
        if (bYear !== aYear) {
          return parseInt(bYear, 10) - parseInt(aYear, 10);
        }

        // If years are the same, compare months
        return parseInt(bMonth, 10) - parseInt(aMonth, 10);
      });

      break;
    case "oldest":
      sortedReviews.sort((a, b) => {
        const [aMonth, aYear] = a.date.split("/");

        const [bMonth, bYear] = b.date.split("/");

        // Compare years first
        if (aYear !== bYear) {
          return parseInt(aYear, 10) - parseInt(bYear, 10);
        }

        // If years are the same, compare months
        return parseInt(aMonth, 10) - parseInt(bMonth, 10);
      });

      break;
    case "highestRating":
      sortedReviews.sort((a, b) => b.rating - a.rating);

      break;
    case "lowestRating":
      sortedReviews.sort((a, b) => a.rating - b.rating);

      break;
    // "relevant" is the default option, no need to sort
    default:
  }

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;

  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log(event.target); check clicking on which event.target( which item)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close it
        // if dropdownRef.current exists, also dropdownRef.current.contains(event.target) = false, so! = true
        setShowSortOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
    const currentPageIndex = currentPage - 1;

    const buttons = [];

    // Show Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => paginate(currentPage - 1)}
          className="bg-white text-blue-500 mx-1 px-3 py-2 rounded-md cursor-pointer"
        >
          {"<"}
        </button>
      );

      // Show ellipsis before the first page
      if (!buttons.some((button) => button.key === "ellipsisBeforeFirst")) {
        buttons.push(
          <span
            key="ellipsisBeforeFirst"
            className="grid place-items-center mx-1"
          >
            ...
          </span>
        );
      }
    }

    // Show the current page and the next page
    buttons.push(getPageButton(currentPage));
    // Only push the next page button if it's within bounds
    if (currentPage < totalPages) {
      buttons.push(getPageButton(currentPage + 1));
    }

    // Show Ellipsis and Next button if there are more pages
    if (currentPageIndex + 2 < totalPages) {
      // Show ellipsis after the current page
      if (!buttons.some((button) => button.key === "ellipsisAfterCurrent")) {
        buttons.push(
          <span
            key="ellipsisAfterCurrent"
            className="grid place-items-center mx-1"
          >
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key="next"
          onClick={() => paginate(currentPage + 1)}
          className="bg-white text-blue-500 mx-1 px-3 py-2 rounded-md cursor-pointer"
        >
          {">"}
        </button>
      );
    }

    return buttons;
  };

  const getPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => paginate(pageNumber)}
      className={`${
        currentPage === pageNumber
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500"
      } mx-1 px-3 py-2 rounded-md cursor-pointer`}
    >
      {pageNumber}
    </button>
  );

  useEffect(() => {
    // Scroll to the top of the "Sort" button when it becomes visible
    const sortButton = dropdownRef.current;
    if (sortButton) {
      const sortButtonTop = sortButton.offsetTop;

      window.scrollTo({ top: sortButtonTop, behavior: "smooth" });
    }
  }, [currentPage, sortedReviews]); // Add currentPage to the dependency array

  return (
    <div className=" ">
      <div className="flex flex-col items-end relative ">
        <button
          ref={dropdownRef}
          id="sortButton"
          onClick={() => setShowSortOptions(!showSortOptions)}
          className="bg-white text-black w-fit border-gray-300 px-4 py-2 rounded-full border mr-4 flex flex-row place-items-center"
        >
          <RiBarChartHorizontalLine className="mr-2 text-blue-500" />
          Sort
        </button>

        {showSortOptions && (
          <div className="absolute right-3 bg-white flex flex-col shadow-md border rounded-lg w-fit px-2 z-[12]">
            <button
              onClick={() => handleSort("relevant")}
              className=" text-gray-700 px-2 py-2 rounded-md "
            >
              Most Relevant
            </button>
            <button
              onClick={() => handleSort("newest")}
              className=" text-gray-700 px-2 py-2 rounded-md "
            >
              Newest
            </button>
            <button
              onClick={() => handleSort("oldest")}
              className=" text-gray-700 px-2 py-2 rounded-md "
            >
              Oldest
            </button>
            <button
              onClick={() => handleSort("highestRating")}
              className=" text-gray-700 px-2 py-2 rounded-md "
            >
              Highest Rating
            </button>
            <button
              onClick={() => handleSort("lowestRating")}
              className=" text-gray-700 px-2 py-2 rounded-md"
            >
              Lowest Rating
            </button>
          </div>
        )}
      </div>

      {currentReviews.map((singleReview, index) => {
        const {
          id,
          rating,
          userName,
          date,
          comment,
          service,
          mealType,
          pricePerPerson,
          options,
        } = singleReview;

        const isReadMore = readMoreMap[index] || false;

        return (
          <div
            key={id}
            className="mx-auto max-w-[85%] flex flex-col my-10 space-y-4 "
          >
            {/* name */}
            <div className="flex flex-row items-center space-x-2">
              <div
                className={`w-[35px] h-[35px] rounded-full  bg-purple-700 grid place-items-center font-bold text-white text-lg cursor-pointer`}
              >
                {getInitials(userName)}
              </div>
              <h1>{userName}</h1>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <div className="rating rating-sm">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <input
                    key={starIndex}
                    type="radio"
                    name={`rating-${id}`}
                    className={`mask mask-star-2 bg-gray-200 ${
                      starIndex <= rating
                        ? "bg-yellow-500 hover:scale-110 duration-300"
                        : ""
                    }`}
                  />
                ))}
              </div>
              <div>{date}</div>
            </div>

            <p>
              {isReadMore ? `${comment}   ` : `${comment.substring(0, 150)}...`}{" "}
              <button
                type="button"
                className="text-blue-600 font-semibold"
                onClick={() => showMoreReview(index)}
              >
                {isReadMore ? "Show less" : "More"}
              </button>
            </p>

            {isReadMore
              ? service && (
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Service</h1>
                    <div>{service}</div>
                  </div>
                )
              : null}

            {isReadMore
              ? mealType && (
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Meal type</h1>
                    <div>{mealType}</div>
                  </div>
                )
              : null}

            {isReadMore
              ? pricePerPerson && (
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Price per person</h1>
                    <div>{pricePerPerson}</div>
                  </div>
                )
              : null}

            {isReadMore
              ? options && (
                  <div className="flex flex-col">
                    <h1 className="font-semibold">Options</h1>
                    <div>{options}</div>
                  </div>
                )
              : null}
          </div>
        );
      })}

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default ReviewsLanding;
