import axios from '../config/axios'
import {
  getToken,
  removeObjectPrototype,
  commonErrorRes,
} from '../utils/helper'

export const fetchNotices = async () => {
  try {
    const url = '/notice'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchNotices: ', data)
    return data?.notices?.map((_item) => removeObjectPrototype(_item)) || []
  } catch (_error) {
    console.log('fetchNotices error: ', _error)
    return []
  }
}

export const insertNewNotice = async (body) => {
  try {
    const url = '/notice'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.post(url, body, config)
    console.log('insertNewNotice: ', data)
    return removeObjectPrototype(data)
  } catch (_error) {
    console.log('insertNewNotice error: ', _error)
    return _error?.response?.data || commonErrorRes
  }
}

export const updateNotice = async (noticeId, body) => {
  try {
    const url = '/notice/' + noticeId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    console.log('config: ', config)
    const { data } = await axios.put(url, body, config)
    console.log('updateNotice: ', data)
    return removeObjectPrototype(data)
  } catch (_error) {
    console.log('updateNotice error: ', _error)
    return _error?.response?.data || commonErrorRes
  }
}

export const uploadPDFFile = async (file, noticeId) => {
  try {
    const url = `/notice/pdf/${noticeId}`
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

export const deleteNotice = async (noticeId) => {
  try {
    const url = `/notice/${noticeId}`
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.delete(url, config)
    console.log('notice delete data: ', data)
    return data
  } catch (error) {
    console.log('notice delete error: ', error)
    return error?.response?.data || commonErrorRes
  }
}



export const uploadNoticeImage = async (file, noticeId) => {
  try {
    const url = `/notice/image-upload/${noticeId}`
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
