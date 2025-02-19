const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
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
