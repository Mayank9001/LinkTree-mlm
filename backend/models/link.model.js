const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  linkId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  linkTitle: { type: String },
  linkUrl: { type: String },
  linkType: {
    type: String,
    enum: ["applink", "shoplink"],
  },
  clicks: { 
    type: Number, 
    default: 0 
  },
  shopImg: {
    data: Buffer,
    contentType: String,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
