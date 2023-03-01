import axios from '../config/axios'
import {
  commonErrorRes,
  getToken,
  removeObjectPrototype,
} from '../utils/helper'

export const fetchUtils = async () => {
  try {
    const url = '/utils'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchUtils: ', data)
    return removeObjectPrototype(data?.utils)
  } catch (_error) {
    console.log('fetchUtils error: ', _error)
    return []
  }
}

export const uploadHomeSliderImage = async (file) => {
  try {
    const url = `/utils/home/slider`
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

export const deleteHomeSliderImage = async (imageId) => {
  try {
    const url = `/utils/home/slider/${imageId}`
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.delete(url, config)
    console.log('utils delete data: ', data)
    return data
  } catch (error) {
    console.log('utils delete error: ', error)
    return error?.response?.data || commonErrorRes
  }
}
