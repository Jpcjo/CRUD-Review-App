import React, { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { PiMapPinBold } from "react-icons/pi";
import { PiClockBold } from "react-icons/pi";
import { AiOutlineCopy } from "react-icons/ai";

const TabOneContent = ({ switchToTabThree }) => {
  const [copyIconShow, setCopyIconShow] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const addressText = "27 Vulture St, West End QLD 4101, Australia";

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(addressText)
      .then(() => {
        console.log("Text copied to clipboard:", addressText);
        setCopiedMessage(true);

        // Hide the message after 3 seconds
        setTimeout(() => {
          setCopiedMessage(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
      });
  };

  return (
    <div>
      <button
        className="flex flex-row justify-between w-full items-center p-4 border-y"
        onClick={switchToTabThree}
      >
        <div className="flex flex-row w-full space-x-6 items-center">
          <div className="flex flex-row items-center space-x-2">
            <li>Dine-in</li>
            <IoCheckmark className="w-5 h-5 text-green-700" />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <li>Takeaway</li>
            <IoCheckmark className="w-5 h-5 text-green-700" />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <li>Delivery</li>
            <RxCross1 className="w-4 h-4 text-red-700" />
          </div>
        </div>
        <RiArrowRightSLine />
      </button>

      <section className="mt-6 space-y-3">
        <button
          className={`flex flex-row items-center justify-between w-full p-3 rounded-xl ${
            copyIconShow === false ? "bg-white" : "bg-gray-100"
          }`}
          onMouseEnter={() => setCopyIconShow(true)}
          onMouseLeave={() => setCopyIconShow(false)}
          onClick={handleCopyToClipboard}
        >
          <div className="flex flex-row items-center space-x-5 ">
            <PiMapPinBold className="w-6 h-6 text-blue-500" />
            <div>{addressText}</div>
          </div>

          {copyIconShow === false ? null : (
            <AiOutlineCopy className={`w-5 h-5`} />
          )}
        </button>

        <div className="flex flex-row items-center space-x-5">
          <PiClockBold className="w-6 h-6 text-blue-500" />

          <div className="flex flex-col">
            <div className="flex flex-row space-x-5">
              <div>Saturday</div>
              <div>7AM-2PM</div>
            </div>
            <div className="flex flex-row space-x-5">
              <div>Sunday</div>
              <div>10AM-3PM</div>
            </div>
            <div className="flex flex-row space-x-5">
              <div>Monday</div>
              <div>Closed</div>
            </div>
          </div>
        </div>

        {copiedMessage && (
          <div className="text-white bg-black opacity-90 p-2 rounded-md fixed top-[20px] right-[240px]">
            Copied to clipboard
          </div>
        )}
      </section>
    </div>
  );
};

export default TabOneContent;
