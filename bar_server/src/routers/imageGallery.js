const express = require('express')
const multer = require('multer')
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  uploadImageGalleryImage,
} = require('../controllers/imageGallery')
const { protect, admin } = require('../middleware/auth')

const router = express.Router()

router.route('/image-upload/:id').post(protect, admin, uploadImageGalleryImage)
router
  .route('/:id')
  .get(getById)
  .put(protect, admin, updateById)
  .delete(protect, admin, deleteById)
router.route('/').post(protect, admin, create).get(getAll)

module.exports = router
