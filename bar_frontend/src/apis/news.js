import axios from '../config/axios'
import {
  commonErrorRes,
  getToken,
  removeObjectPrototype,
} from '../utils/helper'

export const fetchNewses = async () => {
  try {
    const url = '/news'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchNewses: ', data)
    return data?.news?.map((_item) => removeObjectPrototype(_item)) || []
  } catch (_error) {
    console.log('fetchNewses error: ', _error)
    return []
  }
}

export const fetchNewsById = async (newsId) => {
  try {
    const url = '/news/' + newsId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchNewsById: ', data)
    return removeObjectPrototype(data.news)
  } catch (_error) {
    console.log('fetchNewsById error: ', _error)
    return []
  }
}

export const insertNewNews = async (body) => {
  try {
    const url = '/news'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.post(url, body, config)
    console.log('insertNewNews: ', data)
    return removeObjectPrototype(data)
  } catch (error) {
    console.log('insertNewNews error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const updateNews = async (newsId, body) => {
  try {
    const url = '/news/' + newsId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.put(url, body, config)
    console.log('updateNews: ', data)
    return removeObjectPrototype(data)
  } catch (error) {
    console.log('updateNews error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const uploadNewsImage = async (file, newsId) => {
  try {
    const url = `/news/image-upload/${newsId}`
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

export const deleteNews = async (newsId) => {
  try {
    const url = `/news/${newsId}`
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.delete(url, config)
    console.log('news delete data: ', data)
    return data
  } catch (error) {
    console.log('news delete error: ', error)
    return error?.response?.data || commonErrorRes
  }
}
