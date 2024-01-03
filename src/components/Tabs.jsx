import React, { useState, useEffect, useRef } from "react";
import { tabs } from "../utilis/imagesData";
import { useDispatch, useSelector } from "react-redux";
import { activeTabNum } from "../features/user/userSlice";
import {
  TabOneContent,
  TabTwoContent,
  TabThreeContent,
} from "../components/index";

const Tabs = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.tabState);
  const { activeTab } = useSelector((state) => state.userState);
  //   const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    dispatch(activeTabNum(tabNumber));
  };

  const switchToTabThree = () => {
    handleTabClick(3);
  };

  const getTabContentStyle = () => {
    return {
      transform: `translateX(-${100 * (activeTab - 1)}%)`,
      transition: "transform 0.3s ease",
      display: "flex",
      width: "300%",
    };
  };

  return (
    <>
      <div className="max-w-screen mx-auto my-8">
        <div className="flex space-x-4">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={`my-2 mx-1 ${
                  activeTab === index + 1
                    ? "text-black font-semibold border-b border-b-black"
                    : "text-gray-400 hover:scale-105 duration-300"
                }`}
                onClick={() => handleTabClick(index + 1)}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-row overflow-hidden relative">
          <div style={getTabContentStyle()}>
            <div className="  p-4 min-w-full">
              {activeTab === 1 && (
                <TabOneContent switchToTabThree={switchToTabThree} />
              )}
            </div>
            <div className=" py-4 min-w-full">
              {activeTab === 2 && <TabTwoContent />}
            </div>
            <div className="bg-slate-100 p-4 min-w-full">
              {activeTab === 3 && <TabThreeContent />}
            </div>
            {/* {tabs.map((tab, index) => (
              <div key={index} className="bg-blue-100 p-4 min-w-full">
                {activeTab === index + 1 && <p>{`Content for ${tab}`}</p>}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
