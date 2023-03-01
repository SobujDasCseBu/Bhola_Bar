import React, { useEffect, useState } from 'react'
import CardHeader from '../../components/CardHeader'
import UnderConstruction from '../UnderConstruction'
import '../../assets/styles/sub-committee.css'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { fetchSubCommittees } from '../../apis/subCommittee'
import ImageCard from '../gallery/ImageCard'

const subCommitteeData = [
  {
    _id: 1,
    album: 'আইন সহায়তা উপ-পরিষদ',
    images: ['sub-committee/1.jpg'],
  },
  {
    _id: 2,
    album: 'আপদকালীন তহবিল উপ-পরিষদ',
    images: ['sub-committee/2.jpg'],
  },
  {
    _id: 3,
    album: 'করণিক ভিজিলেন্স উপ-পরিষদ',
    images: ['sub-committee/3.jpg'],
  },
  {
    _id: 4,
    album: 'ক্রীড়া উপ-পরিষদ',
    images: ['sub-committee/4.jpg'],
  },
  {
    _id: 5,
    album: 'গঠনতন্ত্র সংশোধন উপ-পরিষদ',
    images: ['sub-committee/5.jpg'],
  },
  {
    _id: 6,
    album: 'তথ্য ও প্রযুক্তি উপ-পরিষদ',
    images: ['sub-committee/6.jpg'],
  },
  {
    _id: 7,
    album: 'তহবিল উপ-পরিষদ',
    images: ['sub-committee/7.jpg'],
  },
  {
    _id: 8,
    album: 'দুর্যোগ ব্যাবস্থাপনা উপ-পরিষদ',
    images: ['sub-committee/8.1.jpg', 'sub-committee/8.2.jpg'],
  },
  {
    _id: 9,
    album: 'ধর্ম ও সংস্কৃতি বিষয়ক উপ-পরিষদ',
    images: ['sub-committee/9.jpg'],
  },
  {
    _id: 10,
    album: 'নির্মাণ উপ-পরিষদ',
    images: ['sub-committee/10.1.jpg', 'sub-committee/10.2.jpg'],
  },
  {
    _id: 11,
    album: 'পাঠাগার উপ-পরিষদ',
    images: ['sub-committee/11.jpg'],
  },
  {
    _id: 12,
    album: 'বার পেপার স্বাক্ষর উপ-পরিষদ',
    images: ['sub-committee/12.jpg'],
  },
  {
    _id: 13,
    album: 'বার্ষিক হিসাব নিরীক্ষা উপ-পরিষদ',
    images: ['sub-committee/13.jpg'],
  },
  {
    _id: 14,
    album: 'বৃত্তি প্রদান উপ-পরিষদ',
    images: ['sub-committee/14.jpg'],
  },
  {
    _id: 15,
    album: 'বেনাভোলেন্ট ফান্ড উপ-পরিষদ',
    images: ['sub-committee/15.jpg'],
  },
  {
    _id: 16,
    album: 'ভিজিলেন্স',
    images: ['sub-committee/16.jpg'],
  },
  {
    _id: 17,
    album: 'মনপুরা শাখা বার পরিচালনা উপ-পরিষদ',
    images: ['sub-committee/17.jpg'],
  },
  {
    _id: 18,
    album: 'মানবাধিকার ও পরিবেশ অধিকার বাস্তবায়ন উপ-পরিষদ',
    images: ['sub-committee/18.jpg'],
  },
]

const SubCommittee = () => {

  const [pageStatus, setPageStatus] = useState('construction')
  const [albumLoading, setAlbumLoading] = useState(true)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _albums = await fetchSubCommittees()
    setAlbums(_albums.filter((_it) => _it.images.length > 0))
    setAlbumLoading(false)
  }

  return (
    <>
      {pageStatus === 'construction' && false ? (
        <UnderConstruction />
      ) : (
        <div className="custom-container sub-committee-container gap-6 flex flex-col lg:flex-row">
          <div className="common-hover ml-[5%] w-[90%] lg:m-0  lg:w-[20%]">
            <div className="common-hover">
              <CardHeader title={'Our Committee'} />
            </div>
            <div className="card-box-shadow-inset  box-border p-[10px]">
              <Link to="/ec-2022-2023">
                <div className="bg-[#006A4E] w-[100%] pb-0 mb-[25px] mt-[5px] p-0  ">
                  <h2 className=" text-[20px] text-[#fff] p-[6px_2px] ml-[10px]   rounded-[5px] ">
                    {' '}
                    EC 2022-2023
                  </h2>
                </div>
              </Link>

              <Link to="/sub-committee">
                <div className="bg-[#F42A41] w-[100%] pb-0 mb-[25px] mt-[-10px] p-0  ">
                  <h2 className=" text-[20px] text-[#fff] p-[6px_2px] ml-[10px]   rounded-[5px] ">
                    Sub Committee
                  </h2>
                </div>
              </Link>

              <Link to="/ex-executive-committee">
                <div className="bg-[#F42A41] w-[100%] pb-0 mb-[25px] mt-[-10px] p-0  ">
                  <h2 className=" text-[20px] text-[#fff] p-[6px_2px] ml-[10px]   rounded-[5px] ">
                    {' '}
                    Ex Committee
                  </h2>
                </div>
              </Link>
            </div>
          </div>
          {albumLoading ? (
            <Spinner />
          ) : (
            <div className=" lg:w-[75%] common-hover">
              <CardHeader title="Sub Committee Gallery" />
              <div className="custom-card-body">
                {albums.map((_item) => (
                  <ImageCard album={_item} subFolder='sub-committee' />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SubCommittee
