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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

linkSchema.pre("save", function (next) {
  if (this.linkType !== "shoplink") {
    this.shopImg = undefined;
  }
  next();
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
