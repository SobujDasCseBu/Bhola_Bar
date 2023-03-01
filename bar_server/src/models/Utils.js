const mongoose = require('mongoose')

const utilsSchema = mongoose.Schema(
  {
    home: {
      sliderImages: [
        {
          index: {
            type: String,
            required: true,
          },
          extension: {
            type: String,
            required: true,
          },
        },
      ],
    },

    footer: {
      importantLinks: [
        {
          type: String,
          required: true,
        },
      ],
    },

    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)
const Utils = mongoose.model('Utils', utilsSchema)

module.exports = Utils
