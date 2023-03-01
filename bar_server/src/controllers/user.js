const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const User = require("../models/Users.js")
const path = require("path")
const fs = require("fs")
const {
  triggerAsyncId
} = require("async_hooks")

// exports.insertData = async (req, res) => {
//   console.log(data.length)
//   // const maxId = await User.findOne().sort({ memberId: -1 });
//   for(let i=0; i<data.length;i++){
//       const maxId = await User.findOne().sort({ memberId: -1 });
//       // const existingUser = await User.findOne({phoneEn:data[i].phoneEn.trim()});
//       // if (existingUser){
//       //   continue
//       // }

//       // else{
//               const hashedPassword = await bcrypt.hash(data[i].password, 12);
//               const phoneBangla=data[i].phoneBn.replace(/(-|_|\s)/g,"");
//               const phoneEnglish=data[i].phoneEn.replace(/(-|_|\s)/g,"");
//               const nameBn=data[i].nameBn.trim();
//               const nameEn=data[i].nameEn.trim();
//               const fatherName=data[i].fatherName.trim();
//               const motherName=data[i].motherName.trim();

//             const result = await User.create({
//         ...data[i],
//         phoneBn:phoneBangla,
//         phoneEn:phoneEnglish,
//         password:hashedPassword,
//         nameBn:nameBn,
//         nameEn:nameEn,
//         fatherName:fatherName,
//         motherName:motherName,
//         memberId: maxId ? maxId.memberId + 1 : 1,
//       })
//       // console.log({
//       //   ...data[i],
//       //   phoneBn:phoneBangla,
//       //   phoneEn:phoneEnglish,
//       //   password:hashedPassword,
//       //   nameBn:nameBn,
//       //   nameEn:nameEn,
//       //   fatherName:fatherName,
//       //   motherName:motherName,
//       // })
//       // }

// // }
// }
//   res.status(200).json({ data:"ok"});
// };
// exports.dataUpdate=async(req,res)=>{
//   const mainData= await User.find();
//   mainData.map( async (data)=>{
//     if(data.password.length<7){
//       const hashedPassword = await bcrypt.hash("12345", 12);
//        const updateData=await User.findByIdAndUpdate({_id:data._id},{password:hashedPassword})
//       console.log(data.memberId,data.password,hashedPassword,updateData.password)
//     }
//   })
//   res.send(mainData)

// }

exports.signin = async (req, res) => {
  const {
    phone,
    password
  } = req.body

  try {
    const existingUser = await User.findOne({
      phoneEn: phone
    })

    if (!existingUser)
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid Login Information!"
        })
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )
    existingUser.password = undefined
    const token_data = existingUser._id
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid Login Information!"
        })
    const token = jwt.sign({
      id: token_data
    }, process.env.JWT_SECRET, {
      expiresIn: 30 * 24 * 60 * 60 * 1000,
    })
    res.status(200).json({
      success: true,
      message: "Successfully Logged in!",
      data: existingUser,
      token: token,
    })
  } catch (err) {
    console.log("signin err: ", err)
    res.status(500).json({
      success: false,
      message: "Something went wrong !",
      error: err,
    })
  }
}

exports.signup = async (req, res) => {
  const {
    phoneEn,
    password,
    confirmPassword,
    name
  } = req.body

  try {
    const maxId = await User.findOne().sort({
      memberId: -1
    })
    const existingUser = await User.findOne({
      phoneEn
    })
    if (existingUser)
      return res.status(409).json({
        success: false,
        message: "Phone Number already exists !"
      })

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await User.create({
      ...req.body,
      password: hashedPassword,
      memberId: maxId ? maxId.memberId + 1 : 1,
    })

    // const token = jwt.sign(
    // 	{ email: result.email, id: result._id },
    // 	'jwtscreat',
    // 	{ expiresIn: '360000000000' }
    // );
    // res.status(200).json({ result, token });
    res.status(200).json({
      result,
      success: true,
      message: "Successfully Created the User"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong !",
      error: err
    })
  }
}

// Get all users
exports.getUser = async (req, res) => {
  const {
    id
  } = req.params
  // console.log(id)
  try {
    const userDetails = await User.findOne({
      _id: id
    })

    res.status(200).json({
      success: true,
      users: userDetails
    })
  } catch (err) {
    res
      .status(500)
      .json({
        sucess: false,
        error: err,
        message: "Something went wrong !"
      })
  }
}

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().sort({
      "memberId": 1
    })

    res.status(200).json({
      success: true,
      users: allUsers
    })
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        error: err,
        message: "Something went wrong !"
      })
  }
}

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true }).sort({
      "memberId": 1
    })

    res.status(200).json({
      success: true,
      admins
    })
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        error: err,
        message: "Something went wrong !"
      })
  }
}

// get all users
exports.getUsersByCondition = async (req, res) => {
  try {
    const allUsers = await User.find(req.body)

    res.status(200).json({
      success: true,
      users: allUsers
    })
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        error: err,
        message: "Something went wrong !"
      })
  }
}

// get commettee  list
exports.getCommittee = async (req, res) => {
  try {
    let year = new Date().getFullYear()
    const committeeMembers = await User.find({
      "committee.year": year
    }) //"committee.year": year
    // console.log("year: ", year);
    res.status(200).json({
      success: true,
      status: "Success",
      data: committeeMembers
    })
  } catch (error) {
    console.log("Error from getCommittee", error)
    res.status(500).json({
      success: false,
      message: "Something went wrong !",
      error
    })
  }
}
// get Member by Status
exports.getMemberByStatus = async (req, res) => {
  const {
    status
  } = req.query
  console.log(status)
  try {
    const member = await User.find({
      memberStatus: {
        $in: [status]
      }
    }).sort({
      "memberId": 1
    })
    res.status(200).json({
      success: true,
      status: "Success",
      data: member
    })
  } catch (error) {
    console.log("Error from get Member Status", error)
    res.status(500).json({
      success: false,
      message: "Something went wrong !",
      error
    })
  }
}

