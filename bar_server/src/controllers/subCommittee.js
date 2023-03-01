const SubCommittee = require('../models/SubCommittee')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

exports.create = async (req, res) => {
  const _countItem = await SubCommittee.findOne().sort({
    readableId: -1,
  })

  console.log('subCommittee create body: ', req.body)

  req.body.createdAt = new Date()
  req.body.updatedAt = new Date()
  const newSubCommittee = new SubCommittee({
    ...req.body,
    readableId: _countItem ? _countItem.readableId + 1 : 1,
  })
  try {
    await newSubCommittee.save()
    res.status(201).json({
      success: true,
      message: 'SubCommittee created successfully!',
      subCommittee: newSubCommittee,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.getAll = async (req, res) => {
  try {
    const _subCommittees = await SubCommittee.find({})
    res.status(200).json({
      success: true,
      subCommittee: _subCommittees,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.getById = async (req, res) => {
  const { id } = req.params
  try {
    const _subCommittee = await SubCommittee.findById(id)
    res.status(200).json({
      success: true,
      subCommittee: _subCommittee,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateById = async (req, res) => {
  const { id } = req.params

  try {
    const _albumPrev = await SubCommittee.findById(id)

    const _images = req.body?.images || []

    console.log('prev images: ', _albumPrev.images.length)
    console.log('new images: ', _images.length)

    for (const _prevImg of _albumPrev.images) {
      const _found = _images.find((_it) => _it.index === _prevImg.index)
      if (!_found) {
        const _path = `./uploads/sub-committee/${
          id + '_' + _prevImg.index + _prevImg.extension
        }`
        console.log('_this image will be deleted: ', _path)
        fs.unlink(_path, (err) => {
          if (err) {
            console.log('File not removed', err)
          } else {
            console.log('File delete Success!')
          }
        })
      }
    }

    // return res.end(200)

    const _subCommittee = await SubCommittee.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      {
        new: true,
      }
    )
    // console.log('_subCommittee: ', _subCommittee)
    res.status(200).json({
      success: true,
      subCommittee: _subCommittee,
      message: 'SubCommittee updated successfully.',
    })
  } catch (error) {
    console.log('subCommittee update error: ', error)
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.deleteById = async (req, res) => {
  const { id } = req.params
  try {
    const _albumPrev = await SubCommittee.findById(id)

    console.log('prev images: ', _albumPrev.images.length)

    for (const _prevImg of _albumPrev.images) {
      const _path = `./uploads/sub-committee/${
        id + '_' + _prevImg.index + _prevImg.extension
      }`
      console.log('_this image will be deleted: ', _path)
      fs.unlink(_path, (err) => {
        if (err) {
          console.log('File not removed', err)
        } else {
          console.log('File delete Success!')
        }
      })
    }

    const _subCommittee = await SubCommittee.findOneAndDelete({
      _id: id,
    })
    res.status(200).json({
      message: 'SubCommittee Deleted Successfully!!',
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.uploadSubCommitteeImage = async (req, res) => {
  const { id } = req.params

  console.log('subCommittee id: ', id)
  try {
    const _subCommittee = await SubCommittee.findOne({
      _id: id,
    })
    let extension = ''

    const _index = _subCommittee.images.length.toString()

    console.log('image index: ', _index)

    const _uploadDir = './uploads/sub-committee'

    if (!fs.existsSync(_uploadDir)) {
      fs.mkdirSync(_uploadDir, {
        recursive: true,
      })
    }

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, _uploadDir)
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname)
        console.log('extension: ', extension)
        callback(null, id + '_' + _index + extension)
      },
    })

    const upload = multer({
      storage: storage,
    }).single('doc')

    upload(req, res, async function (err) {
      if (err) {
        console.log('uploading error: ', err)
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: 'Error Uploading SubCommittee Image.',
        })
        return
      }

      const _newSubCommittee = await SubCommittee.findOneAndUpdate(
        {
          _id: id,
        },
        {
          images: [
            ..._subCommittee.images,
            {
              index: _index,
              extension,
            },
          ],
        }
      )
      res.status(200).json({
        success: true,
        code: 200,
        message: 'SubCommittee Image Uploaded Successfully!!',
      })
    })
  } catch (error) {
    console.log('uploading catch error: ', error)
    res.status(500).json({
      success: false,
      code: 500,
      error,
    })
  }
}
