import React from 'react'
import pic1 from '../../assets/images/secretary.jpg'
import pic from '../../assets/images/committee/gs.jpg'
import avatar from '../../assets/images/committee/new-default-profile.jpg'
import { getBaseAPIRootUrl } from "../../utils/helper"

import {
    Card,
    CardHeader,
    CardBody,
    Typography
  } from "@material-tailwind/react";

const SecratarySpeech = ({ committeeItem, designation }) => {
       
        return (
          <Card className="w-[100%]  flex items-center shadow-2xl border  divide-solid  border-gray-100 mb-[30px]">
            <CardHeader floated={false} className="h-40 w-40 shadow-[0_0px_0px_2px_rgba(25,43,54,0.2)] border rounded-full divide-solid border-gray-500 hover:shadow-[0_0px_0px_12px_rgba(0,0,0,0.1)] transition duration-600">
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
              <Typography variant="h5" color="blue-gray" className="text-[19px]">
              {committeeItem?.nameEn}
              </Typography>
              <Typography variant="h5" color="blue" className="font-medium text-[#F42A41] " textGradient>
                {designation}
              </Typography>

              
            <div className="flex justify-center mt-4">
                <button
                    type="submit"
                    className=" px-4 py-2 ml-4 text-xs font-bold hover:bg-[#d39b36] cursor-pointer transition duration-300 tracking-widest text-white  bg-[#F42A41] border border-transparent rounded-[18px] active:bg-[#006A4E] false"
                >
                    Read More
                </button>
            </div>
            </CardBody>
           
          </Card>
        );
      
}

export default SecratarySpeech