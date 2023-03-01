const mongoose = require("mongoose");

const subCommitteeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String},
    readableId: { type: Number, required: true },
    adminId: { type: mongoose.Schema.ObjectId, required: true },
    images: [{
      index: { type: String, required: true },
      extension: { type: String, required: true }
    }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { versionKey: false }
);
const SubCommittee = mongoose.model("SubCommittee", subCommitteeSchema);

module.exports = SubCommittee;
