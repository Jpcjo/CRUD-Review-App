import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

const ButtonsSelect = ({
  deliveryMethod,
  handleDeliveryMethodSelect,
  storeKey,
}) => {
  const [selectedOption, setSelectedOption] = useState(storeKey || null);

  // Function to handle button clicks
  const handleButtonClick = (option) => {
    // Toggle the selection
    setSelectedOption((prevSelectedOption) =>
      prevSelectedOption === option ? null : option
    );
    handleDeliveryMethodSelect(option === selectedOption ? null : option);
  };

  return (
    <div className="flex flex-wrap mt-1 mb-3">
      {deliveryMethod.map((method, index) => {
        return (
          <button
            key={index}
            onClick={() => handleButtonClick(method)}
            className={`py-2 px-4 mb-4 text-sm mr-4 rounded-lg flex flex-row items-center justify-center gap-x-1 duration-500 ${
              selectedOption === method
                ? "bg-sky-100 "
                : " bg-white border border-gray-200"
            }`}
          >
            {selectedOption === method && (
              <IoCheckmark className="transition-all duration-300" />
            )}

            {method}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonsSelect;

// import React, { useState } from "react";
// import { IoCheckmark } from "react-icons/io5";

// const ButtonsSelect = ({
//   deliveryMethod,
//   handleDeliveryMethodSelect,
//   storeKey,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(storeKey || null);

//   // Function to handle button clicks
//   const handleButtonClick = (option) => {
//     // Toggle the selection
//     setSelectedOption((prevSelectedOption) =>
//       prevSelectedOption === option ? null : option
//     );
//     handleDeliveryMethodSelect(option);
//   };

//   return (
//     <div className="flex space-x-4 mt-1 mb-3">
//       {deliveryMethod.map((method, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => handleButtonClick(method)}
//             className={`py-2 px-4 text-sm rounded-lg flex flex-row items-center justify-center gap-x-1 duration-500 ${
//               selectedOption === method
//                 ? "bg-sky-100 "
//                 : " bg-white border border-gray-200"
//             }`}
//           >
//             {selectedOption === method && (
//               <IoCheckmark className="transition-all duration-300" />
//             )}

//             {method}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default ButtonsSelect;
