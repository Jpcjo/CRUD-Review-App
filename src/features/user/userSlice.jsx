import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// export const getUserFromLocalStorage = () => {
//   return JSON.parse(localStorage.getItem("user")) || null;
// };

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (user) {
    const userLocalStorageKey = `user_${user.id}`;
    return JSON.parse(localStorage.getItem(userLocalStorageKey)) || null;
  }

  return null;
};

// Update the functions to include the user id in local storage keys
export const getStarFromLocalStorage = (userId) => {
  const userLocalStorageKey = userId ? `user_${userId}` : null;
  return JSON.parse(localStorage.getItem(`${userLocalStorageKey}_stars`)) || 0;
};

export const getReviewFromLocalStorage = (userId) => {
  const userLocalStorageKey = userId ? `user_${userId}` : null;
  return (
    JSON.parse(localStorage.getItem(`${userLocalStorageKey}_review`)) || ""
  );
};

export const getDeliveryMethodFromLocalStorage = (userId) => {
  const userLocalStorageKey = userId ? `user_${userId}` : null;
  return (
    JSON.parse(localStorage.getItem(`${userLocalStorageKey}_deliveryMethod`)) ||
    null
  );
};

export const getMealFromLocalStorage = (userId) => {
  const userLocalStorageKey = userId ? `user_${userId}` : null;

  return (
    JSON.parse(localStorage.getItem(`${userLocalStorageKey}_meal`)) || null
  );
};

export const getPriceRangeFromLocalStorage = (userId) => {
  const userLocalStorageKey = userId ? `user_${userId}` : null;
  return (
    JSON.parse(localStorage.getItem(`${userLocalStorageKey}_priceRange`)) ||
    null
  );
};

export const getTopicsFromLocalStorage = (userId) => {
  const userLocalStorageKey = userId ? `user_${userId}` : null;
  return (
    JSON.parse(localStorage.getItem(`${userLocalStorageKey}_topics`)) || null
  );
};

