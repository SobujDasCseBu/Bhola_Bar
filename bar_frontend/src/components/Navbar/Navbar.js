import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react"
import { navData } from "./navigation_data"
import SubLinks from "./SubLinks"
import "../../assets/styles/nav-bar.css"
import avatar from "../../assets/images/avatar.png"
import avatar1 from "../../assets/images/committee/new-default-profile.jpg"
import {
  getBaseAPIRootUrl,
  toastConfigColoured,
  nameMinimization,
} from "../../utils/helper"
import DrobdownIcon from "../../assets/icons/DrobdownIcon"

export default function NavBar() {
  const navigate = useNavigate()

  const _user = JSON.parse(localStorage.getItem("profile")) || {}
  const _token = localStorage.getItem("token")

  const [filteredNavData, setFilteredNavData] = useState([])
  const [openNav, setOpenNav] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [token, setToken] = useState(_token)
  const [miniProfileDropdownOpen, setMiniProfileDropdownOpen] = useState(false)

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  useEffect(() => {
    if (_user._id && !currentUser._id) {
      setCurrentUser(_user)
    }
    console.log("_user: ", _user)
  }, [_user])

  useEffect(() => {
    const adminLinks = ["/dashboard"]
    if (currentUser._id && (currentUser.isAdmin || currentUser.isSuperAdmin)) {
      setFilteredNavData(navData)
    } else {
      setFilteredNavData(
        navData.filter((_item) => !adminLinks.includes(_item.path))
      )
    }
  }, [currentUser])

  const handleGotoProfile = () => {
    navigate("/profile-details")
  }

  const handleLogout = () => {
    toast.success("Successfully logged out!", toastConfigColoured)
    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    setCurrentUser({})
    setToken("")
  }

  const NavList = () => (
    <ul className="box-border border-none nav-list-ul">
      {filteredNavData.map((_navDataItem, _in) =>
        _navDataItem.subLinks ? (
          <SubLinks navItem={_navDataItem} key={_in} setOpenNav={setOpenNav} />
        ) : (
          <Typography
            key={_in}
            as="li"
            variant="small"
            color="white"
            className="text-lg font-semibold nav-item-primary"
          >
            <Link to={_navDataItem.path} onClick={() => setOpenNav(false)}>
              {_navDataItem.title}
            </Link>
          </Typography>
        )
      )}
    </ul>
  )

  return (
    <Navbar className=" z-140 bg-[#006A4E]  rounded-none justify-between box-border styles.headerColor navigation-bar-custom sticky top-0">
      <div className="mini-profile-container">
        {currentUser._id ? (
          <>
            <div
              className="mini-profile-info"
              onClick={() =>
                setMiniProfileDropdownOpen(!miniProfileDropdownOpen)
              }
            >
              <div className="mini-profile-name">
                {/* <strong>User</strong> */}
                {/* <strong>{nameMinimization(currentUser.nameEn)}</strong> */}
                <strong>{currentUser.userName}</strong>
              </div>
              <div
                className="mini-profile-img"
                style={{
                  backgroundImage: currentUser.profileExtension
                    ? `url(${getBaseAPIRootUrl()}profile-${currentUser._id}${
                        currentUser.profileExtension
                      })`
                    : `url(${avatar1})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundOrigin: "content-box",
                  backgroundSize: "cover",
                }}
              ></div>
              <div>
                <DrobdownIcon />
                
              </div>
            </div>
            {miniProfileDropdownOpen && (
              <div className="mini-profile-dropdown">
                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setMiniProfileDropdownOpen(false)
                    handleGotoProfile()
                  }}
                >
                  Profile
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setMiniProfileDropdownOpen(false)
                    handleLogout()
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-right member-login-btn">
            <Link to="/login">
              <p className="bg-[#d39b36] p-[4px] hover:bg-[#d39b36] cursor-pointer transition duration-300  rounded-[5px] text-white text-[15px] pt-[5px_10px] leading-[24px]  text-center ">
                Member Login
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className=" hidden lg:block ">
        <NavList />
      </div>

      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden nav-toggle-button"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </IconButton>
      {/* </div> */}
      <MobileNav
        open={openNav}
        className={`mobile-nav ${openNav ? "mobile-nav-open" : ""}`}
      >
        <NavList />
        {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Buy Now</span>
        </Button> */}
      </MobileNav>
    </Navbar>
  )
}
