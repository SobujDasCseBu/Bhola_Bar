import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/gallery-edit.css'
import { toast } from 'react-toastify'
import { getBaseAPIRootUrl, toastConfigColoured } from '../../utils/helper'
import Spinner from '../../components/Spinner'
import {
  deleteGallery,
  fetchGalleries,
  insertNewGallery,
  updateGallery,
  uploadGalleryImage,
} from '../../apis/gallery'

const GalleryEdit = () => {
  const user = JSON.parse(localStorage.getItem('profile')) || {}

  const [albumLoading, setAlbumLoading] = useState(true)
  const [albums, setAlbums] = useState([])
  const [addEditModal, setAddEditModal] = useState('')
  const [albumOptions, setAlbumOptions] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState({})
  const [selectedAlbumDetails, setSelectedAlbumDetails] = useState({})
  const [imageDeleteId, setImageDeleteId] = useState('')
  const [albumDeleteId, setAlbumDeleteId] = useState('')

  const [albumTitle, setAlbumTitle] = useState('')
  const [albumFiles, setAlbumFiles] = useState([])

  useEffect(() => {
    initFetch()
  }, [])

  useEffect(() => {
    setSelectedAlbumDetails(
      albums.find((_it) => _it._id === selectedAlbum.value) || {}
    )
  }, [selectedAlbum])

  const initFetch = async () => {
    const _allAlbums = await fetchGalleries()
    setAlbums(_allAlbums)
    setAlbumOptions(
      _allAlbums.map((_it) => ({
        label: _it.title,
        value: _it._id,
      }))
    )
    setAlbumLoading(false)
    // setSelectedAlbumDetails(_allAlbums?.[0] || {})
  }

  const handleAlbumAddEdit = async () => {
    if (!albumTitle) {
      toast.warn('Please enter Album Title!', toastConfigColoured)
      return
    }

    const body = {
      title: albumTitle,
      adminId: user._id,
    }

    console.log('selectedAlbumDetails: ', selectedAlbumDetails)

    if (addEditModal === 'add') {
      const _data = await insertNewGallery(body)
      console.log('data')
      toast.info(_data.message, toastConfigColoured)
      if (_data.success && albumFiles?.length) {
        await handleAlbumUpload(albumFiles, _data.gallery._id)
      }
    } else if (addEditModal === 'edit') {
      const _data = await updateGallery(selectedAlbum.value, body)
      toast.info(_data.message, toastConfigColoured)
      console.log('update data: ', _data)
      if (_data.success && albumFiles?.length) {
        await handleAlbumUpload(albumFiles, _data.gallery._id)
      }
    }

    resetAddEditModal()
    setSelectedAlbum({})
    initFetch()
  }

  const resetAddEditModal = () => {
    setAddEditModal('')
    setAlbumTitle('')
    setAlbumDeleteId('')
    setImageDeleteId('')
    setSelectedAlbum({})
    setAlbumFiles(null)
  }

  const handleAlbumUpload = async (_files, albumId) => {
    let uploadedCount = 0
    const willUploadCount = _files.length
    for (const _file of _files) {
      const _res = await uploadGalleryImage(_file, albumId)
      console.log('album image upload _res: ', _res)
      ++uploadedCount
    }
    console.log('uploaded count: ', uploadedCount)
    // toast.success(_res.message, toastConfigColoured)
  }

  const handleImageOrAlbumDelete = async () => {
    if (albumDeleteId) {
      const data = await deleteGallery(albumDeleteId)
      console.log('gallery delete data: ', data)
      if (data?.success) {
        toast.info(data.message)
        setAlbumDeleteId('')
        initFetch()
      } else {
        toast.warn(
          'Something went wrong! Please try again!',
          toastConfigColoured
        )
      }
    } else if (imageDeleteId) {
      const body = {
        images: selectedAlbumDetails?.images?.filter(
          (_it) => _it._id !== imageDeleteId
        ),
      }

      console.log('filtered images; ', body)

      // return
      const _data = await updateGallery(selectedAlbum.value, body)
      toast.info('Image Deleted Successfully!', toastConfigColoured)
    }

    resetAddEditModal()
    initFetch()
  }

  const getImgUrl = (_image) =>
    `${getBaseAPIRootUrl()}gallery/${selectedAlbumDetails._id}_${
      _image.index + _image.extension
    }`

  return (
    <div className="admin-container custom-container gallery-edit common-hover">
      <Modal
        open={addEditModal}
        title={`${addEditModal === 'add' ? 'Add' : 'Edit'} Album`}
        className="user-update-modal"
        onCancel={() => {
          setAddEditModal('')
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setAddEditModal('')
            }}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={() => handleAlbumAddEdit()}
          >
            Confirm
          </button>,
        ]}
      >
        <div className="form-container one-row user">
          <div className="form-item">
            <label>Gallery Album Title</label>
            <textarea
              rows={3}
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>Select Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setAlbumFiles(e.target.files)}
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={imageDeleteId || albumDeleteId}
        title={`Delete ${imageDeleteId ? 'Image' : 'Album'} confirmation`}
        className="gallery-update-modal"
        onCancel={() => {
          setImageDeleteId('')
          setAlbumDeleteId('')
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setImageDeleteId('')
              setAlbumDeleteId('')
            }}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={handleImageOrAlbumDelete}
          >
            Confirm
          </button>,
        ]}
      >
        <div className="form-container one-row gallery">
          <p>
            Are you sure to delete this {imageDeleteId ? 'image' : 'album'}?
          </p>
        </div>
      </Modal>

      <CardHeader title="Add/Edit Gallery Albums" classNm="bg-gallery" />
      <div className="add-new-gallery">
        <button
          className="btn-add-gallery bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
          onClick={() => setAddEditModal('add')}
        >
          Add New Album
        </button>
      </div>
      <div className="gallery-edit-container-body">
        <div className="gallery-edit-body">
          <div className="gallery-edit-select">
            <label>Select Album</label>
            <Select
              isLoading={albumLoading}
              options={albumOptions}
              value={selectedAlbum}
              onChange={(_s) => setSelectedAlbum(_s)}
            />
            <button
              className="btn-add-gallery bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
              onClick={() => {
                setAlbumTitle(selectedAlbumDetails.title)
                setAddEditModal('edit')
              }}
              disabled={!selectedAlbum.value}
            >
              Edit
            </button>
            <button
              className="btn-add-gallery bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
              onClick={() => setAlbumDeleteId(selectedAlbum.value)}
              disabled={!selectedAlbum.value}
            >
              Delete
            </button>
          </div>
          <div className="gallery-edit-images">
            {selectedAlbumDetails?.images?.map((_image) => (
              <div className="image-item" key={_image._id}>
                <img src={getImgUrl(_image)} alt="Gallery" />
                <span onClick={() => setImageDeleteId(_image._id)}>
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryEdit
