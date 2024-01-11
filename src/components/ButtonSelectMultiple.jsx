import React, { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";

const ButtonSelectMultiple = ({
  deliveryMethod,
  handleTopicsSelect,
  storeKey,
}) => {
  const [selectedOption, setSelectedOption] = useState(storeKey || []);
  //   console.log(selectedOption);

  const handleButtonClick = (option) => {
    setSelectedOption((prevSelectedOptions) => {
      let updatedOptions;
      if (prevSelectedOptions.includes(option)) {
        // Remove the option if it's already selected
        updatedOptions = prevSelectedOptions.filter(
          (selected) => selected !== option
        );
      } else {
        // Add the option if it's not selected
        updatedOptions = [...prevSelectedOptions, option];
      }

      return updatedOptions;
    });
  };

  // Use useEffect to call handleTopicsSelect after the state is updated
  useEffect(() => {
    handleTopicsSelect(selectedOption);
  }, [selectedOption, handleTopicsSelect]);

  return (
    <div className="flex flex-wrap  mt-1 mb-4 ">
      {deliveryMethod.map((method, index) => {
        return (
          <button
            key={index}
            onClick={() => handleButtonClick(method)}
            className={`py-2 px-4 mb-4 ma-w-40 mr-4 whitespace-nowrap text-sm rounded-lg flex flex-row items-center justify-center gap-x-1 duration-500 ${
              selectedOption.includes(method)
                ? "bg-sky-100 "
                : " bg-white border border-gray-200"
            }`}
          >
            {selectedOption.includes(method) && (
              <IoCheckmark className="transition-all duration-300" />
            )}

            {method}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonSelectMultiple;
