import React, { useState } from "react"
import CardHeader from "../../components/CardHeader"

import "../../assets/styles/about-us.css"
import aboutUsImg from "../../assets/images/law_event.jpg"
import ShareBottom from "../../components/ShareBottom"
import MemberSearch from "../../components/Mainbody/MemberSearch"
import VoterSearch from "../../components/Mainbody/VoterSearch"
import Notice from "../../components/Mainbody/Notice"
import UnderConstruction from "../UnderConstruction"

const AboutUs = () => {
  const [pageStatus, setPageStatus] = useState("construction")

  return (
    <>
      {pageStatus === "construction" && false ? (
        <UnderConstruction />
      ) : (
        <div className="w-full mt-[30px] flex-col flex lg:flex-row justify-center gap-8">
          <div className=" common-hover w-[80%] ml-[10%] lg:ml-0 lg:w-[60%]">
            <CardHeader title="About" />
            <div className="custom-card-body">
              <div className="about-middle-img">
                <img src={aboutUsImg} className = 'w-full h-[400px] ' alt="Group of Bhola Bar Association" />
              </div>
              <div className="about-middle-desc">
                <p className="text-desc">
                  The Bangladesh Bar Council is a Statutory Autonomous Body of
                  the Government under Law Division, Ministry of Law, Justice
                  and Parliamentary Affairs. It is constituted by the Bangladesh
                  Legal Practitioners and Bar Council Order, 1972 (President’s
                  Order No. 46 of 1972).It consists of 15 (fifteen) Members of
                  whom the Attorney – General for Bangladesh is one and is the
                  Chairman ex-officio. Other 14 (fourteen) members are elected
                  by Advocates for a term of 3 (three) years from amongst
                  themselves, of whom seven from General Seats and seven from
                  seven Zonal or Group Seats. The election of the bar council
                  conducted by the Attorney-General as Chairman of Bar Council
                  with assigned Judicial Officers as directed by the Ministry of
                  Law,
                </p>
              </div>
              <ShareBottom />
            </div>
          </div>
          <div className=" flex flex-col gap-6 w-[80%] ml-[10%] lg:ml-0 lg:w-[22%]">
            <div className=" common-hover box-border card-box-shadow-inset w-[100%]  rounded-[3px] mb-[30px] md:w-full lg:w-[100%] ">
              <div className="common-hover">
                <CardHeader classNm={"text-18"} title={"Member Search"} />
              </div>
              <div>
                <MemberSearch />
              </div>
            </div>

            <div className="m-[0px] p-[0px] w-full">
              <VoterSearch />
            </div>
            <div className="m-0 p-0">
              <Notice />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutUs
