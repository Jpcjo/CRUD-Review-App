import React from "react";
import { SiBuymeacoffee } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="max-w-full  overflow-x-scroll flex flex-row h-[60px] bg-slate-100  justify-center items-center space-x-2 font-bold text-4xl text-yellow-500">
      <SiBuymeacoffee />
      <Link to="/" className="hover:scale-105 hover:duration-500">
        CaFFINe.
      </Link>
    </div>
  );
};

export default Navbar;
