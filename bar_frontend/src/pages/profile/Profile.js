import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import CardHeader from "../../components/CardHeader"
import MemberSearch from "../../components/Mainbody/MemberSearch"
import Notice from "../../components/Mainbody/Notice"
import VoterSearch from "../../components/Mainbody/VoterSearch"
import { toastConfigColoured } from "../../utils/helper"
import ProfileData from "./ProfileData"

import "../../assets/styles/profile.css"
import { fetchUser, getUser } from "../../apis/user"

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const userIdParams = searchParams.get("userId")

  const navigate = useNavigate()

  const _token = localStorage.getItem("token")
  const _user = JSON.parse(localStorage.getItem("profile") || "{}") || {}

  const [currentUser, setCurrentUser] = useState({})
  const [token, setToken] = useState(_token)

  useEffect(() => {
    console.log("userIdParams: ", currentUser._id)
    if (!userIdParams && _user._id && !currentUser._id) {
      setCurrentUser(_user)
      console.log("Current User: ", _user)
    } else if (!_user._id && !currentUser._id) {
      toast.info("You've to login first!", toastConfigColoured)
      navigate(-1)
    }
  }, [_user, currentUser, userIdParams])

  useEffect(() => {
    if (userIdParams && userIdParams.length > 0 && !currentUser._id && _user && _user.isAdmin) {
      handleGetUser()
    }
  }, [userIdParams, _user])

  const handleGetUser = async () => {
    const _user2 = await fetchUser(userIdParams)
    console.log("_user2: ", _user2)
    setCurrentUser(_user2)
  }

  return (
    <div className=" container-9-3  profile-container !flex flex-col  lg:flex-row">
      <div className="user-details lg:w-9/12 mr-10   ">
        <ProfileData
          currentUser={currentUser}
          editOption={true}
          profileType={
            userIdParams && userIdParams.length > 0 ? "other" : "logged-in"
          }
        />
      </div>
      <div className="custom-column lg:w-3/12 flex-col gap-8 ">
        <div className=" common-hover card-box-shadow-inset mt-[40px] ">
          <CardHeader title="Member Search" />
          <MemberSearch />
        </div>
        <div className="mb-[20px] mt-[20px]">
          <VoterSearch />
        </div>
        <div className="mb-[10px]">
          <Notice />
        </div>
      </div>
    </div>
  )
}

export default Profile
