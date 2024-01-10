import React, { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { PiMapPinBold } from "react-icons/pi";
import { PiClockBold } from "react-icons/pi";
import { AiOutlineCopy } from "react-icons/ai";
import { FaHourglassStart } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { BsFillTelephoneFill } from "react-icons/bs";

const TabOneContent = ({ switchToTabThree }) => {
  const [copyIconShow, setCopyIconShow] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedMessage2, setCopiedMessage2] = useState(false);
  const [copiedMessage3, setCopiedMessage3] = useState(false);
  const addressText = "27 Vulture St, West End QLD 4101";
  const instaText = "https://www.instagram.com/thetwin_westend/";
  const phoneNumText = "+61 7 3844 9371";
  const [currentTime, setCurrentTime] = useState("");
  const [cafeStatus, setCafeStatus] = useState("");
  const [showHourSection, setShowHourSection] = useState(false);
  const [copyWebsiteShow, setCopyWebsiteShow] = useState(false);
  const [copyPhoneShow, setCopyPhoneShow] = useState(false);

  const openingHours = {
    Saturday: "7AM",
    Sunday: "10AM",
    Monday: "Closed",
    Tuesday: "7AM",
    Wednesday: "7AM",
    Thursday: "7AM",
    Friday: "7AM",
  };

  const closingHours = {
    Saturday: "2PM",
    Sunday: "3PM",
    Monday: "Closed",
    Tuesday: "2PM",
    Wednesday: "2PM",
    Thursday: "2PM",
    Friday: "2PM",
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const brisbaneTime = new Date().toLocaleString("en-AU", {
        timeZone: "Australia/Brisbane",
      });
      setCurrentTime(brisbaneTime);

      // Determine cafe status
      const currentDay = new Date().toLocaleDateString("en-US", {
        timeZone: "Australia/Brisbane",
        weekday: "long",
      });

      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "Australia/Brisbane",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

      const [hours, minutes] = currentTime.split(":").map(Number);
      const convertedTime = (hours + minutes / 60).toFixed(2);

      // console.log(convertedTime);

      const openingHour = parseInt(openingHours[currentDay].split("AM")[0]);

      const closingHour =
        parseInt(closingHours[currentDay].split("PM")[0]) + 12;

      // console.log("closing hour", closingHour);

      if (convertedTime < openingHour - 0.5) {
        // Check if within 30 minutes prior to opening
        if (
          convertedTime + 0.5 >= openingHour - 0.5 &&
          convertedTime < openingHour
        ) {
          setCafeStatus("Opening Soon");
        } else {
          setCafeStatus("Closed");
        }
      } else if (convertedTime >= openingHour && convertedTime < closingHour) {
        if (convertedTime < closingHour - 0.5) {
          setCafeStatus("Open");
        } else {
          setCafeStatus("Closing Soon");
        }
      } else {
        setCafeStatus("Closed");
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  const getNextOpeningDay = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let nextOpeningDayIndex = new Date().getDay(); // Get the current day index
    let attempts = 0;

    while (attempts < daysOfWeek.length) {
      nextOpeningDayIndex++;

      if (nextOpeningDayIndex === daysOfWeek.length) {
        nextOpeningDayIndex = 0;
      }

      const nextOpeningDay = daysOfWeek[nextOpeningDayIndex];
      const nextOpeningHour = openingHours[nextOpeningDay];

      if (nextOpeningHour !== "Closed") {
        return nextOpeningDay;
      }

      attempts++;
    }

    // If no open day is found, return the original current day
    return daysOfWeek[new Date().getDay()];
  };

  const getNextOpeningHour = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDay = new Date().toLocaleDateString("en-US", {
      timeZone: "Australia/Brisbane",
      weekday: "long",
    });

    let nextOpeningDayIndex = daysOfWeek.indexOf(currentDay) + 1;

    while (true) {
      if (nextOpeningDayIndex === daysOfWeek.length) {
        nextOpeningDayIndex = 0;
      }

      const nextOpeningDay = daysOfWeek[nextOpeningDayIndex];
      const nextOpeningHour = openingHours[nextOpeningDay];

      if (nextOpeningHour !== "Closed") {
        return nextOpeningHour;
      }

      nextOpeningDayIndex++;
    }
  };

  const getClosingTime = () => {
    const currentDay = new Date().toLocaleDateString("en-US", {
      timeZone: "Australia/Brisbane",
      weekday: "long",
    });

    const closingTime = closingHours[currentDay];

    if (closingTime === "Closed") {
      return "Closed"; // Handle closed day separately
    } else {
      return `Closes ${closingTime}`;
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the index of the current day
  const currentDayIndex = daysOfWeek.indexOf(
    new Date().toLocaleDateString("en-US", {
      timeZone: "Australia/Brisbane",
      weekday: "long",
    })
  );

  // Sort the days array to start with the current day
  const sortedDays = [
    ...daysOfWeek.slice(currentDayIndex),
    ...daysOfWeek.slice(0, currentDayIndex),
  ];

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(addressText)
      .then(() => {
        console.log("Text copied to clipboard:", addressText);
        setCopiedMessage(true);

        // Hide the message after 2 seconds
        setTimeout(() => {
          setCopiedMessage(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
      });
  };

  const handleCopyToClipboardWeb = () => {
    navigator.clipboard
      .writeText(instaText)
      .then(() => {
        setCopiedMessage2(true);

        // Hide the message after 2 seconds
        setTimeout(() => {
          setCopiedMessage2(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
      });
  };

  const handleCopyToClipboardPhone = () => {
    navigator.clipboard
      .writeText(phoneNumText)
      .then(() => {
        setCopiedMessage3(true);

        // Hide the message after 2 seconds
        setTimeout(() => {
          setCopiedMessage3(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard:", err);
      });
  };

  return (
    <div>
      <button
        className="flex flex-row justify-between w-[70%] sm:w-full items-center p-4 border-y text-xs sm:text-base"
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

      <section className="mt-6 space-y-3 text-xs sm:text-base">
        <button
          className={`flex flex-row items-center justify-between w-[82vw] sm:w-full py-3 sm:p-3 rounded-xl ${
            copyIconShow === false ? "bg-white" : "bg-gray-100"
          }`}
          onMouseEnter={() => setCopyIconShow(true)}
          onMouseLeave={() => setCopyIconShow(false)}
          onClick={handleCopyToClipboard}
        >
          <div className="flex flex-row items-center space-x-1 sm:space-x-5 ">
            <PiMapPinBold className="w-6 h-6 text-blue-500" />
            <div>{addressText}</div>
          </div>

          {copyIconShow === false ? null : (
            <AiOutlineCopy className={`w-5 h-5`} />
          )}
        </button>

        {/* Opening status section */}
        <div
          className={`flex flex-row items-start w-full py-3 sm:p-3 space-x-2`}
        >
          <div className="flex flex-row items-center ">
            <PiClockBold className="w-10 h-10 text-blue-500" />
            {/* <div>Hour:</div> */}
            <div
              className={` whitespace-nowrap pl-1 sm:pl-5 ${
                cafeStatus === "Closed"
                  ? "text-red-500"
                  : cafeStatus === "Opening Soon" ||
                    cafeStatus === "Closing Soon"
                  ? "text-yellow-500"
                  : "text-lime-500"
              }`}
            >
              {cafeStatus}
            </div>

            {cafeStatus === "Open" ||
            cafeStatus === "Opening Soon" ||
            cafeStatus === "Closing Soon" ? null : (
              <div className="flex flex-row items-start w-full p-3 space-x-2">
                <div>Opens</div>
                <div>{getNextOpeningHour()}</div>
                <div>{getNextOpeningDay()}</div>
              </div>
            )}

            {cafeStatus === "Open" || cafeStatus === "Closing Soon" ? (
              <div className="flex flex-row items-start w-full p-3 space-x-2">
                <div>{getClosingTime()}</div>
              </div>
            ) : null}

            <button>
              <RiArrowDownSLine
                className={`w-5 h-5 ${
                  showHourSection === true
                    ? "transition rotate-180 duration-150"
                    : ""
                }`}
                onClick={() => setShowHourSection(!showHourSection)}
              />
            </button>
          </div>
        </div>
        {showHourSection === false ? null : (
          <div className="flex flex-row items-start w-[50%] ml-[57px] space-x-5">
            <div className="flex flex-col w-full space-y-2">
              {sortedDays.map((day, index) => (
                <div key={index} className="flex flex-row justify-between">
                  <div>{day}</div>
                  <div>
                    {closingHours[day] === "Closed"
                      ? "Closed"
                      : `${openingHours[day]}-${closingHours[day]}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          className={`flex flex-row items-center justify-between w-[82vw] sm:w-full  py-3 sm:p-3 rounded-xl ${
            copyWebsiteShow === false ? "bg-white" : "bg-gray-100"
          }`}
          onMouseEnter={() => setCopyWebsiteShow(true)}
          onMouseLeave={() => setCopyWebsiteShow(false)}
          onClick={handleCopyToClipboardWeb}
        >
          <div className="flex flex-row items-center space-x-1 sm:space-x-5">
            <LiaGlobeAmericasSolid className="w-6 h-6 text-blue-500" />
            <a
              href={instaText}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              instagram.com
            </a>
          </div>

          {copyWebsiteShow === false ? null : (
            <AiOutlineCopy className={`w-5 h-5`} />
          )}
        </button>

        <button
          className={`flex flex-row items-center justify-between w-[82vw] sm:w-full  py-3 sm:p-3 rounded-xl ${
            copyPhoneShow === false ? "bg-white" : "bg-gray-100"
          }`}
          onMouseEnter={() => setCopyPhoneShow(true)}
          onMouseLeave={() => setCopyPhoneShow(false)}
          onClick={handleCopyToClipboardPhone}
        >
          <div className="flex flex-row items-center space-x-1 sm:space-x-5">
            <BsFillTelephoneFill className="w-5 h-5 text-blue-500" />
            <div>{phoneNumText}</div>
          </div>

          {copyPhoneShow === false ? null : (
            <AiOutlineCopy className={`w-5 h-5`} />
          )}
        </button>

        {/* Copied message section */}
        {copiedMessage && (
          <div className="text-white bg-black opacity-90 p-2 rounded-md fixed top-[20px] right-[240px]">
            Copied to clipboard
          </div>
        )}

        {copiedMessage2 && (
          <div className="text-white bg-black opacity-90 p-2 rounded-md fixed top-[150px] right-[240px]">
            Copied to clipboard
          </div>
        )}

        {copiedMessage3 && (
          <div className="text-white bg-black opacity-90 p-2 rounded-md fixed top-[220px] right-[240px]">
            Copied to clipboard
          </div>
        )}

        {/* Current time in Brisbane section */}
        {/* <div className="flex flex-row items-center space-x-5">
          <PiClockBold className="w-6 h-6 text-blue-500" />
          <div>{`Current Time in Brisbane: ${currentTime}`}</div>
        </div> */}
      </section>
    </div>
  );
};

export default TabOneContent;
