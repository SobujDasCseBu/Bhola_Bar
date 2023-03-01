const Committee = require('../models/Committee')
const multer = require('multer')
const path = require('path')
const {
  committeeLookupJSON,
  getFormattedCommittees,
  getFormattedAppCommittees,
} = require('./helper.js')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

exports.create = async (req, res) => {
  const _countItem = await Committee.findOne().sort({ readableId: -1 })
  const activeCommitee = await Committee.findOne({ isActive: true })
  if (activeCommitee) {
    await Committee.updateMany({ isActive: false })
  }

  req.body.createdAt = new Date()
  req.body.updatedAt = new Date()
  const newCommittee = new Committee({
    ...req.body,
    readableId: _countItem ? _countItem.readableId + 1 : 1,
  })
  try {
    await newCommittee.save()
    res.status(201).json({
      success: true,
      message: 'Committee created successfully!',
      committee: newCommittee,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error })
  }
}

exports.getAll = async (req, res) => {
  try {
    const _committees = await Committee.aggregate([
      {
        $match: {},
      },
      ...committeeLookupJSON,
    ])
    const fCommittees = getFormattedCommittees(_committees)
    res.status(200).json({ success: true, committees: fCommittees })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

exports.getById = async (req, res) => {
  const { id } = req.params
  console.log('committee id: ', id)
  try {
    const _committee = await Committee.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      ...committeeLookupJSON,
    ])
    console.log('_committee.length: ', _committee.length)
    const fCommittees = getFormattedCommittees(_committee)
    res.status(200).json({ success: true, committee: fCommittees?.[0] || {} })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

exports.getActiveForWeb = async (req, res) => {
  try {
    const _committee = await Committee.aggregate([
      {
        $match: { isActive: true },
      },
      ...committeeLookupJSON,
    ])
    // const fCommittees = getFormattedCommittees(_committee)
    res.status(200).json({ success: true, committees: _committee })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

exports.getActiveForApp = async (req, res) => {
  try {
    const _committee = await Committee.aggregate([
      {
        $match: { isActive: true },
      },
      ...committeeLookupJSON,
    ])
    const f1Committees = getFormattedCommittees(_committee)
    const f2Committees = getFormattedAppCommittees(f1Committees)
    res.status(200).json({ success: true, committees: f2Committees })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

exports.updateById = async (req, res) => {
  const { id } = req.params

  try {
    const activeCommitee = await Committee.findOne({ isActive: true })
    if (activeCommitee) {
      await Committee.updateMany({ isActive: false })
    }
    req.body.updatedAt = new Date()
    const _committee = await Committee.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    // console.log('_committee: ', _committee)
    res.status(200).json({
      success: true,
      committee: _committee,
      message: 'Committee updated successfully.',
    })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

exports.deleteById = async (req, res) => {
  const { id } = req.params
  try {
    const _committee = await Committee.findOneAndDelete({ _id: id })
    res
      .status(200)
      .json({ success: true, message: 'Committee Deleted Successfully!!' })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
