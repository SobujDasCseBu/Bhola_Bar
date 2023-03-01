import React from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";

const MemberCard = ({ name, designation, pic }) => {

  return (
    <Card className="w-[195px] h-[260px]  flex items-center shadow-[0_1rem_2rem_rgb(0,0,0,18%)] mb-[30px] p-[5px] border  divide-solid  border-gray-100 rounded-[1rem]">
      <CardHeader floated={false} className="h-28 w-28 shadow-[0_0px_0px_2px_rgba(25,43,54,0.2)] border rounded-full divide-solid border-gray-500 hover:shadow-[0_0px_0px_12px_rgba(0,0,0,0.1)] transition duration-600">
        <img src={pic} alt="profile-picture" className=' p-[0px] object-center object-cover h-[200px] w-[200px] ' />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="blue-gray" className="text-[15px] mb-[2px] ">
          {name}
        </Typography>
        <Typography variant="h5" className="font-medium text-[#F42A41] text-[14px] " textgadient="true">
          {designation}
        </Typography>
      </CardBody>

    </Card>
  );

}

export default MemberCard