const mongoose = require("mongoose");

const committeeSchema = mongoose.Schema(
  {
    actingYear: { type: String, required: true },
    presidentId: { type: mongoose.Types.ObjectId, required: true},
    presidentSpeech: { type: String, required: true },
    generalSecretaryId: { type: mongoose.Types.ObjectId, required: true},
    generalSecretarySpeech: { type: String, required: true },
    vicePresident01Id: { type: mongoose.Types.ObjectId, required: true},
    vicePresident02Id: { type: mongoose.Types.ObjectId, required: true},
    jointSecretary01Id: { type: mongoose.Types.ObjectId, required: true},
    jointSecretary02Id: { type: mongoose.Types.ObjectId, required: true},
    financeSecretaryId: { type: mongoose.Types.ObjectId, required: true},
    religionSecretaryId: { type: mongoose.Types.ObjectId, required: true},
    librarySecretary01Id: { type: mongoose.Types.ObjectId, required: true},
    librarySecretary02Id: { type: mongoose.Types.ObjectId, required: true },
    member01Id: { type: mongoose.Types.ObjectId, required: true },
    member02Id: { type: mongoose.Types.ObjectId, required: true },
    member03Id: { type: mongoose.Types.ObjectId, required: true },
    
    adminId: { type: mongoose.Types.ObjectId, required: true },
    readableId: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
  },
  { versionKey: false }
);
const Committee = mongoose.model("Committee", committeeSchema);

module.exports = Committee;
