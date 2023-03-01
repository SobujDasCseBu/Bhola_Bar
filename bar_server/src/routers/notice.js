const express = require('express')
const multer = require('multer')
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  uploadPDFFile,
  uploadNoticeImage,
} = require('../controllers/notice')
const { admin, protect } = require('../middleware/auth')

const upload = multer()
const router = express.Router()

router.route('/pdf/:id').post(protect, admin, uploadPDFFile)
router.route('/image-upload/:id').post(protect, admin, uploadNoticeImage)

router
  .route('/:id')
  .get(getById)
  .put(protect, admin, updateById)
  .delete(protect, admin, deleteById)
router.route('/').post(protect, admin, create).get(getAll)

module.exports = router
