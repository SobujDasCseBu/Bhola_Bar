const News = require('../models/News')
const multer = require('multer')
const path = require('path')
const moment = require('moment')

exports.create = async (req, res) => {

  const _countItem = await News.findOne().sort({ "readableId": -1 })

  console.log('news create body: ', req.body)

  req.body.createdAt = new Date()
  req.body.updatedAt = new Date()
  const newNews = new News({
    ...req.body,
    readableId: _countItem ? _countItem.readableId + 1 : 1
  });
  try {
    await newNews.save()
    res.status(201).json({ success: true, message: 'News created successfully!', news: newNews })
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error})
  }
}

exports.customCreate = async (createBody) => {
  const _countItem = await News.findOne().sort({ "readableId": -1 })

  createBody.createdAt = new Date()
  const newNews = new News({
    ...createBody,
    readableId: _countItem ? _countItem.readableId + 1 : 1
  });
  try {
    await newNews.save()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

exports.getAll = async (req, res) => {
  try {
    const _newss = await News.find({})
    const _sortedNews = _newss
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
    res.status(200).json({success: true, news: _sortedNews})

  } catch (error) {
    res.status(500).json({success: false, error})
  }
}

exports.getById = async (req, res) => {
  const {
    id
  } = req.params
  try {
    const _news = await News.findById(id)
    res.status(200).json({success: true, news: _news})

  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updateById = async (req, res) => {
  const {
    id
  } = req.params

  try {
    const _news = await News.findOneAndUpdate({ _id: id }, req.body, { new: true })
    // console.log('_news: ', _news)
    res.status(200).json({
      success: true,
      news: _news,
      message: 'News updated successfully.'
    })

  } catch (error) {
    res.status(500).json({ success: false, error})
  }
}

exports.customUpdate = async (query, updateBody) => {

  try {
    const _news = await News.findOneAndUpdate(query, updateBody, { new: true })
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
    const _news = await News.findOneAndDelete({ _id: id })
    res.status(200).json({ message: 'News Deleted Successfully!!', success: true })
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}



exports.uploadNewsImage = async (req, res) => {
  const { id } = req.params;

  console.log("news id: ", id);
  try {
    const _news = await News.findOne({ _id: id });
    let extension = "";

    const _index = _news.images.length.toString()

    console.log('image index: ', _index)

    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "./uploads/news");
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
          message: "Error Uploading News Image.",
        });
        return;
      }



      const _newNews = await News.findOneAndUpdate({ _id: id }, {
        images: [
          ..._news.images,
          {
            index: _index,
            extension
          }
        ]
      });
      res.status(200).json({
        success: true,
        code: 200,
        message: "News Image Uploaded Successfully!!",
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