const express = require("express");
const uploadRoute = express.Router();

const uploader = require("../configs/cloudinary");

uploadRoute.post("/upload", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.secure_url });
});

module.exports = uploadRoute;
