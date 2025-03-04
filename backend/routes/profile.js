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
const Link = require("../models/link.model");
const VisitLog = require("../models/visitlog.model");

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
      if (!req.file && req.body.profilePic) {
        imageUrl = req.body.profilePic; 
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
    const links = await Link.find({ profileId: profile._id });
    res.status(200).json({
      status: true,
      message: "Data fetched successfully!",
      profile: profile,
      links: links,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "Error", message: "Internal Server Error !!" });
  }
});

router.get("/getanalytics", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(400).json({ message: "Profile not found" });
    }
    const profileId = profile._id;
    const links = await Link.find({ profileId });
    if (!links.length) {
      return res.json({ message: "No links found for this profile", data: {} });
    }

    const linkIds = links.map((link) => link._id);

    const deviceTraffic = await VisitLog.aggregate([
      { $match: { linkId: { $in: linkIds } } },
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);

    const defaultTrafficData = {
      Windows: 0,
      Mac: 0,
      Android: 0,
      iOS: 0,
      Linux: 0,
      Other: 0,
    };

    // Step 4: Populate actual counts from DB
    deviceTraffic.forEach((item) => {
      defaultTrafficData[item._id] = item.count;
    });

    const monthlyChartData = Object.keys(defaultTrafficData).map((device) => ({
      device: device,
      clicks: defaultTrafficData[device],
    }));
    const apps = await Link.find({ profileId }).select("appType clicks");
    if (!apps.length) {
      return res.json({ message: "No links found for this profile", data: {} });
    }

    const standardApps = ["Instagram", "FaceBook", "YouTube"];
    let clickData = { Instagram: 0, FaceBook: 0, YouTube: 0, Other: 0 };
    let nonStandardApps = [];

    apps.forEach((link) => {
      const type = link.appType || "Other";
      if (standardApps.includes(type)) {
        clickData[type] += link.clicks;
      } else {
        nonStandardApps.push({ type, clicks: link.clicks });
      }
    });

    if (nonStandardApps.length > 0) {
      const randomApp =
        nonStandardApps[Math.floor(Math.random() * nonStandardApps.length)];
      clickData["Other"] += randomApp.clicks;

      nonStandardApps.forEach((app) => {
        if (app.type !== randomApp.type) {
          clickData["Other"] += app.clicks;
        }
      });
    }
    const appChartData = Object.keys(clickData).map((app) => ({
      app: app,
      clicks: clickData[app],
    }));

    const trafficbylinks = await Link.find({ profileId }).select(
      "linkTitle clicks"
    );

    if (!trafficbylinks.length) {
      return res.json({ message: "No links found for this profile", data: {} });
    }

    let linkClickData = trafficbylinks.map((link) => ({
      title: link.linkTitle,
      clicks: link.clicks,
    }));

    let selectedLinks = [];
    if (linkClickData.length > 6) {
      while (selectedLinks.length < 6) {
        let randomIndex = Math.floor(Math.random() * linkClickData.length);
        selectedLinks.push(linkClickData.splice(randomIndex, 1)[0]);
      }
    } else {
      selectedLinks = linkClickData;
    }

    const trafficbymonth = await Link.find({ profileId }).select("_id");

    if (!links.length) {
      return res.json({ message: "No links found for this profile", data: {} });
    }

    const monthLinks = links.map((link) => link._id);

    const visitLogs = await VisitLog.find({
      linkId: { $in: monthLinks },
    }).select("timestamp");

    if (!visitLogs.length) {
      return res.json({ message: "No visits recorded", data: {} });
    }

    let monthlyData = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonthIndex = new Date().getMonth();

    visitLogs.forEach((log) => {
      if (!log.timestamp) return;

      const date = new Date(log.timestamp);
      if (isNaN(date.getTime())) return;

      const monthIndex = date.getMonth();

      if (monthIndex > currentMonthIndex) return;

      const monthName = monthNames[monthIndex];

      monthlyData[monthName] = (monthlyData[monthName] || 0) + 1;
    });
    let finalData = {};
    for (let i = 0; i <= currentMonthIndex; i++) {
      const monthName = monthNames[i];
      finalData[monthName] = monthlyData[monthName] || 0;
    }
    const chartData = Object.keys(finalData).map((month) => ({
      month: month,
      clicks: finalData[month],
    }));

    const cta = profile.clicks;

    const linkclicks = await Link.find({ profileId });

    // Step 2: Extract link IDs and filter by type
    const appLinkIds = linkclicks
      .filter((link) => link.linkType === "app")
      .map((link) => link._id);
    const shopLinkIds = linkclicks
      .filter((link) => link.linkType === "shop")
      .map((link) => link._id);

    // Step 3: Aggregate total clicks for each type
    const appClicks = await VisitLog.countDocuments({
      linkId: { $in: appLinkIds },
    });
    const shopClicks = await VisitLog.countDocuments({
      linkId: { $in: shopLinkIds },
    });
    res.status(200).json({
      defaultTrafficData: monthlyChartData,
      clickData: appChartData,
      trafficbylinks: selectedLinks,
      monthlyData: chartData,
      cta: cta,
      appClicks: appClicks,
      shopClicks: shopClicks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
