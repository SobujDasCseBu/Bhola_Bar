const Utils = require('../models/Utils')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

exports.create = async (req, res) => {
  req.body.createdAt = new Date()
  req.body.updatedAt = new Date()
  const newUtils = new Utils(req.body)
  try {
    await newUtils.save()
    res.status(201).json({
      success: true,
      message: 'Utils created successfully!',
      utils: newUtils,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.getUtils = async (req, res) => {
  try {
    const _utilss = await Utils.findOne({})
    res.status(200).json({
      success: true,
      utils: _utilss,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.uploadHomeSliderImage = async (req, res) => {
  
  try {
    const _utils = await Utils.findOne()
    let extension = ''

    const _index = _utils?.home?.sliderImages.length.toString() || '0'

    console.log('image index: ', _index)

    const _uploadDir = './uploads/home-slider'

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
        callback(null, _index + extension)
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
          message: 'Error Uploading Utils Image.',
        })
        return
      }
      const _utilsDoc = _utils._doc
      const updateBody = {
        ..._utilsDoc,
        home: {
          ..._utilsDoc.home,
          sliderImages: [
            ..._utilsDoc.home.sliderImages,
            {
              index: _index,
              extension,
            },
          ],
        }
      }
      const _newUtils = await Utils.findOneAndUpdate(
        {},
        updateBody
      )
      console.log('updateBody: ', updateBody)
      console.log('_newUtils: ', _newUtils)
      res.status(200).json({
        success: true,
        code: 200,
        message: 'Home Slider Image Uploaded Successfully!!',
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



exports.deleteSingleHomeSliderImage = async (req, res) => {
  const { id } = req.params

  try {
    const _prevUtil = await Utils.findOne()
    const _prevUtilDoc = _prevUtil._doc

    const _prevImages = _prevUtil?.home?.sliderImages || []
    const _newImages = _prevImages.filter((_it) => _it._id.toString() !== id)
    const _deletedImage = _prevImages.find((_it) => _it._id.toString() === id)

    console.log('prev images: ', _prevImages)
    console.log('new images: ', _newImages)

    const _path = `./uploads/home-slider/${
      _deletedImage.index + _deletedImage.extension
    }`
    console.log('_this image will be deleted: ', _path)

    fs.unlink(_path, (err) => {
      if (err) {
        console.log('File not removed', err)
      } else {
        console.log('File delete Success!')
      }
    })
    

    // return res.end(200)

    const _utils = await Utils.findOneAndUpdate(
      {
        _id: _prevUtilDoc._id,
      },
      {
        ..._prevUtilDoc,
        home: {
          ..._prevUtilDoc.home,
          sliderImages: _newImages
        }
      },
      {
        new: true,
      }
    )

    console.log('updated _utils: ', _utils)
    
    res.status(200).json({
      success: true,
      utils: _utils,
      message: 'Home Slider Image deleted successfully.',
    })
  } catch (error) {
    console.log('single image delete error: ', error)
    res.status(500).json({
      success: false,
      error,
    })
  }
}