const Notice = require('../models/Notice')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const moment = require('moment')

exports.create = async (req, res) => {
  
  const _countItem = await Notice.findOne().sort({ "readableId": -1 })

  console.log('notice create body: ', req.body)
  
  req.body.createdAt = new Date()
  req.body.updatedAt = new Date()
  const newNotice = new Notice({
    ...req.body,
    readableId: _countItem ? _countItem.readableId + 1 : 1
  });
  try {
    await newNotice.save()
    res.status(201).json({ success: true, message: 'Notice created successfully!', notice: newNotice })
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error})
  }
}

exports.customCreate = async (createBody) => {
  const _countItem = await Notice.findOne().sort({ "readableId": -1 })
  
  createBody.createdAt = new Date()
  const newNotice = new Notice({
    ...createBody,
    readableId: _countItem ? _countItem.readableId + 1 : 1
  });
  try {
    await newNotice.save()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.getAll = async (req, res) => {
  try {
    const _notices = await Notice.find({})
    const _sortedNotices = _notices
      .map((_it) => ({
        ..._it,
        sortingDate: moment(_it.readableDate, "DD-MM-YYYY").format('YYYY-MM-DD'),
      }))
      .sort((_a, _b) =>
        _a.sortingDate > _b.sortingDate
          ? -1
          : _a.sortingDate < _b.sortingDate
          ? 1
          : 0
    )
    .map((_it) => _it._doc)
    res.status(200).json({success: true, notices: _sortedNotices})
  
  } catch (error) {
    res.status(500).json({success: false, error})
  }
}

exports.getById = async (req, res) => {
  const {
    id
  } = req.params
  try {
    const _notice = await Notice.findById(id)
    res.status(200).json({success: true, notice: _notice})
  
  } catch (error) {
    res.status(500).json({success: false, error})
  }
}

exports.updateById = async (req, res) => {
  const {
    id
  } = req.params
  
  try {
    const _notice = await Notice.findOneAndUpdate({ _id: id }, req.body, { new: true })
    // console.log('_notice: ', _notice)
    res.status(200).json({
      success: true,
      notice: _notice,
      message: 'Notice updated successfully.'
    })
  
  } catch (error) {
    res.status(500).json({success: false, error})
  }
}

exports.customUpdate = async (query, updateBody) => {
  
  try {
    const _notice = await Notice.findOneAndUpdate(query, updateBody, { new: true })
    return true
  
  } catch (error) {
    return false
  }
}

exports.deleteById = async (req, res) => {
  const {
    id
  } = req.params
  try {
    const _notice = await Notice.findOneAndDelete({ _id: id })
    res.status(200).json({success: true, message: 'Notice Deleted Successfully!!'})
  } catch (error) {
    res.status(500).json({success: false, error });
  }
}



exports.uploadPDFFile = async (req, res) => {
  const { id } = req.params;

  console.log("notice id: ", id);
  try {
    const _notice = await Notice.findOne({ _id: id });
    let extension = "";

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads/notices");
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname);
        console.log("extension: ", extension);
        callback(null, id + extension);
      },
    });

    const upload = multer({ storage: storage }).single("doc");

    upload(req, res, async function (err) {
      if (err) {
        console.log("uploading error: ", err);
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: "Error Uploading Notice File.",
        });
        return;
      }
      
      const _profile = await Notice.findOneAndUpdate(
        { _id: id },
        { pdfUploaded: true }
      );
      res.status(200).json({
        success: true,
        code: 200,
        message: "Notice File Uploaded Successfully!!",
      });
    });
  } catch (error) {
    console.log("uploading catch error: ", error);
    res.status(500).json({
      success: false,
      code: 500,
      error,
    });
  }
};

exports.uploadNoticeImage = async (req, res) => {
  const { id } = req.params;

  console.log("notice id: ", id);
  try {
    const _notice = await Notice.findOne({ _id: id });
    let extension = "";

    const _index = _notice.images.length.toString()
    const _uploadDir = "./uploads/notice"

    if (!fs.existsSync(_uploadDir)){
      fs.mkdirSync(_uploadDir, { recursive: true });
    }

    console.log('image index: ', _index)

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, _uploadDir);
      },
      filename: function (req, file, callback) {
        extension = path.extname(file.originalname);
        console.log("extension: ", extension);
        callback(null, id + '_' + _index + extension);
      },
    });

    const upload = multer({ storage: storage }).single("doc");

    upload(req, res, async function (err) {
      if (err) {
        console.log("uploading error: ", err);
        res.status(500).json({
          success: false,
          code: 500,
          error: err,
          message: "Error Uploading Notice Image.",
        });
        return;
      }



      const _newNotice = await Notice.findOneAndUpdate({ _id: id }, {
        images: [
          ..._notice.images,
          {
            index: _index,
            extension
          }
        ]
      });
      res.status(200).json({
        success: true,
        code: 200,
        message: "Notice Image Uploaded Successfully!!",
      });
    });
  } catch (error) {
    console.log("uploading catch error: ", error);
    res.status(500).json({
      success: false,
      code: 500,
      error,
    });
  }
};