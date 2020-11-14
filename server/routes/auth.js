const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


/*router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});*/

/*router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));*/

router.post("/login",(req,res,next)=>{
  passport.authenticate("local",(err,theUser,failureDetails)=>{
    if(err){
      res.status(500).json({message:"Something went wrong authenticating user"});
      return;
    }

    if(!theUser){
      res.status(401).json(failureDetails);
      return;
    }
    req.login(theUser,(err)=>{
      if (err){
        res.status(500).json({message:"Session went bad"})
      }
      res.status(200).json(theUser)
    })
  }) (req,res,next)
})

/*router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});*/

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const campus = req.body.campus;
  const course = req.body.course;
  if (username === "" || password === "") {
    res.status(400).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
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

    /*newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong" });
    })*/

    newUser.save(err=>{
      if(err){
        res.status(400).json({message:"Saving user to database went wrong"});
        return;
      }
      req.login(newUser, err=>{
        if(err){
          res.status(500).json({messag:"Login after signup went bad"});
          return;
        }
        res.status(200).json(newUser)
      })
    })
  });
});

/*router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});*/

router.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;
