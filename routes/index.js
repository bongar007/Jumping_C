const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// router.get("/dashboard", ensureAuthenticated, (req, res) =>
//   res.render("partials/header", {
//     user: req.user,
//   })
// );

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);

//Intro
router.get("/intro", ensureAuthenticated, (req, res) =>
  res.render("intro", {
    user: req.user,
  })
);

router.get("/about", ensureAuthenticated, (req, res) =>
  res.render("about", {
    user: req.user,
  })
);

module.exports = router;
