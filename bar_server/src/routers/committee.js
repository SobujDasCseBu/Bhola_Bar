const express = require('express')
const multer = require('multer')
const {
  create,
  getAll,
  getById,
  getActiveForApp,
  getActiveForWeb,
  updateById,
  deleteById,
} = require('../controllers/committee')
const { protect, admin } = require('../middleware/auth')

const router = express.Router()

router.route('/web/active').get(getActiveForWeb)
router.route('/app/active').get(getActiveForApp)
router.route('/:id').get(getById).put(updateById).delete(deleteById)
router.route('/').post(create).get(getAll)

module.exports = router
