const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const linkRoutes = require("./routes/link");
dotenv.config({});
const port = process.env.PORT || 3000;
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
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