// member Searchs
exports.memberSearch = async (req, res) => {
  const {
    query
  } = req
  const name = query.name || ""
  const phone = query.phone || ""
  const memberID = query.memberID || ""
  const bloodGroup = query.bloodGroup || ""
  try {
    const nameField =
      name && name !== "" ?
      {
        nameEn: {
          $regex: name,
          $options: "i"
        },
      } :
      {}
    const memberId = memberID && memberID !== "" ? {
      memberId: memberID
    } : {}
    const BG = bloodGroup && bloodGroup !== "" ? {
      bloodGroup: bloodGroup
    } : {}
    const Phone = phone && phone !== "" ? {
      phoneEn: phone
    } : {}
    const users = await User.find({
      ...nameField,
      ...memberId,
      ...BG,
      ...Phone,
    })
    res.status(200).send({
      success: true,
      status: "success",
      len: users.length,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong !"
    })
  }
}

// admin Actions
exports.addMember = async (req, res) => {
  res.json({
    msg: "addMember"
  })
}

exports.uploadProfileCover = async (req, res) => {
  const {
    id
  } = req.params

  console.log("user id: ", id)
  try {
    const _user = await User.findOne({
      _id: id
    })
    let extension = ""

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads")
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname)
        console.log("extension: ", extension)
        callback(null, "profile-cover-" + id + extension)
      },
    })

    const upload = multer({
      storage: storage
    }).single("doc")

    upload(req, res, async function (err) {
      if (err) {
        console.log("uploading error: ", err)
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: "Error Uploading Cover Photo.",
        })
        return
      }
      if (extension != _user.coverExtension) {
        const dirName = path.join(
          __basedir,
          `/uploads/profile-cover-${_user._id}${_user.coverExtension}`
        )

        fs.unlink(dirName, (err) => {
          if (err) {
            console.log("File not removed", err)
          } else {
            console.log("File delete Success!")
          }
        })
      }
      const _profile = await User.findOneAndUpdate({
        _id: id
      }, {
        coverExtension: extension
      })
      res.status(200).json({
        success: true,
        code: 200,
        message: "Cover Photo Uploaded Successfully!!",
      })
    })
  } catch (error) {
    console.log("uploading catch error: ", error)
    res.status(500).json({
      success: false,
      code: 500,
      error,
    })
  }
}

exports.uploadProfile = async (req, res) => {
  const {
    id
  } = req.params

  console.log("user id: ", id)
  try {
    const _user = await User.findOne({
      _id: id
    })
    let extension = ""

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads")
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname)
        console.log("extension: ", extension)
        callback(null, "profile-" + id + extension)
      },
    })

    const upload = multer({
      storage: storage
    }).single("doc1")

    upload(req, res, async function (err) {
      if (err) {
        console.log("uploading error: ", err)
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: "Error Uploading Profile Photo.",
        })
        return
      }
      if (extension != _user.profileExtension) {
        const dirName = path.join(
          __basedir,
          `/uploads/profile-${_user._id}${_user.profileExtension}`
        )

        fs.unlink(dirName, (err) => {
          if (err) {
            console.log("File not removed", err)
          } else {
            console.log("File delete Success!")
          }
        })
      }

      const _profile = await User.findOneAndUpdate({
        _id: id
      }, {
        profileExtension: extension
      })
      res.status(200).json({
        success: true,
        code: 200,
        message: "Cover Photo Uploaded Successfully!!",
      })
    })
  } catch (error) {
    console.log("uploading catch error: ", error)
    res.status(500).json({
      success: false,
      code: 500,
      error,
    })
  }
}

exports.updateUser = async (req, res) => {
  const {
    id
  } = req.params;

  try {

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12)
    }
    if (req.body.memberId) {
      req.body.memberId = Number(req.body.memberId)
    }

    const _profile = await User.findOneAndUpdate({
      _id: id
    }, req.body)
    res.status(200).json({
      success: true,
      data: _profile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
      message: "Update failed",
    })
  }
}

exports.deleteById = async (req, res) => {
  const {
    id
  } = req.params
  try {
    const _user = await User.findOneAndDelete({
      _id: id
    })
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully!!'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
}

exports.getAllUserIds = async (req, res) => {
  try {
    const _user = await User.find({})
    res.status(200).json({
      success: true,
      userIds: _user.map((_it) => _it._id)
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
}

// exports.provideProfile = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const _profile = await User.findOne({ _id: id });

//     console.log('_profile: ', _profile._id)
//     console.log('__dirname: ', __dirname)
//     if (_profile.coverExtension) {
//       // const path = `./uploads/profile-cover-${id}${_profile.coverExtension}`;
//       const path = `prof.png`;
//       console.log('file path: ', path)
//       const file = fs.createReadStream(path);
//       console.log('file: ', file)
//       const filename = id;
//       res.setHeader(
//         "Content-Disposition",
//         'attachment: filename="' + filename + '"'
//       );
//       file.pipe(res);
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Profile Cover doesn\'t exists',
//         code: 500,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       code: 500,
//       error,
//     });
//   }
// };