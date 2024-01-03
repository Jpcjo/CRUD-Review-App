import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { getInitials } from "../utilis/utilities";
import { isStarHovered } from "../features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  // navigate to a certain page
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);

  // const getInitials = (username) => {
  //   if (!username) {
  //     return "";
  //   }

  //   // Split the username into words
  //   const words = username.split(" ");

  //   // Extract the first letter of each word
  //   const initials = words.map((word) => word.charAt(0));

  //   // Join the initials and convert to uppercase
  //   return initials.join("").toUpperCase();
  // };

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
    // dispatch(isStarHovered(0));
  };

  return (
    <div className="w-full h-[30px] bg-slate-200 pr-4 flex flex-row justify-end font-bold text-xl text-gray-500">
      {user ? (
        <div className="flex gap-x-2 sm:gap-x-8 items-center">
          <p className="text-xs sm:text-sm">
            Hello, {getInitials(user.username)}
          </p>
          <button
            className="btn btn-xs btn-outline hover:scale-110 "
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      ) : (
        <div className="flex gap-x-4 justify-center items-center">
          <Link
            to="/login"
            className="link link-hover text-xs sm:text-sm hover:scale-105  hover:text-black duration-300"
          >
            LOGIN
          </Link>
          {/* <p className="text-sm font-extralight">- or -</p> */}
          <Link
            to="/register"
            className="link link-hover text-xs sm:text-sm hover:scale-105  hover:text-black duration-300"
          >
            REGISTER
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
