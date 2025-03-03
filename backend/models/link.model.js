const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  linkTitle: { type: String },
  linkUrl: { type: String },
  linkType: {
    type: String,
    enum: ["app", "shop"],
  },
  show: {
    type: Boolean,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  appType: {
    type: String,
  },
  shopImg: {
    type: String,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
