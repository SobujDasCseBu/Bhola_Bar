import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { fetchUsersByCondition, updateUserData } from '../../apis/user'
import DeleteIcon from '../../assets/icons/DeleteIcon'
import CardHeader from '../../components/CardHeader'

import '../../assets/styles/admin-edit.css'
import { toast } from 'react-toastify'
import { toastConfigColoured } from '../../utils/helper'
import Spinner from '../../components/Spinner'

const AdminEdit = () => {
  const [adminLoading, setAdminLoading] = useState(true)
  const [currentAdmins, setCurrentAdmins] = useState([])
  const [addDeleteModal, setAddDeleteModal] = useState('')
  const [addAdminOptions, setAddAdminOptions] = useState([])
  const [selectedMember, setSelectedMember] = useState({})
  const [deleteId, setDeleteId] = useState('')

  useEffect(() => {
    initFetch()
  }, [])

  const initFetch = async () => {
    const _allUsers = await fetchUsersByCondition({})
    setCurrentAdmins(_allUsers.filter((_it) => _it.isAdmin))
    setAddAdminOptions(
      _allUsers
        .filter((_it) => !_it.isAdmin)
        .map((_it) => ({
          label: _it.nameEn + ' - ' + _it.phoneEn,
          value: _it._id,
        }))
    )
    setAdminLoading(false)
  }

  const handleAdminUpdate = async () => {
    const body = {
      isAdmin: addDeleteModal === 'add' ? true : false,
    }
    const _userId = addDeleteModal === 'add' ? selectedMember.value : deleteId
    const _res = await updateUserData(_userId, body)
    if (_res.success) {
      toast.info('User Updated Successfully!', toastConfigColoured)
      initFetch()
      setAddDeleteModal('')
      setSelectedMember({})
      setDeleteId('')
    } else {
      toast.warn('Something wrong, please try again!', toastConfigColoured)
    }
  }

  return (
    <div className="admin-container custom-container admin-edit common-hover">
      <Modal
        open={addDeleteModal}
        title={`${
          addDeleteModal === 'add' ? 'Add' : 'Delete'
        } Admin confirmation`}
        className="user-update-modal"
        onCancel={() => {
          setAddDeleteModal('')
        }}
        footer={[
          <button
            key="back"
            className="custom-button custom-button-sm"
            onClick={() => {
              setAddDeleteModal('')
            }}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="custom-button custom-button-sm"
            onClick={() => handleAdminUpdate()}
          >
            Confirm
          </button>,
        ]}
      >
        <div className="form-container one-row user">
          <p>
            Are you sure to{' '}
            {addDeleteModal === 'add'
              ? 'add the user as Admin'
              : 'delete the admin'}
            ?
          </p>
        </div>
      </Modal>
      <CardHeader title="Add/Edit Admins" classNm="bg-admin" />
      <div className="add-new-admin">
        <div className="label">
          <label htmlFor="search">Select Member</label>
        </div>
        <div className="select">
          <Select
            options={addAdminOptions}
            value={selectedMember}
            onChange={(_selected) => setSelectedMember(_selected)}
          />
        </div>
        <div className="btn">
          <button
            className="btn-add-news bg-[#006A4E] hover:bg-[#C99D45] text-white font-normal py-2 px-4  "
            onClick={() => {
              if (selectedMember.value) {
                setAddDeleteModal('add')
              }
            }}
            disabled={!selectedMember.value}
          >
            Add New Admin
          </button>
        </div>
      </div>
      <div className="table-container">
        {adminLoading ? (
          <Spinner />
        ) : (
          <table className="w-[100%] table-design">
            <thead>
              <tr className="text-[14px] text-[#444] leading-[20px] w-full">
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Member Status</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody className="w-[100%]">
              {currentAdmins.map((_item, _in) => (
                <tr
                  className="text-[14px] text-[#444] leading-[18px] w-full "
                  key={_in}
                >
                  <td>{_in + 1}</td>
                  <td>{_item.nameEn}</td>
                  <td>{_item.phoneEn}</td>
                  <td>{_item.memberStatus?.join(', ') || ''}</td>
                  <td
                    className="delete-icon"
                    onClick={() => {
                      setDeleteId(_item._id)
                      setAddDeleteModal('delete')
                    }}
                  >
                    <DeleteIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminEdit
