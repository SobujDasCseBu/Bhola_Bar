import React, { useEffect, useState } from "react"
import coverPic from "../../assets/images/coverPic.jpg"
import { BiPhoneCall } from "react-icons/bi"
import { CiMail } from "react-icons/ci"
import { MdBloodtype } from "react-icons/md"
import { BsTwitter, BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { Modal } from "antd"
import avatar from "../../assets/images/committee/new-default-profile.jpg"
import defaultCover from "../../assets/images/committee/new-default-cover.jpg"
import ImageViewer from "../gallery/ImageViewer"
import "./profile.css"
import {
  AiFillPrinter,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai"
import {
  uploadProfileCover,
  uploadProfile,
  fetchUser,
  updateUserData,
} from "../../apis/user"
import { getBaseAPIRootUrl, toastConfigColoured } from "../../utils/helper"
import { toast } from "react-toastify"

const ProfileData = ({ currentUser, editOption, profileType }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  const [ccActivities, setCcActivities] = useState([])
  const [certificationDate, setCertificationDate] = useState("")
  const [committee, setCommittee] = useState([])
  const [dob, setDob] = useState("")
  const [ecActivities, setEcActivities] = useState([])
  const [email, setEmail] = useState("")
  const [familyInfo, setFamilyInfo] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [highcourtCertification, setHighcourtCertification] = useState("")

  const [joiningDate, setJoiningDate] = useState("")
  const [memberId, setMemberId] = useState("")
  const [motherName, setMotherName] = useState("")
  const [nameBn, setNameBn] = useState("")
  const [nameEn, setNameEn] = useState("")
  const [permanentAddress, setPermanentAddress] = useState("")
  const [personalView, setPersonalView] = useState("")
  const [phoneBn, setPhoneBn] = useState("")
  const [phoneEn, setPhoneEn] = useState("")
  const [presentAddress, setPresentAddress] = useState("")
  const [role, setRole] = useState("")
  const [studyInfo, setStudyInfo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [blood, setBlood] = useState("")
  const [isViewerOpened, setIsViewerOpened] = useState(false)
  const [coverPhoto, setCoverPhoto] = useState({
    file: null,
    uploaded: false,
    uploading: false,
    percentage: 0,
  })
  const [profilePhoto, setProfilePhoto] = useState({
    file: null,
    uploaded: false,
    uploading: false,
    percentage: 0,
  })

  useEffect(() => {
    console.log("current user: ", currentUser)
    if (currentUser._id) {
      restoreCurrentUserData(currentUser)
    }

    console.log(
      "REACT_APP_API_BASE_URL_DEV: ",
      process.env.REACT_APP_API_BASE_URL_DEV
    )
  }, [currentUser])


  const handleImageViewerOpen = (e) => {
    const _elem = e.target
    if (
      _elem.classList.contains('times-icon') ||
      _elem.parentElement.classList.contains('times-icon') ||
      _elem.parentElement.parentElement.classList.contains('times-icon')
    ) {
      console.log('it is times icon')
    } else {
      console.log('elem: ', _elem)
      setIsViewerOpened(true)
    }
  }


  const clickProPic = () => {

  }

  const restoreCurrentUserData = (_currentUser) => {
    setCcActivities(_currentUser.ccActivities)
    setCertificationDate(_currentUser.certificationDate)
    setCommittee(_currentUser.committee)
    setDob(_currentUser.dob)
    setEcActivities(_currentUser.ecActivities)
    setEmail(_currentUser.email)
    setFamilyInfo(_currentUser.familyInfo)
    setFatherName(_currentUser.fatherName)
    setHighcourtCertification(_currentUser.highcourtCertification)
    setJoiningDate(_currentUser.joiningDate)
    setMemberId(_currentUser.memberId)
    setMotherName(_currentUser.motherName)
    setNameBn(_currentUser.nameBn)
    setNameEn(_currentUser.nameEn)
    setPermanentAddress(_currentUser.permanentSddress)
    setPersonalView(_currentUser.personalView)
    setPhoneBn(_currentUser.phoneBn)
    setPhoneEn(_currentUser.phoneEn)
    setPresentAddress(_currentUser.presentAddress)
    setRole(_currentUser.role)
    setStudyInfo(_currentUser.studyInfo)
    setUserName(_currentUser.userName);
  }

  const handleProfileUpdate = async () => {


    const data = {
      nameBn: nameBn,
      nameEn: nameEn,
      fatherName: fatherName,
      motherName: motherName,
      password: password != "" ? password : "12345",
      dob: dob,
      joiningDate: joiningDate,
      certifiedDate: certificationDate,
      highcourtCertification: highcourtCertification,
      familyInfo: familyInfo,
      studyInfo: studyInfo,
      presentAddress: presentAddress,
      permanentAddress: permanentAddress,
      ccActivities: ccActivities,
      ecActivities: ecActivities,
      personalView: personalView,
      email: email,
      phoneEn: phoneEn,
      userName: userName,
      memberId: memberId
    }

    const updateUserdata = await updateUserData(currentUser._id, data);
    if (!updateUserdata.success) {
      toast.warn(updateUserdata.msg, toastConfigColoured)
    } else {
      if (coverPhoto.file) {
        const _data = await uploadProfileCover(coverPhoto.file, currentUser._id)
        console.log("Cover  data: ", _data)
      }
      if (profilePhoto.file) {
        const _data = await uploadProfile(profilePhoto.file, currentUser._id)
        console.log("profile data", _data)
      }
      const userData = await fetchUser(currentUser._id)
      console.log(updateUserdata)
      console.log("userData", userData)
      if (profileType === "logged-in") {
        localStorage.setItem("profile", JSON.stringify(userData))
      }
      toast.info("Successfully Updated", toastConfigColoured)
      setUpdateModalOpen(false)
    }

    //window.location.reload(false);
  }

  return (
    <>
      <Modal
        bodyStyle={{
          backgroundColor: "white",
        }}
        open={updateModalOpen}
        title="Profile Update"
        className="profile-update-modal"
        onCancel={() => {
          setUpdateModalOpen(false)
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setUpdateModalOpen(false)
            }}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={handleProfileUpdate}
          >
            Update
          </button>,
        ]}
      >
        <div className="update-form-container modalInput">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cover Image
              </label>
              <input
                type="file"
                id="cover-pic"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setCoverPhoto({
                      ...coverPhoto,
                      file: e.target.files[0],
                    })
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={nameEn}
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profile-pic"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setProfilePhoto({
                      ...profilePhoto,
                      file: e.target.files[0],
                    })
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name in English
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name in Bangla
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Father's Name
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mother's Name
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                UserName
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Member ID
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number in English
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={phoneEn}
                onChange={(e) => setPhoneEn(e.target.value)}
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Blood Group
              </label>
              <select onChange={(e) => setBlood(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="grid-state">
                <option>Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label
                for="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="url"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                for="visitors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Passowrd
              </label>
              <input
                type="number"
                id="visitors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                for="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <label
                for="visitors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Joining Date
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </div>
            <div>
              <label
                for="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Certification Date
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={certificationDate}
                onChange={(e) => setCertificationDate(e.target.value)}
              />
            </div>
            <div>
              <label
                for="visitors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                High Court Certification Date
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={highcourtCertification}
                onChange={(e) => setHighcourtCertification(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Personal View
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={personalView}
              onChange={(e) => setPersonalView(e.target.value)}
            />
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Family Information
            </label>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={familyInfo}
              onChange={(e) => setFamilyInfo(e.target.value)}
            />
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Educational Background
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={studyInfo}
              onChange={(e) => setStudyInfo(e.target.value)}
            />
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Present Address
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={presentAddress}
              onChange={(e) => setPresentAddress(e.target.value)}
            />
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Permanent Address
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
            />
          </div>

          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Co-Curricular Activities
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={ccActivities}
              onChange={(e) => setCcActivities(e.target.value)}
            />
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Extra-Curricular Activities
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={ecActivities}
              onChange={(e) => setEcActivities(e.target.value)}
            />
          </div>


        </div>
      </Modal>
      <div
        className="coverPage"
        style={{
          backgroundImage: currentUser.coverExtension
            ? `url(${getBaseAPIRootUrl()}profile-cover-${currentUser._id}${currentUser.coverExtension
            })`
            : `url(${defaultCover})`,
          backgroundPosition: "center",
          height: "26vh",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box",
          backgroundSize: 'cover'
        }}
      ></div>
      <div className="aboutProfile mx-7">
        <div className="flex flex-col lg:justify-between    lg:flex-row">
          <div className="profile lg:pl-7   flex flex-col items-center  lg:flex-row lg:items-start space-x-4">
            {currentUser.profileExtension ? (
              <img
                src={`${getBaseAPIRootUrl()}profile-${currentUser._id}${currentUser.coverExtension
                  }`}
                className="-mt-16 w-32 h-32  lg:w-36 lg:h-36 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                alt=""
                onClick={handleImageViewerOpen}
              />
            ) : (
              <img
                src={avatar}
                className=" -mt-16 w-32 h-32 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                alt=""
                onClick={handleImageViewerOpen}
              />
            )


            }
            {/* <ImageViewer
              open={isViewerOpened}
              setIsOpen={setIsViewerOpened}
              album={avatar}
              
            /> */}
            <div className="name flex flex-col ">
              <h6 className="text-xl">
                <b>{currentUser.nameEn}</b>
              </h6>
              <p>{currentUser.nameBn}</p>
            </div>
          </div>
          <div className=" flex flex-col  items-center lg:justify-center lg:items-end ">
            {editOption && (
              <button
                className="bg-green-700 hover:bg-[#d39b36] hover:text-[black] text-[17px] text-[#fff] p-[6px_10px]  mt-2 rounded lg:mr-3"
                onClick={() => setUpdateModalOpen(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="shadow-slate-600 mt-2 break-all personalView min-h-[15vh] border rounded flex justify-center items-center">
          {personalView == "unavailable"
            ? "Set Your personalview !"
            : personalView}
        </div>
        <div className="contactIcon mb-6   flex flex-col ml-[20%]	 md:flex-row items-start  justify-start md:justify-between py-5">
          <p className="flex  mb-2   ">
            <BiPhoneCall
              style={{
                color: "white",
                background: "red",
                borderRadius: "50%",
                padding: "4px",
                marginRight: "4px",
              }}
              size={25}
            />
            {phoneEn || phoneBn || "N/A"}
          </p>
          <p className="flex  mb-2 ">
            <CiMail
              style={{
                color: "white",
                background: "red",
                borderRadius: "50%",
                marginRight: "4px",
              }}
              size={20}
            />
            {email || "N/A"}
          </p>
          <p className="flex mb-2 ml-[-2px] ">
            <MdBloodtype
              style={{
                color: "red",
                background: "white",
                borderRadius: "50%",
                marginRight: "4px",
              }}
              size={30}
            />
            {false || "N/A "}
          </p>
        </div>
      </div>
      <hr className="mx-7" />
      <div className="information mt- flex flex-col lg:flex-row">
        <div className="PersonalInformation border radius-rounded p-5 mx-7 w-full">
          <p
            className="flex  justify-center mb-4 border-b-2"
            style={{ fontSize: "20px", color: "#198754" }}
          >
            Career Information
          </p>
          <p>
            <b className="pl-5" >Joining Date:</b>
          </p>
          <p className="pl-5" >{joiningDate || "Input  Not found !"}</p>
          <br />

          <p>
            <b className="pl-5">Certification Date:</b>
          </p>
          <p className="pl-5 ">{certificationDate || "Input Not found !"}</p>
          <br />
          <p>
            <b className="pl-5 "> High Court Certification Date:</b>
          </p>
          <p className="pl-5 ">{highcourtCertification || "Input Not found !"}</p>
        </div>
      </div>

      <div className="information flex flex-col lg:flex-row">
        <div className="PersonalInformation border radius-rounded p-5 mx-7 w-full">
          <p
            className="flex  justify-center mb-4 border-b-2"
            style={{ fontSize: "20px", color: "#198754" }}
          >
            Personal Information
          </p>

          <p className="pl-5">
            <b >Father's Name </b>
          </p>
          <p className="pl-5">{fatherName || "Input Not found !"}</p>
          <br />
          <p className="pl-5">
            <b >Mother's Name </b>
          </p>
          <p className="pl-5">{motherName || "Input Not found !"}</p>
          <br />
          <p className="pl-5">
            <b>Birth Date</b>
          </p>
          <p className="pl-5">{dob || "Input Not found !"}</p>
          <br />
          <p className="pl-5">
            <b>Family Information</b>
          </p>
          <p className="pl-5">{JSON.stringify(familyInfo) || "Input Not found !"}</p>
          <br />



          <p className="pl-5">
            <b>Present Address:</b>
          </p>
          <p className="pl-5">{presentAddress || "N/A"}</p>
          <br />

          <p className="pl-5">
            <b>Permanent Address</b>
          </p>
          <p className="pl-5">{permanentAddress || "N/A"}</p>

          <br />

          <p className="pl-5">
            <b>Study Information</b>
          </p>
          <p className="pl-5">{studyInfo || "N/A"}</p>
        </div>
        <hr />
      </div>

      <div className="information mt- flex flex-col lg:flex-row">
        <div className="PersonalInformation border radius-rounded p-5 mx-7 w-full">
          <p
            className="flex  justify-center mb-4 border-b-2"
            style={{ fontSize: "20px", color: "#198754" }}
          >
            Activities
          </p>
          <p>
            <b className="pl-5 ">Co-Curricular Activities:</b>
          </p>
          <p className="pl-5 " >{ccActivities || "Input Not found !"}</p>
          <br />
          <p>
            <b className="pl-5 "> Extra-Curricular Activities:</b>
          </p>
          <p className="pl-5 ">{ecActivities || "Input Not found! "}</p>
        </div>
      </div>
    </>
  )
}

export default ProfileData
