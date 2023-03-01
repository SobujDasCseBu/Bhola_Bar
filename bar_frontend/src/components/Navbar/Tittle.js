import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { navData } from "./navigation_data";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import LogoImage from "../../assets/images/Home-Logo.png";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/title.css";
import { toastConfigColoured, nameMinimization } from "../../utils/helper";
import DrobdownIcon from "../../assets/icons/DrobdownIcon";

export default function Tittle() {
  const location = useLocation();
  const navigate = useNavigate();

  const _token = localStorage.getItem("token");
  const _user = JSON.parse(localStorage.getItem("profile")||"{}") || {};

  const [currentUser, setCurrentUser] = useState(_user);
  const [token, setToken] = useState(_token);

  useEffect(() => {
    if (_user._id && !currentUser._id) {
      setCurrentUser(_user);
      console.log("Current User: ", _user);
    }
  }, [_user]);

  useEffect(() => {
    const mainLinks = navData.filter((_item) => _item.path);
    const subLinks = navData
      .filter((_item) => _item.subLinks)
      .map((_it) => _it.subLinks)
      .reduce((r, a) => r.concat(a), []);
    const currentPage = [...mainLinks, ...subLinks].find(
      (_item) => _item.path === location.pathname
    );
    if (currentPage) {
      window.document.title = currentPage.title + " | Bhola Bar Association";
    }

    console.log("location pathname: ", location.pathname);
    const unlisten = () => window.scrollTo(0, 0);
    return () => {
      unlisten();
    };
  }, [location.pathname]);



  return (
    <nav
      className="title-container h-[80px] bg-slate-100 shadow-md pb-[20px]"
      style={{ padding: "10px 0" }}
    >
      <ToastContainer />
      <div className="flex-col  justify-center  pl-2 pr-2 flex gap-2 lg:mb-0 mt-0 sm:flex-row sm:justify-between lg:gap-7">
        {/* Image part  */}
        <div className="h-[30px]  ml-[25%] sm:m-[0]  w-[250px] sm:w-[260px] lg:mt-0">
          <Link to="/">
            <img src={LogoImage} alt="bholaBar" />
          </Link>
        </div>

        {/* Socail linking */}

        <div className="social-icons">
          <div className="flex flex-row  sm:justify-between hidden sm:inline ">
            <button className="p-0 m-0 ml-[3px] mr-[3px] w-[35px] h-[35px] text-[#006A4E] rounded-full hover:bg-[#006A4E] hover:text-white border solid border-[#006A4E] ">
              <i className="fab fa-facebook-f" />
            </button>

            <button className="p-0 m-0 ml-[3px] mr-[3px] w-[35px] h-[35px] text-[#006A4E] rounded-full hover:bg-[#006A4E] hover:text-white border solid border-[#006A4E] ">
              <i className="fab fa-youtube" />
            </button>

            <button className="p-0 m-0 ml-[3px] mr-[3px] w-[35px] h-[35px] text-[#006A4E] rounded-full hover:bg-[#006A4E] hover:text-white border solid border-[#006A4E] ">
              <i className="fab fa-linkedin-in" />
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
