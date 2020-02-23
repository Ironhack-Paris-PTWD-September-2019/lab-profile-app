const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (thats why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const campus = req.body.campus;
  const course = req.body.course;

  if (username === "" || password === "") {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (user !== null) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      campus,
      course
    });

    newUser
      .save()
      .then(newUser => {
        req.login(newUser, err => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(newUser);
        });
      })
      .catch(err => {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
      });
  });
});

router.put("/edit", (req, res, next) => {
  const username = req.body.username;
  const campus = req.body.campus;
  const course = req.body.course;

  if (!req.user) {
    res.status(401).json({
      message: "You need to be logged-in to update user"
    });
    return;
  }

  User.findOneAndUpdate(
    { _id: req.user._id },
    { username, campus, course },
    { new: true }
  )
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

module.exports = router;
