const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User").User;
const generateToken = require("../models/User").generateToken;
const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("login", { user: req.user })
);

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.populate("token");
            if (newUser.token == null) newUser.generateToken();
            req.user = user;

            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

//Get token

router.get("/users/getToken", function (req, res) {
  User.findOne({ _id: req.user._id })
    .populate("token")
    .exec(function (err, user) {
      if (user.token == null) user.generateToken();
      req.user = user;
      res.json({ user: user, token: token });
    });
});

// Login

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/game",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/intro");
});

//Updating HighScore

router.post("/api", (req, res) => {
  console.log(`I got a request to save HighScore`);
  const data = req.body.highScore;
  console.log(data);
  User.findByIdAndUpdate(req.user._id, { highScore: data }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log({ "Updated User": docs });
    }
  });
  res.json({
    status: "success",
    highScore: data,
  });
});

module.exports = router;