const initialState = {
  userId: null,
  user: getUserFromLocalStorage(),
  activeTab: 1,
  hoveredStar: getStarFromLocalStorage(),

  reviewData: {
    starRatingSlice: 0,
    reviewTextSlice: "",
    deliveryMethodSlice: null,
    mealSlice: null,
    priceRangeSlice: null,
    selectedTopicsSlice: null,
  },
  inputsArray: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // loginUser: (state, action) => {
    //   const userId = action.payload.user.id;
    //   const userLocalStorageKey = `user_${userId}`;

    //   const user = {
    //     ...action.payload.user,
    //     token: action.payload.jwt,
    //     reviewData: {
    //       hoveredStar: getStarFromLocalStorage(userId),
    //       reviewTextSlice: getReviewFromLocalStorage(userId),
    //       deliveryMethodSlice: getDeliveryMethodFromLocalStorage(userId),
    //       mealSlice: getMealFromLocalStorage(userId),
    //       priceRangeSlice: getPriceRangeFromLocalStorage(userId),
    //       selectedTopicsSlice: getTopicsFromLocalStorage(userId),
    //     },
    //   };

    //   // Update user in the Redux state
    //   state.user = user;

    //   // Update local storage with user-specific key
    //   localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

    //   const {
    //     hoveredStar,
    //     reviewData: {
    //       reviewTextSlice,
    //       deliveryMethodSlice,
    //       mealSlice,
    //       priceRangeSlice,
    //       selectedTopicsSlice,
    //     },
    //   } = state;

    //   // Create a new input object
    //   const newInput = {
    //     userId,
    //     starRatingSlice: hoveredStar,
    //     reviewTextSlice,
    //     deliveryMethodSlice,
    //     mealSlice,
    //     priceRangeSlice,
    //     selectedTopicsSlice,
    //   };

    //   // Update inputsArray in local storage
    //   const userInputsKey = `user_${userId}_inputsArray`;
    //   const inputsArray = JSON.parse(localStorage.getItem(userInputsKey)) || [];
    //   inputsArray.push(newInput);
    //   localStorage.setItem(userInputsKey, JSON.stringify(inputsArray));

    //   state.inputsArray = inputsArray;

    //   console.log(inputsArray.some((item) => item.userId === 1341));

    //   // Update local storage for other data with user-specific key
    //   // localStorage.setItem(
    //   //   `${userLocalStorageKey}_stars`,
    //   //   JSON.stringify(state.hoveredStar)
    //   // );

    //   // localStorage.setItem(
    //   //   `${userLocalStorageKey}_review`,
    //   //   JSON.stringify(state.reviewData.reviewTextSlice)
    //   // );
    //   // localStorage.setItem(
    //   //   `${userLocalStorageKey}_deliveryMethod`,
    //   //   JSON.stringify(state.reviewData.deliveryMethodSlice)
    //   // );
    //   // localStorage.setItem(
    //   //   `${userLocalStorageKey}_meal`,
    //   //   JSON.stringify(state.reviewData.mealSlice)
    //   // );

    //   // console.log(userLocalStorageKey);

    //   // localStorage.setItem(
    //   //   `${userLocalStorageKey}_priceRange`,
    //   //   JSON.stringify(state.reviewData.priceRangeSlice)
    //   // );
    //   // localStorage.setItem(
    //   //   `${userLocalStorageKey}_topics`,
    //   //   JSON.stringify(state.reviewData.selectedTopicsSlice)
    //   // );
    // },

    loginUser: (state, action) => {
      const userId = action.payload.user.id;

      const userLocalStorageKey = `user_${userId}`;
      state.userId = userId;

      const inputsArray = JSON.parse(localStorage.getItem("inputsArray")) || [];

      // Check if the userId already has input data
      const existingInputIndex = inputsArray.findIndex(
        (item) => item.userId === userId
      );

      if (existingInputIndex !== -1) {
        // If userId already exists, update the existing input
        inputsArray[existingInputIndex].reviewData = {
          userId,
          hoveredStar: getStarFromLocalStorage(userId),
          reviewTextSlice: getReviewFromLocalStorage(userId),
          deliveryMethodSlice: getDeliveryMethodFromLocalStorage(userId),
          mealSlice: getMealFromLocalStorage(userId),
          priceRangeSlice: getPriceRangeFromLocalStorage(userId),
          selectedTopicsSlice: getTopicsFromLocalStorage(userId),
        };
      } else {
        // If userId doesn't exist, push the new input
        inputsArray.push({
          userId,
          reviewData: {
            userId,
            hoveredStar: getStarFromLocalStorage(userId),
            reviewTextSlice: getReviewFromLocalStorage(userId),
            deliveryMethodSlice: getDeliveryMethodFromLocalStorage(userId),
            mealSlice: getMealFromLocalStorage(userId),
            priceRangeSlice: getPriceRangeFromLocalStorage(userId),
            selectedTopicsSlice: getTopicsFromLocalStorage(userId),
          },
        });
      }

      localStorage.setItem("inputsArray", JSON.stringify(inputsArray));

      // Update Redux state with the inputsArray
      state.inputsArray = inputsArray;

      const userData = inputsArray.find((item) => item.userId === userId);

      // Check if user1341Data is found
      if (userData) {
        // Access the reviewData
        const { reviewData } = userData;
        const user = {
          ...action.payload.user,
          token: action.payload.jwt,
          reviewData: {
            hoveredStar: reviewData.hoveredStar,
            reviewTextSlice: reviewData.reviewTextSlice,
            deliveryMethodSlice: reviewData.deliveryMethodSlice,
            mealSlice: reviewData.mealSlice,
            priceRangeSlice: reviewData.priceRangeSlice,
            selectedTopicsSlice: reviewData.selectedTopicsSlice,
          },
        };

        state.reviewData.starRatingSlice = reviewData.hoveredStar;
        state.reviewData.reviewTextSlice = reviewData.reviewTextSlice;
        state.reviewData.deliveryMethodSlice = reviewData.deliveryMethodSlice;
        state.reviewData.mealSlice = reviewData.mealSlice;
        state.reviewData.priceRangeSlice = reviewData.priceRangeSlice;
        state.reviewData.selectedTopicsSlice = reviewData.selectedTopicsSlice;

        // Update user in the Redux state
        state.user = user;

        // Update local storage with user-specific key
        localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

        // console.log("reviewData: ", reviewData);
        // console.log("mealSlice: ", reviewData.mealSlice);
        // console.log("deliveryMethodSlice: ", reviewData.deliveryMethodSlice);
        // console.log("reviewTextSlice: ", reviewData.reviewTextSlice);
        // console.log("priceRangeSlice: ", reviewData.priceRangeSlice);
        // console.log("selectedTopicsSlice: ", reviewData.selectedTopicsSlice);
      } else {
        console.log("User with userId 1341 not found in inputsArray");
      }
    },

    logoutUser: (state) => {
      // Define userLocalStorageKey here
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user"; // Add a default value if user is not defined

      // Reset user-related state properties
      state.user = null;
      state.userId = null;
      state.hoveredStar = 0;
      // state.reviewData.starRatingSlice = 0;
      // state.reviewData.reviewTextSlice = "";
      // state.reviewData.deliveryMethodSlice = "";
      // state.reviewData.mealSlice = "";
      // state.reviewData.priceRangeSlice = "";
      // state.reviewData.selectedTopicsSlice = "";

      // Remove user-specific data from local storage
      localStorage.removeItem(userLocalStorageKey);
      toast.success("Logged out successfully");

      // Remove user-specific review data from local storage
      // localStorage.removeItem(`${userLocalStorageKey}_stars`);
      // localStorage.removeItem(`${userLocalStorageKey}_review`);
      // localStorage.removeItem(`${userLocalStorageKey}_deliveryMethod`);
      // localStorage.removeItem(`${userLocalStorageKey}_meal`);
      // localStorage.removeItem(`${userLocalStorageKey}_priceRange`);
      // localStorage.removeItem(`${userLocalStorageKey}_topics`);
    },

    // logoutUser: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("user");
    //   toast.success("Logged out successfully");
    //   // localStorage.removeItem("stars");
    //   // localStorage.removeItem("review");
    //   // localStorage.removeItem("deliveryMethod");
    //   // localStorage.removeItem("meal");
    //   // localStorage.removeItem("priceRange");
    //   // localStorage.removeItem("topics");
    // },

    deleteReview: (state) => {
      const userId = state.userId;
      const userLocalStorageKey = userId ? `user_${userId}` : "user";

      // Reset review-related state properties for the specified user
      state.reviewData.starRatingSlice = 0;
      state.hoveredStar = 0;
      state.reviewData.reviewTextSlice = "";
      state.reviewData.deliveryMethodSlice = null;
      state.reviewData.mealSlice = null;
      state.reviewData.priceRangeSlice = null;
      state.reviewData.selectedTopicsSlice = null;

      // Remove user-specific review data from local storage

      localStorage.removeItem(`${userLocalStorageKey}_stars`);
      localStorage.removeItem(`${userLocalStorageKey}_review`);
      localStorage.removeItem(`${userLocalStorageKey}_deliveryMethod`);
      localStorage.removeItem(`${userLocalStorageKey}_meal`);
      localStorage.removeItem(`${userLocalStorageKey}_priceRange`);
      localStorage.removeItem(`${userLocalStorageKey}_topics`);
    },

    activeTabNum: (state, action) => {
      state.activeTab = action.payload;
    },
    isStarHovered: (state, action) => {
      state.hoveredStar = action.payload;
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
      localStorage.setItem(
        `${userLocalStorageKey}_stars`,
        JSON.stringify(action.payload)
      );
    },

    isReview: (state, action) => {
      state.reviewData.reviewTextSlice = action.payload;
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
      localStorage.setItem(
        `${userLocalStorageKey}_review`,
        JSON.stringify(action.payload)
      );
    },

    isDeliveryMethod: (state, action) => {
      state.reviewData.deliveryMethodSlice = action.payload;
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
      localStorage.setItem(
        `${userLocalStorageKey}_deliveryMethod`,
        JSON.stringify(action.payload)
      );
    },

    isMeal: (state, action) => {
      state.reviewData.mealSlice = action.payload;
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
      localStorage.setItem(
        `${userLocalStorageKey}_meal`,
        JSON.stringify(action.payload)
      );
    },

    isPriceRange: (state, action) => {
      state.reviewData.priceRangeSlice = action.payload;
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
      localStorage.setItem(
        `${userLocalStorageKey}_priceRange`,
        JSON.stringify(action.payload)
      );
    },

    isSelectedTopics: (state, action) => {
      state.reviewData.selectedTopicsSlice = action.payload;
      const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
      localStorage.setItem(
        `${userLocalStorageKey}_topics`,
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  loginUser,
  logoutUser,
  deleteReview,
  activeTabNum,
  isStarHovered,
  isReview,
  isDeliveryMethod,
  isMeal,
  isPriceRange,
  isSelectedTopics,
} = userSlice.actions;

export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// // export const getUserFromLocalStorage = () => {
// //   return JSON.parse(localStorage.getItem("user")) || null;
// // };

// export const getUserFromLocalStorage = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || null;

//   if (user) {
//     const userLocalStorageKey = `user_${user.id}`;
//     return JSON.parse(localStorage.getItem(userLocalStorageKey)) || null;
//   }

//   return null;
// };

// // Update the functions to include the user id in local storage keys
// export const getStarFromLocalStorage = (userId) => {
//   const userLocalStorageKey = userId ? `user_${userId}` : null;
//   return JSON.parse(localStorage.getItem(`${userLocalStorageKey}_stars`)) || 0;
// };

// export const getReviewFromLocalStorage = (userId) => {
//   const userLocalStorageKey = userId ? `user_${userId}` : null;
//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_review`)) || ""
//   );
// };

// export const getDeliveryMethodFromLocalStorage = (userId) => {
//   const userLocalStorageKey = userId ? `user_${userId}` : null;
//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_deliveryMethod`)) ||
//     null
//   );
// };

// export const getMealFromLocalStorage = (userId) => {
//   const userLocalStorageKey = userId ? `user_${userId}` : null;

//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_meal`)) || null
//   );
// };

// export const getPriceRangeFromLocalStorage = (userId) => {
//   const userLocalStorageKey = userId ? `user_${userId}` : null;
//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_priceRange`)) ||
//     null
//   );
// };

// export const getTopicsFromLocalStorage = (userId) => {
//   const userLocalStorageKey = userId ? `user_${userId}` : null;
//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_topics`)) || null
//   );
// };

// const initialState = {
//   user: getUserFromLocalStorage(),
//   activeTab: 1,
//   hoveredStar: getStarFromLocalStorage(),

//   reviewData: {
//     starRatingSlice: 0,
//     reviewTextSlice: "",
//     deliveryMethodSlice: null,
//     mealSlice: null,
//     priceRangeSlice: null,
//     selectedTopicsSlice: null,
//   },
//   inputsArray: [],
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     // loginUser: (state, action) => {
//     //   const userId = action.payload.user.id;
//     //   const userLocalStorageKey = `user_${userId}`;

//     //   const user = {
//     //     ...action.payload.user,
//     //     token: action.payload.jwt,
//     //     reviewData: {
//     //       hoveredStar: getStarFromLocalStorage(userId),
//     //       reviewTextSlice: getReviewFromLocalStorage(userId),
//     //       deliveryMethodSlice: getDeliveryMethodFromLocalStorage(userId),
//     //       mealSlice: getMealFromLocalStorage(userId),
//     //       priceRangeSlice: getPriceRangeFromLocalStorage(userId),
//     //       selectedTopicsSlice: getTopicsFromLocalStorage(userId),
//     //     },
//     //   };

//     //   // Update user in the Redux state
//     //   state.user = user;

//     //   // Update local storage with user-specific key
//     //   localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

//     //   const {
//     //     hoveredStar,
//     //     reviewData: {
//     //       reviewTextSlice,
//     //       deliveryMethodSlice,
//     //       mealSlice,
//     //       priceRangeSlice,
//     //       selectedTopicsSlice,
//     //     },
//     //   } = state;

//     //   // Create a new input object
//     //   const newInput = {
//     //     userId,
//     //     starRatingSlice: hoveredStar,
//     //     reviewTextSlice,
//     //     deliveryMethodSlice,
//     //     mealSlice,
//     //     priceRangeSlice,
//     //     selectedTopicsSlice,
//     //   };

//     //   // Update inputsArray in local storage
//     //   const userInputsKey = `user_${userId}_inputsArray`;
//     //   const inputsArray = JSON.parse(localStorage.getItem(userInputsKey)) || [];
//     //   inputsArray.push(newInput);
//     //   localStorage.setItem(userInputsKey, JSON.stringify(inputsArray));

//     //   state.inputsArray = inputsArray;

//     //   console.log(inputsArray.some((item) => item.userId === 1341));

//     //   // Update local storage for other data with user-specific key
//     //   // localStorage.setItem(
//     //   //   `${userLocalStorageKey}_stars`,
//     //   //   JSON.stringify(state.hoveredStar)
//     //   // );

//     //   // localStorage.setItem(
//     //   //   `${userLocalStorageKey}_review`,
//     //   //   JSON.stringify(state.reviewData.reviewTextSlice)
//     //   // );
//     //   // localStorage.setItem(
//     //   //   `${userLocalStorageKey}_deliveryMethod`,
//     //   //   JSON.stringify(state.reviewData.deliveryMethodSlice)
//     //   // );
//     //   // localStorage.setItem(
//     //   //   `${userLocalStorageKey}_meal`,
//     //   //   JSON.stringify(state.reviewData.mealSlice)
//     //   // );

//     //   // console.log(userLocalStorageKey);

//     //   // localStorage.setItem(
//     //   //   `${userLocalStorageKey}_priceRange`,
//     //   //   JSON.stringify(state.reviewData.priceRangeSlice)
//     //   // );
//     //   // localStorage.setItem(
//     //   //   `${userLocalStorageKey}_topics`,
//     //   //   JSON.stringify(state.reviewData.selectedTopicsSlice)
//     //   // );
//     // },

//     loginUser: (state, action) => {
//       const userId = action.payload.user.id;
//       const userLocalStorageKey = `user_${userId}`;

//       const user = {
//         ...action.payload.user,
//         token: action.payload.jwt,
//         reviewData: {
//           hoveredStar: getStarFromLocalStorage(userId),
//           reviewTextSlice: getReviewFromLocalStorage(userId),
//           deliveryMethodSlice: getDeliveryMethodFromLocalStorage(userId),
//           mealSlice: getMealFromLocalStorage(userId),
//           priceRangeSlice: getPriceRangeFromLocalStorage(userId),
//           selectedTopicsSlice: getTopicsFromLocalStorage(userId),
//         },
//       };

//       // Update user in the Redux state
//       state.user = user;

//       // Update local storage with user-specific key
//       localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

//       // Retrieve the existing inputsArray from local storage
//       const inputsArray = JSON.parse(localStorage.getItem("inputsArray")) || [];

//       // Check if the userId already has input data
//       const existingInputIndex = inputsArray.findIndex(
//         (item) => item.userId === userId
//       );

//       if (existingInputIndex !== -1) {
//         // If userId already exists, update the existing input
//         inputsArray[existingInputIndex].reviewData = {
//           userId,
//           ...user.reviewData,
//         };
//       } else {
//         // If userId doesn't exist, push the new input
//         inputsArray.push({
//           userId,
//           reviewData: {
//             userId,
//             ...user.reviewData,
//           },
//         });
//       }

//       localStorage.setItem("inputsArray", JSON.stringify(inputsArray));

//       // Update Redux state with the inputsArray
//       state.inputsArray = inputsArray;

//       console.log(inputsArray.some((item) => item.userId === userId));
//     },

//     logoutUser: (state) => {
//       // Define userLocalStorageKey here
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user"; // Add a default value if user is not defined

//       // Reset user-related state properties
//       state.user = null;
//       // state.hoveredStar = 0;
//       // state.reviewData.starRatingSlice = 0;
//       // state.reviewData.reviewTextSlice = "";
//       // state.reviewData.deliveryMethodSlice = "";
//       // state.reviewData.mealSlice = "";
//       // state.reviewData.priceRangeSlice = "";
//       // state.reviewData.selectedTopicsSlice = "";

//       // Remove user-specific data from local storage
//       localStorage.removeItem(userLocalStorageKey);
//       toast.success("Logged out successfully");

//       // Remove user-specific review data from local storage
//       // localStorage.removeItem(`${userLocalStorageKey}_stars`);
//       // localStorage.removeItem(`${userLocalStorageKey}_review`);
//       // localStorage.removeItem(`${userLocalStorageKey}_deliveryMethod`);
//       // localStorage.removeItem(`${userLocalStorageKey}_meal`);
//       // localStorage.removeItem(`${userLocalStorageKey}_priceRange`);
//       // localStorage.removeItem(`${userLocalStorageKey}_topics`);
//     },

//     // logoutUser: (state) => {
//     //   state.user = null;
//     //   localStorage.removeItem("user");
//     //   toast.success("Logged out successfully");
//     //   // localStorage.removeItem("stars");
//     //   // localStorage.removeItem("review");
//     //   // localStorage.removeItem("deliveryMethod");
//     //   // localStorage.removeItem("meal");
//     //   // localStorage.removeItem("priceRange");
//     //   // localStorage.removeItem("topics");
//     // },
//     activeTabNum: (state, action) => {
//       state.activeTab = action.payload;
//     },
//     isStarHovered: (state, action) => {
//       state.hoveredStar = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_stars`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isReview: (state, action) => {
//       state.reviewData.reviewTextSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_review`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isDeliveryMethod: (state, action) => {
//       state.reviewData.deliveryMethodSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_deliveryMethod`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isMeal: (state, action) => {
//       state.reviewData.mealSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_meal`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isPriceRange: (state, action) => {
//       state.reviewData.priceRangeSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_priceRange`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isSelectedTopics: (state, action) => {
//       state.reviewData.selectedTopicsSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_topics`,
//         JSON.stringify(action.payload)
//       );
//     },
//   },
// });

// export const {
//   loginUser,
//   logoutUser,
//   activeTabNum,
//   isStarHovered,
//   isReview,
//   isDeliveryMethod,
//   isMeal,
//   isPriceRange,
//   isSelectedTopics,
// } = userSlice.actions;

// export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// export const getUserFromLocalStorage = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || null;

//   if (user) {
//     const userLocalStorageKey = `user_${user.id}`;
//     return JSON.parse(localStorage.getItem(userLocalStorageKey)) || null;
//   }

//   return null;
// };

// export const getStarFromLocalStorage = (userId) => {
//   return JSON.parse(localStorage.getItem(`user_${userId}_stars`)) || 0;
// };

// export const getReviewFromLocalStorage = (userId) => {
//   return JSON.parse(localStorage.getItem(`user_${userId}_review`)) || "";
// };

// export const getDeliveryMethodFromLocalStorage = (userId) => {
//   return (
//     JSON.parse(localStorage.getItem(`user_${userId}_deliveryMethod`)) || null
//   );
// };

// export const getMealFromLocalStorage = (userId) => {
//   return JSON.parse(localStorage.getItem(`user_${userId}_meal`)) || null;
// };

// export const getPriceRangeFromLocalStorage = (userId) => {
//   return JSON.parse(localStorage.getItem(`user_${userId}_priceRange`)) || null;
// };

// export const getTopicsFromLocalStorage = (userId) => {
//   return JSON.parse(localStorage.getItem(`user_${userId}_topics`)) || null;
// };

// const initialState = {
//   user: getUserFromLocalStorage(),
//   activeTab: 1,
//   hoveredStar: 0,
//   reviewData: {
//     starRatingSlice: 0,
//     reviewTextSlice: "",
//     deliveryMethodSlice: "",
//     mealSlice: "",
//     priceRangeSlice: "",
//     selectedTopicsSlice: "",
//   },
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       const user = {
//         ...action.payload.user,
//         token: action.payload.jwt,
//         reviewData: {
//           hoveredStar: getStarFromLocalStorage(action.payload.user.id),
//           reviewTextSlice: getReviewFromLocalStorage(action.payload.user.id),
//           deliveryMethodSlice: getDeliveryMethodFromLocalStorage(
//             action.payload.user.id
//           ),
//           mealSlice: getMealFromLocalStorage(action.payload.user.id),
//           priceRangeSlice: getPriceRangeFromLocalStorage(
//             action.payload.user.id
//           ),
//           selectedTopicsSlice: getTopicsFromLocalStorage(
//             action.payload.user.id
//           ),
//         },
//       };

//       state.user = user;

//       const userLocalStorageKey = `user_${action.payload.user.id}`;
//       localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
//     },

//     logoutUser: (state) => {
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";

//       state.user = null;

//       localStorage.removeItem(userLocalStorageKey);
//       toast.success("Logged out successfully");

//       // Remove other user-specific data from local storage
//       localStorage.removeItem(`${userLocalStorageKey}_stars`);
//       localStorage.removeItem(`${userLocalStorageKey}_review`);
//       localStorage.removeItem(`${userLocalStorageKey}_deliveryMethod`);
//       localStorage.removeItem(`${userLocalStorageKey}_meal`);
//       localStorage.removeItem(`${userLocalStorageKey}_priceRange`);
//       localStorage.removeItem(`${userLocalStorageKey}_topics`);
//     },

//     activeTabNum: (state, action) => {
//       state.activeTab = action.payload;
//     },

//     isStarHovered: (state, action) => {
//       state.hoveredStar = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_stars`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isReview: (state, action) => {
//       state.reviewData.reviewTextSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_review`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isDeliveryMethod: (state, action) => {
//       state.reviewData.deliveryMethodSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_deliveryMethod`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isMeal: (state, action) => {
//       state.reviewData.mealSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_meal`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isPriceRange: (state, action) => {
//       state.reviewData.priceRangeSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_priceRange`,
//         JSON.stringify(action.payload)
//       );
//     },

//     isSelectedTopics: (state, action) => {
//       state.reviewData.selectedTopicsSlice = action.payload;
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user";
//       localStorage.setItem(
//         `${userLocalStorageKey}_topics`,
//         JSON.stringify(action.payload)
//       );
//     },
//   },
// });

// export const {
//   loginUser,
//   logoutUser,
//   activeTabNum,
//   isStarHovered,
//   isReview,
//   isDeliveryMethod,
//   isMeal,
//   isPriceRange,
//   isSelectedTopics,
// } = userSlice.actions;

// export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// // export const getUserFromLocalStorage = () => {
// //   return JSON.parse(localStorage.getItem("user")) || null;
// // };

// export const getUserFromLocalStorage = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || null;

//   if (user) {
//     const userLocalStorageKey = `user_${user.id}`;
//     return JSON.parse(localStorage.getItem(userLocalStorageKey)) || null;
//   }

//   return null;
// };

// export const getStarFromLocalStorage = () => {
//   const user = getUserFromLocalStorage();
//   const userLocalStorageKey = user ? `user_${user.id}` : null;

//   return JSON.parse(localStorage.getItem(`${userLocalStorageKey}_stars`)) || 0;
// };

// export const getReviewFromLocalStorage = () => {
//   const user = getUserFromLocalStorage();
//   const userLocalStorageKey = user ? `user_${user.id}` : null;

//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_review`)) || ""
//   );
// };

// export const getDeliveryMethodFromLocalStorage = () => {
//   const user = getUserFromLocalStorage();
//   const userLocalStorageKey = user ? `user_${user.id}` : null;

//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_deliveryMethod`)) ||
//     null
//   );
// };

// export const getMealFromLocalStorage = () => {
//   const user = getUserFromLocalStorage();
//   const userLocalStorageKey = user ? `user_${user.id}` : null;

//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_meal`)) || null
//   );
// };

// export const getPriceRangeFromLocalStorage = () => {
//   const user = getUserFromLocalStorage();
//   const userLocalStorageKey = user ? `user_${user.id}` : null;

//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_priceRange`)) ||
//     null
//   );
// };

// export const getTopicsFromLocalStorage = () => {
//   const user = getUserFromLocalStorage();
//   const userLocalStorageKey = user ? `user_${user.id}` : null;

//   return (
//     JSON.parse(localStorage.getItem(`${userLocalStorageKey}_topics`)) || null
//   );
// };

// const initialState = {
//   user: getUserFromLocalStorage(),
//   activeTab: 1,
//   hoveredStar: getStarFromLocalStorage(),
//   // reviewData: {
//   //   starRatingSlice: 0,
//   //   reviewTextSlice: getReviewFromLocalStorage(),
//   //   deliveryMethodSlice: getDeliveryMethodFromLocalStorage(),
//   //   mealSlice: getMealFromLocalStorage(),
//   //   priceRangeSlice: getPriceRangeFromLocalStorage(),
//   //   selectedTopicsSlice: getTopicsFromLocalStorage(),
//   // },
//   reviewData: {
//     starRatingSlice: 0,
//     reviewTextSlice: getReviewFromLocalStorage(),
//     deliveryMethodSlice: getDeliveryMethodFromLocalStorage(),
//     mealSlice: getMealFromLocalStorage(),
//     priceRangeSlice: getPriceRangeFromLocalStorage(),
//     selectedTopicsSlice: getTopicsFromLocalStorage(),
//   },
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     // loginUser: (state, action) => {
//     //   // console.log(action.payload);

//     //   const user = { ...action.payload.user, token: action.payload.jwt };
//     //   // console.log(user);
//     //   state.user = user;
//     //   localStorage.setItem("user", JSON.stringify(user));
//     //   localStorage.setItem("stars", JSON.stringify(state.hoveredStar));
//     //   localStorage.setItem(
//     //     "review",
//     //     JSON.stringify(state.reviewData.reviewTextSlice)
//     //   );
//     //   localStorage.setItem(
//     //     "deliveryMethod",
//     //     JSON.stringify(state.reviewData.deliveryMethodSlice)
//     //   );
//     //   localStorage.setItem("meal", JSON.stringify(state.reviewData.mealSlice));
//     //   localStorage.setItem(
//     //     "priceRange",
//     //     JSON.stringify(state.reviewData.priceRangeSlice)
//     //   );
//     //   localStorage.setItem(
//     //     "topics",
//     //     JSON.stringify(state.reviewData.selectedTopicsSlice)
//     //   );

//     //   console.log("Hovered Star Value:", state.hoveredStar);
//     // },

//     loginUser: (state, action) => {
//       const user = {
//         ...action.payload.user,
//         token: action.payload.jwt,
//         reviewData: {
//           hoveredStar: getStarFromLocalStorage(action.payload.user.id),
//           reviewTextSlice: getReviewFromLocalStorage(action.payload.user.id),
//           deliveryMethodSlice: getDeliveryMethodFromLocalStorage(
//             action.payload.user.id
//           ),
//           mealSlice: getMealFromLocalStorage(action.payload.user.id),
//           priceRangeSlice: getPriceRangeFromLocalStorage(
//             action.payload.user.id
//           ),
//           selectedTopicsSlice: getTopicsFromLocalStorage(
//             action.payload.user.id
//           ),
//         },
//       };

//       // Update user in the Redux state
//       state.user = user;

//       // Update local storage with user-specific key
//       const userLocalStorageKey = `user_${action.payload.user.id}`;
//       localStorage.setItem(userLocalStorageKey, JSON.stringify(user));

//       // Update local storage for other data with user-specific key
//       localStorage.setItem(
//         `${userLocalStorageKey}_stars`,
//         JSON.stringify(state.hoveredStar)
//       );
//       localStorage.setItem(
//         `${userLocalStorageKey}_review`,
//         JSON.stringify(state.reviewData.reviewTextSlice)
//       );
//       localStorage.setItem(
//         `${userLocalStorageKey}_deliveryMethod`,
//         JSON.stringify(state.reviewData.deliveryMethodSlice)
//       );
//       localStorage.setItem(
//         `${userLocalStorageKey}_meal`,
//         JSON.stringify(state.reviewData.mealSlice)
//       );
//       localStorage.setItem(
//         `${userLocalStorageKey}_priceRange`,
//         JSON.stringify(state.reviewData.priceRangeSlice)
//       );
//       localStorage.setItem(
//         `${userLocalStorageKey}_topics`,
//         JSON.stringify(state.reviewData.selectedTopicsSlice)
//       );
//     },

//     logoutUser: (state) => {
//       // Define userLocalStorageKey here
//       const userLocalStorageKey = state.user ? `user_${state.user.id}` : "user"; // Add a default value if user is not defined

//       // Reset user-related state properties
//       state.user = null;
//       // state.hoveredStar = 0;
//       // state.reviewData.starRatingSlice = 0;
//       // state.reviewData.reviewTextSlice = "";
//       // state.reviewData.deliveryMethodSlice = "";
//       // state.reviewData.mealSlice = "";
//       // state.reviewData.priceRangeSlice = "";
//       // state.reviewData.selectedTopicsSlice = "";

//       // Remove user-specific data from local storage
//       localStorage.removeItem(userLocalStorageKey);
//       toast.success("Logged out successfully");

//       // Remove user-specific review data from local storage
//       localStorage.removeItem(`${userLocalStorageKey}_stars`);
//       localStorage.removeItem(`${userLocalStorageKey}_review`);
//       localStorage.removeItem(`${userLocalStorageKey}_deliveryMethod`);
//       localStorage.removeItem(`${userLocalStorageKey}_meal`);
//       localStorage.removeItem(`${userLocalStorageKey}_priceRange`);
//       localStorage.removeItem(`${userLocalStorageKey}_topics`);
//     },

//     // logoutUser: (state) => {
//     //   state.user = null;
//     //   localStorage.removeItem("user");
//     //   toast.success("Logged out successfully");
//     //   // localStorage.removeItem("stars");
//     //   // localStorage.removeItem("review");
//     //   // localStorage.removeItem("deliveryMethod");
//     //   // localStorage.removeItem("meal");
//     //   // localStorage.removeItem("priceRange");
//     //   // localStorage.removeItem("topics");
//     // },
//     activeTabNum: (state, action) => {
//       state.activeTab = action.payload;
//     },
//     isStarHovered: (state, action) => {
//       state.hoveredStar = action.payload;
//       // localStorage.setItem("stars", JSON.stringify(action.payload));
//     },
//     isReview: (state, action) => {
//       state.reviewData.reviewTextSlice = action.payload;
//       // localStorage.setItem("review", JSON.stringify(action.payload));
//     },
//     isDeliveryMethod: (state, action) => {
//       state.reviewData.deliveryMethodSlice = action.payload;
//       // localStorage.setItem("deliveryMethod", JSON.stringify(action.payload));
//     },

//     isMeal: (state, action) => {
//       state.reviewData.mealSlice = action.payload;
//       // localStorage.setItem("meal", JSON.stringify(action.payload));
//     },
//     isPriceRange: (state, action) => {
//       state.reviewData.priceRangeSlice = action.payload;
//       // localStorage.setItem("priceRange", JSON.stringify(action.payload));
//     },
//     isSelectedTopics: (state, action) => {
//       state.reviewData.selectedTopicsSlice = action.payload;
//       // localStorage.setItem("topics", JSON.stringify(action.payload));
//     },
//   },
// });

// export const {
//   loginUser,
//   logoutUser,
//   activeTabNum,
//   isStarHovered,
//   isReview,
//   isDeliveryMethod,
//   isMeal,
//   isPriceRange,
//   isSelectedTopics,
// } = userSlice.actions;

// export default userSlice.reducer;
