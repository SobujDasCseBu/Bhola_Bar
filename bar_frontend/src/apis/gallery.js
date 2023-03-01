import axios from '../config/axios'
import {
  commonErrorRes,
  getToken,
  removeObjectPrototype,
} from '../utils/helper'

export const fetchGalleries = async () => {
  try {
    const url = '/gallery'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchGalleries: ', data)
    return data?.gallery?.map((_item) => removeObjectPrototype(_item)) || []
  } catch (_error) {
    console.log('fetchGalleries error: ', _error)
    return []
  }
}

export const fetchGalleryById = async (galleryId) => {
  try {
    const url = '/gallery/' + galleryId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchGalleryById: ', data)
    return removeObjectPrototype(data.gallery)
  } catch (_error) {
    console.log('fetchGalleryById error: ', _error)
    return []
  }
}

export const insertNewGallery = async (body) => {
  try {
    const url = '/gallery'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.post(url, body, config)
    console.log('insertNewGallery: ', data)
    return removeObjectPrototype(data)
  } catch (error) {
    console.log('insertNewGallery error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const updateGallery = async (galleryId, body) => {
  try {
    const url = '/gallery/' + galleryId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.put(url, body, config)
    console.log('updateGallery: ', data)
    return removeObjectPrototype(data)
  } catch (error) {
    console.log('updateGallery error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const uploadGalleryImage = async (file, galleryId) => {
  try {
    const url = `/gallery/image-upload/${galleryId}`
    const body = { doc: file }
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getToken(),
      },
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        console.log('uploaded: ', percentCompleted)
      },
    }
    const { data } = await axios.post(url, body, config)
    return data
  } catch (error) {
    console.log('upload error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const deleteGallery = async (galleryId) => {
  try {
    const url = `/gallery/${galleryId}`
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.delete(url, config)
    console.log('gallery delete data: ', data)
    return data
  } catch (error) {
    console.log('gallery delete error: ', error)
    return error?.response?.data || commonErrorRes
  }
}
