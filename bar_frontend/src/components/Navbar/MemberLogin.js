import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { navData } from "./navigation_data"
import LogoutIcon from "../../assets/icons/LogoutIcon"
import "react-toastify/dist/ReactToastify.css"
import "../../assets/styles/title.css"
import { toastConfigColoured } from "../../utils/helper"

const MemberLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const _token = localStorage.getItem("token")
  const _user = JSON.parse(localStorage.getItem("profile")) || {}

  const [currentUser, setCurrentUser] = useState(_user)
  const [token, setToken] = useState(_token)

  useEffect(() => {
    if (_user._id && !currentUser._id) {
      setCurrentUser(_user)
      console.log("Current User: ", _user)
    }
  }, [_user])

  useEffect(() => {
    const mainLinks = navData.filter((_item) => _item.path)
    const subLinks = navData
      .filter((_item) => _item.subLinks)
      .map((_it) => _it.subLinks)
      .reduce((r, a) => r.concat(a), [])
    const currentPage = [...mainLinks, ...subLinks].find(
      (_item) => _item.path === location.pathname
    )
    if (currentPage) {
      window.document.title = currentPage.title + " | Bhola Bar Association"
    }

    console.log("location pathname: ", location.pathname)
    const unlisten = () => window.scrollTo(0, 0)
    return () => {
      unlisten()
    }
  }, [location.pathname])

  const handleGotoProfile = () => {
    navigate("/profile-details")
  }

  const handleLogout = () => {
    toast.success("Successfully logged out!", toastConfigColoured)
    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    setCurrentUser({})
    setToken("")
    navigate("/login")
  }

  return (
    <div>
      {currentUser._id ? (
        <div className="mini-profile-info">
          <span>Welcome </span>
          <span onClick={handleGotoProfile}>
            <strong>{currentUser.nameEn}</strong>
          </span>
          <span onClick={handleLogout}>
            <LogoutIcon />
          </span>
        </div>
      ) : (
        <div className=" w-[120px] ml-[200px] mt-[40px] sm:ml-0 sm:e-auto sm:mt-[13px] pr-[4px] text-right 	 ">
          <Link to="/login">
            <p className="bg-[#006A4E] p-[4px] hover:bg-[#d39b36] cursor-pointer transition duration-300  rounded-[5px] text-white text-[15px] pt-[5px_10px] leading-[24px]  text-center ">
              Member Login
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MemberLogin
