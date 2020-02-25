const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser) => {
    console.log('after local')
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }
  
      if (!theUser) {
          res.status(401).json({ message: 'User not found'});
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }
          res.status(200).json('logged in!');
      });
  })(req, res);
});

// router.post('/login',
//   // wrap passport.authenticate call in a middleware function
//   function (req, res, next) {
//     // call passport authentication passing the "local" strategy name and a callback function
//     passport.authenticate('local', function (error, user, info) {

//       if (error) {
//         res.status(401).json(error);
//       } else if (!user) {
//         res.status(401).json(info);
//       } else {
//         next();
//       }
//       req.login(theUser, (err) => {
//         if (err) {
//             res.status(500).json({ message: 'Session save went bad.' });
//             return;
//         }
//     });
//       res.status(401).json(info);
//     });
//   },

  // //function to call once successfully authenticated
  // function (req, res) {
  //   res.status(200).json('logged in!');
  // });


router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {

      if(err){
          res.status(500).json({message: "Username check went bad."});
          return;
      }

      if (foundUser) {
          res.status(400).json({ message: 'Username taken. Choose another one.' });
          return;
      }

      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
          username:username,
          password: hashPass
      });

      aNewUser.save(err => {
          if (err) {
              res.status(400).json({ message: 'Saving user to database went wrong.' });
              return;
          }
          
          // Automatically log in user after sign up
          // .login() here is actually predefined passport method
          req.login(aNewUser, (err) => {

              if (err) {
                  res.status(500).json({ message: 'Login after signup went bad.' });
                  return;
              }
          
              // Send the user's information to the frontend
              // We can use also: res.status(200).json(req.user);
              res.status(200).json(aNewUser);
          });
      });
  });
});

router.post('/edit', (req, res, next) => {
  const { username, campus, course } = req.body;
  
  User.update({_id: req.user._id}, { $set: {username, campus, course}}, { new: true })
    .then(() => {
      User.find({_id: req.user._id})
      .then((user) => res.status(200).json(user))
      .catch((error) => res.json(error))
    })
    .catch((error) => {
      res.status(500).json({ message: 'Update went bad.' });
      return;
    })
  ;
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.status(200).json({ message: 'Logout successful' });
  });
});

router.get("/loggedin", (req, res, next) => {
  //console.log(req.user.username);
  User.findOne({ username : req.user.username })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({ err});
    return;
});
})
  

module.exports = router;
