import React from "react";
import Secretary from "../assets/images/secretary.jpg";

const ProfileCard = () => {
  return (
    <div className=" m-2 h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div  className="  flex flex-col items-center  py-3">
        <img
          className="w-44 h-32  rounded-sm shadow-lg"
          src={Secretary}
          alt="Bonnie image"
        />
        <h1 className="mb-1  text-lg font-medium text-gray-900 dark:text-white">
          MemberID : <span>1</span>
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Sujan Mridha
        </span>
        <div className="flex mt-4 space-x-3 md:mt-3">
          <a
            href="#"
            className="tracking-wider inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
