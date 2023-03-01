import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import CardHeader from '../../components/CardHeader'
import { toast } from 'react-toastify'

import '../../assets/styles/slider-edit.css'
import { getBaseAPIRootUrl, toastConfigColoured } from '../../utils/helper'
import {
  fetchUtils,
  uploadHomeSliderImage,
  deleteHomeSliderImage,
} from '../../apis/utils'

const HomeSliderEdit = () => {
  const user = JSON.parse(localStorage.getItem('profile')) || {}

  const [imagesLoading, setImagesLoading] = useState(true)
  const [images, setImages] = useState([])
  const [imageDeleteId, setImageDeleteId] = useState('')
  const [rawUtils, setRawUtils] = useState({})
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _rawUtils = await fetchUtils()
    const _images = _rawUtils?.home?.sliderImages || []
    setImages(_images)
    setImagesLoading(false)
  }

  const handleImageAdd = async () => {
    if (!imageFile) {
      toast.info('Please select an image first!', toastConfigColoured)
      return
    }
    const uploadRes = await uploadHomeSliderImage(imageFile)

    console.log('image upload res: ', uploadRes)
    if (uploadRes.success) {
      toast.success(uploadRes.message || 'Image Uploaded Successfully', toastConfigColoured)
    } else {
      toast.error(uploadRes.message || 'Something Wrong. Please try again!', toastConfigColoured)
    }

    initFetch()
  }

  const handleImageDelete = async () => {
    const deleteRes = await deleteHomeSliderImage(imageDeleteId)

    console.log('image deleteRes: ', deleteRes)
    if (deleteRes.success) {
      toast.success(deleteRes.message || 'Image Deleted Successfully', toastConfigColoured)
    } else {
      toast.error(deleteRes.message || 'Something Wrong. Please try again!', toastConfigColoured)
    }
    setImageDeleteId('')
    initFetch()
  }

  const getImgUrl = (_image) =>
    `${getBaseAPIRootUrl()}home-slider/${
      _image.index + _image.extension
    }`

  return (
    <div className="admin-container custom-container slider-edit common-hover">
      <Modal
        open={imageDeleteId}
        title={`Delete ${imageDeleteId ? 'Image' : 'Album'} confirmation`}
        className="slider-update-modal"
        onCancel={() => {
          setImageDeleteId('')
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setImageDeleteId('')
            }}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={handleImageDelete}
          >
            Confirm
          </button>,
        ]}
      >
        <div className="form-container one-row slider">
          <p>
            Are you sure to delete this {imageDeleteId ? 'image' : 'album'}?
          </p>
        </div>
      </Modal>

      <CardHeader title="Add/Delete Home Slider Images" classNm="bg-slider" />
      <div className="add-new-slider">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <button
          className="btn-add-slider bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
          onClick={handleImageAdd}
        >
          Add New Image
        </button>
      </div>
      <div className="slider-edit-container-body">
        <div className="slider-edit-body">
          <div className="slider-edit-images">
            {images?.map((_image) => (
              <div className="image-item" key={_image._id}>
                <img src={getImgUrl(_image)} alt="Home Slider" />
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

export default HomeSliderEdit
