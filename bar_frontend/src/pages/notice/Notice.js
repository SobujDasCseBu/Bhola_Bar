import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Modal, DatePicker } from 'antd'
import moment from 'moment'
import { InfinitySpin } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import CardHeader from '../../components/CardHeader'
import MemberSearch from '../../components/Mainbody/MemberSearch'
import VoterSearch from '../../components/Mainbody/VoterSearch'
import Notice from '../../components/Mainbody/Notice'
import EditIcon from '../../assets/icons/EditIcon'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import '../../assets/styles/notice.css'
import {
  fetchNotices,
  insertNewNotice,
  updateNotice,
  uploadPDFFile,
  deleteNotice,
  uploadNoticeImage,
} from '../../apis/notice'
import {
  DDMMYYYY,
  getBaseAPIRootUrl,
  toastConfigColoured,
} from '../../utils/helper'
import NoticeDetails from './NoticeDetails'
import Spinner from '../../components/Spinner'

const NoticePage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const _paramsId = searchParams.get('id')

  const user = JSON.parse(localStorage.getItem('profile')) || {}

  const [notices, setNotices] = useState([])
  const [noticeEditModal, setNoticeEditModal] = useState('')
  const [noticeDeleteModal, setNoticeDeleteModal] = useState(false)
  const [selectedNoticeId, setSelectedNoticeId] = useState('')
  const [noticeFiles, setNoticeFiles] = useState([])
  const [noticeTitle, setNoticeTitle] = useState('')
  const [noticeDescription, setNoticeDescription] = useState('')
  const [noticeDate, setNoticeDate] = useState('')
  const [selectedNotice, setSelectedNotice] = useState({})
  const [isLoadding, setIsLoadding] = useState(false)
  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    setIsLoadding(true)
    const _notices = await fetchNotices()
    const _sortedNotices = _notices
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
    setNotices(_sortedNotices)
    setIsLoadding(false)
  }

  useEffect(() => {
    console.log('notices: ', notices)
    if (_paramsId) {
      setSelectedNotice(notices.find((_it) => _it._id === _paramsId) || {})
      if (searchParams.has('id')) {
        // searchParams.delete('id');
        // setSearchParams(searchParams);
      }
    }
  }, [notices, _paramsId])

  const handleNoticeSubmit = async () => {
    if (!noticeTitle) {
      toast.warn('Please enter Notice Title!', toastConfigColoured)
      return
    }
    if (!noticeDate) {
      toast.warn('Please enter Notice Date!', toastConfigColoured)
      return
    }

    const body = {
      title: noticeTitle,
      description: noticeDescription,
      readableDate: noticeDate,
      adminId: user._id,
    }

    console.log('selectedNoticeId: ', selectedNoticeId)

    if (noticeEditModal === 'add') {
      const _data = await insertNewNotice(body)
      console.log('data')
      toast.info(_data.message, toastConfigColoured)
      if (_data.success && noticeFiles?.length) {
        await handleNoticeUpload(noticeFiles, _data.notice._id)
      }
    } else if (noticeEditModal === 'edit') {
      const _data = await updateNotice(selectedNoticeId, body)
      toast.info(_data.message, toastConfigColoured)
      console.log('update data: ', _data)
      if (_data.success && noticeFiles.length) {
        await handleNoticeUpload(noticeFiles, _data.notice._id)
      }
    }

    resetNoticeModal()
    initFetch()
  }

  const handleNoticeDelete = async () => {
    const data = await deleteNotice(selectedNoticeId)
    console.log('notice delete data: ', data)
    if (data?.success) {
      toast.info(data.message, toastConfigColoured)
      setNoticeDeleteModal(false)
      setSelectedNoticeId('')
      initFetch()
    } else {
      toast.warn('Something went wrong! Please try again!', toastConfigColoured)
    }
  }

  const resetNoticeModal = () => {
    setNoticeEditModal('')
    setNoticeTitle('')
    setNoticeDescription('')
    setNoticeDate('')
    setNoticeFiles(null)
  }

  // const handleNoticeUpload = async (_file, noticeId) => {
  //   const _res = await uploadPDFFile(_file, noticeId)
  //   console.log('upload _res: ', _res)
  //   toast.success(_res.message, toastConfigColoured)
  // }

  const handleNoticeUpload = async (_files, noticeId) => {
    let uploadedCount = 0
    const willUploadCount = _files.length
    for (const _file of _files) {
      const _res = await uploadNoticeImage(_file, noticeId)
      console.log('notice image upload _res: ', _res)
      ++uploadedCount
    }
    console.log('uploaded count: ', uploadedCount)
    // toast.success(_res.message, toastConfigColoured)
  }

  return (
    <div className="notice-container container-9-3 min-h-screen	ml-[-60px] lg:ml-0 gap-4 ">
      {isLoadding ? (
        <Spinner />
      ) : (
        <>
          <Modal
            open={noticeEditModal}
            title={noticeEditModal === 'add' ? 'Add Notice' : `Update Notice`}
            className="notice-update-modal"
            onCancel={() => {
              resetNoticeModal()
            }}
            footer={[
              <button
                key="back"
                className="custom-button custom-button-sm"
                onClick={() => {
                  resetNoticeModal()
                }}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </button>,
              <button
                key="submit"
                type="primary"
                className="custom-button custom-button-sm"
                onClick={handleNoticeSubmit}
              >
                Submit
              </button>,
            ]}
          >
            <div className="form-container one-row notice">
              <div className="form-item">
                <label>Notice Title</label>
                <textarea
                  rows={3}
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label>Notice Description</label>
                <textarea
                  rows={5}
                  value={noticeDescription}
                  onChange={(e) => setNoticeDescription(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label>Select Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setNoticeFiles(e.target.files)
                    }
                  }}
                />
              </div>
              <div className="form-item">
                <label>Select Date</label>
                <DatePicker
                  format={DDMMYYYY}
                  key={Math.random().toString()}
                  defaultValue={null}
                  value={noticeDate ? moment(noticeDate, DDMMYYYY) : null}
                  onChange={(value, dateString) => {
                    console.log('dateString: ', dateString)
                    setNoticeDate(dateString)
                  }}
                />
              </div>
            </div>
          </Modal>
          <Modal
            open={noticeDeleteModal}
            title={`Delete Notice confirmation`}
            className="notice-update-modal"
            onCancel={() => {
              setNoticeDeleteModal(false)
            }}
            footer={[
              <button
                key="back"
                className="custom-button custom-button-sm"
                onClick={() => {
                  setNoticeDeleteModal(false)
                }}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </button>,
              <button
                key="submit"
                type="primary"
                className="custom-button custom-button-sm"
                onClick={handleNoticeDelete}
              >
                Confirm
              </button>,
            ]}
          >
            <div className="form-container one-row notice">
              <p>Are you sure to delete this notice?</p>
            </div>
          </Modal>

          <div className="common-hover custom-card custom-column ">
            <CardHeader title="Notices" />
            {selectedNotice._id ? (
              <NoticeDetails
                notice={selectedNotice}
                setSelectedNotice={setSelectedNotice}
              />
            ) : (
              <div className={`table-container${user.isAdmin ? ' admin' : ''}`}>
                {user.isAdmin && (
                  <div className="add-new-notice">
                    <button
                      className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
                      onClick={() => {
                        setNoticeTitle('')
                        setNoticeDescription('')
                        setNoticeDate('')
                        setNoticeFiles([])
                        setNoticeEditModal('add')
                      }}
                    >
                      Add New Notice
                    </button>
                  </div>
                )}

                <table className="w-[100%] table-design">
                  <thead>
                    <tr className="text-[14px] text-[#444] leading-[20px] w-full">
                      <th>#</th>
                      <th>Notice Title </th>
                      <th>Date</th>
                      <th>View</th>
                      {user.isAdmin && <th>Edit</th>}
                      {user.isAdmin && <th>Delete</th>}
                    </tr>
                  </thead>

                  <tbody className="w-[100%]">
                    {notices.map((_item, _in) => (
                      <tr
                        className="text-[14px] text-[#444] leading-[18px] w-full "
                        key={_in}
                      >
                        <td>{_in + 1}</td>
                        <td>{_item.title}</td>
                        <td>{_item.readableDate}</td>
                        <td>
                          <button
                            className="bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
                            onClick={() => setSelectedNotice(_item)}
                          >
                            View
                          </button>
                        </td>
                        {user.isAdmin && (
                          <td
                            className="notice-edit-td"
                            onClick={() => {
                              setSelectedNoticeId(_item._id)
                              setNoticeTitle(_item.title)
                              setNoticeDescription(_item.description)
                              setNoticeDate(_item.readableDate)
                              setNoticeFiles([])
                              setNoticeEditModal('edit')
                            }}
                          >
                            <EditIcon />
                          </td>
                        )}
                        {user.isAdmin && (
                          <td
                            className="notice-edit-td"
                            onClick={() => {
                              setSelectedNoticeId(_item._id)
                              setNoticeDeleteModal(true)
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
          {user.isAdmin ? (
            ''
          ) : (
            <div className="custom-column custom-card">
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

export default NoticePage
