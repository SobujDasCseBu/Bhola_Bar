import React from 'react'

const NewsCard = ({pic, title, date}) => {
  return (
    
        <div className='flex flex-col w-[100%] h-auto lg:w-[32%] pb-[10px]  news-box-shadow-inset'>
        <img src={pic} alt = ' news_pic' className='h-[200px]' />
        <div className='p-[0_8px]'>
            <a className='text-[18px]  m-[9px_0px] text-[#000]'>{title} </a>
        </div>
        <div className='p-[0px_8px] flex flex-row justify-start text-[14px] leading-[24px] m-b'>
            <div className=' '><i className="far fa-clock text-xs	 "></i></div>
            <p className='pl-[5px] pt-[0px] mt-[0px]   '>{date} </p>
        </div>
        </div>
  )
}

export default NewsCard