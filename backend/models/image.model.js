const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  imageUrl: String,
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
