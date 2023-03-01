import React, { useEffect, useState } from "react";
import CardHeader from "../CardHeader";
import MemberSearch from "../Mainbody/MemberSearch";
import Notice from "../Mainbody/Notice";
import VoterSearch from "../Mainbody/VoterSearch";
import ProfileCard from "../ProfileCard";
import UserData from "./userData";
import ProfileData from "../../pages/profile/ProfileData";
import { useSearchParams } from 'react-router-dom'
import { fetchUser } from "../../apis/user";
import { InfinitySpin } from  'react-loader-spinner'
import Spinner from "../Spinner";

const UserDetails = () => {

  const [isLoadding, setIsLoadding] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentId = searchParams.get('id')
  const [user, setUser] = useState([])


  
  const fetchMemberData = async () => {
    setIsLoadding(true)
    setUser(await fetchUser(currentId))
    console.log('User data from user Details page :',user)
    setIsLoadding(false)
  }

  useEffect(() => {

    fetchMemberData()
    
    
  }, [])



  
  return (
    <div className=" container-9-3  about-us-container !flex flex-col gap-4 lg:flex-row">
       {
        isLoadding?(
          <Spinner />
        ):(
          <>
      <div className="user-details lg:w-9/12 mr-10">
      <ProfileData currentUser = {user} editOption={false}  />
      </div>
      <div className="custom-column lg:w-3/12">
      <div className="custom-card common-hover card-box-shadow-inset mt-[30px] lg:mt-0 ">
          <CardHeader title="Member Search" />
          <MemberSearch />
        </div>

        <VoterSearch />

        <Notice />
      </div>
      </>
        )}
    </div>
  );
};

export default UserDetails;
