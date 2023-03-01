import React from "react";
import CardHeader from "./CardHeader";
import banghabandhu from '../assets/images/banghabandhu.jpg';
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const SidebarCard = () => {
  const navigator=useNavigate()
  const handleClick=(e)=>{
    e.preventDefault()
    // navigator("https://mujib100.gov.bd/pages/mujib/photo-archive.html")
    window.open('https://mujib100.gov.bd/pages/mujib/photo-archive.html', '_blank', 'noreferrer');
  }
  return (
    <div onClick={handleClick} style={{cursor:"pointer"}} className="sidebar_card sidebar_check common-hover">
    
      <CardHeader title="Banghabondhu Corner" classNm="text-18"/>
        <img
          className=" sidebar_img w-full h-auto lg:h-full" style={{}}
          src={banghabandhu}
          alt=""
      />
        
      <h2 className="hd text-zinc-50  bg-neutral-500 opacity-50 text-lg " style={{}}>
      Sheikh Hasina & Sheikh Mujib
        </h2>
    </div>
  );
};

export default SidebarCard;
