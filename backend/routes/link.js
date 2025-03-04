const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = express.Router();
const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const Link = require("../models/link.model");

router.post("/create", auth, async (req, res) => {
  const { linkTitle, linkUrl, linkType, show, appType, profileId } = req.body;
  if (!profileId) {
    return res.status(400).json({ message: "Profile ID is required" });
  }
  try {
    const link = new Link({
      linkTitle: linkTitle,
      linkUrl: linkUrl,
      linkType: linkType,
      show: show,
      appType: appType,
      profileId: profileId,
    });
    await link.save();
    return res.status(200).json({
      status: true,
      message: "successfully added link",
      link: link,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "failed to add link",
    });
  }
});

router.get("/getlinks", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const links = await Link.find({ profileId: profile._id });
    res.status(200).json({
      status: true,
      message: "Links fetched successfully",
      links: links,
    });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getlinksbyprofile", async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const links = await Link.find({ profileId: profile._id });
    res.status(200).json({
      status: true,
      message: "Links fetched successfully",
      links: links,
    });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getlink/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ link: link });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/editlink/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const linkData = req.body;
    const updatedLink = await Link.findByIdAndUpdate(id, linkData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json(updatedLink);
  } catch (error) {
    console.error("Error updating link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLink = await Link.findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json({ message: "Link deleted successfully", deletedLink });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/setshow/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { show } = req.body;

    if (typeof show !== "boolean") {
      return res.status(400).json({ error: "Invalid show value" });
    }

    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { show: show },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
