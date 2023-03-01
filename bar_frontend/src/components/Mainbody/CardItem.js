import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { getBaseAPIRootUrl } from "../../utils/helper"
import avatar from "../../assets/images/committee/new-default-profile.jpg"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react"

const CardItem = ({ committeeItem, designation }) => {
  
  useEffect(() =>{
    //console.log('committeeItem from CardItem : ',committeeItem)
  })
  return (
    <Card className="w-[240px] h-[320px]  flex items-center shadow-[0_1rem_2rem_rgb(0,0,0,18%)] mb-[30px]  p-[5px_5px] border  divide-solid  border-gray-100 rounded-[1rem]">
      <CardHeader
        floated={false}
        className="h-40 w-40 shadow-[0_0px_0px_2px_rgba(25,43,54,0.2)] border rounded-full divide-solid border-gray-500 hover:shadow-[0_0px_0px_12px_rgba(0,0,0,0.1)] transition duration-600"
      >
        {/* <img src={} alt="profile-picture" className=' p-[0px] object-center object-cover h-[200px] w-[200px] ' /> */}
        {committeeItem?.profileExtension ? (
          <img
            src={`${getBaseAPIRootUrl()}profile-${committeeItem._id}${
              committeeItem.coverExtension
            }`}
            className=" w-40 h-40  "
            alt=""
          />
        ) : (
          <img src={avatar} className=" w-40 h-40 " alt="" />
        )}
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="blue-gray" className="text-[16px]">
          {committeeItem?.nameEn}
        </Typography>
        <Typography
          variant="h5"
          className="font-medium text-[18px] text-[#F42A41] "
          textGradient
        >
          {designation}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default CardItem
