const ImageGallery = require('../models/ImageGallery')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

exports.create = async (req, res) => {
  const _countItem = await ImageGallery.findOne().sort({
    readableId: -1,
  })

  console.log('imageGallery create body: ', req.body)

  req.body.createdAt = new Date()
  req.body.updatedAt = new Date()
  const newImageGallery = new ImageGallery({
    ...req.body,
    readableId: _countItem ? _countItem.readableId + 1 : 1,
  })
  try {
    await newImageGallery.save()
    res.status(201).json({
      success: true,
      message: 'ImageGallery created successfully!',
      gallery: newImageGallery,
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
    const _imageGallerys = await ImageGallery.find({})
    res.status(200).json({
      success: true,
      gallery: _imageGallerys,
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
    const _imageGallery = await ImageGallery.findById(id)
    res.status(200).json({
      success: true,
      gallery: _imageGallery,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateById = async (req, res) => {
  const { id } = req.params

  try {
    const _albumPrev = await ImageGallery.findById(id)

    const _images = req.body?.images || []

    console.log('prev images: ', _albumPrev.images.length)
    console.log('new images: ', _images.length)

    for (const _prevImg of _albumPrev.images) {
      const _found = _images.find((_it) => _it.index === _prevImg.index)
      if (!_found) {
        const _path = `./uploads/gallery/${
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

    const _imageGallery = await ImageGallery.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      {
        new: true,
      }
    )
    // console.log('_gallery: ', _imageGallery)
    res.status(200).json({
      success: true,
      gallery: _imageGallery,
      message: 'ImageGallery updated successfully.',
    })
  } catch (error) {
    console.log('gallery update error: ', error)
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.deleteById = async (req, res) => {
  const { id } = req.params
  try {
    const _albumPrev = await ImageGallery.findById(id)

    console.log('prev images: ', _albumPrev.images.length)

    for (const _prevImg of _albumPrev.images) {
      const _path = `./uploads/gallery/${
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

    const _imageGallery = await ImageGallery.findOneAndDelete({
      _id: id,
    })
    res.status(200).json({
      message: 'ImageGallery Deleted Successfully!!',
      success: true,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}

exports.uploadImageGalleryImage = async (req, res) => {
  const { id } = req.params

  console.log('imageGallery id: ', id)
  try {
    const _imageGallery = await ImageGallery.findOne({
      _id: id,
    })
    let extension = ''

    const _index = _imageGallery.images.length.toString()

    console.log('image index: ', _index)

    const _uploadDir = './uploads/gallery'

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
          message: 'Error Uploading ImageGallery Image.',
        })
        return
      }

      const _newImageGallery = await ImageGallery.findOneAndUpdate(
        {
          _id: id,
        },
        {
          images: [
            ..._imageGallery.images,
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
        message: 'ImageGallery Image Uploaded Successfully!!',
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
