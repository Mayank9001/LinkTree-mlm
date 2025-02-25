const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Profile = require("../models/profile.model");

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const uppercaseRegex = /[A-Z]/;
  //   const lowercaseRegex = /[a-z]/;
  //   const numberRegex = /\d/;
  //   const passwordRegex =
  //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPass,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "User Registered Successfully!!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error !!!",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }
  try {
    const profile = await Profile.findOne({ username });
    const user = await User.findOne({ _id: profile.userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Username Not Found!!" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username or Password is incorrect!!",
        });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8hr",
    });
    res.status(200).json({
      success: true,
      message: "Login Successfull!!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "Error", message: "Internal Server Error !!" });
  }
});

router.get("/userdetails", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
    const { password: hashedPass, ...userDetails } = user._doc;
    res.status(200).json({
      status: true,
      message: "Data fetched successfully!",
      user: { userDetails },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "Error", message: "Internal Server Error !!" });
  }
});

router.put("/update", auth, async (req, res) => {
  const userId = req.user.id;
  const { newFirstName, newLastName, newEmail, newPassword } = req.body;
  try {
    const user = User.findById({ _id: userId });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "successfully saved",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "Error", message: "Internal Server Error !!" });
  }
});

module.exports = router;
