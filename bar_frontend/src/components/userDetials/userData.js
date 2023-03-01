import React, { useEffect, useState } from "react"
import coverPic from "../../assets/images/coverPic.jpg"
import { BiPhoneCall } from "react-icons/bi"
import { CiMail } from "react-icons/ci"
import { MdBloodtype } from "react-icons/md"
import { BsTwitter, BsWhatsapp, BsFacebook, BsInstagram } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { useSearchParams } from "react-router-dom"
import { fetchAllusers } from "../../apis/user.js"
import {
  AiFillPrinter,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai"

const UserData = () => {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [fname, setFname] = useState("")
  const [mname, setMname] = useState("")
  const [religion, setReligion] = useState("")
  const [gender, setGender] = useState([])
  const [bloodg, setBloodg] = useState("")
  const [nid, setNid] = useState("")
  const [paddress, setPaddress] = useState("")
  const [designation, setDesignation] = useState("Member")
  const [memberId, setMemberId] = useState("")
  const [mobilenumber, setMobilenumber] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()
  const currentDocumentId = searchParams.get("id")

  const alluserData = async () => {
    setData(await fetchAllusers())
  }

  useEffect(() => {
    alluserData()
  }, [])

  useEffect(() => {
    console.log("currentDocumentId", currentDocumentId)
    data.map((user) => {
      if (user.memberId == currentDocumentId) {
        //console.log("user name",user.nameEn)
        setMemberId(currentDocumentId)
        setName(user.nameEn)
        setEmail(user.email)
        setDob(user.dob)
        setFname(user.fatherName)
        setMname(user.motherName)
        setPaddress(user.presentAddress)
        setDesignation(user.committee[0]?.designation)
        setMobilenumber(user.phoneEn)
      }
    })
  }, [currentDocumentId, data])

  return (
    <div>
      <div
        className="coverPage"
        style={{
          backgroundImage: `url(${coverPic})`,
          height: "26vh",
        }}
      ></div>
      <div className="aboutProfile ">
        <div className="flex flex-row justify-around">
          <div
            style={{ color: "#198754" }}
            className="memberId flex flex-col items-center "
          >
            <p>
              <b>Member Id</b>
            </p>
            <p style={{ marginTop: "-10px", color: "black" }}>{memberId}</p>
          </div>
          <div
            style={{ marginTop: "-75px", marginBottom: "15px" }}
            className="img flex flex-col justify-center items-center"
          >
            <CgProfile
              style={{ background: "white", borderRadius: "50%" }}
              size={140}
            />
            <h2 style={{ color: "#198754" }}>{name}</h2>
            <p>A Proud Member of Dhaka BAR Association</p>
            <h6 className="text-red-400 text-lg">
              {designation} of EC 2022-2023
            </h6>
            <h6 className="text-red-600 lg:text-lg">
              Member of Information and Technology
            </h6>
            <h6 className="text-red-600 text-lg">
              Member of Library Sub Committee
            </h6>
            <h6 className="text-red-600 text-lg">
              Member of Taut Ucched Committee
            </h6>
          </div>
          <div
            style={{ color: "#198754" }}
            className="flex flex-col items-center memberStatus"
          >
            <p>
              <b>MEMBER STATUS</b>
            </p>
            <p style={{ marginTop: "-10px", color: "black" }}>Active Member</p>
          </div>
        </div>
        <div className="contactIcon mb-6 flex flex-row items-center justify-between">
          <p className="flex">
            <BiPhoneCall
              style={{
                color: "white",
                background: "#198754",
                borderRadius: "50%",
                marginRight: "4px",
                padding: "4px",
              }}
              size={30}
            />
            {mobilenumber}
          </p>
          <p className="flex">
            <CiMail
              style={{
                color: "white",
                background: "#198754",
                borderRadius: "50%",
                marginRight: "5px",
                padding: "4px",
              }}
              size={30}
            />
            {email}
          </p>
          <p className="flex">
            <MdBloodtype
              style={{
                color: "red",
                background: "#198754",
                borderRadius: "50%",
                padding: "4px",
                marginRight: "5px",
              }}
              size={30}
            />
            A+
          </p>
          <p className="flex">
            {" "}
            <BsWhatsapp
              style={{
                color: "white",
                background: "#198754",
                borderRadius: "50%",
                padding: "4px",
                marginRight: "5px",
              }}
              size={30}
            />
            {mobilenumber}
          </p>
        </div>
      </div>
      <hr />
      <div className="bioInfo flex flex-col items-center justify-center">
        <p style={{ fontSize: "26px", color: "#198754" }}>Bio Info</p>
        <p style={{ color: "red", marginTop: "-10px" }}>
          বিজ্ঞ আইনজীবীদের প্রোফাইলের তথ্য হালনাগাদ চলছে। সাময়িক অসুবিধার জন্য
          দুঃখিত।
        </p>
      </div>
      <hr />
      <div className="information flex flex-col lg:flex-row">
        <div className="PersonalInformation">
          <p style={{ fontSize: "25px", color: "#198754" }}>
            Personal Information
          </p>
          <table>
            <tr>
              <td>
                <b>Father Name </b>
              </td>
              <td>:{fname} </td>
            </tr>
            <tr>
              <td>
                <b>Mother Name</b>
              </td>
              <td>:{mname}</td>
            </tr>
            <tr>
              <td>
                <b>Birth Date</b>
              </td>
              <td>:{dob}</td>
            </tr>
            <tr>
              <td>
                <b>Religion</b>
              </td>
              <td>:{religion}</td>
            </tr>
            <tr>
              <td>
                <b>Gender</b>
              </td>
              <td>:{gender}</td>
            </tr>
            <tr>
              <td>
                <b>Blood Group</b>
              </td>
              <td>:{bloodg}</td>
            </tr>
            <tr>
              <td>
                <b>Nid No</b>
              </td>
              <td>:{nid}</td>
            </tr>
            <tr>
              <td>
                <b>Mobile Number</b>
              </td>
              <td>: {mobilenumber}</td>
            </tr>
          </table>
          <p>
            <b>Present Address :</b>
          </p>
          <p>{setPaddress}</p>
          <br />

          <p>
            <b>Permanent Address :</b>
          </p>
          <p>{setPaddress}</p>
        </div>
        <hr />
        <div className="carearInformation">
          <p style={{ fontSize: "25px", color: "#198754" }}>DBA information</p>
          <table>
            <tr>
              <td>
                <b>Membership Date</b>
              </td>
              <td>: 25 Jan 1997 </td>
            </tr>
            <tr>
              <td>
                <b> Enrollment Date</b>
              </td>
              <td>:abb</td>
            </tr>
            <tr>
              <td>
                <b>Member Category</b>
              </td>
              <td>:abb</td>
            </tr>
            <tr>
              <td>
                <b>Nominee Name</b>
              </td>
              <td>:abb</td>
            </tr>
            <tr>
              <td>
                <b>Relation with Nominee</b>
              </td>
              <td>:abb</td>
            </tr>
            <tr>
              <td>
                <b>Nominee NID/Birth Certificate </b>
              </td>
              <td>:abb</td>
            </tr>
            <tr>
              <td>
                <b>Chamber Address 01</b>
              </td>
              <td>:abb</td>
            </tr>
          </table>
        </div>
      </div>
      <hr />
      <div
        style={{ color: "white" }}
        className="socialIcon  flex justify-center my-5 text-3xl"
      >
        <BsFacebook
          style={{
            color: "white",
            background: "#198754",
            borderRadius: "50%",
            padding: "4px",
            margin: "0 8px",
          }}
          size={30}
        />
        <BsTwitter
          style={{
            color: "white",
            background: "#198754",
            borderRadius: "50%",
            padding: "4px",
            margin: "0 8px",
          }}
          size={30}
        />
        <AiFillLinkedin
          style={{
            color: "white",
            background: "#198754",
            borderRadius: "50%",
            padding: "4px",
            margin: "0 8px",
          }}
          size={30}
        />
        <BsInstagram
          style={{
            color: "white",
            background: "#198754",
            borderRadius: "50%",
            padding: "4px",
            margin: "0 8px",
          }}
          size={30}
        />
        <AiFillPrinter
          style={{
            color: "white",
            background: "#198754",
            borderRadius: "50%",
            padding: "4px",
            margin: "0 8px",
          }}
          size={30}
        />
      </div>
    </div>
  )
}

export default UserData
