const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    memberId: { type: Number },
    nameBn: { type: String },
    nameEn: { type: String },
    userName: { type: String,unique:true},
    fatherName: { type: String },
    motherName: { type: String },
    phoneBn: [{ type: String }],
    phoneEn: { type: String },
    imageUrl: { type: String },
    coverUrl: { type: String },
    memberStatus: {
      type: [String],
      default: "active",
    },
    email: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
    role: { type: Number, default: 0 },
    committee: [
      {
        designation: { type: String },
        year: { type: String },
      },
    ],
    dob: { type: String },
    presentAddress: { type: String },
    permanentSddress: { type: String },
    studyInfo: { type: String },
    certificationDate: { type: String },
    joiningDate: { type: String },
    highcourtCertification: { type: String },
    familyInfo: { type: String },
    ccActivities: { type: String },
    ecActivities: { type: String },
    personalView: { type: String },
    coverExtension: { type: String },
    profileExtension: { type: String },
    bloodGroup: { type: String },
    // roles:[{type:String,required:true}],
  },

  { versionKey: false }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
