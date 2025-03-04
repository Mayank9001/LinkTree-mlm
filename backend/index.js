const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const useragent = require("express-useragent");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const linkRoutes = require("./routes/link");
const Link = require("./models/link.model");
const Visitlog = require("./models/visitlog.model");
dotenv.config({});
const port = process.env.PORT || 3000;
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(useragent.express());
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ status: "success", msg: "LinkTree-mlm API is working well." });
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/link", linkRoutes);

app.get("/api/visit/:id", async (req, res) => {
  const { id } = req.params;
  const userAgent = req.useragent;
  try {
    const link = await Link.findOne({ _id: id });
    if (!link) {
      return res.status(404).send("link not found!");
    }
    const device = userAgent.isWindows
      ? "Windows"
      : userAgent.isMac
      ? "MAC"
      : userAgent.isiPhone || userAgent.isiPad
      ? "iOS"
      : userAgent.isAndroid
      ? "Android"
      : userAgent.isLinux
      ? "Linux"
      : "Other";
    const visit = new Visitlog({
      linkId: id,
      device: device,
    });
    await visit.save();
    await link.updateOne({ $inc: { clicks: 1 } });
    res.status(200).json({ status: true, message: "Visit logged" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error(error);
    });
});
