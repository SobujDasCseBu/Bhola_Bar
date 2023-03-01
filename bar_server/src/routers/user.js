const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  getUser,
  memberSearch,
  insertData,
  addMember,
  getCommittee,
  uploadProfileCover,
  uploadProfile,
  updateUser,
  getAllUsers,
  getAllAdmins,
  getMemberByStatus,
  deleteById,
  getUsersByCondition,
  getAllUserIds
} = require("../controllers/user");

//route create.

// Authenticate

router.post("/signup", signup);
router.post("/signin", signin);

// Users actions
// Update data testing routes 
// router.post("/test",dataUpdate) ;



router.route("/cover-image/:id").post(uploadProfileCover);
router.route("/profile-image/:id").post(uploadProfile);
router.route('/ids').get(getAllUserIds)
router.route('/admins').get(getAllAdmins)
router.get("/search", memberSearch);
router.post("/condition", getUsersByCondition);
router.get("/committeMembers", getCommittee);
router.get("/member", getMemberByStatus);
router.post("/update-user/:id", updateUser);
router.route("/:id").get(getUser).delete(deleteById);
router.get("/", getAllUsers);

// Admin control
// add New member
router.post("/addMember", addMember);

module.exports = router;
