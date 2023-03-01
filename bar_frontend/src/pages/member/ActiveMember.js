import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CardHeader from "../../components/CardHeader"
import { fetchAllusers } from "../../apis/user"
import Pagination from "./Pagination"
import { InfinitySpin } from  'react-loader-spinner'
import Spinner from "../../components/Spinner"

const ActiveMember = () => {
  var count = 1
  const [allUser, setAllUser] = useState([])
  const [usersFiltered, setUsersFiltered] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoadding, setIsLoadding] = useState(false)

  // Fecth all user data

  const fetchAllUserdata = async () => {
    setIsLoadding(true)
    const _users = await fetchAllusers()
    setAllUser(_users)
    setUsersFiltered(_users)
    setIsLoadding(false)
    //console.log("Fetch All User data data from sml", _users)
  }

  useEffect(() => {
    fetchAllUserdata()
  }, [])

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const _regex = new RegExp(searchQuery, "i")
      setUsersFiltered(
        allUser.filter((_user) => {
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
      setUsersFiltered(allUser)
    }
  }, [searchQuery, allUser])

  // Change page
  const paginateFront = () => {
    if (currentPage * 10 < totalmembers) {
      setCurrentPage(currentPage + 1)
    }
  }

  const paginateBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const [totalmembers, setTotalMembers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentMembers, setCurrentMembers] = useState([])
  const [membersPerPage] = useState(10)

  useEffect(() => {
    setTotalMembers(usersFiltered.length)
    setCurrentPage(1)
  }, [usersFiltered])

  useEffect(() => {
    setCurrentMembers(
      usersFiltered.filter((user, index) => {
        let indexes = Array.from({ length: 10 }).map(
          (item, index2) => 10 * (currentPage - 1) + index2
        )
        return indexes.includes(index)
      })
    )
  }, [currentPage, usersFiltered])

  const getContent = () => {
    if (usersFiltered?.length > 0) {
      return currentMembers.map((_item, _in) => (
        <>
          <tr>
            <td className="p-2 text-center">
              {(currentPage - 1) * 10 + count++}
            </td>
            <td className="p-2 text-center">{_item.nameEn}</td>
            <td className="p-2 text-center">{_item.phoneEn}</td>
            <td className="p-2 text-center">{_item.memberId}</td>
            <td className="p-2 text-center">
              <Link to={`/user-details?id=${_item._id}`}>
                <button className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-1 px-3 ">
                  View
                </button>
              </Link>
            </td>
          </tr>
        </>
      ))
    }
  }

  return (
    <div className="custom-container active-member">
      {
         isLoadding?(
          <Spinner />
        ):(
      <div className=" common-hover">
        <CardHeader title="Active Member List" />
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
        </div>
        <div>
          <table className="w-[100%] table-design">
            <thead>
              <tr className="text-[14px] text-[#444] leading-[20px] w-full">
                <th className="p-2">#</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>MemberId</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{getContent()}</tbody>
          </table>
          <Pagination
            mambersPerPage={membersPerPage}
            totalMembers={totalmembers}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>
      </div>
        )}
    </div>
  )
}

export default ActiveMember
