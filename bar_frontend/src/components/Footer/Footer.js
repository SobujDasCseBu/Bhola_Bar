import React from "react"
import BkashImage from "../../assets/images/bkash.png"
import NagadImage from "../../assets/images/nagad.png"
import LocationIcon from "../../assets/icons/LocationIcon"
import MobileIcon from "../../assets/icons/MobileIcon"
import TelephoneIcon from "../../assets/icons/TelephoneIcon"
import EmailIcon from "../../assets/icons/EmailIcon"
import DeveloperImage from "../../assets/images/developer.jpeg"
import { BsGlobe2 } from "react-icons/bs"
import { Link } from "react-router-dom"
import PlayStoreApp from "../../assets/images/playstore.jpg"
import Barcode from "../../assets/images/barcode.jpeg"
import { FaGooglePlay } from "react-icons/fa"
import PlayStorePic from '../../assets/images/Playstore3.jpg'
const Footer = () => {
  return (
    <div className="  bg-[#006A4E] mt-[10px] text-white font-serif text-sm leading-4 sm:p-[10px] sm:p-[0] sm:m-[0] sticky  ">
      <div className=" flex flex-col pt-[20px] ml-[20px] gap-4  sm:flex-row sm:justify-around mb-[20px]  ">
        <div className="flex flex-col w-84 gap-4  box-border ">
          <div className="flex flex-row sm:flex-row gap-2 ">
            <h3 className=" flex flex-row gap-1 text-[15px] text-[#fff] font-bold sm:p-0 sm:m-0 ">
              <p>
                {" "}
                <LocationIcon />{" "}
              </p>
              <p>ঠিকানাঃ</p>
            </h3>
            <p>Bhola Sadar, Bhola </p>
          </div>
          <div className="flex flex-row gap-2 ">
            <h3 className=" flex flex-row gap-1 text-[15px] text-[#fff] font-bold p-0 m-0 ">
              <p>
                {" "}
                <MobileIcon />{" "}
              </p>
              <p>মোবাইলঃ</p>
            </h3>
            <p>01712 154134</p>
          </div>

          <div className="flex flex-row gap-1 ">
            <h3 className=" flex flex-row gap-1 text-[15px] text-[#fff] font-bold p-0 m-0 ">
              <p>
                {" "}
                <EmailIcon />{" "}
              </p>
              <p>ই-মেইলঃ</p>
            </h3>
            <p> bholabarassociaton2k23@gmail.com</p>
          </div>

          <div className="flex flex-row gap-2 sm:ml-0 ">
            <button className="p-0 m-0 ml-[3px] mr-[3px] w-[35px] h-[35px] text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#3BACB6] border solid border-[3px] border-[#fff] ">
              <i className="fab fa-facebook-f" />
            </button>

            <button className="p-0 m-0 ml-[3px] mr-[3px] w-[35px] h-[35px] text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#3BACB6] border solid border-[3px] border-[#fff] ">
              <i className="fab fa-youtube" />
            </button>

            <button className="p-0 m-0 ml-[3px] mr-[3px] w-[35px] h-[35px] text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#3BACB6] border solid border-[3px] border-[#fff] ">
              <i className="fab fa-linkedin-in" />
            </button>
          </div>
        </div>

        <div className="flex  flex-col w-80 gap-7">
          <div className="flex flex-row sm:flex-row gap-2 cursor-pointer">
            <h3 className=" flex flex-row gap-1 text-[15px] text-[#fff] font-bold sm:p-0 sm:m-0 ">
              <p>Important Link:</p>
            </h3>
          </div>
          <Link
            to="./"
            className="flex flex-row sm:flex-row gap-2 cursor-pointer"
          >
            <h3 className=" flex flex-row gap-1 text-[15px] sm:p-0 sm:m-0 ">
              <p className="font-normal size-[20px] ">
                {" "}
                <BsGlobe2 />{" "}
              </p>
              <p>Member Search</p>
            </h3>
          </Link>
          <Link
            to="./contact"
            className="flex flex-row sm:flex-row gap-2 cursor-pointer"
          >
            <h3 className=" flex flex-row gap-1 text-[15px] text-[#fff] font-bold sm:p-0 sm:m-0 ">
              <BsGlobe2 />
              <p>Contact Form</p>
            </h3>
          </Link>

          <Link
            to="./active-member"
            className="flex flex-row sm:flex-row gap-2 cursor-pointer"
          >
            <h3 className=" flex flex-row gap-1 text-[15px] text-[#fff] font-bold sm:p-0 sm:m-0 ">
              <BsGlobe2 />
              <p>Active Member</p>
            </h3>
          </Link>
        </div>

        <a
          href="https://play.google.com/store/apps/details?id=com.bholabarassociation.app"
          className="flex flex-col  items-center cursor-pointer"
        >
          <p className="text-lg">Get our mobile app here</p>
          <img src={PlayStorePic} alt='App Barcode' className="ml-[10px] lg:mt-[4px] h-36 w-60 rounded" />
        </a>
      </div>

      <div className="bg-[#0b4738] p-[10px]  flex flex-col sm:flex-row justify-center lg:justify-between pl-[20px] sm:pl-[65px] sm:pr-[65px] text-[15px] text-[#f2f2f2] ">
        <p> Copyright © 2022-23 by Bhola Bar Association </p>
        <p className="pl-[50px] ">Design and Develop by SnipersTech Inc</p>
      </div>
    </div>
  )
}

export default Footer
