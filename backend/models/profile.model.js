const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;