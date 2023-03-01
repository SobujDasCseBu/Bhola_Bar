import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillImageFill, BsBook, BsChatLeftText } from 'react-icons/bs'
import {
  MdOutlineNotes,
  MdEditNote,
  MdPermContactCalendar,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md'
import { GrGallery } from 'react-icons/gr'
import { IoMdContacts } from 'react-icons/io'
import { GiVote } from 'react-icons/gi'
import { RiContactsLine } from 'react-icons/ri'
import { FaLink } from 'react-icons/fa'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('profile')) || {}

  return (
    <div className="dashboard-container min-h-full">
      <CardHeader title='Admin Dashboard' />
      <div className="dashboard-container-body">
        <div onClick={() => navigate('/admin/home-slider')} className="dashboard-item h-[120px] w-[120px] flex flex-col bg-[#DEDEDE] border-solid border-[1px] border-gray-400 rounded-[12px]">
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <BsFillImageFill size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">
              Edit Home Images
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate('/dashboard/committee')}
          className="dashboard-item h-[120px] w-[120px] bg-[#E6B1B1] border-solid border-[1px] border-gray-400 rounded-[5px]"
        >
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <IoMdContacts size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">
              Validate Committee
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate('/admin/sub-committee')}
          className="dashboard-item h-[120px] w-[120px] bg-[#E6B1B1] border-solid border-[1px] border-gray-400 rounded-[5px]"
        >
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <IoMdContacts size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">
              Validate Sub Committee
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate('/admin/members')}
          className="dashboard-item h-[120px] w-[120px] bg-[#FFD66C] border-solid border-[1px] border-gray-400 rounded-[5px]"
        >
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <MdPermContactCalendar size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">
              Validate Members
            </p>
          </div>
        </div>
        <div className="dashboard-item h-[120px] w-[120px] bg-[#6CCAFF] border-solid border-[1px] border-gray-400 rounded-[5px]">
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <BsBook size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">
              Validate Library
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate('/admin/edit-gallery')}
          className="dashboard-item h-[120px] w-[120px] bg-[#6CFFA7] border-solid border-[1px] border-gray-400 rounded-[5px]"
        >
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <GrGallery size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">Edit Gallery</p>
          </div>
        </div>
        <div
          onClick={() => navigate('/notices')}
          className="dashboard-item h-[120px] w-[120px] bg-[#FFAA6C] border-solid border-[1px] border-gray-400 rounded-[5px]"
        >
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <MdEditNote size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">Edit Notice</p>
          </div>
        </div>

        <div
          onClick={() => navigate('/news')}
          className="dashboard-item h-[120px] flex flex-col w-[120px] bg-[#D06CFFCF] border-solid border-[1px] border-gray-400 rounded-[5px]"
        >
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <BsChatLeftText size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">Edit News</p>
          </div>
        </div>
        <div className="dashboard-item h-[120px] w-[120px] bg-[#FF6C98] border-solid border-[1px] border-gray-400 rounded-[5px]">
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <GiVote size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">Edit Election</p>
          </div>
        </div>
        <div className="dashboard-item h-[120px] w-[120px] bg-[#6C84FF] border-solid border-[1px] border-gray-400 rounded-[5px]">
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <MdOutlineNotes size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold p-[2px] ">
              Edit About Us
            </p>
          </div>
        </div>
        <div className="dashboard-item h-[120px] w-[120px] bg-[#FF6C6C] border-solid border-[1px] border-gray-400 rounded-[5px]">
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <RiContactsLine size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold ">Edit Contact</p>
          </div>
        </div>
        <div className="dashboard-item h-[120px] w-[120px] bg-[#FFFFFF] border-solid border-[1px] border-gray-400 rounded-[5px]">
          <div className="flex flex-col ">
            <div className="pl-[28px] pt-[20px]">
              <FaLink size="60px" color="black" />
            </div>
            <p className="text-[12px] text-center font-bold p-[2px] ">
              Edit Important Links
            </p>
          </div>
        </div>
        {user && user.isSuperAdmin && (
          <div
            onClick={() => navigate('/admin/validate-admin')}
            className="dashboard-item h-[120px] w-[120px] bg-[#FFF06C] border-solid border-[1px] border-gray-400 rounded-[5px]"
          >
            <div className="flex flex-col ">
              <div className="pl-[28px] pt-[20px]">
                <MdOutlineAdminPanelSettings size="60px" color="black" />
              </div>
              <p className="text-[12px] text-center font-bold ">
                Validate Admin Options
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
