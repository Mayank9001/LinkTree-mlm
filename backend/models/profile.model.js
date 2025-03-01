const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: { type: String, required: true, unique: true, immutable: true },
  category: { type: String, required: true },
  bio: { type: String, default:"Bio", maxlength: 80 },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dzoc66yv6/image/upload/v1740589747/Boy_cplghc.png",
  },
  profilePicId: {
    type: String,
    default: "Boy_cplghc",
  },
  banner: {
    profileBg: { type: String, default: "" },
    fontColor: { type: String, default: "" },
  },
  layout: {
    type: String,
    enum: ["Stack", "Grid", "Carousel"],
    default: "Stack",
  },
  buttonStyle: {
    bgColor: { type: String, default: "" },
    boxShadow: { type: String, default: "" },
    border: { type: String, default: "" },
    borderRadius: { type: String, default: "" },
    fontFamily: { type: String, default: "DM Sans" },
    fontColor: { type: String, default: "#ffffff" },
  },
  themes: {
    bgColor: { type: String, default: "" },
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
