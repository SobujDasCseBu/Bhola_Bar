import React from 'react'
import CardHeader from '../CardHeader'
import eventImage from '../../assets/images/law_event.jpg'

const Event = () => {
  return (
    <div className='common-hover shadow-[0px_0px_5px_rgb(162,123,108)] card-box-shadow-inset mb-[30px] rounded-[3px]'>
      <div className='common-hover'>
        <CardHeader classNm={'text-18'} title={'Event'} />
      </div>
      <div className='flax flax-col text-black border-box m-1'>
        <div className=' p-1'>
          <img className='rounded' src={eventImage} alt='Events Image' />
        </div>
        <div>
          <p className='text-[#F42A41] p-1 text-[18px] pb-0 m-0'>Time Left 30 day 20 hours</p>
        </div>
        <div>
          <p className='p-1 text-[#222] text-[18px] '>International Law on Access and Benefit-Sharing and</p>
        </div>
        <div className='sm:pb-[5px] '>
          <div className='text-[11px] sm:text-[12px]  text-[#F42A41] p-1 '><i className="pr-1 fas fa-calendar-alt"></i>{'13-01-2023'}</div>
        </div>

      </div>
    </div>
  )
}

export default Event