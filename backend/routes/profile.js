const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const User = require("../models/user.model");
const Profile = require("../models/profile.model");

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

router.post("/setprofile", auth, async (req, res) => {
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
    await Profile.findByIdAndUpdate(profileId, {
      bio: bio,
      profilePic: profilePic,
      banner: { profileBg: banner.profileBg, fontColor: banner.fontColor },
    });
    return res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!!!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!!" });
  }
});

router.post("/setdesign", auth, async (req, res) => {
  const userId = req.user.id;
  const { layout, fontStyle, buttonStyle, themes } = req.body;
  if (!layout || !fontStyle || !buttonStyle || !themes) {
    return res.status(400).json({
      status: false,
      message: "All fields required",
    });
  }
  try {
    const profile = await Profile.findOne({ userId });
    const profileId = profile._id;
    await Profile.findByIdAndUpdate(profileId, {
      layout: layout,
      fontStyle: {
        fontFamily: fontStyle.fontFamily,
        fontColor: fontStyle.fontColor,
      },
      buttonStyle: {
        bgColor: buttonStyle.bgColor,
        boxShadow: buttonStyle.boxShadow,
        border: buttonStyle.border,
        borderRadius: buttonStyle.borderRadius,
        bgFontColor: buttonStyle.bgFontColor,
      },
      themes: {
        bgColor: themes.bgColor,
      },
    });
    const p = await Profile.findById({ _id: profileId });
    return res.status(200).json({
      status: true,
      message: "Profile Updated Successfully!!!",
      profile: p,
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
