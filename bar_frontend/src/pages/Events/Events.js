
import React, { useState } from 'react'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/about-us.css'

import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import Notice from '../../components/Mainbody/Notice'
import Card from './Card'
import UnderConstruction from '../UnderConstruction'

const Events = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  return (
    <>
      {pageStatus === 'construction' ? (
        <UnderConstruction />
      ) : (
        <div className=' mt-[20px] box-border w-[100%] gap-[4%] flex flex-col lg:flex-row justify-center mb-[20px] '>


          <div className="  common-hover ml-[5%] lg:ml-0  w-[90%]   lg:m-0 box-border lg:w-[59%] ">
            <CardHeader title='Notice' />

            {/* <Card /> */}

            <div className='flex flex  mb-[5%] lg:mb-0   font-serif	font-medium w-[100%] m-0 p-0	'>
              <table className="table-auto table-design ">
                <thead>
                  <tr className='text-[14px] text-[#444] leading-[20px]'>
                    <th className="px-4 py-2 ">#</th>
                    <th className="px-4 py-2">Event Title	</th>
                    <th className="px-4 py-2">Event Date</th>
                    <th className="px-4 py-2">Registration last Date</th>
                    <th className="px-4 py-2">View</th>
                  </tr>
                </thead>
                <Card />
              </table>


            </div>

          </div>
          <div className="box-border w-[90%] ml-[5%] lg:mb-0 flex flex-col gap-[20px] lg:w-[22%] ">
            <div className="common-hover card-box-shadow-inset">
              <CardHeader title='Member Search' />
              <MemberSearch />
            </div>
            <VoterSearch />
            <Notice />
          </div>
        </div>
      )}
    </>
  )
}

export default Events