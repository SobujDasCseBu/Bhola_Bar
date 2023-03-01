import React, { useEffect, useState } from 'react'
import CardHeader from '../CardHeader'


import noticeImage from "../../assets/images/noticeImage.jpg";
import { fetchNotices } from '../../apis/notice';
import '../../assets/styles/notice-sidebar.css'
import { DDMMYYYY, getBaseAPIRootUrl } from '../../utils/helper';
import PDFIcon from '../../assets/icons/PDFIcon';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Notice = () => {
  const [notices, setNotices] = useState([])
  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _notices = await fetchNotices()
    const _sortedNotices = _notices
    .map((_it) => ({ ..._it, sortingDate: moment(_it.readableDate, DDMMYYYY).format('YYYY-MM-DD') }))
    .sort((_a, _b) => _a.sortingDate > _b.sortingDate ? -1 : _a.sortingDate < _b.sortingDate ? 1 : 0)
    setNotices(_sortedNotices)
  }


  
  return (
    <div className='notice-card sidebar-notice-card common-hover card-box-shadow-inset  box-border  mb-[30px] rounded-[3px]'>
      <div className='common-hover ' >
        <CardHeader classNm={'text-18'} title={'Notices'} />
      </div>
      <div className='h-[250px] overflow-y-auto'>
        {notices.map((_item) => (
          <Link
            key={_item._id}
            to={'/notices?id=' + _item._id}
          >
            <div
              className='p-1 pt-0 border-b border-dashed border-light-blue-900 flex flex-row md:box-border sidebar-notice-item'
              key={_item._id}
            >
              {/* <div className='pdf-icon w-[50px] h-[20px] text-[11px] lg:h-[5%] box-border md:h-[20px] md:box-border	'>
                <PDFIcon />
              </div> */}
              <div className='pl-2 flex flex-col box-border h-[15%] '>
                <div className=' text-[11px] lg:text-[10px] text-black w-full sm:text-[13px] '>
                  <p>{_item.title}</p>
                </div>

                <div className=' text-[11px] lg:text-[11px] sm:text-[12px] text-[#F42A41] p-1 '>
                  <i className="pr-1 fas fa-calendar-alt"></i>
                  {_item.readableDate}
                </div>

              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default Notice