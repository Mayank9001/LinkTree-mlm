const express = require("express");
const auth = require("../middleware/auth");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const User = require("../models/user.model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Profile = require("../models/profile.model");
const Image = require("../models/image.model");

router.post("/setdetails", auth, async (req, res) => {
  const userId = req.user.id;
  const { username, category } = req.body;
  if (!username || !category) {
    return res.status(400).json({
      status: false,
      message: "All fields required",
    });
  }
  try {
    const profile = await Profile.findOne({ username });
    if (!profile) {
      const newProfile = new Profile({
        userId: userId,
        username: username,
        category: category,
      });
      await newProfile.save();
      return res.status(200).json({
        status: true,
        message: "Profile Created Successfully!!!",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Username already exists!!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!!" });
  }
});

router.post("/setprofile", auth, upload.single("image"), async (req, res) => {
  const userId = req.user.id;
  const { bio, profilePic, banner } = req.body;
  if (!bio || !profilePic || !banner) {
    return res.status(400).json({
      status: false,
      message: "All fields required",
    });
  }
  try {
    const profile = await Profile.findOne({ userId });
    const profileId = profile._id;

    if (!profileId) {
      return res.status(400).json({ error: "Profile ID is required" });
    }

    // cloudinary.uploader
    //   .upload_stream(
    //     { folder: "Linktree-mlm-profile-pics" },
    //     async (error, cloudResult) => {
    //       if (error) return res.status(500).json({ error });

    // Save image URL with profile ID in MongoDB
    // const newImage = new Image({
    //   profileId: profileId,
    //   imageUrl: cloudResult.secure_url,
    // });

    // await newImage.save();
    await Profile.findByIdAndUpdate(profileId, {
      bio: bio,
      profilePic: profilePic,
      // profilePic: cloudResult.secure_url,
      banner: {
        profileBg: banner.profileBg,
        fontColor: banner.fontColor,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!!!",
      // imageUrl: cloudResult.secure_url,
    });
    // }
    // )
    // .end(req.file.buffer);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!!" });
  }
});

router.post("/setdesign", auth, async (req, res) => {
  const userId = req.user.id;
  const { layout, buttonStyle, themes } = req.body;
  // if (!layout || !fontStyle || !buttonStyle || !themes) {
  //   return res.status(400).json({
  //     status: false,
  //     message: "All fields required",
  //   });
  // }
  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res
        .status(400)
        .json({ status: false, message: "Profile not found" });
    }
    const profileId = profile._id;
    await Profile.findByIdAndUpdate(profileId, {
      layout: layout,
      // fontStyle: {
      //   fontFamily: fontStyle.fontFamily,
      //   fontColor: fontStyle.fontColor,
      // },
      buttonStyle: {
        bgColor: buttonStyle.bgColor,
        boxShadow: buttonStyle.boxShadow,
        border: buttonStyle.border,
        borderRadius: buttonStyle.borderRadius,
        fontColor: buttonStyle.fontColor,
        fontFamily: buttonStyle.fontFamily,
      },
      themes: {
        bgColor: themes.bgColor,
      },
    });
    const p = await Profile.findById({ _id: profileId });
    return res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!!!",
      // profile: p,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!!" });
  }
});

router.get("/getprofile", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const temp = await Profile.findOne({ userId });
    const profileId = temp._id;
    const profile = await Profile.findById({ _id: profileId });
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile Not Found" });
    }
    res.status(200).json({
      status: true,
      message: "Data fetched successfully!",
      profile: profile,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "Error", message: "Internal Server Error !!" });
  }
});

module.exports = router;
