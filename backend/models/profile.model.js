const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: { type: String, required: true, unique: true, immutable: true },
  category: { type: String, required: true },
  bio: { type: String, maxlength: 80 },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  banner: {
    profileBg: { type: String },
    fontColor: { type: String },
  },
  layout: {
    type: String,
    enum: ["Stack", "Grid", "Carousel"],
  },
  fontStyle: {
    fontFamily: { type: String },
    fontColor: { type: String },
  },
  buttonStyle: {
    bgColor: { type: String },
    boxShadow: { type: String },
    border: { type: String },
    borderRadius: { type: String },
    bgFontColor: { type: String },
  },
  themes: {
    bgColor: { type: String },
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
