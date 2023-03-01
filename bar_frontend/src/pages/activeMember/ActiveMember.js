import React, { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import CardHeader from "../../components/CardHeader"
import { fetchAllusers } from "../../apis/user"

const SearchingMemberList = () => {
  var count = 1
  const [allUser, setAllUser] = useState([])
  const fetchAllUserdata = async () => {
    const _users = await fetchAllusers()
    setAllUser(_users)
    console.log("Fetch All User data data from sml", _users)
  }

  useEffect(() => {
    fetchAllUserdata()
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const memberid = searchParams.get("id")
  const Phone = searchParams.get("phone")
  const Name = searchParams.get("name")

  //  console.log('Member id from :',memberid)
  //  console.log('Phone Number :', Phone)

  return (
    <div className=" flex flex-col h-[300px]   lg:flex-row pt-[20px] lg:justify-center w-[100%]  gap-4">
      <div className=" common-hover w-[90%] m-[0_5%] lg:m-0S lg:w-[60%]">
        <CardHeader title="Member List" />
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
            <tbody>
              {allUser.map((_item, _in) => (
                <>
                  {(_item.memberId == memberid ||
                    _item.nameEn == Name ||
                    _item.phoneEn == Phone) && (
                    <tr key={_in}>
                      <td className="p-2 text-center">{count++}</td>
                      <td className="p-2 text-center">{_item.nameEn}</td>
                      <td className="p-2 text-center">{_item.phoneEn}</td>
                      <td className="p-2 text-center">{_item.memberId}</td>
                      <td className="p-2 text-center">
                        <Link to={`/user-details?id=${memberid}`}>
                          <button className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-1 px-3 ">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SearchingMemberList
