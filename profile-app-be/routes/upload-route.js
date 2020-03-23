const express = require("express");
const uploadRoute = express.Router();
const User = require("../models/User");

const uploader = require("../configs/cloudinary");

uploadRoute.post("/upload", uploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  if (!req.user) {
    res.status(401).json({
      message: "You need to be logged-in to update avatar"
    });
    return;
  }
  User.findOneAndUpdate(
    { _id: req.user._id },
    { image: req.file.secure_url },
    { new: true }
  )
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = uploadRoute;
