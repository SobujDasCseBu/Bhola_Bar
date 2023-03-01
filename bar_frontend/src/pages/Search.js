import React from "react";
import CardHeader from "../components/CardHeader";
import MemberSearch from "../components/Mainbody/MemberSearch";
import VoterSearch from "../components/Mainbody/VoterSearch";
import ProfileCard from "../components/ProfileCard";
import Notice from '../components/Mainbody/Notice'

const Search = ({ headerTitle }) => {
  
  return (
    <div className=" container-9-3 about-us-container !flex flex-col lg:flex-row">
      <div className="custom-card common-hover">
        <CardHeader title={headerTitle} />
        <div className="custom-card-body flex justify-around items-center flex-row flex-wrap">
          <ProfileCard />
        </div>
      </div>
      <div className="custom-column lg:w-2/6">
        <div className="custom-card common-hover card-box-shadow-inset">
          <CardHeader title="Member Search" />
          <MemberSearch />
        </div>

        <VoterSearch />

        <Notice />
        
      </div>
    </div>
  );
};

export default Search;
