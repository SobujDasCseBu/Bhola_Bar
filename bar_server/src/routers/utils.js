const express = require("express")
const multer = require("multer")
const {
  create,
  getUtils,
  uploadHomeSliderImage,
  deleteSingleHomeSliderImage,
} = require("../controllers/utils")
const { protect, admin } = require("../middleware/auth")

const router = express.Router()

router.route("/home/slider").post(protect, admin, uploadHomeSliderImage)
router.route("/home/slider/:id").delete(protect, admin, deleteSingleHomeSliderImage)
router.route("/").post(protect, admin, create).get(getUtils)

module.exports = router