import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const HomeLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rerenderKey, setRerenderKey] = useState("collapsed");
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setSidebarCollapsed(true);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRerenderKey((prevKey) =>
        prevKey === "collapsed" ? "expanded" : "collapsed"
      );
    }, 300); // Adjust the timeout to match your transition duration

    return () => clearTimeout(timeout);
  }, [sidebarCollapsed]);

  return (
    <div className={`max-w-screen flex flex-row`}>
      <section
        key={rerenderKey}
        className={`z-10 h-screen ${
          sidebarCollapsed ? "w-0" : "w-[5500px] md:w-[1280px]"
        } shadow-xl overflow-y-scroll border-r border-grey-700 transition-all transform duration-300 ease-in-out ${
          sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Header />
        <Navbar />
        {/* <Header /> */}
        <Outlet />
      </section>

      <div
        className={`relative transition-all transform duration-300 ease-in-out ${
          sidebarCollapsed ? "translate-x-0" : "translate-x-full"
        } top-[50vh] w-0 h-[50px] transform -translate-y-1/2 cursor-pointer z-[1000]`}
        onClick={toggleSidebar}
      >
        <div className="bg-white w-[25px] h-full grid place-items-center text-gray-600 shadow-xl rounded-r-lg border border-grey-700">
          {sidebarCollapsed ? <RiArrowRightSFill /> : <RiArrowLeftSFill />}
        </div>
      </div>

      <section className={`w-screen h-screen `}>
        {/* Display Google Maps iframe */}
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28316.90865695148!2d152.9824120972497!3d-27.48128703028847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9151a4641c6069%3A0x8f66863e3c2502f5!2sThe%20Twin!5e0!3m2!1sen!2sau!4v1700465447416!5m2!1sen!2sau"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default HomeLayout;

// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Header, Navbar } from "../components";
// import { map } from "../utilis/imagesData";

// const HomeLayout = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <div className=" w-screen flex flex-row ">
//       <section
//         className={`z-10 relative min-h-screen ${
//           sidebarCollapsed ? "w-0" : "w-2/5"
//         } shadow-xl  border-r border-grey-700 transition-all transform duration-300 ease-in-out ${
//           sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
//         }`}
//       >
//         <Navbar />
//         <Header />
//         <Outlet />

//         <div
//           className="absolute w-[30px] h-[50px] top-1/2 right-[-30px] transform -translate-y-1/2 cursor-pointer z-[1000]"
//           onClick={toggleSidebar}
//         >
//           <div className="  bg-white h-full grid place-items-center text-gray-600 shadow-xl rounded-r-lg border border-grey-700 ">
//             {sidebarCollapsed ? ">" : "<"}
//           </div>
//         </div>
//       </section>

//       <section className={`w-screen h-screen sticky top-0  `}>
//         {/* Display Google Maps iframe */}
//         <iframe
//           title="Google Maps"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28316.90865695148!2d152.9824120972497!3d-27.48128703028847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9151a4641c6069%3A0x8f66863e3c2502f5!2sThe%20Twin!5e0!3m2!1sen!2sau!4v1700465447416!5m2!1sen!2sau"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </section>
//     </div>
//   );
// };

// export default HomeLayout;

// import React from "react";
// import { Outlet, useNavigation } from "react-router-dom";
// import { Header, Navbar } from "../components";
// import { map } from "../utilis/imagesData";

// const HomeLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <Header />
//       <Outlet />
//     </>
//   );
// };

// export default HomeLayout;

// import React from "react";
// import { Outlet, useNavigation } from "react-router-dom";
// import { Header, Navbar } from "../components";
// import { map } from "../utilis/imagesData";

// const HomeLayout = () => {
//   return (
//     <div className="w-screen flex flex-row">
//       <section className="w-2/5 shadow-xl border-r border-grey-700">
//         <Navbar />
//         <Header />
//         <Outlet />
//       </section>

//       <section className="w-3/5">
//         {/* Display Google Maps iframe */}
//         <iframe
//           title="Google Maps"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28316.90865695148!2d152.9824120972497!3d-27.48128703028847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9151a4641c6069%3A0x8f66863e3c2502f5!2sThe%20Twin!5e0!3m2!1sen!2sau!4v1700465447416!5m2!1sen!2sau"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </section>
//     </div>
//   );
// };

// export default HomeLayout;
