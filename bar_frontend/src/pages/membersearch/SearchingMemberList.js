import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom'
import CardHeader from '../../components/CardHeader'
import { getUsersBySearch } from "../../apis/user";

const SearchingMemberList = () => {
   const [searchParams, setSearchParams] = useSearchParams()
    var count = 1;
    const [allUser, setAllUser] = useState([])
    // const fetchAllUserdata = async () => {
    //     const _users = await fetchAllusers()
    //     setAllUser(_users)
    //     console.log("Fetch All User data data from sml", _users)
    // }
          const memberid = searchParams.get("id")
     const Phone = searchParams.get('phone')
     const Name = searchParams.get('name')
     const bloodGroup=searchParams.get("bloodGroup")
      const query=`name=${Name}&phone=${Phone}&memberID=${memberid}&bloodGroup=${bloodGroup}`
    useEffect(() => {

      const fetchData=async ()=>{
        
      const searchData= await  getUsersBySearch(query);
      console.log(searchData.data)
      setAllUser(searchData.data)
      }
       fetchData()
    }, [])
 
   
  

    //  console.log('Member id from :',memberid)
    //  console.log('Phone Number :', Phone)

  return (
    <div className=' flex flex-col min-h-[80vh]   lg:flex-row pt-[20px] lg:justify-center w-[100%]  gap-4'>
      <div className=" common-hover w-[90%] m-[0_5%] lg:m-0S lg:w-[60%]">
        <CardHeader title='Member List' />
        <div>
        <table className="w-[100%] table-design">
            <thead >
              <tr className='text-[14px] text-[#444] leading-[20px] w-full'>
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
                    
                    <tr>
                       <td className="p-2 text-center">{count++}</td>
                        <td className="p-2 text-center">
                            {_item.nameEn}
                        </td>
                        <td className="p-2 text-center">
                            {_item.phoneEn}
                        </td>
                        <td className="p-2 text-center">
                            {_item.memberId}
                        </td>
                        <td className="p-2 text-center">
                            <Link to={`/user-details?id=${_item._id}`} >
                                <button className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-1 px-3 " >View</button>
                            </Link>
                        </td>

                    </tr>
                   
            

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