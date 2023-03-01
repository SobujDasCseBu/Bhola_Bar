import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { deleteUser, fetchAllusers, signUp, uploadProfile, uploadProfileCover } from "../../apis/user"
import EditIcon from "../../assets/icons/EditIcon"
import "../../assets/styles/members-admin.css"
import { toast } from "react-toastify"
import DeleteIcon from "../../assets/icons/DeleteIcon"
import { Modal } from "antd"
import { toastConfigColoured } from "../../utils/helper"


const Members = () => {
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [usersFiltered, setUsersFiltered] = useState([])
  const [userDeleteModal, setUserDeleteModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  //Member add
  const [addModalOpen, setAddModalOpen] = useState(false)

  const [certificationDate, setCertificationDate] = useState("")
  const [dob, setDob] = useState("")
  const [email, setEmail] = useState("")
  const [familyInfo, setFamilyInfo] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [highcourtCertification, setHighcourtCertification] = useState("")

  const [joiningDate, setJoiningDate] = useState("")
  const [motherName, setMotherName] = useState("")
  const [nameBn, setNameBn] = useState("")
  const [nameEn, setNameEn] = useState("")
  const [permanentAddress, setPermanentAddress] = useState("")
  const [personalView, setPersonalView] = useState("")
  const [phoneBn, setPhoneBn] = useState("")
  const [phoneEn, setPhoneEn] = useState("")
  const [presentAddress, setPresentAddress] = useState("")
  const [studyInfo, setStudyInfo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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
    initFetch()
  }, [])

  const initFetch = async () => {
    const _users = await fetchAllusers()
    setUsers(_users)
  }

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const _regex = new RegExp(searchQuery, "i")
      setUsersFiltered(
        users.filter((_user) => {
          if (_user.nameEn && _user.nameEn?.match(_regex)) {
            return true
          } else if (_user.nameBn && _user.nameBn?.match(_regex)) {
            return true
          } else if (_user.phoneEn && _user.phoneEn?.match(_regex)) {
            return true
          } else if (_user.email && _user.email?.match(_regex)) {
            return true
          }
          return false
        })
      )
    } else {
      setUsersFiltered(users)
    }
  }, [searchQuery, users])

  //// Paginate Start
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffSet, setItemOffset] = useState(0)
  const [paginationData, setPaginationData] = useState([])
  const itemsPerPage = 20

  useEffect(() => {
    const temps = usersFiltered.map((_it, _in) => ({ ..._it, _idx: _in })) || []
    setPaginationData(temps)
  }, [usersFiltered])

  useEffect(() => {
    const endOffset = itemOffSet + itemsPerPage
    setCurrentItems(paginationData.slice(itemOffSet, endOffset))
    setPageCount(Math.ceil(paginationData.length / itemsPerPage))
  }, [itemOffSet, itemsPerPage, paginationData])

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % paginationData.length
    setItemOffset(newOffset)
  }
  //// Paginate End

  const handleMemberDelete = async () => {
    const data = await deleteUser(selectedUserId)
    console.log("User delete data: ", data)
    if (data?.success) {
      toast.info(data.message, toastConfigColoured)
      setUserDeleteModal(false)
      setSelectedUserId("")
      initFetch()
    } else {
      toast.warn("Something went wrong! Please try again!", toastConfigColoured)
    }
  }

  const handleMemberAdd = async () => {
    if (!phoneEn) {
      toast.info('Phone number cannot be empty!', toastConfigColoured)
      return
    }
    if (!nameEn) {
      toast.info('English Name cannot be empty!', toastConfigColoured)
      return
    }
    if (!password) {
      toast.info('Password cannot be empty!', toastConfigColoured)
      return
    }if (password !== confirmPassword) {
      toast.info('Password and Confirm Password must be equal!', toastConfigColoured)
      return
    }
    // if (coverPhoto.file) {
    //   const _data = await uploadProfileCover(coverPhoto.file, currentUser._id)
    //   console.log("Cover  data: ", _data)
    // }
    // if (profilePhoto.file) {
    //   const _data = await uploadProfile(profilePhoto.file, currentUser._id)
    //   console.log("profile data", _data)
    // }
    const data = {
      nameBn: nameBn,
      nameEn: nameEn,
      phoneEn,
      fatherName: fatherName,
      motherName: motherName,
      password: password !== "" ? password : "12345",
      dob: dob,
      joiningDate: joiningDate,
      certifiedDate: certificationDate,
      highcourtCertification: highcourtCertification,
      familyInfo: familyInfo,
      studyInfo: studyInfo,
      presentAddress: presentAddress,
      permanentAddress: permanentAddress,
      personalView: personalView,
    }

    const _newUser = await signUp(data)
    console.log("_newUser", _newUser)
    if (_newUser.success) {
      toast.info('Successfully Created new Member', toastConfigColoured)
      const _newUserId = _newUser?.result?._id || ''
      if (_newUserId) {
        if (coverPhoto.file) {
          const _data = await uploadProfileCover(coverPhoto.file, _newUserId)
          console.log("Cover  data: ", _data)
        }
        if (profilePhoto.file) {
          const _data = await uploadProfile(profilePhoto.file, _newUserId)
          console.log("profile data", _data)
        }
      }

      setAddModalOpen(false) 
      resetModalData()
      initFetch()
    } else {
      toast.warn(_newUser.message || 'Something went wrong! Please try again.', toastConfigColoured)
    }
  }

  const resetModalData = () => {
    setCertificationDate('')
    setDob('')
    setEmail('')
    setFamilyInfo('')
    setFatherName('')
    setJoiningDate('')
    setMotherName('')
    setNameBn('')
    setNameEn('')
    setPermanentAddress('')
    setPersonalView('')
    setPhoneBn('')
    setPhoneEn('')
    setPresentAddress('')
    setStudyInfo('')
  }

  return (
    <div className="admin-container member">
      <Modal
        open={userDeleteModal}
        title={`Delete User confirmation`}
        className="user-update-modal"
        onCancel={() => {
          setUserDeleteModal(false)
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setUserDeleteModal(false)
            }}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={handleMemberDelete}
          >
            Confirm
          </button>,
        ]}
      >
        <div className="form-container one-row user">
          <p>Are you sure to delete this user?</p>
        </div>
      </Modal>
      <Modal
        bodyStyle={{
          backgroundColor: "white",
        }}
        open={addModalOpen}
        title="Member Add"
        className="profile-update-modal"
        onCancel={() => {
          setAddModalOpen(false)
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setAddModalOpen(false)
            }}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={handleMemberAdd}
          >
            Submit
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
                English Name
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
                Bangla Name
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={nameBn}
                onChnage={(e) => setNameBn(e.target.value)}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Father Name
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
                Mother Name
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone English
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={phoneEn}
                onChange={(e) => setPhoneEn(e.target.value)}
              />
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
                Certified Date
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
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Personal View
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={personalView}
              onChange={(e) => setPersonalView(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Family Information
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={familyInfo}
              onChange={(e) => setFamilyInfo(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Study Information
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={studyInfo}
              onChange={(e) => setStudyInfo(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Present Address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={presentAddress}
              onChange={(e) => setPresentAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Permanant Address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
            />
          </div>

          {/* <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Co-cariculum activities
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={ccActivities}
              onChange={(e) => setCcActivities(e.target.value)}
            />
          </div> */}
          {/* <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Extra-cariculum activities
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={ecActivities}
              onChange={(e) => setEcActivities(e.target.value)}
            />
          </div> */}
        </div>
      </Modal>
      <div className="search-container form-container">
        <div className="form-item">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            placeholder="Search by Name/Phone"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="member-add-btn">
          <button
            className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
            onClick={() => setAddModalOpen(true)}
          >
            Add Member
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="w-[100%] table-design">
          <thead>
            <tr className="text-[14px] text-[#444] leading-[20px] w-full">
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Member Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody className="w-[100%]">
            {currentItems.map((_item, _in) => (
              <tr
                className="text-[14px] text-[#444] leading-[18px] w-full "
                key={_in}
              >
                <td>{_item._idx + 1}</td>
                <td>{_item.nameEn}</td>
                <td>{_item.phoneEn}</td>
                <td>{_item.memberStatus?.join(", ") || ""}</td>
                <td
                  className="edit-icon"
                  onClick={() =>
                    navigate("/profile-details?userId=" + _item._id)
                  }
                >
                  <EditIcon />
                </td>
                <td
                  className="delete-icon"
                  onClick={() => {
                    setSelectedUserId(_item._id)
                    setUserDeleteModal(true)
                  }}
                >
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentItems.length > 0 && (
        <div className="pagination-container">
          <ReactPaginate
            breakLabel={"..."}
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Previous"
            marginPagesDisplayed={3}
            //renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />
        </div>
      )}
    </div>
  )
}

export default Members
