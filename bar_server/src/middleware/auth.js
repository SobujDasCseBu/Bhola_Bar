const jwt = require("jsonwebtoken")
const User = require("../models/Users.js")

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1] || ""
    console.log("token: ", token)
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
      if (error) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Invalid Token. Please login again!",
            error,
          })
      } else {
        req.headers.userId = data.id
        next()
      }
    })
  } catch (err) {
    console.log("protect error: ", err)
    return res
      .status(500)
      .json({ success: false, message: "Authorization Failed!", error: err })
  }
}

exports.admin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1] || ""
    jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
      if (error) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Unauthorized Admin access!",
            error,
          })
      } else {
        const _user = await User.findById(data.id)
        // console.log('_user._id: ', data) 
        if (_user && (_user.isAdmin || _user.isSuperAdmin)) {
          req.headers.userId = data.id
          next()
        } else {
          return res
            .status(403)
            .json({ success: false, message: "Unauthorized Admin access!" })
        }
      }
    })
  } catch (err) {
    console.log("protect admin error: ", err)
    return res
      .status(500)
      .json({ success: false, message: "Authorization Failed!", error: err })
  }
}

exports.superAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")?.[1] || ""
    jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
      if (error) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Unauthorized Super Admin access!",
            error,
          })
      } else {
        const _user = await User.findById(data.id)
        if (_user && _user.isSuperAdmin) {
          req.headers.userId = data.id
          next()
        } else {
          return res
            .status(403)
            .json({
              success: false,
              message: "Unauthorized Super Admin access!",
            })
        }
      }
    })
  } catch (err) {
    console.log("protect admin error: ", err)
    return res
      .status(500)
      .json({ success: false, message: "Authorization Failed!", error: err })
  }
}
