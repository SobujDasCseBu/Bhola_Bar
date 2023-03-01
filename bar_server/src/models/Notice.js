const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String},
    readableId: { type: Number, required: true },
    adminId: { type: mongoose.Schema.ObjectId, required: true },
    images: [{
      index: { type: String, required: true },
      extension: { type: String, required: true }
    }],
    readableDate: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { versionKey: false }
);
const Notice = mongoose.model("Notice", userSchema);

module.exports = Notice;
