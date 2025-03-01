const express = require("express");
const auth = require("../middleware/auth");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Profile = require("../models/profile.model");
const streamifier = require("streamifier");

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

router.post(
  "/setprofile",
  auth,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { bio, bannerFontColor, bannerProfileBg } = req.body;
      const profile = await Profile.findOne({ userId });
      if (!profile) {
        return res.status(400).json({ error: "Profile ID is required" });
      }
      const profileId = profile._id;
      let imageUrl = profile.profilePic;
      let cloudinaryId = profile.profilePicId;
      if (req.file) {
        if (cloudinaryId && cloudinaryId !== "Boy_cplghc") {
          await cloudinary.uploader.destroy(cloudinaryId);
        }
        const cloudResult = await new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            { folder: "Linktree-mlm-profile-pics" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                return reject(error);
              }
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        imageUrl = cloudResult.secure_url;
        cloudinaryId = cloudResult.public_id;
      }
      await Profile.findByIdAndUpdate(profileId, {
        bio: bio,
        profilePic: imageUrl,
        profilePicId: cloudinaryId,
        banner: {
          profileBg: bannerProfileBg,
          fontColor: bannerFontColor,
        },
      });

      return res.status(200).json({
        status: true,
        message: "successfully saved",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error !!!" });
    }
  }
);

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

router.post("/visitprofile", async (req, res) => {
  const { profileId } = req.body;
  try {
    await Profile.findByIdAndUpdate(new mongoose.Types.ObjectId(profileId), {
      $inc: { clicks: 1 },
    });
    return res
      .status(200)
      .json({ status: true, message: "Clicks incremented successfully." });
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error." });
  }
});

router.get("/getprofile/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const profile = await Profile.findOne({ username: username });
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
