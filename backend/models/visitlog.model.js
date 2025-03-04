const mongoose = require("mongoose");

const VisitLogSchema = new mongoose.Schema({
  device: {
    type: String,
    enum: ["Linux", "MAC", "Windows", "Android", "iOS", "Other"], 
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true,
  },
});

const VisitLog = mongoose.model("VisitLog", VisitLogSchema);

module.exports = VisitLog;
