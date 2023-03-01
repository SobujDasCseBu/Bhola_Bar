import axios from '../config/axios'
import {
  commonErrorRes,
  getToken,
  removeObjectPrototype,
} from '../utils/helper'

export const fetchSubCommittees = async () => {
  try {
    const url = '/sub-committee'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchSubCommittees: ', data)
    return data?.subCommittee?.map((_item) => removeObjectPrototype(_item)) || []
  } catch (_error) {
    console.log('fetchSubCommittees error: ', _error)
    return []
  }
}

export const fetchSubCommitteeById = async (subCommitteeId) => {
  try {
    const url = '/sub-committee/' + subCommitteeId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.get(url, config)
    console.log('fetchSubCommitteeById: ', data)
    return removeObjectPrototype(data.subCommittee)
  } catch (_error) {
    console.log('fetchSubCommitteeById error: ', _error)
    return []
  }
}

export const insertNewSubCommittee = async (body) => {
  try {
    const url = '/sub-committee'
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.post(url, body, config)
    console.log('insertNewSubCommittee: ', data)
    return removeObjectPrototype(data)
  } catch (error) {
    console.log('insertNewSubCommittee error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const updateSubCommittee = async (subCommitteeId, body) => {
  try {
    const url = '/sub-committee/' + subCommitteeId
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.put(url, body, config)
    console.log('updateSubCommittee: ', data)
    return removeObjectPrototype(data)
  } catch (error) {
    console.log('updateSubCommittee error: ', error)
    return error?.response?.data || commonErrorRes
  }
}

export const uploadSubCommitteeImage = async (file, subCommitteeId) => {
  try {
    const url = `/sub-committee/image-upload/${subCommitteeId}`
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

export const deleteSubCommittee = async (subCommitteeId) => {
  try {
    const url = `/sub-committee/${subCommitteeId}`
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }
    const { data } = await axios.delete(url, config)
    console.log('subCommittee delete data: ', data)
    return data
  } catch (error) {
    console.log('subCommittee delete error: ', error)
    return error?.response?.data || commonErrorRes
  }
}
