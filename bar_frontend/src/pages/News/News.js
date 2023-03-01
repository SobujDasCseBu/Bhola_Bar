import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Modal, DatePicker } from 'antd'
import moment from 'moment'
import { InfinitySpin } from 'react-loader-spinner'

import CardHeader from '../../components/CardHeader'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import Notice from '../../components/Mainbody/Notice'
import EditIcon from '../../assets/icons/EditIcon'

import '../../assets/styles/news.css'
import {
  deleteNews,
  fetchNewses,
  insertNewNews,
  updateNews,
  uploadNewsImage,
} from '../../apis/news'
import {
  DDMMYYYY,
  getBaseAPIRootUrl,
  toastConfigColoured,
} from '../../utils/helper'
import NewsDetails from './NewsDetails'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import Spinner from '../../components/Spinner'

const News = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const _paramsId = searchParams.get('id')

  const user = JSON.parse(localStorage.getItem('profile')) || {}

  const [newses, setNewses] = useState([])
  const [newsEditModal, setNewsEditModal] = useState('')
  const [selectedNewsId, setSelectedNewsId] = useState('')
  const [newsFiles, setNewsFiles] = useState([])
  const [newsTitle, setNewsTitle] = useState('')
  const [newsDesc, setNewsDesc] = useState('')
  const [newsDate, setNewsDate] = useState('')
  const [selectedNews, setSelectedNews] = useState({})
  const [newsDeleteModal, setNewsDeleteModal] = useState(false)
  const [isLoadding, setIsLoadding] = useState(false)

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    setIsLoadding(true)
    const _newses = await fetchNewses()
    const _sortedNews = _newses
      .map((_it) => ({
        ..._it,
        sortingDate: moment(_it.readableDate, DDMMYYYY).format('YYYY-MM-DD'),
      }))
      .sort((_a, _b) =>
        _a.sortingDate > _b.sortingDate
          ? -1
          : _a.sortingDate < _b.sortingDate
          ? 1
          : 0
      )
    setNewses(_sortedNews)
    setIsLoadding(false)
  }

  useEffect(() => {
    console.log('newses: ', newses)
    if (_paramsId) {
      setSelectedNews(newses.find((_it) => _it._id === _paramsId) || {})
      if (searchParams.has('id')) {
        // searchParams.delete('id');
        // setSearchParams(searchParams);
      }
    }
  }, [newses, _paramsId])
  

  const handleNewsSubmit = async () => {
    if (!newsTitle) {
      toast.warn('Please enter News Title!', toastConfigColoured)
      return
    }
    if (!newsDate) {
      toast.warn('Please enter News Date!', toastConfigColoured)
      return
    }
    if (!newsDesc) {
      toast.warn('Please enter News Description!', toastConfigColoured)
      return
    }

    const body = {
      title: newsTitle,
      description: newsDesc,
      readableDate: newsDate,
      files: newsFiles,
      adminId: user._id,
    }

    console.log('selectedNewsId: ', selectedNewsId)

    if (newsEditModal === 'add') {
      const _data = await insertNewNews(body)
      console.log('data')
      toast.info(_data.message, toastConfigColoured)
      if (_data.success && newsFiles?.length) {
        await handleNewsUpload(newsFiles, _data.news._id)
      }
    } else if (newsEditModal === 'edit') {
      const _data = await updateNews(selectedNewsId, body)
      toast.info(_data.message, toastConfigColoured)
      console.log('update data: ', _data)
      if (_data.success && newsFiles?.length) {
        await handleNewsUpload(newsFiles, _data.news._id)
      }
    }

    resetNewsModal()
    initFetch()
  }

  const resetNewsModal = () => {
    setNewsEditModal('')
    setNewsTitle('')
    setNewsDesc('')
    setNewsDate('')
    setNewsFiles(null)
  }

  const handleNewsUpload = async (_files, newsId) => {
    let uploadedCount = 0
    const willUploadCount = _files.length
    for (const _file of _files) {
      const _res = await uploadNewsImage(_file, newsId)
      console.log('news image upload _res: ', _res)
      ++uploadedCount
    }
    console.log('uploaded count: ', uploadedCount)
    // toast.success(_res.message, toastConfigColoured)
  }

  const handleNewsDelete = async () => {
    const data = await deleteNews(selectedNewsId)
    console.log('news delete data: ', data)
    if (data?.success) {
      toast.info(data.message)
      setNewsDeleteModal(false)
      setSelectedNewsId('')
      initFetch()
    } else {
      toast.warn('Something went wrong! Please try again!', toastConfigColoured)
    }
  }

  return (
    <div className="news-container container-9-3 min-h-screen ml-[-60px] sm:ml-0 gap-8  ">
      {isLoadding ? (
        <Spinner width="200" color="#4fa94d" />
      ) : (
        <>
          <Modal
            open={newsEditModal}
            title={newsEditModal === 'add' ? 'Add News' : `Update News`}
            className="news-update-modal"
            onCancel={() => {
              resetNewsModal()
            }}
            footer={[
              <button
                key="back"
                className="custom-button custom-button-sm"
                onClick={() => {
                  resetNewsModal()
                }}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </button>,
              <button
                key="submit"
                type="primary"
                className="custom-button custom-button-sm"
                onClick={handleNewsSubmit}
              >
                Submit
              </button>,
            ]}
          >
            <div className="form-container one-row news">
              <div className="form-item">
                <label>News Title</label>
                <textarea
                  rows={3}
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label>News Description</label>
                <textarea
                  rows={5}
                  value={newsDesc}
                  onChange={(e) => setNewsDesc(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label>Select News Images</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.bmp,.gif"
                  multiple
                  onChange={(e) => {
                    setNewsFiles(e.target.files)
                  }}
                />
              </div>
              <div className="form-item">
                <label>Select Date</label>
                <DatePicker
                  format={DDMMYYYY}
                  key={Math.random().toString()}
                  defaultValue={null}
                  value={newsDate ? moment(newsDate, DDMMYYYY) : null}
                  onChange={(value, dateString) => {
                    console.log('dateString: ', dateString)
                    setNewsDate(dateString)
                  }}
                />
              </div>
            </div>
          </Modal>

          <Modal
            open={newsDeleteModal}
            title={`Delete News confirmation`}
            className="news-update-modal"
            onCancel={() => {
              setNewsDeleteModal(false)
            }}
            footer={[
              <button
                key="back"
                className="custom-button custom-button-sm"
                onClick={() => {
                  setNewsDeleteModal(false)
                }}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </button>,
              <button
                key="submit"
                type="primary"
                className="custom-button custom-button-sm"
                onClick={handleNewsDelete}
              >
                Confirm
              </button>,
            ]}
          >
            <div className="form-container one-row news">
              <p>Are you sure to delete this news?</p>
            </div>
          </Modal>

          <div className="common-hover  custom-column  	">
            <CardHeader title="News" />

            <div className={`table-container${user.isAdmin ? ' admin' : ''}`}>
              <div className="add-edit-news">
                {user.isAdmin && !selectedNews._id && (
                  <button
                    className="btn-add-news bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
                    onClick={() => {
                      setNewsTitle('')
                      setNewsDesc('')
                      setNewsDate('')
                      setNewsFiles(null)
                      setNewsEditModal('add')
                    }}
                  >
                    Add New News
                  </button>
                )}
              </div>

              {selectedNews._id ? (
                <NewsDetails news={selectedNews} setSelectedNews={setSelectedNews} />
              ) : (
                <div className="table-container">
                  <table className="w-[100%] table-design">
                    <thead>
                      <tr className="text-[14px] text-[#444] leading-[20px] w-full">
                        <th>#</th>
                        <th>News Title </th>
                        <th>Date</th>
                        <th>View</th>
                        {user.isAdmin && <th>Edit</th>}
                        {user.isAdmin && <th>Delete</th>}
                      </tr>
                    </thead>

                    <tbody className="w-[100%]">
                      {newses.map((_item, _in) => (
                        <tr
                          className="text-[14px] text-[#444] leading-[18px] w-full "
                          key={_in}
                        >
                          <td>{_in + 1}</td>
                          <td>{_item.title}</td>
                          <td>{_item.readableDate}</td>
                          <td>
                            <button
                                className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4"
                                onClick={() => {
                                  setSelectedNews(_item)
                                }}
                              >
                                View
                              </button>
                          </td>
                          {user.isAdmin && (
                            <td
                              className="news-edit-td"
                              onClick={() => {
                                setSelectedNewsId(_item._id)
                                setNewsTitle(_item.title)
                                setNewsDesc(_item.description)
                                setNewsDate(_item.readableDate)
                                setNewsFiles(null)
                                setNewsEditModal('edit')
                              }}
                            >
                              <EditIcon />
                            </td>
                          )}
                          {user.isAdmin && (
                            <td
                              className="news-edit-td"
                              onClick={() => {
                                setSelectedNewsId(_item._id)
                                setNewsDeleteModal(true)
                              }}
                            >
                              <DeleteIcon />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {user.isAdmin ? (
            ''
          ) : (
            <div className="custom-column  lg:mt-0 ">
              <div className="common-hover card-box-shadow-inset">
                <CardHeader title="Member Search" />
                <MemberSearch />
              </div>
              <VoterSearch />
              <Notice />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default News

/*
import React from 'react'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/about-us.css'

import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import NewsCard from './NewsCard'
import News from '../../components/Mainbody/News'
import NewsImage from '../../assets/images/newsImage.jpg'

const News = () => {
  return (
    <div className=' flex flex-col   lg:flex-row pt-[20px] lg:justify-center w-[100%]  gap-4'>
      <div className=" common-hover w-[90%] m-[0_5%] lg:m-0S lg:w-[60%]">
        <CardHeader title='About' />
        <div className='flex flex-col w-[100%] md:flex-row gap-[2%] font-serif	font-medium	'>
          <NewsCard pic = {NewsImage} title = 'HC questions legality of order asking to freeze former AL MP Awal’s bank account'
          date = '18 Aug 2022' />
          <NewsCard pic = {NewsImage} title = 'HC questions legality of order asking to freeze former AL MP Awal’s bank account'
          date = '18 Aug 2022' />
          <NewsCard pic = {NewsImage} title = 'HC questions legality of order i am a student and i am single asking to freeze former AL MP Awal’s bank account'
          date = '18 Aug 2022' />

        </div>
        
        
      
      </div>
      <div className=" flex flex-col gap-4 m-[0_5%] w-[90%] lg:m-0 lg:w-[20%]">
        <div className="common-hover card-box-shadow-inset">
          <CardHeader title='Member Search' />
          <MemberSearch />
        </div>
        <VoterSearch />
        <News />
      </div>
    </div>
  )
}

export default News*/
